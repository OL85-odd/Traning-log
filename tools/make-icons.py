"""Draw the exercise pictograms with the Gemini image API.

    python3 tools/make-icons.py            # draw the ones that are missing
    python3 tools/make-icons.py --force    # redraw everything
    python3 tools/make-icons.py exercise-plank exercise-squat   # (re)draw these
    npm run shell                          # then: tell the app which exist

Needs GEMINI_API_KEY in the environment (or a proxy that adds the key).
The prompts are in tools/icon-prompts.json: one sentence per exercise that
describes the pose; the drawing style is the STYLE text below, shared by all.

Each picture comes back white on black and is turned into a 256 px image
whose alpha channel is the drawing. The app draws it as a mask, so one file
takes the category colour in both the light and the dark theme.

The model sometimes adds a frame, lettering or a second person. Look the
results over (they are small files — a contact sheet is quick to make) and
redraw the odd one by name — or pose it by hand in tools/draw-icons.py,
which this script then leaves alone.
"""
import base64
import io
import json
import os
import re
import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor

from PIL import Image, ImageOps

API = 'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent'

STYLE = (
    'Draw ONE pictogram icon of a single human figure: {what}. '
    'Style: international sports pictogram, like the signs used at athletics events. '
    'The figure is made of solid white shapes with rounded ends: a separate round head, '
    'a thick torso, thick arms and legs with clearly visible elbows and knees. '
    'Any equipment (bar, dumbbell, kettlebell, bench, box, rope, mat, wall, floor line) is drawn as a simple '
    'solid white shape, thinner than the limbs. '
    'Pure black background. Only two colours in the whole image: white and black. '
    'No outline strokes, no shading, no gradients, no shadows, no face, no fingers, no text, no letters, '
    'no arrows, no motion lines, no border, no frame. '
    'Exactly one person: one head, one torso, two arms, two legs. The head is one solid filled circle. '
    'One figure only, centred, filling about 80 percent of a square image, with empty black margin on all sides.'
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
    with urllib.request.urlopen(request, timeout=180) as response:
        data = json.load(response)
    for part in data['candidates'][0]['content']['parts']:
        if 'inlineData' in part:
            return base64.b64decode(part['inlineData']['data'])
    raise RuntimeError('no image in response: ' + json.dumps(data)[:300])


def to_mask(raw_bytes, size=256):
    """White-on-black drawing -> white image whose alpha is the drawing, trimmed and centred."""
    grey = Image.open(io.BytesIO(raw_bytes)).convert('L')
    # Push near-black to 0 and near-white to 255 so the edge is clean but still anti-aliased.
    grey = ImageOps.autocontrast(grey, cutoff=1)
    grey = grey.point(lambda v: 0 if v < 40 else 255 if v > 215 else int((v - 40) * 255 / 175))
    box = grey.getbbox()
    if box:
        grey = grey.crop(box)
    side = max(grey.size)
    margin = int(side * 0.06)
    canvas = Image.new('L', (side + 2 * margin, side + 2 * margin), 0)
    canvas.paste(grey, ((canvas.width - grey.width) // 2, (canvas.height - grey.height) // 2))
    alpha = canvas.resize((size, size), Image.LANCZOS)
    out = Image.new('RGBA', (size, size), (255, 255, 255, 0))
    out.putalpha(alpha)
    return out


def run(job, out_dir, raw_dir, model, force):
    target = os.path.join(out_dir, job['slug'] + '.png')
    raw_path = os.path.join(raw_dir, job['slug'] + '.png')
    if os.path.exists(target) and not force:
        return job['slug'], 'kept'
    prompt = STYLE.format(what=job['prompt'].rstrip('.'))
    last = None
    for attempt in range(4):
        try:
            raw = call(model, prompt)
            with open(raw_path, 'wb') as handle:
                handle.write(raw)
            to_mask(raw).save(target, optimize=True)
            return job['slug'], 'ok'
        except Exception as error:  # noqa: BLE001 - report and retry
            last = error
            time.sleep(4 * (attempt + 1))
    return job['slug'], f'FAILED {last}'


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    args = sys.argv[1:]
    model = args[args.index('--model') + 1] if '--model' in args else 'gemini-3.1-flash-image'
    workers = int(args[args.index('--workers') + 1]) if '--workers' in args else 2
    force = '--force' in args
    names = [a for i, a in enumerate(args) if not a.startswith('--') and (i == 0 or args[i - 1] not in ('--model', '--workers'))]

    jobs = json.load(open(os.path.join(here, 'icon-prompts.json')))
    if names:
        jobs = [job for job in jobs if job['slug'] in names]
        force = True
    else:
        # The ones posed by hand in draw-icons.py belong to that script.
        posed = set()
        for line in open(os.path.join(here, 'draw-icons.py')):
            if line.startswith('@pose('):
                posed.update('exercise-' + name for name in re.findall(r"'([^']+)'", line))
        jobs = [job for job in jobs if job['slug'] not in posed]
    out_dir = os.path.join(here, '..', 'img', 'exercises')
    raw_dir = os.path.join(here, 'icon-originals')   # what the model returned; not part of the app
    os.makedirs(raw_dir, exist_ok=True)

    failed = 0
    with ThreadPoolExecutor(workers) as pool:
        for slug, status in pool.map(lambda job: run(job, out_dir, raw_dir, model, force), jobs):
            if status != 'kept':
                print(slug, status, flush=True)
            failed += status.startswith('FAILED')
    if failed:
        print(f'{failed} could not be drawn. 429 = the API is rate limiting: wait and run it again. '
              '402 = the account has reached its spending limit: raise it or add credit, then run it again.')


if __name__ == '__main__':
    main()
