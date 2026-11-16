// Which plan templates suit a new user.
// Swift: (not ported yet)
//
// The first-run guide asks three things — what you want to train, what you
// have to train with, and how many days a week — and this ranks the built-in
// plans against the answers.

/// What having each kind of kit lets you do. A gym has everything.
const UNLOCKS = {
  // What nearly everyone has: a floor, a wall — and, for cardio, a bicycle.
  none: ['none', 'mat', 'wall', 'bike'],
  dumbbells: ['dumbbells', 'bench'],
  bar: ['bar', 'dipBars'],
  kettlebell: ['kettlebell'],
  gym: ['dumbbells', 'bench', 'bar', 'dipBars', 'kettlebell', 'barbell', 'cable', 'machine', 'box', 'rope'],
};

/// When nothing matches the wish exactly: strength without weights is
/// calisthenics, and the other way round; intervals and cardio are kin.
const RELATED = { strength: 'calisthenics', calisthenics: 'strength', hiit: 'cardio', cardio: 'hiit' };

export const trainingDays = plan => plan.days.filter(d => d.dayType !== 'rest');

/// For a program the days are spread over its weeks; a weekly cycle has them all in one.
export function daysPerWeek(plan) {
  const count = trainingDays(plan).length;
  if (plan.planMode !== 'finiteProgram') return count;
  const weeks = Math.max(1, Math.ceil(plan.days.length / 7));
  return Math.round(count / weeks);
}

/// `answers`: { focus, equipment: [ids of UNLOCKS], days }. Returns the plans
/// that can be done with that equipment, best match first.
export function recommendPlans(answers, plans) {
  const available = new Set(['none', ...(answers.equipment ?? [])].flatMap(id => UNLOCKS[id] ?? []));
  return plans
    .filter(plan => !plan.isCustom && available.has(plan.equipment ?? 'none'))
    .map(plan => {
      let score = 0;
      if (plan.focus === answers.focus) score += 6;
      else if (RELATED[answers.focus] === plan.focus) score += 4; // the next best thing
      else if (answers.focus === 'mix') score += 2;      // anything goes; a mixed plan goes best
      else if (plan.focus === 'mix') score += 3;
      score -= Math.abs(daysPerWeek(plan) - (answers.days ?? 3)) * 1.5;
      score -= ((plan.level ?? 1) - 1) * 2;               // a first plan should be a gentle one
      // Kit you said you have is kit you want to use.
      if ((plan.equipment ?? 'none') !== 'none' && (answers.equipment ?? []).length) score += 1;
      return { plan, score };
    })
    .sort((a, b) => b.score - a.score)
    .map(entry => entry.plan);
}
