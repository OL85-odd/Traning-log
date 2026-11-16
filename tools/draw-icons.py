"""Draw exercise pictograms from poses written as numbers — no image model.

    python3 tools/draw-icons.py                  # draw every pose below
    python3 tools/draw-icons.py deadlift l-sit   # only these
    python3 tools/draw-icons.py --out some/dir   # somewhere else than img/exercises
    npm run shell                                # then: tell the app which exist

A pose is a small function that places a figure and its equipment with
tools/pictogram.py. The result is the same kind of file tools/make-icons.py
writes (256 px, the drawing in the alpha channel), so the two can be mixed:
this script is for the exercises the image model got wrong, or never drew.

Reading a pose: x is to the right and y is up, the floor is y = 0 and a
standing figure is about 1.0 tall. An arm or a leg is either two angles —
('a', upper, lower), 0 = pointing right, 90 = up — or a point to reach,
('to', (x, y), bend), where bend (+1 / -1) picks the side the joint goes to.
"""
import math
import os
import sys

from pictogram import FORE, TORSO, UPPER, Picture, polar

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSES = {}
ARM = UPPER + FORE
LEG = 0.49
DOWN = ('a', -90, -90)


def pose(*names):
    def register(fn):
        for name in names:
            POSES[name] = fn
        return fn
    return register


def joints(**figure):
    """Where a figure's hands, feet and so on end up — without drawing it."""
    return Picture().figure(**figure)


def stand(p, arms, hip=(0.0, 0.49), torso=90, legs=(DOWN,), feet=(0,), **more):
    """Seen from the side, facing right."""
    return p.figure(hip=hip, torso=torso, arms=arms, legs=list(legs), feet=list(feet), **more)


def front(p, arms, stance=0.11, hip_y=None, torso=90, knees=(-1, 1), hip_x=0.0, **more):
    """Seen from the front, feet `stance` to each side. A hip lower than
    straight legs allow bends the knees outwards."""
    straight = math.sqrt(LEG ** 2 - max(0.0, stance - 0.052) ** 2) - 0.004
    hip = (hip_x, straight if hip_y is None else hip_y)
    legs = [('to', (-stance, 0.0), knees[0]), ('to', (stance, 0.0), knees[1])]
    return p.figure(hip=hip, torso=torso, arms=arms, legs=legs, front=True, **more)


# ------------------------------------------------------------ barbell

@pose('deadlift')
def deadlift(p):
    # Hips back and down, flat back, straight arms on the bar by the shins.
    spec = dict(hip=(-0.21, 0.3), torso=38, head=14, arms=[('to', (0.04, 0.115), -1)],
                legs=[('to', (0.0, 0.0), 1)], feet=[0])
    p.barbell((0.04, 0.115), half=0.4, plate=0.1)
    p.figure(**spec)
    p.floor(-0.5, 0.5)


@pose('romanian-deadlift')
def romanian_deadlift(p):
    # Legs almost straight, hips pushed far back, the bar sliding down the thighs.
    p.barbell((0.1, 0.27), half=0.38)
    p.figure(hip=(-0.13, 0.47), torso=14, head=22, arms=[('to', (0.1, 0.27), -1)],
             legs=[('to', (0.0, 0.0), 1)], feet=[0])
    p.floor(-0.5, 0.52)


@pose('sumo-deadlift')
def sumo_deadlift(p):
    # Seen from the front: a very wide stance, arms straight down between the knees.
    p.barbell((0.0, 0.2), half=0.46, plate=0.1)
    front(p, [('to', (-0.07, 0.2), 1), ('to', (0.07, 0.2), -1)], stance=0.3, hip_y=0.3)
    p.floor(-0.58, 0.58)


@pose('barbell-row')
def barbell_row(p):
    # Bent over with a flat back, the bar pulled up to the ribs, elbows high.
    hand = (0.03, 0.4)
    p.barbell(hand, half=0.38)
    p.figure(hip=(-0.14, 0.45), torso=18, head=20, arms=[('to', hand, 1)],
             legs=[('to', (0.0, 0.0), 1)], feet=[0])
    p.floor(-0.5, 0.52)


@pose('good-morning')
def good_morning(p):
    # A bow: bar on the upper back, torso down towards parallel.
    spec = dict(hip=(-0.12, 0.47), torso=12, head=24, legs=[('to', (0.0, 0.0), 1)], feet=[0])
    shoulder = joints(**spec)['shoulder']
    bar = (shoulder[0] - 0.03, shoulder[1] + 0.085)
    p.barbell(bar, half=0.36)
    p.figure(arms=[('to', (bar[0] + 0.02, bar[1]), -1)], **spec)
    p.floor(-0.5, 0.52)


@pose('back-squat')
def back_squat(p):
    # Deep squat, bar across the upper back.
    spec = dict(hip=(-0.2, 0.27), torso=62, legs=[('to', (0.0, 0.0), 1)], feet=[0])
    shoulder = joints(**spec)['shoulder']
    bar = (shoulder[0] - 0.055, shoulder[1] + 0.05)
    p.barbell(bar, half=0.38)
    p.figure(arms=[('to', (bar[0] + 0.01, bar[1] - 0.01), 1)], **spec)
    p.floor(-0.5, 0.45)


@pose('front-squat')
def front_squat(p):
    # Deep squat with an upright torso, bar on the front of the shoulders, elbows high.
    spec = dict(hip=(-0.2, 0.27), torso=74, legs=[('to', (0.0, 0.0), 1)], feet=[0])
    shoulder = joints(**spec)['shoulder']
    bar = (shoulder[0] + 0.07, shoulder[1] + 0.03)
    p.barbell(bar, half=0.38)
    p.figure(arms=[('a', 8, 172)], **spec)
    p.floor(-0.5, 0.45)


@pose('power-clean')
def power_clean(p):
    # The catch: a quarter squat, bar on the shoulders, elbows shot forward.
    spec = dict(hip=(-0.1, 0.4), torso=84, legs=[('to', (0.0, 0.0), 1)], feet=[0])
    shoulder = joints(**spec)['shoulder']
    bar = (shoulder[0] + 0.07, shoulder[1] + 0.03)
    p.barbell(bar, half=0.38)
    p.figure(arms=[('a', 12, 170)], **spec)
    p.floor(-0.5, 0.48)


@pose('push-press')
def push_press(p):
    # Standing tall, the bar driven overhead from the shoulders.
    spec = dict(hip=(-0.03, 0.46), torso=90, legs=[('to', (0.0, 0.0), 1)], feet=[0])
    shoulder = joints(**spec)['shoulder']
    bar = (shoulder[0] + 0.02, shoulder[1] + 0.3)
    p.barbell(bar, half=0.38)
    p.figure(arms=[('to', bar, 1)], **spec)
    p.floor(-0.5, 0.5)


@pose('barbell-curl')
def barbell_curl(p):
    # Elbows at the ribs, the bar curled up to the chest.
    spec = dict(hip=(0.0, 0.49), torso=90, legs=[DOWN], feet=[0], arms=[('a', -84, 52)])
    hand = joints(**spec)['hands'][0]
    p.barbell(hand, half=0.36)
    p.figure(**spec)
    p.floor(-0.45, 0.48)


def lying(p, arms, top=0.26, bench=(-0.46, 0.22), **more):
    """On the back on a flat bench, head to the left, feet on the floor."""
    p.bench(bench[0], bench[1], top)
    return p.figure(hip=(0.1, top + 0.08), torso=180, arms=arms,
                    legs=[('to', (0.4, 0.0), 1)], feet=[0], **more)


def inclined(p, arms, **more):
    """Leaning back on an inclined bench, feet on the floor."""
    p.line((-0.31, 0.5), (-0.03, 0.18), 0.04)          # the backrest
    p.line((-0.03, 0.18), (0.14, 0.18), 0.04)          # the seat
    p.line((-0.17, 0.33), (-0.17, 0.012), 0.024)
    p.line((0.08, 0.16), (0.08, 0.012), 0.024)
    return p.figure(hip=(0.04, 0.27), torso=131, arms=arms, legs=[('to', (0.36, 0.0), 1)], feet=[0], **more)


@pose('close-grip-bench-press')
def close_grip_bench_press(p):
    # On the bench, the bar low over the chest with the elbows tucked in.
    spec = dict(arms=[('a', 12, 90)])
    shoulder = (-0.2, 0.34)
    hand = polar(polar(shoulder, 12, UPPER), 90, FORE)
    p.barbell(hand, half=0.3)
    lying(p, **spec)
    p.floor(-0.56, 0.52)


@pose('skull-crusher')
def skull_crusher(p):
    # Upper arms straight up, the bar lowered to the forehead by bending the elbows.
    shoulder = (-0.2, 0.34)
    hand = polar(polar(shoulder, 88, UPPER), 178, FORE)
    p.barbell((hand[0], hand[1]), half=0.2, plate=0.07)
    lying(p, [('a', 88, 178)])
    p.floor(-0.62, 0.52)


@pose('incline-bench-press')
def incline_bench_press(p):
    hand = polar((0.04, 0.27), 131, TORSO)
    hand = (hand[0], hand[1] + ARM)
    p.barbell(hand, half=0.36)
    inclined(p, [('a', 90, 90)])
    p.floor(-0.5, 0.5)


@pose('hip-thrust')
def hip_thrust(p):
    # Upper back on a bench, feet flat, hips pushed up level with a bar across them.
    p.box(-0.6, 0.0, -0.3, 0.2)
    p.barbell((0.03, 0.36), half=0.3)
    p.figure(hip=(0.03, 0.27), torso=178, head=28, arms=[('to', (0.03, 0.36), 1)],
             legs=[('a', 0, -90)], feet=[0])
    p.floor(-0.66, 0.5)


@pose('landmine-press')
def landmine_press(p):
    # One end of the bar on the floor ahead, the other pressed up and forward.
    spec = dict(hip=(0.0, 0.47), torso=82, arms=[('a', -100, -95), ('a', 55, 55)],
                legs=[('to', (-0.2, 0.0), 1), ('to', (0.12, 0.0), 1)], feet=[0, 0])
    hand = joints(**spec)['hands'][1]
    p.line(hand, (0.86, 0.02), 0.028)
    p.disc(polar(hand, 125, 0.01), 0.06)
    p.figure(**spec)
    p.floor(-0.34, 0.9)


# ----------------------------------------------------------- dumbbell

@pose('dumbbell-bench-press')
def dumbbell_bench_press(p):
    j = lying(p, [('a', 90, 90)])
    p.dumbbell(j['hands'][0], 0)
    p.floor(-0.56, 0.52)


@pose('incline-dumbbell-press')
def incline_dumbbell_press(p):
    j = inclined(p, [('a', 90, 90)])
    p.dumbbell(j['hands'][0], 0)
    p.floor(-0.4, 0.48)


@pose('dumbbell-pullover')
def dumbbell_pullover(p):
    # Arms reaching back over the head with one dumbbell.
    j = lying(p, [('a', 148, 166)])
    p.dumbbell(j['hands'][0], 80)
    p.floor(-0.72, 0.52)


@pose('dumbbell-fly')
def dumbbell_fly(p):
    # Seen from the head end of the bench: arms opened wide to the sides.
    p.box(-0.1, -0.2, 0.1, -0.15)
    p.line((0.0, -0.2), (0.0, -0.4), 0.024)
    j = p.figure(hip=(0.0, -0.1), torso=90, torso_len=0.13, front=True,
                 arms=[('a', 168, 150), ('a', 12, 30)],
                 legs=[('to', (-0.2, -0.4), -1), ('to', (0.2, -0.4), 1)])
    p.dumbbell(j['hands'][0], 60)
    p.dumbbell(j['hands'][1], 120)
    p.floor(-0.42, 0.42, -0.4)


@pose('dumbbell-lateral-raise')
def dumbbell_lateral_raise(p):
    j = front(p, [('a', 184, 180), ('a', -4, 0)])
    p.dumbbell(j['hands'][0], 90)
    p.dumbbell(j['hands'][1], 90)


@pose('dumbbell-front-raise')
def dumbbell_front_raise(p):
    j = stand(p, [('a', -92, -90), ('a', 2, 2)])
    p.dumbbell(j['hands'][1], 90)
    p.dumbbell(j['hands'][0], 0)
    p.floor(-0.2, 0.42)


@pose('dumbbell-reverse-fly')
def dumbbell_reverse_fly(p):
    # Seen from the front, bowed forward: arms lifted like wings.
    j = front(p, [('a', 196, 176), ('a', -16, 4)], stance=0.12, hip_y=0.44, torso_len=0.17)
    p.dumbbell(j['hands'][0], 90)
    p.dumbbell(j['hands'][1], 90)


@pose('dumbbell-shrug')
def dumbbell_shrug(p):
    # Arms straight down, shoulders pulled up to the ears.
    j = front(p, [('a', -100, -90), ('a', -80, -90)], torso_len=0.34)
    p.dumbbell(j['hands'][0], 0)
    p.dumbbell(j['hands'][1], 0)


@pose('arnold-press')
def arnold_press(p):
    # Seated, the dumbbells in front of the shoulders before they turn and go up.
    p.box(-0.22, 0.21, 0.22, 0.26)
    for x in (-0.16, 0.16):
        p.line((x, 0.21), (x, 0.012), 0.024)
    j = p.figure(hip=(0.0, 0.33), torso=90, front=True,
                 arms=[('to', (-0.21, 0.74), 1), ('to', (0.21, 0.74), -1)],
                 legs=[('to', (-0.11, 0.0), -1), ('to', (0.11, 0.0), 1)])
    p.dumbbell(j['hands'][0], 0)
    p.dumbbell(j['hands'][1], 0)


@pose('hammer-curl')
def hammer_curl(p):
    j = stand(p, [('a', -93, -90), ('a', -82, 50)])
    p.dumbbell(j['hands'][1], 50)
    p.dumbbell(j['hands'][0], 0)
    p.floor(-0.2, 0.3)


@pose('dumbbell-triceps-extension')
def dumbbell_triceps_extension(p):
    # Elbows pointing up beside the head, the dumbbell lowered behind it.
    j = stand(p, [('a', 98, 232)])
    p.dumbbell(j['hands'][0], -70)
    p.floor(-0.3, 0.2)


@pose('dumbbell-kickback')
def dumbbell_kickback(p):
    # One hand and one knee on the bench, the other arm straightened out behind.
    p.bench(-0.3, 0.52, 0.2)
    j = p.figure(hip=(-0.04, 0.47), torso=6, head=16,
                 arms=[('to', (0.27, 0.22), -1), ('a', 176, 176)],
                 legs=[('to', (-0.2, 0.0), 1), ('a', -76, 180)], feet=[0, None],
                 order=['arm0', 'leg0', 'torso', 'head', 'leg1', 'arm1'])
    p.dumbbell(j['hands'][1], 90)
    p.floor(-0.45, 0.6)


def lunge(p, arms, front_foot=0.27, back_foot=-0.36, hip=(-0.04, 0.33), **more):
    return p.figure(hip=hip, torso=88, arms=arms,
                    legs=[('to', (back_foot, 0.03), 1), ('to', (front_foot, 0.0), 1)], feet=[-55, 0], **more)


@pose('dumbbell-walking-lunge')
def dumbbell_walking_lunge(p):
    j = lunge(p, [('a', -96, -92), ('a', -86, -90)])
    for hand in j['hands']:
        p.dumbbell(hand, 0)
    p.floor(-0.5, 0.45)


@pose('dumbbell-split-squat')
def dumbbell_split_squat(p):
    j = lunge(p, [('a', -90, -90)], front_foot=0.2, back_foot=-0.28, hip=(-0.04, 0.38))
    p.dumbbell(j['hands'][0], 0)
    p.floor(-0.42, 0.4)


@pose('dumbbell-step-up')
def dumbbell_step_up(p):
    p.box(0.08, 0.0, 0.42, 0.24)
    j = p.figure(hip=(0.0, 0.52), torso=84, arms=[('a', -90, -90)],
                 legs=[('to', (-0.08, 0.0), 1), ('to', (0.18, 0.29), 1)], feet=[0, 0])
    p.dumbbell(j['hands'][0], 0)
    p.floor(-0.25, 0.5)


@pose('dumbbell-hip-thrust')
def dumbbell_hip_thrust(p):
    p.box(-0.6, 0.0, -0.3, 0.2)
    j = p.figure(hip=(0.03, 0.27), torso=178, head=28, arms=[('to', (0.05, 0.36), 1)],
                 legs=[('a', 0, -90)], feet=[0])
    p.dumbbell((0.05, 0.38), 0)
    p.floor(-0.66, 0.5)


def plank(p, arms, legs=(('a', 203, 203),), **more):
    """A straight-arm plank facing right; the supporting hand is at (0.3, 0.05)."""
    return p.figure(hip=(0.024, 0.258), torso=23, arms=arms, legs=list(legs), **more)


@pose('renegade-row')
def renegade_row(p):
    # A plank on two dumbbells, one of them rowed up to the ribs.
    j = plank(p, [('a', -90, -90), ('a', 148, -84)], head=-8)
    p.dumbbell((j['hands'][0][0], 0.03), 0)
    p.dumbbell(j['hands'][1], 0)
    p.floor(-0.5, 0.45)


@pose('farmers-carry')
def farmers_carry(p):
    # Walking, a heavy dumbbell hanging from each hand.
    j = p.figure(hip=(0.0, 0.48), torso=90, arms=[('a', -98, -94), ('a', -82, -88)],
                 legs=[('to', (-0.17, 0.02), 1), ('to', (0.16, 0.0), 1)], feet=[-30, 0])
    for hand in j['hands']:
        p.dumbbell(hand, 0)
    p.floor(-0.3, 0.32)


@pose('suitcase-carry')
def suitcase_carry(p):
    # From the front: one loaded hand, shoulders kept level.
    j = front(p, [('a', -112, -100), ('a', -84, -90)])
    p.dumbbell(j['hands'][1], 0)


@pose('dumbbell-woodchop')
def dumbbell_woodchop(p):
    # Both hands swing one dumbbell from a hip up over the opposite shoulder.
    j = front(p, [('to', (0.3, 1.0), -1), ('to', (0.31, 1.0), -1)], stance=0.16, hip_y=0.44)
    p.dumbbell((0.34, 1.03), 45)


# --------------------------------------------------------- kettlebell

@pose('kettlebell-deadlift')
def kettlebell_deadlift(p):
    p.figure(hip=(-0.22, 0.34), torso=36, head=14, arms=[('to', (0.03, 0.19), -1)],
             legs=[('to', (0.0, 0.0), 1)], feet=[0])
    p.kettlebell((0.03, 0.19))
    p.floor(-0.4, 0.3)


@pose('kettlebell-clean')
def kettlebell_clean(p):
    # The rack: elbow in, fist under the chin, the bell resting outside the forearm.
    j = front(p, [('a', -112, -100), ('to', (0.07, 0.76), 1)])
    p.kettlebell(j['hands'][1], -35)


@pose('kettlebell-press')
def kettlebell_press(p):
    j = front(p, [('a', 205, 222), ('a', 84, 88)])
    p.kettlebell(j['hands'][1], 20)


@pose('kettlebell-halo')
def kettlebell_halo(p):
    # The bell held upside-down by the horns and circled round the head.
    j = front(p, [('to', (-0.045, 1.06), 1), ('to', (0.045, 1.06), -1)])
    p.kettlebell((0.0, 1.07), 90)


@pose('kettlebell-windmill')
def kettlebell_windmill(p):
    # Legs straight, folded sideways: one hand to the foot, the other straight up with the bell.
    j = front(p, [('to', (-0.2, 0.06), 1), ('a', 90, 90)], stance=0.2, torso=148, hip_x=0.03, head=-30)
    p.kettlebell(j['hands'][1], 90)


@pose('kettlebell-row')
def kettlebell_row(p):
    # Staggered stance, one forearm on the front thigh, the bell rowed to the ribs.
    j = p.figure(hip=(-0.08, 0.42), torso=28, head=18,
                 arms=[('to', (0.16, 0.34), -1), ('a', 150, -88)],
                 legs=[('to', (-0.33, 0.0), 1), ('to', (0.18, 0.0), 1)], feet=[0, 0],
                 order=['leg0', 'arm1', 'torso', 'head', 'leg1', 'arm0'])
    p.kettlebell(j['hands'][1])
    p.floor(-0.45, 0.4)


@pose('turkish-get-up')
def turkish_get_up(p):
    # Sitting up on one straight arm, the bell held straight up with the other.
    j = p.figure(hip=(0.0, 0.1), torso=112, head=-14,
                 arms=[('to', (-0.27, 0.04), 1), ('a', 90, 90)],
                 legs=[('a', -2, -2), ('to', (0.3, 0.03), 1)], feet=[80, 0])
    p.kettlebell(j['hands'][1], 90)
    p.floor(-0.38, 0.58)


# ------------------------------------------------------ bands, cables

def post(p, x, top, arm=0.0):
    """A machine: an upright with a pulley arm at the top."""
    p.line((x, 0.012), (x, top), 0.034)
    if arm:
        p.line((x, top), (x + arm, top), 0.034)


@pose('band-pull-apart')
def band_pull_apart(p):
    # Arms opened wide, the band stretched from hand to hand across the chest.
    j = front(p, [('a', 192, 192), ('a', -12, -12)], order=['leg0', 'leg1', 'torso', 'head'])
    p.line(j['hands'][0], j['hands'][1], 0.018)
    p.path([j['shoulders'][0], j['elbows'][0], j['hands'][0]], 0.078)
    p.path([j['shoulders'][1], j['elbows'][1], j['hands'][1]], 0.078)


@pose('band-row')
def band_row(p):
    # Elbows drawn back, hands at the ribs, the band running forward to its anchor.
    post(p, 0.62, 0.75)
    spec = dict(hip=(-0.02, 0.47), torso=90, arms=[('a', 205, 2)], legs=[('to', (0.0, 0.0), 1)], feet=[0])
    hand = joints(**spec)['hands'][0]
    p.line(hand, (0.62, hand[1] + 0.02), 0.016)
    p.figure(**spec)
    p.floor(-0.3, 0.7)


@pose('band-chest-press')
def band_chest_press(p):
    # Staggered stance, arms pressed out in front, the band anchored behind.
    post(p, -0.55, 0.9)
    j = p.figure(hip=(0.0, 0.47), torso=84, arms=[('a', 0, 0)],
                 legs=[('to', (-0.2, 0.0), 1), ('to', (0.14, 0.0), 1)], feet=[0, 0])
    p.line(j['hands'][0], (-0.55, j['hands'][0][1] + 0.02), 0.016)
    p.floor(-0.62, 0.42)


def face_pull(p, anchor_ring):
    # From the front: elbows high and wide, hands drawn back beside the face.
    j = front(p, [('a', 176, 68), ('a', 4, 112)])
    top = (0.0, 1.28)
    for hand in j['hands']:
        p.line(hand, top, 0.016)
    if anchor_ring:
        p.ring(top, 0.035, 0.022)


@pose('band-face-pull')
def band_face_pull(p):
    face_pull(p, False)


@pose('cable-face-pull')
def cable_face_pull(p):
    face_pull(p, True)


@pose('lateral-band-walk')
def lateral_band_walk(p):
    # A quarter squat, hands on hips, stepping sideways against a band round the legs.
    front(p, [('to', (-0.08, 0.4), -1), ('to', (0.08, 0.4), 1)], stance=0.27, hip_y=0.4)
    p.line((-0.26, 0.1), (0.26, 0.1), 0.02)
    p.floor(-0.4, 0.4)


@pose('band-pallof-press')
def band_pallof_press(p):
    # Hands held still in front of the chest while the band pulls sideways.
    post(p, 0.62, 0.95)
    j = front(p, [('to', (-0.02, 0.63), -1), ('to', (0.02, 0.63), 1)], stance=0.13)
    p.line((0.03, 0.63), (0.62, 0.66), 0.016)
    p.floor(-0.3, 0.7)


@pose('cable-triceps-pushdown')
def cable_triceps_pushdown(p):
    post(p, 0.42, 1.12, -0.24)
    spec = dict(hip=(0.0, 0.49), torso=90, arms=[('a', -86, -42)], legs=[DOWN], feet=[0])
    hand = joints(**spec)['hands'][0]
    p.line((0.18, 1.12), (hand[0] + 0.02, hand[1]), 0.016)
    p.line((hand[0] - 0.05, hand[1]), (hand[0] + 0.07, hand[1]), 0.028)
    p.figure(**spec)
    p.floor(-0.22, 0.5)


@pose('cable-fly')
def cable_fly(p):
    # Between two towers, the hands swept together in front of the body.
    for x in (-0.6, 0.6):
        post(p, x, 1.05)
    j = front(p, [('to', (-0.04, 0.5), -1), ('to', (0.04, 0.5), 1)], stance=0.13)
    p.line((-0.6, 1.0), j['hands'][0], 0.016)
    p.line((0.6, 1.0), j['hands'][1], 0.016)
    p.floor(-0.68, 0.68)


@pose('cable-woodchop')
def cable_woodchop(p):
    # Both hands pull the handle from high on one side down across the body.
    post(p, 0.6, 1.12)
    j = front(p, [('to', (-0.3, 0.42), 1), ('to', (-0.28, 0.44), 1)], stance=0.16, hip_y=0.44, torso=100)
    p.line((0.6, 1.08), (-0.27, 0.45), 0.016)
    p.floor(-0.42, 0.68)


@pose('lat-pulldown')
def lat_pulldown(p):
    # Seated, a wide bar pulled down to the chest.
    p.box(-0.2, 0.2, 0.2, 0.25)
    p.line((0.0, 0.2), (0.0, 0.012), 0.03)
    j = p.figure(hip=(0.0, 0.32), torso=90, front=True,
                 arms=[('a', 236, 108), ('a', -56, 72)],
                 legs=[('to', (-0.12, 0.0), -1), ('to', (0.12, 0.0), 1)])
    y = j['hands'][0][1]
    p.line((-0.4, y), (0.4, y), 0.026)
    p.line((0.0, y), (0.0, y + 0.42), 0.016)
    p.floor(-0.3, 0.3)


@pose('seated-cable-row')
def seated_cable_row(p):
    # Sitting low, feet braced, the handle pulled in to the ribs.
    p.box(-0.14, 0.0, 0.12, 0.07)
    p.line((0.5, 0.012), (0.5, 0.34), 0.034)
    post(p, 0.68, 0.62)
    spec = dict(hip=(0.0, 0.15), torso=94, arms=[('a', 206, 0)], legs=[('to', (0.45, 0.2), 1)], feet=[80])
    hand = joints(**spec)['hands'][0]
    p.line(hand, (0.68, hand[1] + 0.02), 0.016)
    p.figure(**spec)
    p.floor(-0.3, 0.76)


# ----------------------------------------------------------- machines

def seat(p, x0=-0.14, x1=0.2, top=0.3, back=None):
    p.line((x0, top - 0.02), (x1, top - 0.02), 0.04)
    p.line(((x0 + x1) / 2, top - 0.04), ((x0 + x1) / 2, 0.012), 0.03)
    if back:
        p.line((x0 - 0.01, top), (x0 - 0.01 + back[0], top + back[1]), 0.04)


@pose('leg-press')
def leg_press(p):
    # Leaning back in the seat, feet on the plate, knees towards the chest.
    p.line((-0.36, 0.5), (-0.1, 0.12), 0.045)
    p.line((-0.1, 0.12), (0.06, 0.12), 0.045)
    p.line((0.19, 0.66), (0.43, 0.4), 0.05)
    p.line((0.31, 0.53), (0.56, 0.78), 0.024)
    p.figure(hip=(0.0, 0.22), torso=126, arms=[('a', -66, -40)], legs=[('to', (0.27, 0.49), 1)], feet=[133])
    p.floor(-0.42, 0.6)


@pose('leg-extension')
def leg_extension(p):
    # Seated, both legs straightened out against the pad at the ankles.
    seat(p, -0.16, 0.2, 0.33, back=(-0.04, 0.42))
    p.disc((0.42, 0.5), 0.045)
    p.figure(hip=(0.0, 0.41), torso=96, arms=[('a', -70, -40)], legs=[('a', 0, 2)], feet=[70])
    p.floor(-0.3, 0.6)


@pose('leg-curl')
def leg_curl(p):
    # Face down on the bench, heels curled up against the pad.
    p.bench(-0.44, 0.32, 0.27)
    p.disc((0.19, 0.6), 0.045)
    p.figure(hip=(0.06, 0.35), torso=180, head=-18, arms=[('a', -108, -60)], legs=[('a', 0, 100)], feet=[190])
    p.floor(-0.56, 0.44)


@pose('chest-press-machine')
def chest_press_machine(p):
    # Seated against the pad, the handles pushed straight forward.
    seat(p, -0.16, 0.14, 0.3, back=(0.0, 0.5))
    j = p.figure(hip=(0.0, 0.38), torso=90, arms=[('a', 0, 0)], legs=[('a', -4, -90)], feet=[0])
    hand = j['hands'][0]
    p.line((hand[0] + 0.01, hand[1] - 0.1), (hand[0] + 0.01, hand[1] + 0.1), 0.03)
    p.line((hand[0] + 0.01, hand[1] + 0.1), (0.1, 1.08), 0.024)
    p.floor(-0.3, 0.5)


@pose('assisted-pull-up')
def assisted_pull_up(p):
    # Chin over the handles, knees on the pad that carries part of the weight.
    p.line((-0.34, 1.0), (0.34, 1.0), 0.03)
    p.line((-0.2, 0.34), (0.2, 0.34), 0.05)
    p.line((0.0, 0.32), (0.0, 0.0), 0.03)
    p.line((-0.2, 0.0), (0.2, 0.0), 0.03)
    p.figure(hip=(0.0, 0.6), torso=90, front=True,
             arms=[('to', (-0.22, 1.0), 1), ('to', (0.22, 1.0), -1)],
             legs=[('a', -94, -92), ('a', -86, -88)], order=['leg0', 'leg1', 'torso', 'arm0', 'arm1', 'head'])


@pose('back-extension')
def back_extension(p):
    # On the 45 degree bench: heels hooked, hips on the pad, body in one straight line.
    p.line((-0.1, 0.17), (0.07, 0.31), 0.05)
    p.line((0.0, 0.22), (0.06, 0.012), 0.03)
    p.line((-0.38, 0.012), (-0.38, 0.14), 0.03)
    p.disc((-0.4, 0.15), 0.04)
    p.figure(hip=(0.02, 0.37), torso=40, arms=[('a', -105, 95)], legs=[('a', 220, 220)], feet=[130])
    p.floor(-0.5, 0.3)


@pose('seated-calf-raise')
def seated_calf_raise(p):
    # Seated with a pad on the knees, heels lifted off a low block.
    seat(p, -0.16, 0.1, 0.3)
    p.box(0.2, 0.0, 0.42, 0.04)
    p.line((0.14, 0.44), (0.34, 0.44), 0.05)
    p.path([(0.34, 0.44), (0.52, 0.44), (0.52, 0.012)], 0.026)
    p.figure(hip=(0.0, 0.38), torso=90, arms=[('to', (0.2, 0.5), -1)], legs=[('a', -3, -90)], feet=[-28])
    p.floor(-0.3, 0.6)


# ------------------------------------------------- bodyweight, redrawn

@pose('l-sit')
def l_sit(p):
    # Held up on straight arms, legs straight out in front.
    for x in (-0.07, 0.07):
        p.line((x, 0.1), (x, 0.012), 0.022)
    p.line((-0.1, 0.11), (0.1, 0.11), 0.03)
    p.figure(hip=(0.03, 0.19), torso=96, arms=[('to', (0.0, 0.15), -1)], legs=[('a', 2, 2)], feet=[75])
    p.floor(-0.22, 0.58)


@pose('toes-to-bar')
def toes_to_bar(p):
    # Hanging from the bar, folded in half so the feet come up to it.
    p.line((-0.36, 1.0), (0.4, 1.0), 0.03)
    p.figure(hip=(0.1, 0.49), torso=139, head=-30,
             arms=[('to', (-0.13, 1.0), -1)], legs=[('to', (0.2, 0.97), -1)], feet=[150],
             order=['torso', 'head', 'leg0', 'arm0'])


@pose('diamond-push-up')
def diamond_push_up(p):
    # Seen head-on: the hands together under the chest, elbows out — the arms make the diamond.
    p.figure(hip=(0.0, 0.15), torso=90, torso_len=0.12, front=True,
             arms=[('to', (-0.02, 0.035), -1), ('to', (0.02, 0.035), 1)], legs=[])
    for x in (-0.3, 0.3):    # the feet, far behind
        p.line((x, 0.03), (x, 0.09), 0.05)
    p.floor(-0.42, 0.42)


@pose('archer-push-up')
def archer_push_up(p):
    # Seen head-on: the weight over one bent arm, the other arm straight out to the side.
    p.figure(hip=(-0.1, 0.13), torso=84, torso_len=0.12, front=True,
             arms=[('to', (-0.25, 0.035), -1), ('to', (0.36, 0.035), 1)], legs=[])
    p.floor(-0.42, 0.46)


@pose('single-leg-calf-raise')
def single_leg_calf_raise(p):
    # Up on the toes of one foot at the edge of a step, a hand on the wall.
    p.line((0.36, -0.1), (0.36, 1.0), 0.03)
    p.box(-0.1, -0.1, 0.36, -0.04)
    p.figure(hip=(0.0, 0.53), torso=90, arms=[('to', (0.34, 0.74), -1)],
             legs=[('a', -98, 196), ('a', -90, -90)], feet=[None, -38])


@pose('cross-body-mountain-climbers')
def cross_body_mountain_climbers(p):
    # A plank with one knee driven across towards the opposite elbow.
    plank(p, [('a', -90, -90)], legs=[('a', 203, 203), ('a', -28, 200)], head=-8,
          order=['leg0', 'torso', 'head', 'leg1', 'arm0'])
    p.floor(-0.5, 0.45)


@pose('crab-walk')
def crab_walk(p):
    # Belly up on hands and feet, hips lifted.
    p.figure(hip=(0.1, 0.3), torso=174, head=34, arms=[('to', (-0.27, 0.03), -1)],
             legs=[('to', (0.39, 0.0), 1)], feet=[0])
    p.floor(-0.45, 0.55)


@pose('glute-bridge')
def glute_bridge(p):
    # Shoulders on the floor, feet flat, hips pushed up.
    p.figure(hip=(0.02, 0.33), torso=222, head=-42, arms=[('a', -2, -2)],
             legs=[('to', (0.27, 0.0), 1)], feet=[0], order=['arm0', 'torso', 'head', 'leg0'])
    p.floor(-0.45, 0.42)


@pose('tuck-jump')
def tuck_jump(p):
    # In the air, knees pulled up to the chest.
    p.figure(hip=(0.0, 0.5), torso=84, arms=[('a', -30, -20)], legs=[('a', 28, -96)], feet=[-30])
    p.floor(-0.3, 0.4)


@pose('shuttle-run')
def shuttle_run(p):
    # The turn: down low, one hand to the line.
    p.poly([(0.36, 0.0), (0.46, 0.0), (0.41, 0.13)])
    p.figure(hip=(-0.1, 0.31), torso=22, head=10, arms=[('a', 168, 140), ('to', (0.31, 0.05), -1)],
             legs=[('to', (-0.42, 0.03), 1), ('to', (0.1, 0.0), 1)], feet=[-55, 0])
    p.floor(-0.55, 0.52)


@pose('skaters')
def skaters(p):
    # A sideways bound: landing on one leg, the other swinging behind, arms across.
    p.figure(hip=(0.0, 0.37), torso=106, front=True,
             arms=[('a', 150, 100), ('to', (-0.2, 0.22), 1)],
             legs=[('to', (-0.1, 0.0), -1), ('to', (-0.4, 0.14), 1)],
             order=['leg1', 'leg0', 'torso', 'head', 'arm0', 'arm1'])
    p.floor(-0.5, 0.25)


@pose('dance-cardio')
def dance_cardio(p):
    # Mid-step: one knee up, one arm high.
    p.figure(hip=(0.0, 0.49), torso=94, front=True, head=-8,
             arms=[('a', 128, 82), ('a', -18, 48)],
             legs=[('a', -93, -90), ('a', -28, -104)])
    p.floor(-0.3, 0.36)


@pose('sled-push')
def sled_push(p):
    # Leaning in at 45 degrees, straight arms on the uprights, legs driving.
    p.line((0.55, 0.05), (0.55, 0.66), 0.034)
    p.line((0.46, 0.035), (0.9, 0.035), 0.05)
    p.box(0.64, 0.07, 0.82, 0.2)
    p.figure(hip=(-0.05, 0.4), torso=38, head=6, arms=[('to', (0.54, 0.56), 1)],
             legs=[('to', (-0.44, 0.02), 1), ('a', -42, -112)], feet=[-50, -20])
    p.floor(-0.55, 0.95)


@pose('warrior-iii')
def warrior_iii(p):
    # A "T": one leg down, the other leg, the body and the arms in one line.
    p.figure(hip=(0.0, 0.49), torso=4, head=26, arms=[('a', -3, -3)], legs=[('a', 184, 184), ('a', -90, -90)],
             feet=[-100, 0], order=['leg0', 'torso', 'head', 'leg1', 'arm0'])
    p.floor(-0.3, 0.45)


# ---------------------------------------------------- mobility, yoga

@pose('supine-twist')
def supine_twist(p):
    # Seen from above, lying on the back: arms out in a T, both knees dropped to one side.
    p.figure(hip=(0.12, 0.0), torso=180, front=True,
             arms=[('a', 90, 90), ('a', -90, -90)],
             legs=[('a', -58, 205), ('a', -50, 205)], order=['arm0', 'arm1', 'torso', 'head', 'leg1', 'leg0'])


@pose('frog-stretch')
def frog_stretch(p):
    # Seen from above, on forearms and knees: the knees spread wide, shins pointing back.
    p.figure(hip=(0.0, 0.0), torso=90, front=True,
             arms=[('a', 150, 92), ('a', 30, 88)],
             legs=[('a', 184, -90), ('a', -4, -90)])


@pose('neck-stretch')
def neck_stretch(p):
    # Ear towards the shoulder, the hand on that side resting on the head.
    front(p, [('a', -100, -92), ('to', (-0.02, 1.0), -1)], head=-24,
          order=['leg0', 'leg1', 'torso', 'arm0', 'arm1', 'head'])


@pose('wrist-stretch')
def wrist_stretch(p):
    # One arm straight out, the other hand drawing its fingers back.
    j = stand(p, [('a', 0, 0), ('to', (0.3, 0.73), -1)])
    hand = j['hands'][0]
    p.line(hand, polar(hand, -80, 0.07), 0.06)
    p.floor(-0.2, 0.4)


def main(argv):
    out = os.path.join(ROOT, 'img', 'exercises')
    if '--out' in argv:
        i = argv.index('--out')
        out = argv[i + 1]
        argv = argv[:i] + argv[i + 2:]
    names = argv or sorted(POSES)
    os.makedirs(out, exist_ok=True)
    for name in names:
        name = name.replace('exercise-', '')
        if name not in POSES:
            print(name, 'has no pose here')
            continue
        picture = Picture()
        POSES[name](picture)
        picture.render().save(os.path.join(out, f'exercise-{name}.png'), optimize=True)
        print(name, 'ok')


if __name__ == '__main__':
    main(sys.argv[1:])
