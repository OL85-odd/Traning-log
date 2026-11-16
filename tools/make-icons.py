"""Draw the exercise pictures with the Gemini image API.

    python3 tools/make-icons.py            # draw the ones that are missing or still an old pictogram
    python3 tools/make-icons.py --force    # redraw everything
    python3 tools/make-icons.py exercise-plank exercise-squat   # (re)draw these
    npm run shell                          # then: tell the app which exist

Needs GEMINI_API_KEY in the environment (or a proxy that adds the key).
tools/icon-prompts.json has, per exercise, one sentence that describes the
pose (`prompt`) and the muscles that do the work (`muscles`). The drawing
style is the STYLE text below, shared by all.

The model returns a white silhouette on black with the working muscles in
red. That is turned into one file per exercise, 512 x 256: the left half is
the whole figure and the right half is only the red parts, both as an alpha
mask. The app draws the left half in a neutral colour and the right half in
red on top, so one file works in the light and the dark theme.

The model sometimes adds a frame, lettering or a second person, or paints
the wrong muscle. Look the results over (tools/icon-originals/ keeps what it
returned) and redraw the odd one by name.
"""
import base64
import io
import json
import os
import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor

from PIL import Image

API = 'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent'
SIZE = 256

STYLE = (
    'Draw ONE fitness exercise illustration of a single athletic adult: {what}. '
    'Style: a realistic silhouette like a stock vector exercise icon — natural human proportions and a clearly '
    'defined athletic body outline (head, neck, shoulders, chest, waist, hips, thighs, calves, hands and feet), '
    'short hair, wearing shorts and trainers. '
    'The whole body is one flat pure white shape on a pure black background. '
    '{red} '
    'A thin black line may separate an arm or leg where it passes in front of the body. '
    'Any equipment is drawn flat pure white. '
    '{palette} No grey, no shading, no gradients, '
    'no highlights, no face details, no text, no letters, no watermark, no border, no frame, no floor shadow, '
    'no arrows. Exactly one person, whole body visible, centred, filling about 80 percent of a square image '
    'with empty black margin on all sides.'
)
RED = ('The muscles that do the work in this exercise — {muscles} — are filled with flat pure red (#FF0000), '
       'drawn as clean anatomical muscle shapes inside the body outline. Everything else on the body stays white.')
NO_RED = 'This is a resting pose: the whole body stays white, nothing is red.'


def prompt_for(job):
    muscles = job.get('muscles')
    return STYLE.format(
        what=job['prompt'].rstrip('.'),
        red=RED.format(muscles=muscles) if muscles else NO_RED,
        palette='Exactly three colours in the whole image: white, red and black.' if muscles
        else 'Exactly two colours in the whole image: white and black.',
    )


def call(model, prompt):
    body = json.dumps({
        'contents': [{'parts': [{'text': prompt}]}],
        'generationConfig': {'responseModalities': ['IMAGE'], 'imageConfig': {'aspectRatio': '1:1'}},
    }).encode()
    headers = {'Content-Type': 'application/json'}
    if os.environ.get('GEMINI_API_KEY'):
        headers['x-goog-api-key'] = os.environ['GEMINI_API_KEY']
    request = urllib.request.Request(API.format(model=model), data=body, headers=headers)
    with urllib.request.urlopen(request, timeout=240) as response:
        data = json.load(response)
    for part in data['candidates'][0]['content']['parts']:
        if 'inlineData' in part:
            return base64.b64decode(part['inlineData']['data'])
    raise RuntimeError('no image in response: ' + json.dumps(data)[:300])


def ramp(low, high):
    return lambda v: 0 if v < low else 255 if v > high else int((v - low) * 255 / (high - low))


def to_sprite(raw_bytes, size=SIZE):
    """White-and-red on black -> one image, twice as wide as high, white with the drawing as alpha:
    the whole figure in the left half, the red parts in the right half."""
    rgb = Image.open(io.BytesIO(raw_bytes)).convert('RGB')
    r, g, b = rgb.split()
    body = r.point(ramp(50, 200))                         # white and red both have a strong red channel
    not_red = Image.merge('RGB', (g, b, g)).convert('L')  # about (green + blue) / 2: low only where it is red
    muscle = Image.composite(Image.eval(not_red, lambda v: 255 - v), Image.new('L', rgb.size, 0), body)
    muscle = muscle.point(ramp(110, 200))
    box = body.getbbox()
    alpha = Image.new('L', (size * 2, size), 0)
    for index, layer in enumerate((body, muscle)):
        if box:
            layer = layer.crop(box)
        side = max(layer.size)
        margin = int(side * 0.05)
        canvas = Image.new('L', (side + 2 * margin, side + 2 * margin), 0)
        canvas.paste(layer, ((canvas.width - layer.width) // 2, (canvas.height - layer.height) // 2))
        alpha.paste(canvas.resize((size, size), Image.LANCZOS), (index * size, 0))
    # Few alpha levels compress far better and look the same at these sizes.
    alpha = alpha.point(lambda v: (v // 17) * 17)
    out = Image.new('RGBA', alpha.size, (255, 255, 255, 0))
    out.putalpha(alpha)
    return out


def is_figure(path):
    """Whether the file is already a two-layer picture (an older one-colour pictogram is square)."""
    if not os.path.exists(path):
        return False
    with Image.open(path) as image:
        return image.width == 2 * image.height


def run(job, out_dir, raw_dir, model, force):
    target = os.path.join(out_dir, job['slug'] + '.png')
    raw_path = os.path.join(raw_dir, job['slug'] + '.png')
    if is_figure(target) and not force:
        return job['slug'], 'kept'
    last = None
    for attempt in range(4):
        try:
            raw = call(model, prompt_for(job))
            with open(raw_path, 'wb') as handle:
                handle.write(raw)
            to_sprite(raw).save(target, optimize=True)
            return job['slug'], 'ok'
        except Exception as error:  # noqa: BLE001 - report and retry
            last = error
            if '402' in str(error) or '429' in str(error):   # out of credit or capped: trying again will not help
                break
            time.sleep(4 * (attempt + 1))
    return job['slug'], f'FAILED {last}'


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    args = sys.argv[1:]
    options = {'--model': 'gemini-3.1-flash-image', '--workers': '3', '--out': os.path.join(here, '..', 'img', 'exercises')}
    names, force = [], False
    while args:
        arg = args.pop(0)
        if arg in options:
            options[arg] = args.pop(0)
        elif arg == '--force':
            force = True
        else:
            names.append(arg if arg.startswith('exercise-') else 'exercise-' + arg)

    jobs = json.load(open(os.path.join(here, 'icon-prompts.json')))
    if names:
        jobs = [job for job in jobs if job['slug'] in names]
        force = True
    out_dir = options['--out']
    raw_dir = os.path.join(here, 'icon-originals')   # what the model returned; not part of the app
    os.makedirs(out_dir, exist_ok=True)
    os.makedirs(raw_dir, exist_ok=True)

    failed = 0
    with ThreadPoolExecutor(int(options['--workers'])) as pool:
        for slug, status in pool.map(lambda job: run(job, out_dir, raw_dir, options['--model'], force), jobs):
            if status != 'kept':
                print(slug, status, flush=True)
            failed += status.startswith('FAILED')
    if failed:
        print(f'{failed} could not be drawn. 429 = rate limited, or held back by the project\'s monthly '
              'spending cap (raise it in AI Studio, or wait): run it again later. '
              '402 = the account is out of credit: add some, then run it again.')


if __name__ == '__main__':
    main()
