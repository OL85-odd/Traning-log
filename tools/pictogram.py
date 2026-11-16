"""A small pictogram renderer: a figure made of capsules, posed by numbers.

Used by tools/draw-icons.py for the exercise icons that are drawn from a
description in code rather than by the image model. The look follows the
generated ones: a separate round head, a thick torso, limbs with rounded
ends, equipment thinner than the limbs.

Units: one figure is about 1.0 tall. x to the right, y up. Angles are in
degrees, 0 = pointing right, 90 = up, -90 = down.

Everything is collected first and drawn afterwards, scaled to fit the
square — so a pose never has to care where on the canvas it ends up. Each
shape is drawn with a thin gap around it, which is what keeps an arm in
front of the body visible in a one-colour picture.
"""
import math

from PIL import Image, ImageDraw

# Proportions of the figure.
HEAD = 0.088      # radius
NECK = 0.04       # gap between shoulder line and head
TORSO = 0.30      # hip to shoulder
UPPER, FORE = 0.165, 0.16
THIGH, SHIN = 0.245, 0.245
FOOT = 0.075
W_TORSO, W_ARM, W_LEG = 0.15, 0.078, 0.094
W_THIN = 0.026    # equipment
GAP = 0.016       # the dark line around a shape lying on another


def polar(origin, angle, length):
    a = math.radians(angle)
    return (origin[0] + math.cos(a) * length, origin[1] + math.sin(a) * length)


def angle_of(a, b):
    return math.degrees(math.atan2(b[1] - a[1], b[0] - a[0]))


def dist(a, b):
    return math.hypot(b[0] - a[0], b[1] - a[1])


def reach(origin, target, first, second, bend=1):
    """Two-link limb from origin to target; returns (joint, end).
    bend +1 puts the joint to the left of the line origin->target, -1 to the right.
    A target out of reach gives a straight limb pointing at it."""
    d = dist(origin, target)
    direction = angle_of(origin, target)
    if d >= first + second - 1e-6:
        return polar(origin, direction, first), polar(origin, direction, first + second)
    d = max(d, abs(first - second) + 1e-6)
    inner = math.degrees(math.acos((first ** 2 + d ** 2 - second ** 2) / (2 * first * d)))
    return polar(origin, direction + bend * inner, first), target


class Picture:
    def __init__(self):
        self.shapes = []   # (kind, points, width)

    # --- primitives

    def line(self, a, b, width=W_THIN):
        self.shapes.append(('line', [a, b], width))

    def path(self, points, width=W_THIN):
        self.shapes.append(('line', list(points), width))

    def disc(self, centre, radius):
        self.shapes.append(('disc', [centre], radius))

    def ring(self, centre, radius, width=W_THIN):
        self.shapes.append(('ring', [centre], (radius, width)))

    def box(self, x0, y0, x1, y1):
        self.shapes.append(('box', [(x0, y0), (x1, y1)], 0))

    def floor(self, x0, x1, y=0.0, width=0.02):
        self.line((x0, y - width / 2 - 0.004), (x1, y - width / 2 - 0.004), width)

    # --- equipment

    def barbell(self, centre, half=0.37, plate=0.085):
        """A bar with a round plate at each end. (Drawn across the picture also
        when the figure is seen from the side: that is how a barbell is recognised.)"""
        a, b = (centre[0] - half, centre[1]), (centre[0] + half, centre[1])
        self.line(a, b, 0.024)
        self.disc(a, plate)
        self.disc(b, plate)

    def poly(self, points, round=0.012):
        self.shapes.append(('poly', list(points), round))

    def dumbbell(self, at, angle=0, half=0.062):
        a, b = polar(at, angle, half), polar(at, angle + 180, half)
        self.line(a, b, 0.022)
        for end in (a, b):
            self.line(polar(end, angle + 90, 0.03), polar(end, angle + 90, -0.03), 0.042)

    def kettlebell(self, at, angle=-90):
        """Hangs from the hand at `at` in the direction `angle`."""
        self.ring(polar(at, angle, 0.012), 0.04, 0.02)
        self.disc(polar(at, angle, 0.105), 0.07)

    def bench(self, x0, x1, top, floor=0.0, thick=0.04):
        self.line((x0, top - thick / 2), (x1, top - thick / 2), thick)
        inset = min(0.06, (x1 - x0) / 5)
        for x in (x0 + inset, x1 - inset):
            self.line((x, top - thick), (x, floor + 0.012), 0.024)

    # --- the figure

    def figure(self, hip, torso=90, arms=(), legs=(), head=None, front=False, order=None, feet=None,
               torso_len=TORSO, lean_head=0):
        """Draws a figure and returns its joints.

        hip:    where the hips are.
        torso:  angle from hip to shoulders (90 = upright).
        arms:   up to two, far one first. Each is ('a', upper, fore) with two
                angles, or ('to', (x, y), bend) to reach a point.
        legs:   same, with thigh and shin.
        feet:   one angle per leg for a small foot (None = no foot).
        front:  seen from the front — shoulders and hips get a width, and the
                first arm/leg is the left one in the picture.
        head:   an angle to tilt the head away from the line of the torso.
        """
        shoulder = polar(hip, torso, torso_len)
        across = torso - 90  # to the right when upright
        if front:
            shoulders = [polar(shoulder, across + 180, 0.09), polar(shoulder, across, 0.09)]
            hips = [polar(hip, across + 180, 0.052), polar(hip, across, 0.052)]
        else:
            shoulders, hips = [shoulder, shoulder], [hip, hip]
        head_at = polar(shoulder, torso + (head or 0) + lean_head, NECK + HEAD + (0.02 if front else 0))

        def limb(spec, origin, first, second):
            if spec[0] == 'a':
                joint = polar(origin, spec[1], first)
                return joint, polar(joint, spec[2], second)
            return reach(origin, spec[1], first, second, spec[2] if len(spec) > 2 else 1)

        arm_pts = [(shoulders[i % 2],) + limb(spec, shoulders[i % 2], UPPER, FORE) for i, spec in enumerate(arms)]
        leg_pts = [(hips[i % 2],) + limb(spec, hips[i % 2], THIGH, SHIN) for i, spec in enumerate(legs)]

        def draw_arm(i):
            if i < len(arm_pts):
                self.path(arm_pts[i], W_ARM)

        def draw_leg(i):
            if i < len(leg_pts):
                self.path(leg_pts[i], W_LEG)
                if feet and i < len(feet) and feet[i] is not None:
                    ankle = leg_pts[i][2]
                    self.line(ankle, polar(ankle, feet[i], FOOT), W_LEG * 0.82)

        def draw_torso():
            if front:
                self.shapes.append(('poly', [shoulders[0], shoulders[1], hips[1], hips[0]], 0.075))
            else:
                self.line(polar(hip, torso, 0.01), polar(shoulder, torso, -0.02), W_TORSO)

        parts = {
            'arm0': lambda: draw_arm(0), 'arm1': lambda: draw_arm(1),
            'leg0': lambda: draw_leg(0), 'leg1': lambda: draw_leg(1),
            'torso': draw_torso, 'head': lambda: self.disc(head_at, HEAD),
        }
        default = ['leg0', 'leg1', 'torso', 'head', 'arm0', 'arm1'] if front else ['arm0', 'leg0', 'torso', 'head', 'leg1', 'arm1']
        for name in (order or default):
            parts[name]()

        return {
            'hip': hip, 'shoulder': shoulder, 'head': head_at,
            'hands': [p[2] for p in arm_pts], 'elbows': [p[1] for p in arm_pts],
            'feet': [p[2] for p in leg_pts], 'knees': [p[1] for p in leg_pts],
            'shoulders': shoulders, 'hips': hips,
        }

    # --- drawing

    def bounds(self):
        xs, ys = [], []
        for kind, pts, extra in self.shapes:
            pad = extra if kind == 'disc' else extra[0] + extra[1] / 2 if kind == 'ring' else extra / 2 if kind in ('line', 'poly') else 0
            for x, y in pts:
                xs += [x - pad, x + pad]
                ys += [y - pad, y + pad]
        return min(xs), min(ys), max(xs), max(ys)

    def render(self, size=256, fill=0.86, oversample=4):
        """The picture as a white RGBA image whose alpha channel is the drawing."""
        S = size * oversample
        x0, y0, x1, y1 = self.bounds()
        scale = S * fill / max(x1 - x0, y1 - y0)
        ox = (S - (x1 - x0) * scale) / 2 - x0 * scale
        oy = (S - (y1 - y0) * scale) / 2 - y0 * scale

        def px(p):
            return (p[0] * scale + ox, S - (p[1] * scale + oy))

        image = Image.new('L', (S, S), 0)
        draw = ImageDraw.Draw(image)

        def stroke(points, width, colour):
            w = max(1, int(round(width * scale)))
            pts = [px(p) for p in points]
            if len(pts) > 1:
                draw.line(pts, fill=colour, width=w, joint='curve')
            for x, y in pts:
                draw.ellipse((x - w / 2, y - w / 2, x + w / 2, y + w / 2), fill=colour)

        def paint(kind, pts, extra, grow, colour):
            if kind == 'line':
                stroke(pts, extra + grow * 2, colour)
            elif kind == 'poly':
                draw.polygon([px(p) for p in pts], fill=colour)
                stroke(pts + [pts[0]], extra + grow * 2, colour)
            elif kind == 'disc':
                (x, y), r = px(pts[0]), (extra + grow) * scale
                draw.ellipse((x - r, y - r, x + r, y + r), fill=colour)
            elif kind == 'ring':
                (x, y), r = px(pts[0]), extra[0] * scale
                w = max(1, int(round((extra[1] + grow * 2) * scale)))
                draw.ellipse((x - r - w / 2, y - r - w / 2, x + r + w / 2, y + r + w / 2), outline=colour, width=w)
            elif kind == 'box':
                (ax, ay), (bx, by) = px(pts[0]), px(pts[1])
                g = grow * scale
                draw.rounded_rectangle((min(ax, bx) - g, min(ay, by) - g, max(ax, bx) + g, max(ay, by) + g),
                                       radius=0.012 * scale + g, fill=colour)

        for kind, pts, extra in self.shapes:
            paint(kind, pts, extra, GAP, 0)      # the gap around it
            paint(kind, pts, extra, 0, 255)      # the shape itself

        alpha = image.resize((size, size), Image.LANCZOS)
        out = Image.new('RGBA', (size, size), (255, 255, 255, 0))
        out.putalpha(alpha)
        return out
