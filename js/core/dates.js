// Calendar helpers — the small part of Foundation's Calendar the app relies on.
// Everything works in the device's local time zone, like Calendar.current.

const DAY_MS = 86_400_000;

/// Accepts a Date or an ISO string (how dates are stored).
export function toDate(value) {
  return value instanceof Date ? value : new Date(value);
}

/// ISO 8601 without fractional seconds — the exact shape Swift's
/// `.iso8601` date strategy reads and writes ("2026-11-15T08:30:00Z").
export function toISO(date) {
  return toDate(date).toISOString().replace(/\.\d{3}Z$/, 'Z');
}

export function startOfDay(value) {
  const d = new Date(toDate(value));
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(value, days) {
  const d = new Date(toDate(value));
  d.setDate(d.getDate() + days);
  return d;
}

export function isSameDay(a, b) {
  const x = toDate(a), y = toDate(b);
  return x.getFullYear() === y.getFullYear()
    && x.getMonth() === y.getMonth()
    && x.getDate() === y.getDate();
}

/// "2026-11-15" in local time — a stable key for one calendar day.
export function dayKey(value) {
  const d = toDate(value);
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/// Whole calendar days from `from` to `to` (negative if `to` is earlier).
/// Counted on the calendar, so a 23- or 25-hour DST day is still one day.
export function daysBetween(from, to) {
  const a = toDate(from), b = toDate(to);
  const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((ub - ua) / DAY_MS);
}

function addMonthsClamped(date, months) {
  const y = date.getFullYear(), m = date.getMonth() + months;
  const lastDay = new Date(y, m + 1, 0).getDate();
  return new Date(y, m, Math.min(date.getDate(), lastDay));
}

/// Whole months from `from` to `to`, as Calendar.dateComponents([.month]) counts
/// them: 15 Jan -> 14 Feb is 0, 15 Jan -> 15 Feb is 1.
export function monthsBetween(from, to) {
  const a = startOfDay(from), b = startOfDay(to);
  if (b < a) return 0;
  let months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  if (addMonthsClamped(a, months) > b) months -= 1;
  return Math.max(0, months);
}

/// Monday of the week containing `value`. The plan model counts 1 = Monday,
/// so the week strip does too, whatever the device locale says.
export function startOfWeek(value) {
  const d = startOfDay(value);
  return addDays(d, -isoWeekday(d) + 1);
}

/// 1 = Monday … 7 = Sunday.
export function isoWeekday(value) {
  const js = toDate(value).getDay(); // 0 = Sunday
  return js === 0 ? 7 : js;
}

// MARK: - Formatting (UI language is English, like the iOS app)

const fmt = options => new Intl.DateTimeFormat('en-GB', options);
const WEEKDAY_LONG = fmt({ weekday: 'long' });
const WEEKDAY_SHORT = fmt({ weekday: 'short' });
const WEEKDAY_NARROW = fmt({ weekday: 'narrow' });
const MONTH_LONG = fmt({ month: 'long' });
const MONTH_SHORT = fmt({ month: 'short' });

export const format = {
  /// "Sunday, 15 November"
  longDay: v => { const d = toDate(v); return `${WEEKDAY_LONG.format(d)}, ${d.getDate()} ${MONTH_LONG.format(d)}`; },
  /// "15 Nov 2026"
  mediumDate: v => { const d = toDate(v); return `${d.getDate()} ${MONTH_SHORT.format(d)} ${d.getFullYear()}`; },
  /// "15 Nov 2026, 08:30"
  mediumDateTime: v => {
    const d = toDate(v);
    const p = n => String(n).padStart(2, '0');
    return `${format.mediumDate(d)}, ${p(d.getHours())}:${p(d.getMinutes())}`;
  },
  weekdayShort: v => WEEKDAY_SHORT.format(toDate(v)),
  weekdayNarrow: v => WEEKDAY_NARROW.format(toDate(v)),
  monthShort: v => MONTH_SHORT.format(toDate(v)),
  /// 125 -> "2:05"
  clock: seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`,
};
