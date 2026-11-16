// Every built-in exercise. Data only — builtin.js turns it into the library.
// Swift: OddForm/Models/BuiltInContent.swift (the first 33; the rest are web-only so far)
//
// `id` is fixed for good: plans and session logs point at it, on every device
// and in every backup. `icon` is the pictogram in img/exercises/. `tier` marks
// what a paid version could hold back ('pro'); the web app shows everything.

export const EXERCISE_DATA = [
  {
    "id": "4F1E3A0E-B38C-5DA8-BA5A-068F76754CCF",
    "name": "Squat",
    "category": "calisthenics",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand with feet shoulder-width apart, toes slightly turned out.",
      "Brace your core and keep your chest tall throughout the movement.",
      "Push your knees out in line with your toes as you descend.",
      "Lower until your thighs are parallel to the floor (or as deep as comfortable).",
      "Drive through your heels to stand back up, squeezing your glutes at the top."
    ],
    "tips": [
      "Keep your weight in your heels — your toes should be liftable at the bottom.",
      "Avoid letting your knees cave inward.",
      "Don't round your lower back — maintain a neutral spine.",
      "Look straight ahead, not down at the floor."
    ],
    "icon": "exercise-squat"
  },
  {
    "id": "C9E0B1A9-B56A-5641-B560-24DAF93EDD55",
    "name": "Deadlift",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 2,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand with feet hip-width apart, bar (or dumbbell) over mid-foot.",
      "Hinge at the hips and bend the knees to grip the bar just outside your shins.",
      "Take a deep breath, brace your core, and pull your shoulder blades down and back.",
      "Drive through the floor, keeping the bar close to your body as you stand up.",
      "Lock out hips and knees at the top — don't hyperextend your lower back.",
      "Hinge back down under control, pushing hips back first."
    ],
    "tips": [
      "The bar should stay in contact with your legs the whole way up.",
      "Never round your lower back — this is the most common injury cause.",
      "Think 'push the floor away' rather than 'pull the bar up'.",
      "Keep your lats engaged — imagine trying to put your shoulder blades in your back pockets."
    ],
    "icon": "exercise-deadlift"
  },
  {
    "id": "C0006E63-DDC3-5CD7-9D69-413E4373D195",
    "name": "Bench Press",
    "category": "strength",
    "muscleGroups": [
      "chest",
      "shoulders",
      "arms"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 2,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Lie on a bench with feet flat on the floor, eyes under the bar.",
      "Grip the bar slightly wider than shoulder-width.",
      "Retract your shoulder blades and press them into the bench.",
      "Unrack the bar and lower it to your lower chest with control.",
      "Press the bar back up in a slight arc toward your face as you extend."
    ],
    "tips": [
      "Keep your wrists straight — don't let them bend backward.",
      "Your elbows should be at about 45–75° from your torso, not flared straight out.",
      "Maintain a slight arch in your lower back — this is normal and safe.",
      "Press your feet into the floor for stability throughout the lift."
    ],
    "icon": "exercise-bench-press"
  },
  {
    "id": "7A54F72F-2CB7-5599-8D24-73AF52CAF2D8",
    "name": "Pull-up",
    "category": "calisthenics",
    "muscleGroups": [
      "back",
      "arms"
    ],
    "equipment": "bar",
    "tracking": "reps",
    "level": 2,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Hang from a bar with hands slightly wider than shoulder-width, palms facing away.",
      "Engage your core and pull your shoulder blades down before initiating.",
      "Pull your elbows down toward your hips, driving your chest toward the bar.",
      "Aim to get your chin over the bar at the top.",
      "Lower yourself with control to a full hang before the next rep."
    ],
    "tips": [
      "Avoid kipping or swinging — use strict form for maximum benefit.",
      "Think 'elbows to hips', not 'hands to shoulders'.",
      "If you can't do full pull-ups yet, use a resistance band for assistance.",
      "Squeeze your glutes and brace your core to keep your body stable."
    ],
    "icon": "exercise-pull-up"
  },
  {
    "id": "25EF25D4-9D9E-5FBA-B9E2-98149E0B409D",
    "name": "Overhead Press",
    "category": "strength",
    "muscleGroups": [
      "shoulders",
      "arms"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 2,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand with feet shoulder-width apart, holding dumbbells at shoulder height.",
      "Brace your core and squeeze your glutes to protect your lower back.",
      "Press the weights directly overhead until your arms are fully extended.",
      "At the top, shrug your shoulders slightly to fully engage the traps.",
      "Lower the weights back to shoulder height with control."
    ],
    "tips": [
      "Don't let your lower back arch excessively — keep your ribs down.",
      "Keep the dumbbells in line with your ears at the top, not in front.",
      "Exhale as you press, inhale on the way down.",
      "If pressing standing is difficult, try seated for more back support."
    ],
    "icon": "exercise-overhead-press"
  },
  {
    "id": "4335A13E-983A-57A2-931E-39F0F5FB1720",
    "name": "Plank",
    "category": "calisthenics",
    "muscleGroups": [
      "core"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Start in a push-up position with forearms on the floor, elbows under shoulders.",
      "Form a straight line from head to heels — don't let your hips sag or rise.",
      "Squeeze your glutes and brace your abs as if bracing for a punch.",
      "Hold your gaze slightly in front of your hands, keeping your neck neutral.",
      "Breathe steadily throughout the hold."
    ],
    "tips": [
      "Quality over time — a 20-second perfect plank beats a 60-second sagging one.",
      "Don't hold your breath — breathe steadily throughout.",
      "Push the floor away with your forearms to engage your serratus.",
      "If your hips sag, drop to your knees until you build more core strength."
    ],
    "icon": "exercise-plank"
  },
  {
    "id": "15620997-D5DA-50CC-9D3E-8F3CC8EE600E",
    "name": "Push-up",
    "category": "calisthenics",
    "muscleGroups": [
      "chest",
      "arms"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Start in a high plank position, hands slightly wider than shoulder-width.",
      "Keep your body in a straight line from head to heels.",
      "Lower your chest to just above the floor by bending your elbows.",
      "Keep your elbows at roughly 45° from your torso — not flared wide.",
      "Push back up to the starting position, fully extending your arms."
    ],
    "tips": [
      "Don't let your hips sag or pike up — maintain a plank throughout.",
      "Keep your core engaged the entire time.",
      "For easier push-ups, perform them with hands elevated on a surface.",
      "Slow down the lowering phase to build more strength."
    ],
    "icon": "exercise-push-up"
  },
  {
    "id": "204E2C41-35A7-5042-8E51-F5B6FEF07BFD",
    "name": "Lunge",
    "category": "calisthenics",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand tall with feet hip-width apart.",
      "Step forward with one foot, landing with your heel first.",
      "Lower your back knee toward the floor, keeping your front shin vertical.",
      "Your front thigh should be roughly parallel to the floor at the bottom.",
      "Push through your front heel to return to standing, then alternate legs."
    ],
    "tips": [
      "Don't let your front knee travel past your toes.",
      "Keep your torso upright — don't lean forward.",
      "Look straight ahead to help maintain balance.",
      "If balance is an issue, hold on to a wall until you build stability."
    ],
    "icon": "exercise-lunge"
  },
  {
    "id": "6A670B3D-F030-58CD-B5B4-C6490CEB4B8A",
    "name": "Glute Bridge",
    "category": "calisthenics",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Lie on your back with knees bent, feet flat on the floor hip-width apart.",
      "Place your arms by your sides with palms down.",
      "Squeeze your glutes and push through your heels to lift your hips.",
      "Raise until your body forms a straight line from shoulders to knees.",
      "Hold at the top for 1–2 seconds, then lower with control."
    ],
    "tips": [
      "Avoid pushing through your toes — drive through your heels.",
      "Keep your core braced to protect your lower back.",
      "For more challenge, try single-leg or add a resistance band above the knees.",
      "Don't let your knees cave inward — push them slightly outward."
    ],
    "icon": "exercise-glute-bridge"
  },
  {
    "id": "5C2CED84-FA13-59A2-B201-BB1B8D7D8277",
    "name": "Dumbbell Rows",
    "category": "strength",
    "muscleGroups": [
      "back",
      "arms"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Place one knee and hand on a bench for support.",
      "Hold a dumbbell in the opposite hand, arm hanging straight down.",
      "Pull the dumbbell up toward your hip, keeping your elbow close to your body.",
      "At the top, squeeze your shoulder blade toward your spine.",
      "Lower the weight with control and repeat."
    ],
    "tips": [
      "Keep your back flat — don't rotate your torso.",
      "Think 'elbow to pocket' rather than 'hand to shoulder'.",
      "Don't shrug — keep your shoulders away from your ears.",
      "Control the lowering phase as much as the pull."
    ],
    "icon": "exercise-dumbbell-rows"
  },
  {
    "id": "C58E9DEC-6275-5493-821A-551429C1FAC1",
    "name": "Dumbbell Overhead Press",
    "category": "strength",
    "muscleGroups": [
      "shoulders",
      "arms"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Sit or stand holding dumbbells at shoulder height, palms facing forward.",
      "Brace your core and maintain a neutral spine.",
      "Press both dumbbells overhead in a controlled arc until arms are fully extended.",
      "Don't lock out aggressively — maintain slight elbow softness at the top.",
      "Lower back to shoulder height with control."
    ],
    "tips": [
      "Keep your ribs down — avoid arching your lower back excessively.",
      "The dumbbells should travel in line with your ears at the top.",
      "Exhale on the press, inhale on the way down.",
      "If one shoulder is weaker, start with your non-dominant side."
    ],
    "icon": "exercise-dumbbell-overhead-press"
  },
  {
    "id": "A4383789-F453-5779-9F15-BB0354D8D5F6",
    "name": "Dumbbell Floor Press",
    "category": "strength",
    "muscleGroups": [
      "chest",
      "shoulders",
      "arms"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Lie on your back on the floor, knees bent, holding dumbbells at chest height.",
      "Your upper arms should rest on the floor at about 45° from your torso.",
      "Press the dumbbells up until your arms are fully extended.",
      "Slowly lower back down until your upper arms touch the floor.",
      "Pause briefly, then press again."
    ],
    "tips": [
      "The floor limits your range of motion — this protects your shoulders.",
      "Great alternative if you don't have a bench.",
      "Keep your wrists straight and directly above your elbows.",
      "Press your lower back gently into the floor for stability."
    ],
    "icon": "exercise-dumbbell-floor-press"
  },
  {
    "id": "6BD69FE1-55BC-5B3B-8029-1A93F65E9356",
    "name": "Dumbbell Bicep Curls",
    "category": "strength",
    "muscleGroups": [
      "arms"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand with feet shoulder-width apart, holding a dumbbell in each hand.",
      "Keep your elbows pinned close to your sides throughout the movement.",
      "Curl both dumbbells up by contracting your biceps, rotating palms upward.",
      "Squeeze hard at the top before lowering.",
      "Lower with control — take 2–3 seconds on the way down."
    ],
    "tips": [
      "Don't swing your torso — this takes tension off the bicep.",
      "Keep your wrists neutral, not bent back.",
      "Slow and controlled beats heavy and sloppy.",
      "Alternate arms for more time under tension if preferred."
    ],
    "icon": "exercise-dumbbell-bicep-curls"
  },
  {
    "id": "C50A920A-8099-5DEB-BFCC-CD62FFCE58EB",
    "name": "Dumbbell Romanian Deadlift",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand with feet hip-width apart, dumbbells in front of your thighs.",
      "Push your hips back and lower the dumbbells along your shins, keeping your back flat.",
      "Stop when you feel a strong stretch in your hamstrings.",
      "Drive your hips forward to return to standing, squeezing your glutes at the top.",
      "The dumbbells should stay close to your legs throughout."
    ],
    "tips": [
      "This is a hip-hinge, not a squat — keep minimal knee bend.",
      "Look slightly ahead (not up or down) to keep your neck neutral.",
      "The stretch in your hamstrings tells you the depth is right.",
      "Don't round your lower back — hinge at the hips, not the spine."
    ],
    "icon": "exercise-dumbbell-romanian-deadlift"
  },
  {
    "id": "158F138D-E25B-5E24-94B1-5C13BA67C8B9",
    "name": "Tricep Dips",
    "category": "calisthenics",
    "muscleGroups": [
      "arms",
      "shoulders"
    ],
    "equipment": "bench",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Sit on the edge of a sturdy chair or bench, hands gripping the edge beside your hips.",
      "Slide your hips forward off the edge, keeping your back close to the chair.",
      "Lower yourself by bending your elbows until they reach about 90°.",
      "Press back up through your palms until your arms are extended.",
      "Keep your torso upright throughout."
    ],
    "tips": [
      "Don't let your elbows flare out — keep them pointing straight back.",
      "The closer your feet are, the harder the exercise.",
      "For more difficulty, elevate your feet on a second surface.",
      "If you feel shoulder discomfort, reduce your range of motion."
    ],
    "icon": "exercise-tricep-dips"
  },
  {
    "id": "9D462510-52B1-59F7-80BB-A7F541FD0838",
    "name": "Reverse Lunges",
    "category": "calisthenics",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand tall with feet together and hands on hips or at your sides.",
      "Step one foot straight back and lower your back knee toward the floor.",
      "Keep your front knee directly above your ankle — don't let it drift forward.",
      "Push through your front heel to bring your back foot forward again.",
      "Alternate legs with each rep."
    ],
    "tips": [
      "Reverse lunges are easier on the knees than forward lunges.",
      "Keep your torso upright and core braced throughout.",
      "Take a long enough step back — your front shin should stay vertical.",
      "Add dumbbells to increase the challenge."
    ],
    "icon": "exercise-reverse-lunges"
  },
  {
    "id": "64BF2D39-8C64-5C11-9545-063803A79BCA",
    "name": "Calf Raises",
    "category": "calisthenics",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand with feet hip-width apart, toes pointing forward.",
      "Rise up onto the balls of your feet as high as you can.",
      "Hold briefly at the top, squeezing your calves.",
      "Lower your heels back to the floor slowly.",
      "For single-leg variation: balance on one foot and repeat."
    ],
    "tips": [
      "Do these on the edge of a step for a greater range of motion.",
      "Slow and controlled — don't bounce at the bottom.",
      "Keep your core engaged and don't lean forward.",
      "High reps work well here — calves are built for endurance."
    ],
    "icon": "exercise-calf-raises"
  },
  {
    "id": "6B56598C-36C9-5D4F-A666-402F6952BE95",
    "name": "Side Plank",
    "category": "calisthenics",
    "muscleGroups": [
      "core"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Lie on your side with your elbow directly under your shoulder.",
      "Stack your feet or stagger them for balance.",
      "Lift your hips so your body forms a straight diagonal line.",
      "Keep your core tight and hips square — don't let them rotate.",
      "Hold for the target time, then switch sides."
    ],
    "tips": [
      "Push the floor away with your elbow to engage your shoulder.",
      "Don't let your top hip sag toward the floor.",
      "For easier version: drop your bottom knee to the floor.",
      "For harder version: raise your top leg."
    ],
    "icon": "exercise-side-plank"
  },
  {
    "id": "75C8E04A-1D3E-560E-A23A-EE2797979171",
    "name": "Burpee",
    "category": "hiit",
    "muscleGroups": [
      "fullBody"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Start standing. Drop your hands to the floor and jump or step your feet back to a plank.",
      "Perform a push-up (optional for beginners).",
      "Jump or step your feet back toward your hands.",
      "Explosively jump straight up with arms overhead.",
      "Land softly and immediately go into the next rep."
    ],
    "tips": [
      "Beginners: step instead of jump to reduce impact.",
      "Focus on consistent pace rather than speed — good form matters more.",
      "Breathe out on the jump up, breathe in as you lower down.",
      "If the full burpee is too intense, skip the push-up or the jump at the top."
    ],
    "icon": "exercise-burpee"
  },
  {
    "id": "447A026F-1EED-55BC-8963-308BBA960346",
    "name": "Jumping Jacks",
    "category": "hiit",
    "muscleGroups": [
      "fullBody"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand with feet together and arms at your sides.",
      "Jump and simultaneously spread your feet wider than hip-width.",
      "At the same time, raise your arms above your head.",
      "Jump back to starting position, bringing feet together and arms down.",
      "Maintain a steady, rhythmic pace."
    ],
    "tips": [
      "Land softly — bend your knees slightly to absorb impact.",
      "Great warm-up or active rest exercise between harder movements.",
      "Keep your core lightly engaged throughout.",
      "For low-impact: step side to side instead of jumping."
    ],
    "icon": "exercise-jumping-jacks"
  },
  {
    "id": "98A23AC3-0AF6-5B89-A642-2042F5A769F1",
    "name": "Plank Jacks",
    "category": "hiit",
    "muscleGroups": [
      "core",
      "fullBody"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Start in a high plank position with hands under shoulders.",
      "Keep your hips level and core tight throughout.",
      "Jump both feet out wide (like a horizontal jumping jack).",
      "Jump feet back together to the starting position.",
      "Repeat at a steady pace without letting your hips sag."
    ],
    "tips": [
      "Don't let your hips rise or sag — maintain a solid plank.",
      "Start slow to get the coordination right, then speed up.",
      "For lower impact: step one foot out and in at a time.",
      "Focus on breathing — exhale as you jump out."
    ],
    "icon": "exercise-plank-jacks"
  },
  {
    "id": "7891A675-004A-58ED-96CF-07151FD38241",
    "name": "Inchworms",
    "category": "hiit",
    "muscleGroups": [
      "fullBody",
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand with feet hip-width apart.",
      "Hinge forward and place your hands on the floor.",
      "Walk your hands forward until you reach a plank position.",
      "Optionally perform a push-up at the bottom.",
      "Walk your hands back toward your feet and stand up. Repeat."
    ],
    "tips": [
      "Keep your legs as straight as possible when walking out — you'll feel the hamstrings.",
      "Don't rush — slow inchworms are more effective.",
      "Great as a warm-up before any workout.",
      "If your hamstrings are very tight, a slight knee bend is fine."
    ],
    "icon": "exercise-inchworms"
  },
  {
    "id": "F829CC36-544A-5AE4-B231-19E56CB3CA49",
    "name": "Sit-up",
    "category": "calisthenics",
    "muscleGroups": [
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Lie on your back with knees bent and feet flat on the floor.",
      "Cross your arms over your chest or place hands behind your ears.",
      "Engage your core and lift your upper body toward your knees.",
      "Pause at the top, then lower back down with control.",
      "Don't use momentum — keep the movement controlled throughout."
    ],
    "tips": [
      "Don't pull on your neck if hands are behind your head.",
      "Exhale on the way up, inhale on the way down.",
      "Lower slowly — the eccentric phase builds more strength.",
      "For easier: keep hands on chest; for harder: arms extended overhead."
    ],
    "icon": "exercise-sit-up"
  },
  {
    "id": "C8706514-4574-5CBF-B78B-6B4DC8853B26",
    "name": "Bicycle Crunches",
    "category": "calisthenics",
    "muscleGroups": [
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Lie on your back with hands behind your head, elbows wide.",
      "Lift your shoulders off the floor and bring your knees to a 90° angle.",
      "Twist to bring your right elbow toward your left knee while extending the right leg.",
      "Switch sides in a cycling motion — left elbow to right knee.",
      "Keep a slow, controlled pace — don't rush."
    ],
    "tips": [
      "Avoid pulling on your neck — let your core do the work.",
      "The twist comes from your torso, not just your elbow.",
      "Fully extend the opposite leg low to the floor for maximum activation.",
      "Slow is better — 2 counts each direction."
    ],
    "icon": "exercise-bicycle-crunches"
  },
  {
    "id": "7CC50CFF-FC36-51B3-B80D-942E55BDD053",
    "name": "Superman",
    "category": "calisthenics",
    "muscleGroups": [
      "back",
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Lie face down with arms extended overhead and legs straight.",
      "Simultaneously lift your arms, chest, and legs off the floor.",
      "Squeeze your glutes and lower back at the top of the movement.",
      "Hold for 2–3 seconds, then lower back down with control.",
      "Breathe steadily — exhale as you lift, inhale as you lower."
    ],
    "tips": [
      "Don't strain your neck — keep your gaze toward the floor.",
      "Focus on quality over height — small controlled lifts beat big jerky ones.",
      "Great for counteracting the effects of prolonged sitting.",
      "For more challenge: hold the top position for 5+ seconds."
    ],
    "icon": "exercise-superman"
  },
  {
    "id": "47B14806-229F-5DFC-9447-1B844C2C6F3C",
    "name": "Bird Dog",
    "category": "calisthenics",
    "muscleGroups": [
      "core",
      "back"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Start on all fours with wrists under shoulders and knees under hips.",
      "Brace your core and maintain a neutral spine.",
      "Extend your right arm forward and left leg back simultaneously.",
      "Hold for 2–3 seconds, keeping your hips level.",
      "Return to start and repeat on the opposite side."
    ],
    "tips": [
      "Don't let your hips rotate or tilt — keep them square to the floor.",
      "Move slowly and with intention — this is a stability exercise.",
      "Keep your neck neutral — don't look up.",
      "If you struggle with balance, hold the extended position longer before switching."
    ],
    "icon": "exercise-bird-dog"
  },
  {
    "id": "4645CB5F-CA3F-58A7-B3F7-2A92B1512CFA",
    "name": "Russian Twists",
    "category": "calisthenics",
    "muscleGroups": [
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Sit on the floor with knees bent and feet slightly lifted.",
      "Lean back to about 45° and clasp your hands together in front.",
      "Rotate your torso to the right, bringing your hands toward the floor beside your hip.",
      "Rotate back through the center and to the left.",
      "Keep your feet elevated throughout for maximum core activation."
    ],
    "tips": [
      "The rotation comes from your torso — don't just move your arms.",
      "Keep your chin up and chest open — don't hunch.",
      "For easier: keep feet on the floor.",
      "For harder: hold a dumbbell or weight plate."
    ],
    "icon": "exercise-russian-twists"
  },
  {
    "id": "36A9F2DF-BBCF-599B-9F8A-FB912112FE4C",
    "name": "Glute Bridge March",
    "category": "calisthenics",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Lie on your back with knees bent and feet flat on the floor.",
      "Lift your hips into a glute bridge position and hold.",
      "Keeping your hips level, lift one knee toward your chest.",
      "Lower that foot back to the floor and lift the other knee.",
      "Alternate in a marching motion while maintaining hip height."
    ],
    "tips": [
      "Don't let your hips drop when you lift a leg — that's the whole challenge.",
      "Squeeze your glutes throughout to stay stable.",
      "Move slowly — rushing defeats the stability purpose.",
      "If your hips sag significantly, return to regular glute bridges first."
    ],
    "icon": "exercise-glute-bridge-march"
  },
  {
    "id": "E2F1C3ED-D7A2-5D26-9149-99020A6B7AA8",
    "name": "Hip Flexor Stretch",
    "category": "mobility",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Kneel on your right knee with your left foot forward in a lunge position.",
      "Shift your hips forward gently until you feel a stretch in the front of your right hip.",
      "Keep your torso upright and your front knee above your ankle.",
      "Hold the stretch for 30–60 seconds, breathing deeply.",
      "Switch sides and repeat."
    ],
    "tips": [
      "Don't let your lower back arch — engage your core slightly.",
      "The stretch should be felt in the front of the trailing hip, not the knee.",
      "For a deeper stretch, raise your trailing arm overhead and lean slightly away.",
      "Do this stretch after sitting for long periods or after lower body workouts."
    ],
    "icon": "exercise-hip-flexor-stretch"
  },
  {
    "id": "04D0C107-2669-5851-B5EB-5045EF29D294",
    "name": "Cat-Cow",
    "category": "yoga",
    "muscleGroups": [
      "core",
      "back"
    ],
    "equipment": "mat",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Start on all fours with wrists under shoulders and knees under hips.",
      "Inhale: let your belly drop toward the floor, lift your head and tailbone (Cow).",
      "Exhale: round your spine toward the ceiling, tuck your chin and pelvis (Cat).",
      "Move slowly and fluidly between the two positions.",
      "Repeat 8–12 times, moving with your breath."
    ],
    "tips": [
      "Let the breath lead the movement — don't rush.",
      "Keep your arms straight and press the floor away throughout.",
      "Great for warming up the spine before any workout.",
      "If you have wrist pain, perform on fists or forearms."
    ],
    "icon": "exercise-cat-cow"
  },
  {
    "id": "F597842B-A15C-532B-940A-A2B8F5CC8F68",
    "name": "Running",
    "category": "cardio",
    "muscleGroups": [
      "fullBody"
    ],
    "equipment": "none",
    "tracking": "distance",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Warm up with 2–3 minutes of brisk walking before running.",
      "Maintain an upright posture with a slight forward lean from the ankles.",
      "Land with your foot under your hips, not in front of your body.",
      "Keep your arms bent at 90° and swing them forward — not across your body.",
      "Breathe rhythmically — try a 2:2 or 3:3 breathing pattern."
    ],
    "tips": [
      "Start slow — conversational pace is the right intensity for most runs.",
      "Increase distance by no more than 10% per week to avoid injury.",
      "Invest in proper running shoes with appropriate support.",
      "Stretch your calves, quads, and hip flexors after every run."
    ],
    "icon": "exercise-running"
  },
  {
    "id": "C8530728-2430-55A1-A566-69BD5C2DCACE",
    "name": "Cycling",
    "category": "cardio",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "bike",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Adjust seat height so your knee has a slight bend at the bottom of the pedal stroke.",
      "Keep your back flat and engage your core throughout.",
      "Pedal in smooth circles — apply force throughout the stroke, not just the downstroke.",
      "Maintain a cadence of 80–100 RPM for efficient aerobic cycling.",
      "Keep your elbows slightly bent and relax your grip."
    ],
    "tips": [
      "Clip-in pedals or toe cages allow you to pull up as well as push down.",
      "Stay seated for steady endurance efforts, stand for short climbs.",
      "Hydrate regularly — cycling makes it easy to forget to drink.",
      "If using a stationary bike, set resistance to where you feel challenged but can maintain form."
    ],
    "icon": "exercise-cycling"
  },
  {
    "id": "A147A737-D607-5A17-9365-51EC55229F5E",
    "name": "Jump Rope",
    "category": "hiit",
    "muscleGroups": [
      "fullBody"
    ],
    "equipment": "rope",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Hold the rope handles at hip height, elbows close to your sides.",
      "Start with small wrist rotations to swing the rope, not big arm movements.",
      "Jump just high enough to clear the rope — about 2–3 cm off the ground.",
      "Land softly on the balls of your feet with a slight knee bend.",
      "Keep a steady rhythm and maintain an upright posture."
    ],
    "tips": [
      "Start with 30-second intervals if you're new to jump rope.",
      "Adjust rope length so handles reach your armpits when standing on the middle.",
      "Most mistakes come from jumping too high — keep it low and fast.",
      "Practice the timing first without the rope, then add it in."
    ],
    "icon": "exercise-jump-rope"
  },
  {
    "id": "B00E3319-FD58-52CD-B071-42CC253A6333",
    "name": "Incline Push-up",
    "category": "calisthenics",
    "muscleGroups": [
      "chest",
      "arms",
      "shoulders"
    ],
    "equipment": "bench",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Place your hands slightly wider than shoulder-width on the edge of a sturdy bench, box or chair.",
      "Step your feet back until your body forms a straight line from head to heels.",
      "Bend your elbows and lower your chest to the edge, keeping your elbows about 45 degrees from your sides.",
      "Press back up until your arms are straight."
    ],
    "tips": [
      "Make sure the support cannot slide, and push a chair against a wall if needed.",
      "The higher the surface, the easier the rep, so use a lower one as you get stronger.",
      "Do not let your hips sag or pike up."
    ],
    "icon": "exercise-incline-push-up"
  },
  {
    "id": "260580D1-15F7-59FE-9E22-E268DE3639D6",
    "name": "Wide Push-up",
    "category": "calisthenics",
    "muscleGroups": [
      "chest",
      "shoulders",
      "arms"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Start in a high plank with your hands about one and a half times shoulder-width apart, fingers pointing forward or slightly out.",
      "Brace your core and squeeze your glutes so your body stays in one line.",
      "Lower your chest towards the floor, letting your elbows bend out to roughly 60 degrees from your body.",
      "Stop when your chest is just above the floor, then press back up to straight arms."
    ],
    "tips": [
      "Going too wide is hard on the shoulders, so keep your forearms close to vertical at the bottom.",
      "Drop to your knees to finish a set rather than shortening the range of motion.",
      "Keep your neck long and look slightly ahead of your hands."
    ],
    "icon": "exercise-wide-push-up"
  },
  {
    "id": "E8B7D006-C80E-5902-A77A-E094B1209D61",
    "name": "Decline Push-up",
    "category": "calisthenics",
    "muscleGroups": [
      "chest",
      "shoulders",
      "arms"
    ],
    "equipment": "bench",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Kneel in front of a bench or chair and place your hands on the floor shoulder-width apart.",
      "Put your toes up on the bench one foot at a time and straighten your body into a plank.",
      "Lower your chest towards the floor with your elbows at about 45 degrees from your sides.",
      "Press back up until your arms are straight, without letting your hips drop."
    ],
    "tips": [
      "A higher foot position shifts more of the load onto your shoulders, so start with a low step.",
      "Squeeze your glutes to stop your lower back from arching.",
      "Step down one foot at a time when the set is over."
    ],
    "icon": "exercise-decline-push-up"
  },
  {
    "id": "2518A383-1A89-5E98-97CC-995AB952CEE6",
    "name": "Diamond Push-up",
    "category": "calisthenics",
    "muscleGroups": [
      "arms",
      "chest",
      "shoulders"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Start in a high plank and bring your hands together under your chest so your thumbs and index fingers form a diamond shape.",
      "Brace your core and keep your body in a straight line.",
      "Lower your chest towards your hands, keeping your elbows tucked close to your ribs.",
      "Press back up until your arms are fully straight."
    ],
    "tips": [
      "If your wrists or elbows feel uncomfortable, move your hands a few centimetres apart.",
      "Do not let your elbows flare out to the sides.",
      "Do them on your knees first if you cannot keep your body straight."
    ],
    "icon": "exercise-diamond-push-up"
  },
  {
    "id": "F42C7CB6-E4F6-56D8-9DF4-AE97AF16E271",
    "name": "Pike Push-up",
    "category": "calisthenics",
    "muscleGroups": [
      "shoulders",
      "arms"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Start in a high plank, then walk your feet towards your hands and lift your hips until your body forms an inverted V.",
      "Keep your arms and legs as straight as you can, with your head between your arms.",
      "Bend your elbows and lower the top of your head towards a spot on the floor just in front of your hands.",
      "Press back up until your arms are straight and your hips are high again."
    ],
    "tips": [
      "Your head and hands should form a triangle at the bottom, not a straight line.",
      "Keep your elbows pointing back at about 45 degrees rather than straight out to the sides.",
      "Raise your feet on a step or chair to make it harder once you can do ten clean reps."
    ],
    "icon": "exercise-pike-push-up"
  },
  {
    "id": "42703EBF-C61F-564F-8BEF-EDCA77EBFC63",
    "name": "Archer Push-up",
    "category": "calisthenics",
    "muscleGroups": [
      "chest",
      "arms",
      "shoulders"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Set up in a push-up position with your hands very wide, about double shoulder-width, and fingers turned out.",
      "Shift your weight towards one hand and bend that elbow, lowering your chest towards that hand.",
      "Keep the other arm straight, letting it take only a little of your weight.",
      "Press through the bent arm to return to the centre.",
      "Repeat on the other side, or finish all reps on one side before switching."
    ],
    "tips": [
      "Use the straight arm as little as you can, as it is mainly there for balance.",
      "Keep your hips square to the floor instead of twisting towards the working arm.",
      "Shorten the range of motion if the straight elbow feels strained."
    ],
    "icon": "exercise-archer-push-up"
  },
  {
    "id": "9F763334-A0EB-56C8-AE13-9E0E7D64447C",
    "name": "Pseudo Planche Push-up",
    "category": "calisthenics",
    "muscleGroups": [
      "shoulders",
      "chest",
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Start in a high plank with your hands beside your lower ribs or waist, fingers turned out to the sides.",
      "Lean forward so your shoulders move well in front of your hands, and round your upper back slightly.",
      "Hold that forward lean as you bend your elbows and lower your chest towards the floor, elbows close to your body.",
      "Press back up without letting your shoulders drift back over your hands."
    ],
    "tips": [
      "Warm up your wrists thoroughly before each session.",
      "Start with a small lean and increase it gradually over several weeks.",
      "Keep your hips level with your shoulders, because lifting them makes the move easier but trains the wrong position."
    ],
    "icon": "exercise-pseudo-planche-push-up"
  },
  {
    "id": "D8FBBFD8-B482-5A1F-AC8E-EAB7FB243CD7",
    "name": "Wall Handstand Push-up",
    "category": "calisthenics",
    "muscleGroups": [
      "shoulders",
      "arms",
      "core"
    ],
    "equipment": "wall",
    "tracking": "reps",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Place your hands on the floor about 20 centimetres from a wall, slightly wider than shoulder-width, and kick up so your heels rest on the wall.",
      "Tighten your core and glutes so your body is as straight as possible.",
      "Bend your elbows and lower slowly until the top of your head lightly touches a folded mat or cushion.",
      "Press back up until your arms are locked out.",
      "Come down one leg at a time with control when the set is finished."
    ],
    "tips": [
      "Be able to hold a wall handstand for 30 to 60 seconds before trying this.",
      "Lower yourself all the way under control and never drop onto your head.",
      "Slow lowering-only reps are a good way to build up to the full movement.",
      "Aim your head slightly in front of your hands so your forearms stay vertical."
    ],
    "icon": "exercise-wall-handstand-push-up"
  },
  {
    "id": "B9A2346F-627F-5D3F-A340-CB4D334DB2C7",
    "name": "Parallel Bar Dip",
    "category": "calisthenics",
    "muscleGroups": [
      "chest",
      "arms",
      "shoulders"
    ],
    "equipment": "dipBars",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Grip the bars and step or jump up to support yourself on straight arms, with your shoulders pressed down away from your ears.",
      "Lean your torso slightly forward and bend your knees or cross your ankles.",
      "Bend your elbows and lower yourself under control until your shoulders are about level with your elbows.",
      "Press back up until your arms are straight."
    ],
    "tips": [
      "If you use two chairs, make sure they are heavy, stable and cannot tip or slide.",
      "Only go as deep as feels comfortable for your shoulders.",
      "Build up with straight-arm support holds and slow lowering-only reps if you cannot press back up yet.",
      "Do not let your shoulders shrug up towards your ears."
    ],
    "icon": "exercise-parallel-bar-dip"
  },
  {
    "id": "1BF34814-8664-5FFD-B3C5-62A703C731A6",
    "name": "Dead Hang",
    "category": "calisthenics",
    "muscleGroups": [
      "arms",
      "back",
      "shoulders"
    ],
    "equipment": "bar",
    "tracking": "time",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Grip a pull-up bar with your hands shoulder-width apart and palms facing away.",
      "Lift your feet or step off a box so you hang with straight arms.",
      "Keep your ribs down and your legs together, slightly in front of you.",
      "Breathe steadily and hold for the set time, then step down."
    ],
    "tips": [
      "Wrap your thumbs around the bar for a secure grip.",
      "Use a box or step so you do not have to jump up to the bar or drop from it.",
      "End the set before your grip fails completely."
    ],
    "icon": "exercise-dead-hang"
  },
  {
    "id": "1B99D93F-E34D-5195-882C-419B8CC86377",
    "name": "Scapular Pull-up",
    "category": "calisthenics",
    "muscleGroups": [
      "back",
      "shoulders"
    ],
    "equipment": "bar",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Hang from the bar with straight arms and your hands slightly wider than your shoulders.",
      "Without bending your elbows, pull your shoulder blades down and back so your body rises a few centimetres.",
      "Pause for a second at the top with your chest lifted.",
      "Relax slowly back to a full hang."
    ],
    "tips": [
      "The movement is small, and if your elbows bend you are using your arms instead.",
      "Think of pushing your shoulders away from your ears.",
      "Keep your legs still and slightly in front of you to avoid swinging."
    ],
    "icon": "exercise-scapular-pull-up"
  },
  {
    "id": "4E891DE8-C1E5-59C6-B358-22FAFC0C68F8",
    "name": "Negative Pull-up",
    "category": "calisthenics",
    "muscleGroups": [
      "back",
      "arms"
    ],
    "equipment": "bar",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand on a stable box or chair so you can grip the bar with your chin already above it.",
      "Take your weight on your arms and lift your feet off the box.",
      "Lower yourself as slowly as you can, aiming for three to five seconds, until your arms are straight.",
      "Step back onto the box and repeat."
    ],
    "tips": [
      "Keep the descent even instead of dropping through the bottom half.",
      "Stop the set when you can no longer control the lowering.",
      "Step up to the top position rather than jumping, so every rep starts under control."
    ],
    "icon": "exercise-negative-pull-up"
  },
  {
    "id": "C0641387-89C3-5707-9C8F-409AA2B62E7F",
    "name": "Inverted Row",
    "category": "calisthenics",
    "muscleGroups": [
      "back",
      "arms",
      "core"
    ],
    "equipment": "bar",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Set a bar at about waist height and lie underneath it, gripping it slightly wider than shoulder-width.",
      "Straighten your body with your heels on the floor and your arms straight, so you hang like an upside-down plank.",
      "Pull your chest up to the bar, squeezing your shoulder blades together.",
      "Lower yourself under control until your arms are straight."
    ],
    "tips": [
      "Bend your knees and plant your feet flat to make it easier, or raise your feet on a chair to make it harder.",
      "Keep your hips up in line with your shoulders and ankles.",
      "Gymnastic rings or a sturdy low rail also work, as long as the anchor cannot move.",
      "This exercise is also known as the Australian pull-up or bodyweight row."
    ],
    "icon": "exercise-inverted-row"
  },
  {
    "id": "31E99F06-C195-545A-8876-596B9E578434",
    "name": "Chin-up",
    "category": "calisthenics",
    "muscleGroups": [
      "back",
      "arms"
    ],
    "equipment": "bar",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Grip the bar with your palms facing you and your hands about shoulder-width apart.",
      "Start from a full hang with straight arms and your shoulders pulled down.",
      "Pull yourself up, driving your elbows down towards your ribs, until your chin clears the bar.",
      "Lower yourself under control to a full hang."
    ],
    "tips": [
      "Avoid kicking or swinging your legs to get up.",
      "Finish every rep with straight arms rather than doing half reps.",
      "Try a slightly narrower or wider hand position if the grip feels awkward on your wrists or elbows."
    ],
    "icon": "exercise-chin-up"
  },
  {
    "id": "CED3E69F-99EC-5E36-A02B-0FFEECBB53F2",
    "name": "Wide-Grip Pull-up",
    "category": "calisthenics",
    "muscleGroups": [
      "back",
      "arms",
      "shoulders"
    ],
    "equipment": "bar",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Grip the bar with your palms facing away and your hands roughly one and a half times shoulder-width apart.",
      "Hang with straight arms, then pull your shoulder blades down.",
      "Pull your upper chest towards the bar, driving your elbows down and out to the sides.",
      "Lower yourself slowly to a full hang."
    ],
    "tips": [
      "Do not go so wide that your range of motion becomes tiny.",
      "Lead with your chest rather than craning your chin over the bar.",
      "Expect fewer reps than with a normal grip."
    ],
    "icon": "exercise-wide-grip-pull-up"
  },
  {
    "id": "042BC6E6-14CE-56E7-88E8-D33D946B2560",
    "name": "Close-Grip Pull-up",
    "category": "calisthenics",
    "muscleGroups": [
      "back",
      "arms"
    ],
    "equipment": "bar",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Grip the bar with your palms facing away and your hands 10 to 15 centimetres apart.",
      "Hang with straight arms and brace your core.",
      "Pull yourself up, keeping your elbows in front of your body, until your chin is over the bar.",
      "Lower yourself under control to straight arms."
    ],
    "tips": [
      "Keep your elbows tracking forward rather than flaring out.",
      "A slight lean back helps you bring your upper chest towards your hands.",
      "Move your hands a little further apart if your wrists feel cramped."
    ],
    "icon": "exercise-close-grip-pull-up"
  },
  {
    "id": "AAA8000E-703B-520F-AD23-0594B66581A9",
    "name": "Archer Pull-up",
    "category": "calisthenics",
    "muscleGroups": [
      "back",
      "arms"
    ],
    "equipment": "bar",
    "tracking": "reps",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Hang from the bar with a wide overhand grip, about double shoulder-width.",
      "Pull yourself up towards one hand, bending that elbow while the other arm straightens out along the bar.",
      "Bring your chin over the bar next to the working hand.",
      "Lower yourself under control to the centre hang.",
      "Repeat towards the other side."
    ],
    "tips": [
      "Let the hand of the straight arm open or roll over the top of the bar so the wrist stays comfortable.",
      "Give as little help as possible with the straight arm.",
      "Be comfortable with around ten strict pull-ups before trying these."
    ],
    "icon": "exercise-archer-pull-up"
  },
  {
    "id": "D83BD237-B0A3-5C0D-AE27-6412BF74E34C",
    "name": "Muscle-up",
    "category": "calisthenics",
    "muscleGroups": [
      "back",
      "arms",
      "chest"
    ],
    "equipment": "bar",
    "tracking": "reps",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Hang from the bar with an overhand grip slightly wider than shoulder-width, with your wrists rolled a little over the top of the bar.",
      "Let your legs swing slightly forward, then pull explosively, driving the bar down towards your hips rather than your chin.",
      "As your chest reaches the bar, lean your chest over it and roll your wrists so both elbows come up above the bar.",
      "Press down until your arms are straight and your hips rest against the bar.",
      "Lower back down under control through the dip and then the pull-up."
    ],
    "tips": [
      "Build up first with pull-ups to the chest and dips on top of a straight bar.",
      "Bring both elbows over at the same time, because getting one over first is a common fault that loads one shoulder unevenly.",
      "Slow lowering from the top through the transition builds strength for the way up.",
      "Make sure the bar is solidly fixed and has clear space above it for your upper body."
    ],
    "icon": "exercise-muscle-up"
  },
  {
    "id": "701536E5-EF7A-5E5D-BF78-225E75A98D21",
    "name": "Split Squat",
    "category": "calisthenics",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand in a long stride with one foot forward and the other back, feet hip-width apart and back heel lifted.",
      "Keep your torso upright and lower your back knee straight down towards the floor.",
      "Stop just before the knee touches, with your front knee over your front foot.",
      "Push through the front foot to stand back up, keeping both feet where they are.",
      "Finish all reps on one side, then switch legs."
    ],
    "tips": [
      "Keep your feet on two separate tracks, not one directly behind the other, for better balance.",
      "Do not let the front knee cave inwards.",
      "Hold a wall or chair lightly if you wobble."
    ],
    "icon": "exercise-split-squat"
  },
  {
    "id": "E4354624-ED27-528A-B4ED-B0FF7DF4D2BB",
    "name": "Step-up",
    "category": "calisthenics",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "bench",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand facing a sturdy step, box or bench that is knee height or lower.",
      "Place one whole foot on the step.",
      "Lean slightly forward and push through that foot to stand up tall on the step.",
      "Lower yourself back down slowly, with the same leg doing the work.",
      "Finish all reps on one side, then switch legs."
    ],
    "tips": [
      "Avoid springing off the back foot, as the leg on the step should do the lifting.",
      "Start with a low step and raise it as you get stronger.",
      "Keep your knee in line with your toes."
    ],
    "icon": "exercise-step-up"
  },
  {
    "id": "9314E320-552C-5A67-BF65-8A7EBB656CE4",
    "name": "Wall Sit",
    "category": "calisthenics",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "wall",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand with your back against a wall and walk your feet about two foot-lengths forward.",
      "Slide down the wall until your thighs are parallel to the floor and your knees are bent to 90 degrees.",
      "Keep your knees above your ankles and your back flat against the wall.",
      "Hold for the set time, then push through your feet to slide back up."
    ],
    "tips": [
      "Keep your hands off your thighs.",
      "Sit a little higher if you cannot hold the full position yet.",
      "Breathe steadily rather than holding your breath."
    ],
    "icon": "exercise-wall-sit"
  },
  {
    "id": "AFADC85C-806F-5492-8354-F195C01A0EF3",
    "name": "Single-Leg Calf Raise",
    "category": "calisthenics",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand on one foot next to a wall or chair and rest your fingertips on it for balance.",
      "Bend the other knee so that foot is off the floor.",
      "Rise as high as you can onto the ball of your standing foot.",
      "Pause for a second, then lower your heel slowly back down.",
      "Finish all reps on one side, then switch legs."
    ],
    "tips": [
      "Standing with the ball of your foot on the edge of a step gives a bigger range of motion.",
      "Keep the standing knee straight without locking it hard.",
      "Avoid bouncing at the bottom."
    ],
    "icon": "exercise-single-leg-calf-raise"
  },
  {
    "id": "2E8C4D1E-E124-5D50-9FA1-B7A40BA2DD51",
    "name": "Jump Squat",
    "category": "calisthenics",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet shoulder-width apart.",
      "Lower into a squat with your hips back and chest up, swinging your arms behind you.",
      "Drive up explosively and jump straight up, swinging your arms forward and up.",
      "Land softly on the balls of your feet and then your heels, bending your knees to absorb the landing.",
      "Sink straight into the next squat and repeat."
    ],
    "tips": [
      "Aim for quiet landings.",
      "Keep your knees in line with your toes when you take off and when you land.",
      "Stop the set when your jump height or landing control drops."
    ],
    "icon": "exercise-jump-squat"
  },
  {
    "id": "0044D744-DB6C-5359-A215-1381D062A6A2",
    "name": "Single-Leg Glute Bridge",
    "category": "calisthenics",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Lie on your back with your knees bent, feet flat on the floor hip-width apart and arms by your sides.",
      "Lift one foot off the floor and straighten that leg in line with the other thigh.",
      "Push through the heel of the planted foot and lift your hips until your body is straight from shoulders to knee.",
      "Pause for a second, then lower your hips under control.",
      "Finish all reps on one side, then switch legs."
    ],
    "tips": [
      "Keep your hips level and do not let the unsupported side drop.",
      "Squeeze your glutes at the top instead of arching your lower back.",
      "Move your foot closer to your hips if you feel the effort mostly in the back of your thigh."
    ],
    "icon": "exercise-single-leg-glute-bridge"
  },
  {
    "id": "9E6220B4-3B43-502C-9F76-E7A87FAEC42F",
    "name": "Bulgarian Split Squat",
    "category": "calisthenics",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "bench",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand about two foot-lengths in front of a bench or chair, facing away from it.",
      "Reach one foot back and rest the top of it on the bench.",
      "Lower your hips straight down until your front thigh is about parallel to the floor.",
      "Push through your front foot to stand back up.",
      "Finish all reps on one side, then switch legs."
    ],
    "tips": [
      "If your front heel lifts, move the front foot further forward.",
      "Keep most of your weight on the front leg, using the back leg only for balance.",
      "A slight forward lean of the torso is fine."
    ],
    "icon": "exercise-bulgarian-split-squat"
  },
  {
    "id": "08D6EAD2-0415-56EF-9009-980EFC311B8C",
    "name": "Cossack Squat",
    "category": "calisthenics",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet much wider than your shoulders and your toes turned slightly out.",
      "Shift your weight to one side and bend that knee, sitting your hips back and down.",
      "Keep the other leg straight, letting its toes turn up towards the ceiling as you go deeper.",
      "Go as low as you can while the heel of the bent leg stays flat on the floor.",
      "Push back up to the centre and repeat on the other side."
    ],
    "tips": [
      "Reach your arms forward as a counterbalance.",
      "Only go as deep as you can without your heel lifting or your back rounding heavily.",
      "Hold a door frame or chair while you learn the movement."
    ],
    "icon": "exercise-cossack-squat"
  },
  {
    "id": "2B60F529-1DD8-5D64-8B1C-7FBFC25BA486",
    "name": "Assisted Pistol Squat",
    "category": "calisthenics",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand facing a sturdy support such as a door frame or post and hold it with one or both hands at chest height.",
      "Lift one leg straight out in front of you.",
      "Sit back and down on the standing leg as low as you can, keeping the heel flat and the other leg off the floor.",
      "Stand back up, using your hands only as much as you need.",
      "Finish all reps on one side, then switch legs."
    ],
    "tips": [
      "Use less and less help from your hands over time.",
      "Sitting down onto a chair or box on one leg and standing up again is another good stepping stone.",
      "Keep your knee tracking over your toes."
    ],
    "icon": "exercise-assisted-pistol-squat"
  },
  {
    "id": "8399AC92-6882-5BFF-A5C1-AA487AB22EDE",
    "name": "Pistol Squat",
    "category": "calisthenics",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand on one leg and lift the other straight out in front of you, with your arms reaching forward.",
      "Bend your standing knee and sit your hips back and down, keeping your heel flat.",
      "Lower under control until the back of your thigh rests on your calf, with the other leg held off the floor.",
      "Drive through the whole foot to stand back up without the raised foot touching down.",
      "Finish all reps on one side, then switch legs."
    ],
    "tips": [
      "Stiff ankles often limit this move, and a small wedge under the heel helps while your mobility improves.",
      "Control the whole descent instead of dropping into the bottom.",
      "Keep your knee in line with your toes instead of letting it cave in."
    ],
    "icon": "exercise-pistol-squat"
  },
  {
    "id": "901353E6-1219-5E54-94AC-DD5D41D7FFF7",
    "name": "Shrimp Squat",
    "category": "calisthenics",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand on one leg, bend the other knee and hold that foot behind you with the hand on the same side.",
      "Reach your free arm forward for balance.",
      "Bend your standing knee and lean forward, lowering until the back knee gently touches the floor just behind your standing heel.",
      "Push through the standing foot to return to upright.",
      "Finish all reps on one side, then switch legs."
    ],
    "tips": [
      "Put a cushion or folded mat under the back knee while learning.",
      "Start without holding the back foot, which makes the move easier.",
      "Keep your standing heel down throughout."
    ],
    "icon": "exercise-shrimp-squat"
  },
  {
    "id": "EE4C0C1A-4FE3-5972-83CB-87F1653EA429",
    "name": "Nordic Curl",
    "category": "calisthenics",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Kneel on a thick mat and anchor your ankles under a heavy, stable piece of furniture, or have a partner hold them down.",
      "Keep your body straight from knees to head, with your hands ready in front of your chest.",
      "Lean forward slowly from the knees, resisting with the backs of your thighs for as long as you can.",
      "Catch yourself with your hands when you can no longer hold, and lower your chest to the floor.",
      "Push lightly off the floor and pull yourself back up to kneeling."
    ],
    "tips": [
      "Keep your hips pushed forward the whole time rather than bending at the waist.",
      "Start with just a few slow lowering reps, as this move is very demanding on the hamstrings.",
      "Check that the anchor cannot lift or slide before you lean forward."
    ],
    "icon": "exercise-nordic-curl"
  },
  {
    "id": "28E6AA0E-A22E-5595-AF10-41A76AB6B646",
    "name": "Hollow Hold",
    "category": "calisthenics",
    "muscleGroups": [
      "core"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Lie on your back with your arms stretched overhead and your legs straight.",
      "Tighten your abs and press your lower back firmly into the floor.",
      "Lift your shoulders, arms and legs a few centimetres off the floor so your body forms a shallow curve.",
      "Hold the position while taking short, steady breaths."
    ],
    "tips": [
      "If your lower back lifts off the floor, raise your legs higher or bend your knees.",
      "Keeping your arms by your sides makes the hold easier.",
      "Keep your chin slightly tucked rather than straining your neck forward."
    ],
    "icon": "exercise-hollow-hold"
  },
  {
    "id": "A5DECCAB-B384-56BC-B4D3-117374A690F3",
    "name": "Lying Leg Raise",
    "category": "calisthenics",
    "muscleGroups": [
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Lie on your back with your legs straight and your hands flat on the floor by your hips.",
      "Press your lower back into the floor.",
      "Keeping your legs straight and together, raise them until they point at the ceiling.",
      "Lower them slowly until your heels are just above the floor, then go straight into the next rep."
    ],
    "tips": [
      "Stop lowering at the point where your lower back starts to arch.",
      "Bend your knees to make the movement easier.",
      "Avoid swinging your legs up with momentum."
    ],
    "icon": "exercise-lying-leg-raise"
  },
  {
    "id": "A46DA934-F507-5711-85FA-1953B09C819A",
    "name": "V-up",
    "category": "calisthenics",
    "muscleGroups": [
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Lie on your back with your legs straight and your arms stretched overhead.",
      "In one movement, lift your straight legs and your upper body off the floor.",
      "Reach your hands towards your toes so your body folds into a V, balancing on your seat.",
      "Lower your arms and legs back down under control without fully relaxing on the floor."
    ],
    "tips": [
      "Bend your knees into a tuck if you cannot keep your legs straight.",
      "Move smoothly instead of throwing your arms forward.",
      "Keep your chest lifted rather than rounding heavily through your back."
    ],
    "icon": "exercise-v-up"
  },
  {
    "id": "21BADB0F-DBD1-5565-AD55-152A8282DBAB",
    "name": "Hand Walkout",
    "category": "calisthenics",
    "muscleGroups": [
      "core",
      "shoulders"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Start on all fours with your hands under your shoulders and your knees on a mat.",
      "Tighten your abs and tuck your pelvis slightly so your lower back stays flat.",
      "Walk your hands forward in small steps, letting your hips move forward and down, until your body is as long as you can control.",
      "Pause briefly, then walk your hands back to the start."
    ],
    "tips": [
      "Stop walking out before your lower back starts to sag.",
      "Start from a high plank on your toes to make it harder.",
      "Take small steps and keep your arms nearly straight."
    ],
    "icon": "exercise-hand-walkout"
  },
  {
    "id": "AFC6AD89-B1B7-5DAB-A186-25BD2E95B775",
    "name": "Hanging Knee Raise",
    "category": "calisthenics",
    "muscleGroups": [
      "core",
      "arms"
    ],
    "equipment": "bar",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Hang from a pull-up bar with straight arms and your shoulders pulled down.",
      "Keeping your legs together, bring your knees up towards your chest.",
      "Curl your pelvis up slightly at the top so your lower back rounds.",
      "Lower your legs slowly until they are straight again."
    ],
    "tips": [
      "Pause for a moment at the bottom of each rep to stop yourself swinging.",
      "Lift with your abs rather than kicking your legs up.",
      "Build your hang time separately if your grip gives out before your abs do."
    ],
    "icon": "exercise-hanging-knee-raise"
  },
  {
    "id": "96783806-701B-5D81-BAD7-8E4793612D39",
    "name": "Hanging Leg Raise",
    "category": "calisthenics",
    "muscleGroups": [
      "core",
      "arms"
    ],
    "equipment": "bar",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Hang from the bar with straight arms, legs together and shoulders pulled down.",
      "Keep your knees straight and raise your legs in front of you until they are at least parallel to the floor.",
      "Pause briefly at the top.",
      "Lower your legs slowly to the hanging position without swinging."
    ],
    "tips": [
      "Bend your knees slightly if the backs of your legs are tight.",
      "Avoid leaning back and swinging to throw your legs up.",
      "Tilt your pelvis up at the top so your abs do the work."
    ],
    "icon": "exercise-hanging-leg-raise"
  },
  {
    "id": "DEE9F0D5-4172-5AEA-B7CA-B6D34023E911",
    "name": "Toes-to-Bar",
    "category": "calisthenics",
    "muscleGroups": [
      "core",
      "back",
      "arms"
    ],
    "equipment": "bar",
    "tracking": "reps",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Hang from the bar with your hands shoulder-width apart and your shoulders pulled down.",
      "Press down on the bar with straight arms and lift your straight legs up in front of you.",
      "Keep folding at the hips and rounding your lower back until your toes touch the bar between your hands.",
      "Lower your legs under control back to a still hang."
    ],
    "tips": [
      "Be able to do hanging leg raises to horizontal before trying this.",
      "Let your shoulders move slightly behind the bar as your legs rise.",
      "Bend your knees a little if tight hamstrings stop you reaching the bar."
    ],
    "icon": "exercise-toes-to-bar"
  },
  {
    "id": "9D6481D9-F6C0-5603-8482-54B6104A7C0E",
    "name": "L-sit",
    "category": "calisthenics",
    "muscleGroups": [
      "core",
      "arms",
      "shoulders"
    ],
    "equipment": "dipBars",
    "tracking": "time",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Support yourself on straight arms between parallel bars or two sturdy chairs, with your shoulders pressed down.",
      "Lock your elbows and keep your chest up.",
      "Lift both legs straight out in front until they are parallel to the floor, with knees locked and toes pointed.",
      "Hold for the set time, then lower your legs under control."
    ],
    "tips": [
      "Start with your knees tucked to your chest, then extend one leg at a time as you get stronger.",
      "Do not let your shoulders shrug up towards your ears.",
      "Doing it with hands on the floor is harder, because you have to push higher to keep your legs clear.",
      "Cramp in the front of the thighs is common at first, so keep early holds short."
    ],
    "icon": "exercise-l-sit"
  },
  {
    "id": "EEAF8FD0-B8CB-5B31-A4CB-56EEE73E1CC0",
    "name": "Dragon Flag",
    "category": "calisthenics",
    "muscleGroups": [
      "core",
      "arms"
    ],
    "equipment": "bench",
    "tracking": "reps",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Lie on your back on a bench and grip the edge of the bench behind your head with both hands.",
      "Bring your knees to your chest and roll up so your weight rests on your upper back and shoulders, then straighten your body towards the ceiling.",
      "Keeping your body straight from shoulders to toes, lower it slowly towards the bench.",
      "Stop just above the bench with only your upper back touching it.",
      "Raise your body back up in one straight piece, or tuck your knees and reset."
    ],
    "tips": [
      "Keep the load on your upper back and shoulders and never on your neck.",
      "Start with lowering-only reps or with one knee bent.",
      "Do not bend at the hips, as that turns the move into a leg raise.",
      "Check that the bench is stable and cannot tip towards your head."
    ],
    "icon": "exercise-dragon-flag"
  },
  {
    "id": "4192BF40-71F0-55B8-929E-01580F2FCACD",
    "name": "Frog Stand",
    "category": "calisthenics",
    "muscleGroups": [
      "arms",
      "shoulders",
      "core"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Squat down and place your hands flat on the floor shoulder-width apart, with your fingers spread.",
      "Bend your elbows slightly and rest the insides of your knees against the outsides of your upper arms, just above the elbows.",
      "Lean forward slowly, looking at the floor ahead of your hands, until your feet lift off.",
      "Balance on your hands for the set time, then tip gently back onto your feet."
    ],
    "tips": [
      "Put a cushion in front of you while learning in case you tip forward.",
      "Press your fingertips into the floor to control the balance.",
      "Warm up your wrists first."
    ],
    "icon": "exercise-frog-stand"
  },
  {
    "id": "8DCFE574-00E9-5224-9A4D-4BAA0D366710",
    "name": "Wall Handstand",
    "category": "calisthenics",
    "muscleGroups": [
      "shoulders",
      "core",
      "arms"
    ],
    "equipment": "wall",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Start in a push-up position with your feet against the base of a wall.",
      "Walk your feet up the wall while walking your hands back towards it.",
      "Stop when your chest is close to the wall, or as near as you feel in control, with your arms locked straight.",
      "Push tall through your shoulders, squeeze your glutes and point your toes.",
      "Hold for the set time, then walk your hands forward and your feet back down."
    ],
    "tips": [
      "Come down while you still have the strength to walk out with control.",
      "Start with a hold at about 45 degrees and work closer to the wall over several sessions.",
      "Keep your ribs pulled in instead of letting your back arch.",
      "Clear the area around you before going upside down."
    ],
    "icon": "exercise-wall-handstand"
  },
  {
    "id": "1A2C2E9E-8E8D-5D43-A8EB-D80CDE32BEED",
    "name": "Handstand Hold",
    "category": "calisthenics",
    "muscleGroups": [
      "shoulders",
      "core",
      "arms"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Place your hands on the floor shoulder-width apart with your fingers spread and one foot stepped forward.",
      "Kick up gently with the back leg and bring both legs together overhead.",
      "Push the floor away so your shoulders are fully open, and squeeze your glutes and legs to stay straight.",
      "Balance by pressing through your fingertips when you tip forward and through the heels of your hands when you tip back.",
      "Step down, or turn out to one side like a cartwheel, when you lose balance."
    ],
    "tips": [
      "Learn to bail out by turning to the side before practising away from a wall.",
      "Short, frequent practice works better than long, tiring sessions.",
      "Practise on a clear, forgiving surface with plenty of space around you.",
      "Look at the floor between your thumbs."
    ],
    "icon": "exercise-handstand-hold"
  },
  {
    "id": "B8D3D8B9-E330-50A3-99B7-0E2F43E9C85C",
    "name": "Tuck Planche",
    "category": "calisthenics",
    "muscleGroups": [
      "shoulders",
      "core",
      "arms"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Squat down and place your hands on the floor shoulder-width apart, fingers pointing forward or turned out.",
      "Lock your elbows, lean your shoulders forward past your hands and round your upper back.",
      "Pull your knees tight to your chest and lift your feet off the floor.",
      "Raise your hips to about shoulder height and hold with straight arms."
    ],
    "tips": [
      "Straight elbows are the point of the exercise, and bending them turns it into a frog stand.",
      "Use parallettes or push-up handles if your wrists are uncomfortable on the floor.",
      "Keep holds short and well controlled, and add seconds slowly.",
      "Warm up your wrists and build up with forward-leaning planks first."
    ],
    "icon": "exercise-tuck-planche"
  },
  {
    "id": "22CF6C7F-ADB9-5917-8AEC-09FBD9E6A555",
    "name": "Tuck Front Lever",
    "category": "calisthenics",
    "muscleGroups": [
      "back",
      "core",
      "arms"
    ],
    "equipment": "bar",
    "tracking": "time",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Hang from the bar with an overhand grip and your hands shoulder-width apart.",
      "Pull your knees to your chest and lean back, pressing the bar down towards your hips with straight arms.",
      "Raise your hips until your back is parallel to the floor.",
      "Hold with your arms locked and your shoulder blades pulled down and back, then lower under control."
    ],
    "tips": [
      "Keep your arms straight, because bent elbows make it a different exercise.",
      "If you cannot get your back level yet, practise raising into the position and lowering slowly.",
      "Move your knees further away from your chest to make the hold harder."
    ],
    "icon": "exercise-tuck-front-lever"
  },
  {
    "id": "36E120F0-BFEB-5865-9705-F5A7F7EA55D4",
    "name": "Back Lever",
    "category": "calisthenics",
    "muscleGroups": [
      "back",
      "shoulders",
      "core"
    ],
    "equipment": "bar",
    "tracking": "time",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Hang from the bar with an overhand grip, tuck your knees and pass your feet up between your arms until you are upside down.",
      "Straighten your body so your feet point at the ceiling in an inverted hang.",
      "Keeping your arms locked, lower your body slowly until it is horizontal and facing the floor.",
      "Hold with your glutes and abs tight.",
      "Pull back up to the inverted hang and return the way you came in."
    ],
    "tips": [
      "Learn it with your knees tucked first, then extend one leg, then both.",
      "The position puts a strong stretch on the shoulders and biceps, so progress slowly.",
      "Gymnastic rings set low are the easiest place to learn it.",
      "Make sure there is enough room around the bar for your body to rotate through."
    ],
    "icon": "exercise-back-lever"
  },
  {
    "id": "01A0AB33-1A81-57B5-AF18-3E8F93BC82BC",
    "name": "Mountain Climbers",
    "category": "hiit",
    "muscleGroups": [
      "core",
      "shoulders",
      "legs"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Start in a high plank with your hands under your shoulders and your body in a straight line.",
      "Drive one knee towards your chest while the other leg stays straight.",
      "Switch legs quickly, as if running on the spot with your hands on the floor.",
      "Keep your hips level with your shoulders the whole time.",
      "Breathe steadily and hold a pace you can keep up for the full interval."
    ],
    "tips": [
      "Do not let your hips pike up or sag as you get tired.",
      "Keep your shoulders stacked over your wrists rather than rocking backwards.",
      "Slow down to a stepping pace if your form starts to break down."
    ],
    "icon": "exercise-mountain-climbers"
  },
  {
    "id": "847B5A0B-A545-5103-A2BF-76F795DC4370",
    "name": "Cross-Body Mountain Climbers",
    "category": "hiit",
    "muscleGroups": [
      "core",
      "shoulders"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Start in a high plank with your hands under your shoulders.",
      "Drive your right knee across your body towards your left elbow.",
      "Return the foot and immediately drive your left knee towards your right elbow.",
      "Keep alternating at a brisk but controlled pace."
    ],
    "tips": [
      "Rotate from the waist while your shoulders stay square over your hands.",
      "Do not let your hips swing from side to side or lift towards the ceiling.",
      "Going a little slower than regular mountain climbers is fine, because the reach matters more than the speed."
    ],
    "icon": "exercise-cross-body-mountain-climbers"
  },
  {
    "id": "1892A738-D326-5647-9D1C-CD40371DBC3E",
    "name": "High Knees",
    "category": "hiit",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand tall with your feet hip-width apart and your arms bent at your sides.",
      "Run on the spot, lifting each knee to about hip height.",
      "Land softly on the balls of your feet and pump your arms in rhythm.",
      "Keep your chest lifted and your core braced as you pick up speed."
    ],
    "tips": [
      "Avoid leaning back as your knees come up.",
      "March the movement without leaving the floor for a low-impact version.",
      "Quick, light foot contacts are better than stamping."
    ],
    "icon": "exercise-high-knees"
  },
  {
    "id": "EA332A91-750C-54F6-BAA0-01F19C1BF151",
    "name": "Butt Kicks",
    "category": "hiit",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand tall with your feet hip-width apart.",
      "Jog on the spot, bringing each heel up towards your buttock.",
      "Keep your thighs roughly vertical so your knees point down at the floor.",
      "Stay on the balls of your feet and swing your bent arms naturally."
    ],
    "tips": [
      "Keep your torso upright rather than bending forwards.",
      "Start gently and build speed, as fast kicking is hard on cold hamstrings.",
      "Aim for quick, light steps rather than big ones."
    ],
    "icon": "exercise-butt-kicks"
  },
  {
    "id": "3F29E5C5-80F9-56B8-8791-937052695BD1",
    "name": "Skaters",
    "category": "hiit",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand on your right leg with the knee slightly bent and your left foot hovering behind you.",
      "Leap sideways to the left and land softly on your left foot.",
      "Let your right leg sweep behind you as your right hand reaches towards your left foot.",
      "Push straight off again to the other side and keep a steady rhythm."
    ],
    "tips": [
      "Land with a bent knee that stays in line with your toes.",
      "Make the jumps smaller, or step across instead of leaping, for less impact.",
      "Keep your chest up rather than rounding your back to touch the floor."
    ],
    "icon": "exercise-skaters"
  },
  {
    "id": "95206180-FEE2-554C-A11A-B8D6377E75FB",
    "name": "Squat Thrust",
    "category": "hiit",
    "muscleGroups": [
      "fullBody",
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet shoulder-width apart.",
      "Squat down and place your hands on the floor just in front of your feet.",
      "Jump both feet back to land in a high plank.",
      "Jump your feet forwards again to land just behind your hands.",
      "Stand up fully and repeat."
    ],
    "tips": [
      "Brace your core as your feet land so your lower back does not sag.",
      "Step your feet back one at a time for an easier version.",
      "This is a burpee without the push-up or the jump, so use it to build up to the full move."
    ],
    "icon": "exercise-squat-thrust"
  },
  {
    "id": "3C556AC1-F867-5407-9AD1-F17459A11BDC",
    "name": "Tuck Jump",
    "category": "hiit",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet hip-width apart and your knees soft.",
      "Dip into a quarter squat and swing your arms back.",
      "Jump straight up and pull both knees towards your chest.",
      "Straighten your legs and land softly on the balls of your feet with your knees bent.",
      "Reset your balance before the next jump."
    ],
    "tips": [
      "Bring your knees up to your chest rather than dropping your chest to your knees.",
      "Stop the set when your landings become heavy or noisy.",
      "Get comfortable with jump squats before adding tuck jumps.",
      "Jump on a forgiving surface such as a mat or grass rather than bare concrete."
    ],
    "icon": "exercise-tuck-jump"
  },
  {
    "id": "64242327-1942-58E3-A5BA-7A37C72F4E66",
    "name": "Star Jump",
    "category": "hiit",
    "muscleGroups": [
      "fullBody",
      "legs"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Start in a shallow squat with your feet together and your hands by your shins.",
      "Jump up explosively, spreading your arms and legs wide into a star shape.",
      "Bring your arms and legs back in before you land.",
      "Land softly with your feet together and sink straight into the next squat."
    ],
    "tips": [
      "Unlike a jumping jack, you reach the full star in the air and land with your feet together.",
      "Keep your landings quiet by bending your knees as you touch down.",
      "Jump lower rather than faster if you need to reduce the effort."
    ],
    "icon": "exercise-star-jump"
  },
  {
    "id": "E124B685-3D13-5DAB-9AAC-C4FEF2F052BD",
    "name": "Broad Jump",
    "category": "hiit",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet shoulder-width apart and clear space in front of you.",
      "Swing your arms back as you push your hips back and bend your knees.",
      "Swing your arms forwards and jump as far ahead as you can off both feet.",
      "Land on both feet with your knees bent and your hips back to absorb the landing.",
      "Walk back to the start and repeat."
    ],
    "tips": [
      "Hold each landing still for a moment before setting up the next jump.",
      "Keep your knees in line with your toes when you land.",
      "Use a non-slip surface and shorten the jump until your landings feel controlled."
    ],
    "icon": "exercise-broad-jump"
  },
  {
    "id": "E8B3D8CA-516A-5E06-A856-A5706F6742BE",
    "name": "Lateral Shuffle",
    "category": "hiit",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand in a half squat with your feet wider than your hips and your chest up.",
      "Push off your trailing leg and take three or four quick side steps in one direction.",
      "Stay low, touch the floor with your outside hand, then shuffle back the other way.",
      "Keep your feet apart so they never cross or click together."
    ],
    "tips": [
      "Stay at the same height throughout rather than bobbing up between steps.",
      "Keep your toes pointing forwards and your weight on the balls of your feet.",
      "Mark out a few metres so each shuffle has a clear turning point."
    ],
    "icon": "exercise-lateral-shuffle"
  },
  {
    "id": "543C9303-E648-54C9-BC14-CB6F6D5A19A8",
    "name": "Fast Feet",
    "category": "hiit",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand in a slight squat with your feet a little wider than your hips and your arms bent.",
      "Run on the spot with tiny, rapid steps, barely lifting your feet.",
      "Stay on the balls of your feet and keep your hips low.",
      "Hold your upper body still and breathe steadily until the interval ends."
    ],
    "tips": [
      "Think speed, not height, because your feet only need to clear the floor.",
      "Do not stand up straight as you tire.",
      "Keep your shoulders and hands relaxed."
    ],
    "icon": "exercise-fast-feet"
  },
  {
    "id": "372CC6F1-4CD7-564B-9AD1-A7811006D6DB",
    "name": "Bear Crawl",
    "category": "hiit",
    "muscleGroups": [
      "fullBody",
      "shoulders",
      "core"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Start on all fours with your hands under your shoulders and your knees under your hips.",
      "Lift your knees a few centimetres off the floor.",
      "Move your right hand and left foot forwards together, then your left hand and right foot.",
      "Crawl forwards for a few steps, then reverse back to the start.",
      "Keep your back flat and your knees close to the floor throughout."
    ],
    "tips": [
      "Take small steps so your hips do not sway.",
      "Imagine balancing a cup of water on your lower back.",
      "In a small room, crawl two steps forwards and two steps back."
    ],
    "icon": "exercise-bear-crawl"
  },
  {
    "id": "87B9D0E1-D015-51D1-88A1-7EB5AC02C9EC",
    "name": "Crab Walk",
    "category": "hiit",
    "muscleGroups": [
      "arms",
      "shoulders",
      "core"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Sit on the floor with your knees bent, feet flat and hands just behind your hips.",
      "Press through your hands and feet to lift your hips off the floor.",
      "Step one hand and the opposite foot towards your feet, then the other pair.",
      "Walk a few steps in that direction, then reverse back to the start."
    ],
    "tips": [
      "Keep your hips lifted rather than letting them drag along the floor.",
      "Turn your fingers out to the sides if your wrists feel uncomfortable.",
      "Keep your shoulders pulled down away from your ears."
    ],
    "icon": "exercise-crab-walk"
  },
  {
    "id": "3AF39D1A-3B1E-583C-B031-4B03C91B38AD",
    "name": "Plank Shoulder Taps",
    "category": "hiit",
    "muscleGroups": [
      "core",
      "shoulders"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Start in a high plank with your hands under your shoulders and your feet hip-width apart or wider.",
      "Lift one hand and tap the opposite shoulder.",
      "Put the hand back down and tap with the other hand.",
      "Keep alternating while holding your hips as still as you can."
    ],
    "tips": [
      "Set your feet wider apart for more stability.",
      "Try not to rock from side to side as each hand lifts.",
      "Drop to your knees if your lower back starts to sag."
    ],
    "icon": "exercise-plank-shoulder-taps"
  },
  {
    "id": "1C636EC0-23E4-5302-9D99-C151C70570B4",
    "name": "Up-Down Plank",
    "category": "hiit",
    "muscleGroups": [
      "core",
      "arms",
      "shoulders"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Start in a forearm plank with your elbows under your shoulders.",
      "Place one hand under your shoulder and press up, then the other, until you are in a high plank.",
      "Lower back down to your forearms one arm at a time.",
      "Swap the arm that leads halfway through the interval."
    ],
    "tips": [
      "Keep your hips square to the floor rather than twisting as you climb.",
      "A wider foot position makes the move easier to control.",
      "Squeeze your abdominals and glutes to keep your body in a straight line."
    ],
    "icon": "exercise-up-down-plank"
  },
  {
    "id": "F6DCCF98-8C4F-534E-8FE9-3714F649DD51",
    "name": "Sprawl",
    "category": "hiit",
    "muscleGroups": [
      "fullBody",
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand in an athletic stance with your feet shoulder-width apart and your hands up.",
      "Drop your hands to the floor in front of your feet.",
      "Shoot both feet back and wide, letting your hips drop low while your arms stay straight.",
      "Snap your feet back under your hips.",
      "Stand up into your athletic stance and repeat."
    ],
    "tips": [
      "Keep your abdominals braced as your hips drop so the movement stays controlled.",
      "Keep your head up and look forwards at the bottom.",
      "Move fast, but place your hands down rather than slamming them."
    ],
    "icon": "exercise-sprawl"
  },
  {
    "id": "1C9C3C22-C9BF-5F30-AFB7-202622ED1BA0",
    "name": "Box Jump",
    "category": "hiit",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "box",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand a short step away from a sturdy box with your feet hip-width apart.",
      "Dip into a quarter squat and swing your arms back.",
      "Jump up and land softly with both feet fully on the box and your knees bent.",
      "Stand up tall on top of the box.",
      "Step down one foot at a time and reset."
    ],
    "tips": [
      "Choose a height you can land on quietly without dropping into a deep squat.",
      "Step down rather than jumping down to keep the impact low.",
      "Check that the box cannot slide or tip before you start.",
      "Stop when you feel tired, because that is when jumps get missed."
    ],
    "icon": "exercise-box-jump"
  },
  {
    "id": "C2F5163E-34E9-58AB-93DC-083103F66A94",
    "name": "Jumping Lunges",
    "category": "hiit",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Start in a lunge with your front knee over your ankle and your back knee just off the floor.",
      "Jump straight up and switch your legs in mid-air.",
      "Land softly in a lunge with the other leg in front.",
      "Sink into the lunge and jump again."
    ],
    "tips": [
      "Keep your torso upright and your front knee in line with your toes.",
      "Do not let your back knee hit the floor.",
      "Switch to alternating reverse lunges when your landings get wobbly."
    ],
    "icon": "exercise-jumping-lunges"
  },
  {
    "id": "F1108EE3-3C06-5469-9479-4A4BC692D487",
    "name": "Pop Squat",
    "category": "hiit",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet together and your arms by your sides.",
      "Hop your feet out wider than your shoulders and drop into a squat.",
      "Reach one hand towards the floor between your feet.",
      "Push up and hop your feet back together.",
      "Repeat, reaching down with the other hand each time."
    ],
    "tips": [
      "Sit your hips back and keep your chest lifted rather than folding at the waist.",
      "Let your knees follow the line of your toes as you land wide.",
      "Skip the floor touch if it makes your back round."
    ],
    "icon": "exercise-pop-squat"
  },
  {
    "id": "B1E9B3DA-2F50-5C83-8364-B59F256D47AF",
    "name": "Frog Jump",
    "category": "hiit",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet wider than your shoulders and your toes turned slightly out.",
      "Lower into a deep squat and touch your fingertips to the floor between your feet.",
      "Jump forwards and up, swinging your arms ahead of you.",
      "Land softly and sink straight back into the deep squat.",
      "Keep going forwards, or turn round when you run out of space."
    ],
    "tips": [
      "Keep your chest up and your heels down in the squat.",
      "Land on the balls of your feet first, then let your heels come down with your knees bent.",
      "Jump on the spot if you do not have room to travel."
    ],
    "icon": "exercise-frog-jump"
  },
  {
    "id": "44070754-5FFE-5B26-829E-938EAB86F047",
    "name": "Seal Jacks",
    "category": "hiit",
    "muscleGroups": [
      "fullBody",
      "shoulders",
      "chest"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand with your feet together and your arms straight out in front at chest height, palms together.",
      "Jump your feet wide while opening your arms out to the sides at shoulder height.",
      "Jump your feet back together and clap your hands in front of your chest.",
      "Keep a steady, bouncing rhythm."
    ],
    "tips": [
      "Hold your arms at shoulder height instead of letting them drop.",
      "Open your arms only as far as is comfortable for your shoulders.",
      "Step one foot out at a time for a low-impact version."
    ],
    "icon": "exercise-seal-jacks"
  },
  {
    "id": "4B2DB90D-C725-533E-8C06-041C7155F6C3",
    "name": "Flutter Kicks",
    "category": "hiit",
    "muscleGroups": [
      "core",
      "legs"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Lie on your back with your legs straight and your hands under your hips.",
      "Press your lower back into the floor and lift both feet about a hand's width off the ground.",
      "Kick your legs up and down in small, fast, alternating movements.",
      "Keep your legs straight and your toes pointed.",
      "Lower your feet as soon as you can no longer keep your lower back down."
    ],
    "tips": [
      "If your lower back arches, raise your legs higher or bend your knees slightly.",
      "Keep your neck relaxed and your head resting on the floor.",
      "Breathe normally instead of holding your breath."
    ],
    "icon": "exercise-flutter-kicks"
  },
  {
    "id": "9FC69F49-F861-5661-A4B7-C8600D641F39",
    "name": "Kettlebell Swing",
    "category": "hiit",
    "muscleGroups": [
      "legs",
      "back",
      "core"
    ],
    "equipment": "kettlebell",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet slightly wider than your shoulders and the kettlebell on the floor a short step in front of you.",
      "Push your hips back with a flat back and grip the handle with both hands.",
      "Hike the kettlebell back between your legs, high up towards your thighs.",
      "Drive your hips forwards sharply so the kettlebell floats up to chest height with your arms relaxed.",
      "Let it fall, and push your hips back again only as your arms reach your body.",
      "After the last rep, guide the kettlebell back to the floor in front of you."
    ],
    "tips": [
      "The power comes from snapping your hips, not from squatting or lifting with your arms.",
      "Stand tall at the top with your glutes tight rather than leaning back.",
      "Keep your back flat and the kettlebell close to your body on the backswing.",
      "Start with a light kettlebell until the hip hinge feels natural."
    ],
    "icon": "exercise-kettlebell-swing"
  },
  {
    "id": "D7AE5737-D5EA-540E-AC81-DA6119F1E667",
    "name": "Dumbbell Thruster",
    "category": "hiit",
    "muscleGroups": [
      "fullBody",
      "legs",
      "shoulders"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Hold a dumbbell at each shoulder with your palms facing in and your feet shoulder-width apart.",
      "Squat until your thighs are about parallel to the floor, keeping your chest up.",
      "Drive up hard through your whole foot.",
      "Use that momentum to press both dumbbells overhead until your arms are straight.",
      "Lower the dumbbells to your shoulders as you sink into the next squat."
    ],
    "tips": [
      "Make the squat and the press one flowing movement instead of two separate lifts.",
      "Keep your elbows up so the weights do not pull your chest forwards.",
      "Keep your ribs down and avoid arching your lower back as you press.",
      "Pick a weight you could strictly press overhead about ten times."
    ],
    "icon": "exercise-dumbbell-thruster"
  },
  {
    "id": "826AB210-AB64-58DC-A731-71EADF518D05",
    "name": "Man Maker",
    "category": "hiit",
    "muscleGroups": [
      "fullBody",
      "back",
      "shoulders"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand holding two dumbbells, then squat down and set them on the floor shoulder-width apart.",
      "Keeping hold of the handles, jump or step your feet back into a high plank.",
      "Do one push-up, then row each dumbbell to your ribs in turn.",
      "Jump or step your feet forwards to the outside of your hands.",
      "Lift the dumbbells to your shoulders and stand up.",
      "Press both dumbbells overhead, lower them to your sides and start the next rep."
    ],
    "tips": [
      "Use flat-sided dumbbells so they cannot roll under your hands.",
      "Set your feet wide during the rows to stop your hips twisting.",
      "Start much lighter than you think you need, as the row limits the weight.",
      "Practise each part on its own before linking them together."
    ],
    "icon": "exercise-man-maker"
  },
  {
    "id": "DC318774-C6F7-5B4C-97AA-EE5C72A85F5C",
    "name": "Dumbbell Snatch",
    "category": "hiit",
    "muscleGroups": [
      "fullBody",
      "shoulders",
      "legs"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet shoulder-width apart and one dumbbell on the floor between them.",
      "Bend your hips and knees and grip the dumbbell with one hand, keeping your back flat and chest up.",
      "Drive through your legs and extend your hips explosively, pulling the dumbbell up close to your body.",
      "Dip slightly under the weight and punch it overhead to a straight arm.",
      "Stand tall, then lower the dumbbell to your shoulder and back to the floor under control.",
      "Swap hands and repeat."
    ],
    "tips": [
      "Your legs and hips do the lifting, while your arm only guides the weight.",
      "Keep the dumbbell close to your body instead of swinging it out in front.",
      "Finish with your arm straight and steady overhead before lowering.",
      "Learn the movement with a light weight before adding speed."
    ],
    "icon": "exercise-dumbbell-snatch"
  },
  {
    "id": "BFFD4AD7-C4C6-5B58-8AF9-78674854B262",
    "name": "Wall Ball",
    "category": "hiit",
    "muscleGroups": [
      "fullBody",
      "legs",
      "shoulders"
    ],
    "equipment": "ball",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand about an arm's length from a solid wall, holding a medicine ball at chest height with your elbows under it.",
      "Squat until your thighs are at least parallel to the floor, keeping the ball high.",
      "Drive up explosively and throw the ball at a target high on the wall as your legs straighten.",
      "Catch the ball with your arms reaching up and sink straight into the next squat."
    ],
    "tips": [
      "Let your legs power the throw and your arms simply finish it.",
      "Keep the ball at chin height in the squat rather than letting it drop towards your stomach.",
      "Use a soft medicine ball and check the wall can take repeated impacts.",
      "Stand close enough that the ball drops back into your hands."
    ],
    "icon": "exercise-wall-ball"
  },
  {
    "id": "F3774222-D737-58AF-B46C-1E56EEE5E0BB",
    "name": "Ball Slam",
    "category": "hiit",
    "muscleGroups": [
      "fullBody",
      "core",
      "shoulders"
    ],
    "equipment": "ball",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet shoulder-width apart, holding a slam ball at your waist.",
      "Lift the ball overhead, rising onto your toes with your arms stretched up.",
      "Slam the ball into the floor just in front of your feet, bending your hips and knees as you follow through.",
      "Squat down with a flat back to pick the ball up.",
      "Stand up and repeat."
    ],
    "tips": [
      "Use a slam ball that does not bounce, as a bouncy medicine ball can rebound towards your face.",
      "Bend your knees to pick the ball up rather than rounding your back.",
      "Pull the ball down with your abdominals, not just your arms."
    ],
    "icon": "exercise-ball-slam"
  },
  {
    "id": "50667AEC-02A7-56E7-B2EC-E9FFCA41A2E6",
    "name": "Battle Rope Waves",
    "category": "hiit",
    "muscleGroups": [
      "arms",
      "shoulders",
      "core"
    ],
    "equipment": "ropes",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Anchor the rope securely and hold one end in each hand, facing the anchor.",
      "Stand with your feet shoulder-width apart in a quarter squat with your chest up.",
      "Whip one arm up as the other goes down to send alternating waves along the rope.",
      "Keep the waves travelling all the way to the anchor for the whole interval."
    ],
    "tips": [
      "Stand close enough to the anchor to leave some slack in the rope.",
      "Stay in your squat with your core braced rather than bouncing up and down.",
      "Keep your grip relaxed so your forearms do not tire first.",
      "Make smaller, faster waves if they stop reaching the anchor."
    ],
    "icon": "exercise-battle-rope-waves"
  },
  {
    "id": "1453F3DF-9734-5BFB-9FB0-CC1F1761857D",
    "name": "Sled Push",
    "category": "hiit",
    "muscleGroups": [
      "legs",
      "core",
      "shoulders"
    ],
    "equipment": "sled",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand behind the sled and grip the upright handles at about chest height.",
      "Lean in until your body forms a straight line from your head to your back heel.",
      "Drive one knee forwards and push through the ball of the other foot.",
      "Take strong, steady steps to keep the sled moving for the set time or distance.",
      "Walk the sled to a gradual stop rather than letting go."
    ],
    "tips": [
      "Keep your back flat and your hips low instead of rounding over the handles.",
      "Hold your arms fixed so your leg drive goes straight into the sled.",
      "Start with a light load, because the effort climbs quickly.",
      "Keep the sled moving, as restarting from a standstill is the hardest part."
    ],
    "icon": "exercise-sled-push"
  },
  {
    "id": "DF20A1CC-73C2-547F-8B63-4F4399AD88DF",
    "name": "Shadow Boxing",
    "category": "hiit",
    "muscleGroups": [
      "fullBody",
      "shoulders",
      "core"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand in a boxing stance with one foot forward, knees soft, fists by your chin and elbows tucked in.",
      "Throw straight punches with your front and rear hands, turning your hips into each one.",
      "Mix in hooks and uppercuts, bringing your hand back to your chin after every punch.",
      "Stay light on your feet and move forwards, backwards and sideways between combinations.",
      "Keep punching at a pace that has you breathing hard for the whole interval."
    ],
    "tips": [
      "Stop each punch just short of locking your elbow straight.",
      "Rotate your hips and pivot on your back foot so the punch comes from your whole body.",
      "Keep the hand that is not punching up by your chin.",
      "Breathe out sharply with each punch."
    ],
    "icon": "exercise-shadow-boxing"
  },
  {
    "id": "C6A3F79B-2F4A-548E-8CB5-8F510C0B3FD7",
    "name": "Heavy Bag Combinations",
    "category": "hiit",
    "muscleGroups": [
      "fullBody",
      "shoulders",
      "core"
    ],
    "equipment": "other",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Wrap your hands, put on boxing gloves and stand in your boxing stance an arm's length from the bag.",
      "Start with a jab and a cross, landing with your knuckles and a straight wrist.",
      "Build up combinations such as jab, cross, front-hand hook, then add body shots.",
      "Move around the bag between combinations, bringing your hands back to your chin.",
      "Work in rounds, mixing steady punching with short all-out flurries."
    ],
    "tips": [
      "Always wear hand wraps and gloves, and keep your wrist straight on impact.",
      "Hit and snap your hand back rather than pushing the bag away.",
      "Start at around half power until your technique feels solid.",
      "Keep your feet under you instead of leaning into the bag."
    ],
    "icon": "exercise-heavy-bag-combinations"
  },
  {
    "id": "28BD724A-95EF-522C-9361-56460D10B743",
    "name": "Shuttle Run",
    "category": "hiit",
    "muscleGroups": [
      "legs",
      "fullBody"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Set two markers 10 to 20 metres apart on a flat surface.",
      "Sprint from the first marker to the second.",
      "Slow down with short steps, bend your knees and touch the ground at the marker with one hand.",
      "Push off your outside foot and sprint back.",
      "Keep going for the interval or for a set number of lengths."
    ],
    "tips": [
      "Slow down over several short steps rather than one hard stop.",
      "Alternate the side you turn on so both legs share the work.",
      "Use a non-slip surface and shoes with good grip.",
      "Warm up thoroughly before your first fast length."
    ],
    "icon": "exercise-shuttle-run"
  },
  {
    "id": "A1B7E3A5-3B45-57C0-AA31-F32F60E0F9F5",
    "name": "Sprint",
    "category": "hiit",
    "muscleGroups": [
      "legs",
      "fullBody"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Warm up with at least five minutes of easy jogging and a few faster build-up runs.",
      "Accelerate smoothly over the first few strides with a slight forward lean.",
      "Run at close to full effort for 10 to 30 seconds, driving your knees and arms.",
      "Ease down gradually rather than stopping dead.",
      "Walk until your breathing settles before the next sprint."
    ],
    "tips": [
      "Never sprint cold, as fast running needs a thorough warm-up.",
      "Stay tall and relaxed, because tense shoulders and a clenched jaw slow you down.",
      "Swing your arms forwards and back, not across your body.",
      "End the session when your speed drops noticeably."
    ],
    "icon": "exercise-sprint"
  },
  {
    "id": "9E68B04A-652C-54C8-8F37-389ED1C50ACA",
    "name": "Stair Sprint",
    "category": "hiit",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "other",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Find a clear, dry flight of stairs with at least ten steps.",
      "Run up quickly, placing the whole ball of your foot on each step and pumping your arms.",
      "Lean slightly forwards from your ankles and look a few steps ahead.",
      "Walk back down slowly as your recovery.",
      "Go again once your breathing has eased."
    ],
    "tips": [
      "Always walk down, because running downstairs is where falls happen.",
      "Take one step at a time until you feel confident, then try two.",
      "Make sure the stairs are well lit and free of obstacles."
    ],
    "icon": "exercise-stair-sprint"
  },
  {
    "id": "26A6E36E-541E-5095-9FC5-9C19CE990EF9",
    "name": "Walking",
    "category": "cardio",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "distance",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Put on comfortable, supportive shoes and start at an easy pace for the first few minutes.",
      "Walk tall with your eyes ahead and your shoulders relaxed.",
      "Land on your heel and roll through your foot to push off from your toes.",
      "Swing your arms naturally from the shoulder.",
      "Build up to a brisk pace where you are breathing faster but can still hold a conversation."
    ],
    "tips": [
      "At a brisk walking pace you should be able to talk but not sing.",
      "Make your walks longer before you worry about making them faster.",
      "Shorter, quicker steps work better than over-striding.",
      "To power walk, bend your elbows to a right angle and drive your arms."
    ],
    "icon": "exercise-walking"
  },
  {
    "id": "889E010B-A814-5393-93E3-A98CD27AB3C5",
    "name": "Hiking",
    "category": "cardio",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "distance",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Choose a route that suits your fitness and check the distance, the climb and the weather.",
      "Wear footwear with good grip and carry water, a snack and an extra layer.",
      "Start at an easy pace and shorten your stride on climbs.",
      "Place your whole foot on uneven ground and keep your knees soft on descents.",
      "Take short breaks to drink and eat on longer walks."
    ],
    "tips": [
      "Tell someone your route and when you expect to be back if you are heading somewhere remote.",
      "Walking poles help with balance on steep or rough ground.",
      "Pace the climbs so that you could still chat."
    ],
    "icon": "exercise-hiking"
  },
  {
    "id": "216B1EFD-FD98-5558-B078-1A88ACA30F6D",
    "name": "Incline Treadmill Walk",
    "category": "cardio",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "machine",
    "tracking": "time",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Walk on the flat at a comfortable speed for three to five minutes.",
      "Raise the incline gradually to somewhere between 5 and 12 per cent.",
      "Set a brisk speed that you can hold without gripping the handrails.",
      "Walk tall with a slight lean from your ankles and swing your arms.",
      "Lower the incline and speed for a few minutes to cool down."
    ],
    "tips": [
      "If you need to hold the handrails, lower the incline instead.",
      "Take shorter steps as the slope gets steeper.",
      "Increase the incline or the time, but not both in the same session."
    ],
    "icon": "exercise-incline-treadmill-walk"
  },
  {
    "id": "81AC5951-7814-5155-A1D9-8EEA6185CB3C",
    "name": "Indoor Rowing",
    "category": "cardio",
    "muscleGroups": [
      "fullBody",
      "legs",
      "back"
    ],
    "equipment": "machine",
    "tracking": "time",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Strap your feet in and hold the handle with straight arms, shins vertical and body leaning slightly forwards.",
      "Push with your legs first, keeping your arms straight.",
      "As your legs straighten, lean back slightly and pull the handle to your lower ribs.",
      "Return in reverse order by straightening your arms, leaning forwards and then bending your knees.",
      "Keep a smooth rhythm, taking about twice as long to slide forwards as to drive back."
    ],
    "tips": [
      "Remember the order: legs, body, arms on the way back, then arms, body, legs on the way forwards.",
      "Most of the power should come from your legs, not your arms.",
      "Keep your back long rather than hunching at the front of the stroke.",
      "Let the handle pass your knees before you bend them on the way forwards."
    ],
    "icon": "exercise-indoor-rowing"
  },
  {
    "id": "AE88F046-4FE7-5FEC-A60C-A329A11D38E1",
    "name": "Swimming",
    "category": "cardio",
    "muscleGroups": [
      "fullBody",
      "back",
      "shoulders"
    ],
    "equipment": "pool",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Warm up with a few easy lengths in a stroke you are comfortable with.",
      "Keep your body long and level in the water with your hips near the surface.",
      "Breathe out steadily underwater and breathe in quickly when you turn or lift your head.",
      "Swim at a steady pace, taking short rests at the wall when you need them.",
      "Finish with one or two very easy lengths."
    ],
    "tips": [
      "Smooth, relaxed strokes carry you further than fast, splashy ones.",
      "Mix different strokes to spread the work across more muscles.",
      "Break the session into sets, such as four lengths followed by a short rest.",
      "Swim where a lifeguard is on duty or with someone else nearby."
    ],
    "icon": "exercise-swimming"
  },
  {
    "id": "4AB224A1-AB3C-58E6-99DC-40D1028FC0CA",
    "name": "Elliptical Trainer",
    "category": "cardio",
    "muscleGroups": [
      "fullBody",
      "legs"
    ],
    "equipment": "machine",
    "tracking": "time",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Step onto the pedals, hold the moving handles and start striding forwards at a low resistance.",
      "Stand tall with your weight spread evenly through each foot.",
      "Push and pull the handles in time with your legs.",
      "Raise the resistance until you are breathing harder but your stride is still smooth.",
      "Ease off for the last few minutes to cool down."
    ],
    "tips": [
      "Do not lean on the handles or slump forwards.",
      "Keep your heels down rather than riding up on your toes.",
      "Too little resistance makes the stride bouncy, so add enough to feel a steady push."
    ],
    "icon": "exercise-elliptical-trainer"
  },
  {
    "id": "D5B988EF-AE3F-5E6D-8892-0E6EEB1436D4",
    "name": "Stair Climber",
    "category": "cardio",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "machine",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Step on and start at a slow speed with your hands resting lightly on the rails.",
      "Stand upright and place your whole foot on each step.",
      "Push through your heel to straighten your leg as the next step arrives.",
      "Find a steady rhythm and build the speed gradually.",
      "Slow the machine right down before you step off."
    ],
    "tips": [
      "Do not rest your weight on the rails, as that takes the work away from your legs.",
      "Look ahead rather than down at your feet.",
      "Start with five to ten minutes, because it is harder than it looks."
    ],
    "icon": "exercise-stair-climber"
  },
  {
    "id": "A9A73EC9-70D6-5DDF-B5C2-654F3B757F82",
    "name": "Indoor Cycling",
    "category": "cardio",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "machine",
    "tracking": "time",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Set the saddle at about hip height so your knee stays slightly bent at the bottom of the pedal stroke.",
      "Adjust the handlebars so you can reach them with relaxed shoulders and soft elbows.",
      "Warm up with light resistance for five minutes.",
      "Follow a class or your own plan, changing resistance and pedalling speed for climbs, sprints and recoveries.",
      "Finish with a few minutes of easy pedalling."
    ],
    "tips": [
      "Always keep some resistance on so the pedals do not run away from you.",
      "If your hips bounce in the saddle, add resistance.",
      "Pedal in smooth circles rather than stamping down.",
      "Keep water and a towel within reach."
    ],
    "icon": "exercise-indoor-cycling"
  },
  {
    "id": "FD1B6BBE-F66B-525E-8790-E59C3A885105",
    "name": "Cross-Country Skiing",
    "category": "cardio",
    "muscleGroups": [
      "fullBody",
      "legs",
      "arms"
    ],
    "equipment": "other",
    "tracking": "distance",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Start on flat, prepared tracks using the classic stride.",
      "Kick down and back with one foot and glide forwards on the other ski.",
      "Plant the opposite pole beside your foot and push it back past your hip.",
      "Shift your weight fully onto the gliding ski before the next kick.",
      "Keep your ankles and knees bent and lean slightly forwards from your ankles."
    ],
    "tips": [
      "Commit your weight to one ski at a time rather than shuffling on both.",
      "Push the poles backwards, not straight down.",
      "Dress in thin layers, because you warm up quickly once you are moving.",
      "Learn to snowplough to control your speed before trying hilly routes."
    ],
    "icon": "exercise-cross-country-skiing"
  },
  {
    "id": "04D490EA-D549-5604-83B6-BE1E3F8179C8",
    "name": "Ski Ergometer",
    "category": "cardio",
    "muscleGroups": [
      "fullBody",
      "core",
      "arms"
    ],
    "equipment": "machine",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand facing the machine with your feet hip-width apart and a handle in each hand above head height.",
      "Start the pull by tightening your abdominals and driving the handles down.",
      "Push your hips back and bend your knees slightly as your hands pass your thighs.",
      "Finish with your hands just past your hips, then stand tall and let your arms rise again.",
      "Repeat in a smooth, continuous rhythm."
    ],
    "tips": [
      "Use your body weight and trunk to pull, not just your arms.",
      "Keep your arms slightly bent and close to your body.",
      "Push your hips back with soft knees rather than dropping into a deep squat."
    ],
    "icon": "exercise-ski-ergometer"
  },
  {
    "id": "BF727DC0-CC3F-5521-97A4-4B7199D901F6",
    "name": "Air Bike",
    "category": "cardio",
    "muscleGroups": [
      "fullBody",
      "legs",
      "arms"
    ],
    "equipment": "machine",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Set the saddle so your knee is slightly bent at the bottom of the pedal stroke.",
      "Sit tall, hold the moving handles and start pedalling gently.",
      "Push and pull the handles in time with your legs.",
      "Build to a steady effort, remembering that the fan resists more the harder you go.",
      "Pedal easily for a few minutes before you get off."
    ],
    "tips": [
      "Pace yourself, as going flat out in the first minute is the classic mistake.",
      "Keep your back long instead of hunching or rocking from side to side.",
      "For intervals, alternate short hard bursts with easy pedalling."
    ],
    "icon": "exercise-air-bike"
  },
  {
    "id": "CEB8539D-DC7F-5F03-90CD-98741A254272",
    "name": "Run-Walk Intervals",
    "category": "cardio",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Walk briskly for five minutes to warm up.",
      "Jog at an easy, conversational pace for one minute.",
      "Walk for one to two minutes until your breathing settles.",
      "Repeat the run and walk blocks for 20 to 30 minutes.",
      "Finish with five minutes of easy walking."
    ],
    "tips": [
      "Run slowly enough that you could speak in short sentences.",
      "Take the walk breaks from the very start instead of waiting until you are exhausted.",
      "Over the weeks, lengthen the runs or shorten the walks a little at a time.",
      "Leave a rest day between sessions while you are starting out."
    ],
    "icon": "exercise-run-walk-intervals"
  },
  {
    "id": "EEE73664-012F-529F-A8EF-324A46717EF8",
    "name": "Trail Running",
    "category": "cardio",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "distance",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Choose a marked trail and start at an easier pace than you would run on the road.",
      "Take short, quick steps and land with your feet under your body.",
      "Look a few metres ahead to pick your line over roots and rocks.",
      "Walk the steep climbs and start running again when the slope eases.",
      "Lean slightly forwards on descents and hold your arms out a little for balance."
    ],
    "tips": [
      "Judge the run by effort and time rather than pace, because trails are slower than roads.",
      "Lift your feet a little higher than you would on tarmac.",
      "Wear shoes with good grip for mud and loose ground.",
      "Carry a phone and tell someone your plan on remote routes."
    ],
    "icon": "exercise-trail-running"
  },
  {
    "id": "FC59900D-57C8-5FD0-B8D3-28AC87F4EB39",
    "name": "Dance Cardio",
    "category": "cardio",
    "muscleGroups": [
      "fullBody",
      "legs"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Clear some floor space and put on upbeat music or follow a class.",
      "Start with simple steps such as side steps and grapevines to warm up.",
      "Add arm movements and bigger travelling steps as you get warmer.",
      "March on the spot between songs so you keep moving.",
      "Wind down with a gentler song at the end."
    ],
    "tips": [
      "Staying in motion matters more than getting the steps perfect.",
      "For a low-impact session, keep one foot on the floor at all times.",
      "Wear supportive trainers and dance on a floor that lets your feet turn easily."
    ],
    "icon": "exercise-dance-cardio"
  },
  {
    "id": "216D079B-D247-503E-9B93-A92F6686B1CA",
    "name": "Inline Skating",
    "category": "cardio",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "other",
    "tracking": "distance",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Put on a helmet, wrist guards, knee pads and elbow pads.",
      "Stand with your knees bent, your weight over the middle of the skates and your hands in front of you.",
      "Push one skate out and back at an angle and glide on the other.",
      "Bring the pushing foot back under your hip and push with the other leg.",
      "Stay low and practise braking before you build up speed."
    ],
    "tips": [
      "Learn to stop on flat ground before you go anywhere with a slope.",
      "Choose smooth, dry, traffic-free paths.",
      "Keep your knees bent, because standing up straight makes it easy to tip backwards.",
      "Look ahead rather than down at your skates."
    ],
    "icon": "exercise-inline-skating"
  },
  {
    "id": "E162728A-D93D-5768-B32E-428D490992F9",
    "name": "Mountain Pose",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Tadasana",
    "instructions": [
      "Stand with your feet together or hip-width apart and spread your weight evenly across both feet.",
      "Firm your thighs gently and lengthen your tailbone towards the floor without tucking hard.",
      "Roll your shoulders back and down and let your arms hang by your sides with palms facing forward.",
      "Reach the crown of your head upward, keep your chin level and breathe steadily."
    ],
    "tips": [
      "Keep a soft micro-bend in the knees rather than locking them.",
      "Stand with your back against a wall to feel the alignment if you are unsure.",
      "Keep your ribs stacked over your hips instead of letting them flare forward."
    ],
    "icon": "exercise-mountain-pose"
  },
  {
    "id": "4AE2F8BB-EECB-564F-9674-34FFBB119677",
    "name": "Standing Forward Fold",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Uttanasana",
    "instructions": [
      "Stand with your feet hip-width apart and place your hands on your hips.",
      "Exhale and hinge forward from the hips, keeping your spine long as you come down.",
      "Rest your hands on the floor, your shins or a pair of blocks and let your head hang heavy.",
      "Shift your weight slightly towards the balls of your feet so your hips stay over your ankles.",
      "To come up, bend your knees, press through your feet and rise slowly with a long back."
    ],
    "tips": [
      "Bend your knees as much as you need so your belly can rest towards your thighs.",
      "Fold from the hips rather than rounding from the waist.",
      "Come up slowly if you tend to feel light-headed."
    ],
    "icon": "exercise-standing-forward-fold"
  },
  {
    "id": "C684C727-E367-5092-B7A7-1B94C8138259",
    "name": "Chair Pose",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "core",
      "shoulders"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Utkatasana",
    "instructions": [
      "Stand with your feet together or hip-width apart.",
      "Inhale and reach your arms overhead with palms facing each other.",
      "Exhale, bend your knees and sit your hips back as if lowering onto a chair.",
      "Keep your weight in your heels, your chest lifted and your lower ribs drawn in.",
      "Hold and breathe, then press through your feet to stand."
    ],
    "tips": [
      "You should still be able to see your toes in front of your knees.",
      "Lower your arms to shoulder height or put your hands on your hips if your shoulders are tight.",
      "Lengthen your tailbone down so the lower back does not arch deeply."
    ],
    "icon": "exercise-chair-pose"
  },
  {
    "id": "879C7E0D-B2C2-5557-96A5-A7BFB1B62ACC",
    "name": "Downward-Facing Dog",
    "category": "yoga",
    "muscleGroups": [
      "shoulders",
      "legs",
      "back"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Adho Mukha Svanasana",
    "instructions": [
      "Start on hands and knees with your hands shoulder-width apart and slightly ahead of your shoulders.",
      "Spread your fingers, tuck your toes and lift your knees off the floor.",
      "Push the floor away and send your hips up and back to form an inverted V.",
      "Lengthen your spine first, then gently work your heels towards the floor.",
      "Let your head hang between your upper arms and breathe evenly."
    ],
    "tips": [
      "Keep your knees bent if your hamstrings are tight so your back can stay long.",
      "Press through the base of your index fingers and thumbs to take load off the wrists.",
      "Turn your upper arms outward so your shoulders do not bunch up by your ears."
    ],
    "icon": "exercise-downward-facing-dog"
  },
  {
    "id": "35997C33-463B-570B-B4B1-311296B6C7D7",
    "name": "Upward-Facing Dog",
    "category": "yoga",
    "muscleGroups": [
      "back",
      "chest",
      "arms"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "Urdhva Mukha Svanasana",
    "instructions": [
      "Lie face down with your legs extended, the tops of your feet on the floor and your hands beside your lower ribs.",
      "Inhale, press into your hands and straighten your arms, lifting your chest forward and up.",
      "Press the tops of your feet down so your thighs and knees lift off the floor.",
      "Draw your shoulders back and down, keeping your wrists under your shoulders.",
      "Look straight ahead, then exhale to lower down or lift back to Downward-Facing Dog."
    ],
    "tips": [
      "Only your hands and the tops of your feet touch the floor, so swap to Cobra Pose if that strains your back.",
      "Keep your legs active and your buttocks firm but not clenched.",
      "Avoid dropping your head back or sinking between your shoulders."
    ],
    "icon": "exercise-upward-facing-dog"
  },
  {
    "id": "56B1EA3F-FFBF-5E10-944D-3881EFB6C263",
    "name": "Cobra Pose",
    "category": "yoga",
    "muscleGroups": [
      "back",
      "chest"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Bhujangasana",
    "instructions": [
      "Lie face down with your legs extended and the tops of your feet pressing into the floor.",
      "Place your hands under your shoulders with your elbows hugged in to your sides.",
      "Inhale and peel your head and chest off the floor, using mainly your back muscles.",
      "Keep your elbows bent, your hips on the floor and your shoulders away from your ears.",
      "Hold for a few breaths, then exhale and lower slowly."
    ],
    "tips": [
      "Lift only as high as you can while keeping your hips and pubic bone on the floor.",
      "Keep the back of your neck long instead of looking up at the ceiling.",
      "Ease off if you feel pinching in the lower back."
    ],
    "icon": "exercise-cobra-pose"
  },
  {
    "id": "EA55B9F0-5849-5A71-8260-154D10B89C26",
    "name": "Sphinx Pose",
    "category": "yoga",
    "muscleGroups": [
      "back",
      "chest"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Salamba Bhujangasana",
    "instructions": [
      "Lie face down with your legs extended hip-width apart.",
      "Place your elbows under your shoulders with your forearms parallel and palms flat.",
      "Inhale and lift your chest, pressing your forearms down and drawing your chest gently forward.",
      "Relax your shoulders away from your ears and breathe slowly."
    ],
    "tips": [
      "Slide your elbows a little further forward if your lower back feels compressed.",
      "Keep your gaze forward and your neck in line with your spine.",
      "Lightly draw in your lower belly to support the lower back."
    ],
    "icon": "exercise-sphinx-pose"
  },
  {
    "id": "C74EBFC8-7415-5C1D-B8D3-51B0A85FD0B9",
    "name": "Four-Limbed Staff Pose",
    "category": "yoga",
    "muscleGroups": [
      "arms",
      "chest",
      "core"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "Chaturanga Dandasana",
    "instructions": [
      "Start in a high plank with your shoulders over your wrists and your body in one straight line.",
      "Shift your weight slightly forward onto your toes.",
      "Exhale and bend your elbows straight back along your ribs, lowering until your upper arms are about parallel to the floor.",
      "Hold with your body rigid and hovering, then push back up or lower to the floor."
    ],
    "tips": [
      "Usually just called Chaturanga in classes.",
      "Lower your knees to the floor first until you can keep your body in one line.",
      "Do not let your shoulders dip below elbow height.",
      "Keep your elbows pointing back rather than flaring out to the sides."
    ],
    "icon": "exercise-four-limbed-staff-pose"
  },
  {
    "id": "AD40CCBC-F0F5-5EAD-9818-2F7DD6EC6034",
    "name": "Child's Pose",
    "category": "yoga",
    "muscleGroups": [
      "back",
      "shoulders"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Balasana",
    "instructions": [
      "Kneel with your big toes touching and your knees together or wide apart.",
      "Sit your hips back towards your heels.",
      "Fold forward and rest your forehead on the floor or a cushion.",
      "Stretch your arms out in front or rest them alongside your body, and breathe into your back."
    ],
    "tips": [
      "Place a cushion between your hips and heels if your knees or ankles complain.",
      "Take your knees wider to make room for your belly and chest.",
      "Rest your forehead on stacked fists or a block if it does not reach the floor."
    ],
    "icon": "exercise-childs-pose"
  },
  {
    "id": "41F571EF-10BD-5FC7-88BD-72C40A1E68C9",
    "name": "Low Lunge",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Anjaneyasana",
    "instructions": [
      "From hands and knees or Downward-Facing Dog, step your right foot forward between your hands.",
      "Lower your left knee to the floor and untuck the back toes.",
      "Stack your front knee over your ankle and let your hips sink forward and down.",
      "Lift your torso and reach your arms overhead, or keep your hands on your front thigh.",
      "Hold, then switch sides."
    ],
    "tips": [
      "Pad the back knee with a folded blanket or a doubled-over mat.",
      "Keep the front knee tracking over the middle toes rather than collapsing inward.",
      "Draw your lower belly in so the stretch stays in the front of the back hip, not the lower back."
    ],
    "icon": "exercise-low-lunge"
  },
  {
    "id": "E85549F2-AA64-58CB-BC85-B86B87F060C7",
    "name": "High Lunge",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Ashta Chandrasana",
    "instructions": [
      "From a standing forward fold, step your left foot back about a leg's length and stay on the ball of the back foot.",
      "Bend your front knee over your ankle and keep the back leg strong and straight.",
      "Lift your torso upright and reach your arms overhead.",
      "Square your hips to the front and breathe, then switch sides."
    ],
    "tips": [
      "Also known as Crescent Lunge.",
      "Bend the back knee slightly if your lower back arches or your hip flexors feel tight.",
      "Keep your feet hip-width apart, as if on train tracks, to help your balance."
    ],
    "icon": "exercise-high-lunge"
  },
  {
    "id": "DFD2D56A-6860-557A-9CDA-FC1A71D0863A",
    "name": "Warrior I",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "core",
      "shoulders"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Virabhadrasana I",
    "instructions": [
      "Step your left foot back about a leg's length and turn it out roughly 45 degrees with the heel down.",
      "Bend your front knee over your ankle.",
      "Turn your hips and chest towards the front of the mat as far as is comfortable.",
      "Inhale and reach your arms overhead, keeping your shoulders relaxed.",
      "Press the outer edge of the back foot down, hold, then switch sides."
    ],
    "tips": [
      "Widen your stance from side to side if squaring the hips feels strained.",
      "Keep the back leg straight and active.",
      "Stop the front knee drifting inward by pointing it at the second toe."
    ],
    "icon": "exercise-warrior-i"
  },
  {
    "id": "F1659195-F84A-537A-B909-9A3F17289B22",
    "name": "Warrior II",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "shoulders",
      "core"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Virabhadrasana II",
    "instructions": [
      "Stand with your feet wide apart, turn your right foot out 90 degrees and your left foot slightly in.",
      "Bend your right knee until it is over your ankle, keeping the left leg straight.",
      "Stretch your arms out to the sides at shoulder height with palms down.",
      "Keep your torso upright over your hips and look over your front fingertips.",
      "Hold, then switch sides."
    ],
    "tips": [
      "Keep the front knee pointing towards the second toe.",
      "Keep your shoulders over your hips rather than leaning towards the front leg.",
      "Shorten your stance if your front thigh tires quickly."
    ],
    "icon": "exercise-warrior-ii"
  },
  {
    "id": "F3005D9D-B23A-5FDE-BE78-E2AB4114184B",
    "name": "Warrior III",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "core",
      "back"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "Virabhadrasana III",
    "instructions": [
      "From a high lunge, shift your weight onto your front foot.",
      "Hinge forward and lift your back leg until your torso and leg are about parallel to the floor.",
      "Keep both hip points facing the floor and flex the lifted foot.",
      "Reach your arms forward, out to the sides or back alongside your hips.",
      "Hold with a steady gaze on the floor, then switch sides."
    ],
    "tips": [
      "Keep a slight bend in the standing knee rather than locking it.",
      "Rest your hands on blocks or a chair back while you build balance.",
      "Do not let the hip of the lifted leg roll open."
    ],
    "icon": "exercise-warrior-iii"
  },
  {
    "id": "BE4E7B1E-80C8-5A5B-B485-1A11FACDFDC8",
    "name": "Extended Side Angle",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Utthita Parsvakonasana",
    "instructions": [
      "Start in Warrior II with your right knee bent.",
      "Rest your right forearm on your right thigh, or place your right hand on the floor or a block outside the foot.",
      "Sweep your left arm up and over your ear with the palm facing down.",
      "Rotate your chest towards the ceiling and make one long line from the back foot to the fingertips.",
      "Hold, then switch sides."
    ],
    "tips": [
      "Press lightly into the forearm rather than slumping onto the thigh.",
      "Keep the front knee over the ankle and pressing gently outward.",
      "Look down at the floor if looking up strains your neck."
    ],
    "icon": "exercise-extended-side-angle"
  },
  {
    "id": "D2E064DD-9221-5C82-9F9B-FA49E714B255",
    "name": "Triangle Pose",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Utthita Trikonasana",
    "instructions": [
      "Stand with your feet wide apart, right foot turned out 90 degrees and left foot turned slightly in.",
      "Stretch your arms out at shoulder height and reach your right hand forward over your right leg.",
      "Hinge at the right hip and lower your right hand to your shin, ankle or a block.",
      "Reach your left arm straight up and stack your shoulders.",
      "Keep both legs straight, hold, then switch sides."
    ],
    "tips": [
      "Rest your hand higher on the shin or on a block rather than rounding to reach the floor.",
      "Keep a micro-bend in the front knee to avoid locking it.",
      "Imagine your body between two panes of glass so your chest stays open."
    ],
    "icon": "exercise-triangle-pose"
  },
  {
    "id": "D75748B3-EE9D-59FF-A639-1BFE3F76D460",
    "name": "Pyramid Pose",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "Parsvottanasana",
    "instructions": [
      "Stand with your right foot forward and your left foot about a metre behind, back foot turned out slightly and both heels down.",
      "Square your hips to the front and put your hands on your hips.",
      "Inhale to lengthen your spine, then exhale and hinge forward over your front leg.",
      "Lower your hands to your shin, to blocks or to the floor either side of the front foot.",
      "Keep both legs straight but not locked, hold, then switch sides."
    ],
    "tips": [
      "Use blocks under your hands so your back can stay long.",
      "Draw the front hip back and the back hip forward to keep your hips level.",
      "Shorten or widen your stance if you feel wobbly."
    ],
    "icon": "exercise-pyramid-pose"
  },
  {
    "id": "3AFB93F4-3B93-532E-8EB4-6F00097C4C67",
    "name": "Wide-Legged Forward Fold",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Prasarita Padottanasana",
    "instructions": [
      "Stand with your feet wide apart and parallel, hands on your hips.",
      "Inhale to lift your chest, then exhale and hinge forward from the hips with a long spine.",
      "Place your hands on the floor under your shoulders.",
      "Let the crown of your head lower towards the floor and keep your weight even across both feet.",
      "To come up, bring your hands to your hips, bend your knees slightly and rise with a flat back."
    ],
    "tips": [
      "Put your hands on blocks or bend your knees if the floor feels far away.",
      "Press into the outer edges of your feet and lift your arches.",
      "Keep your hips over your ankles rather than sinking back into your heels."
    ],
    "icon": "exercise-wide-legged-forward-fold"
  },
  {
    "id": "DD2A9E74-05E9-5AFE-890F-A8E4400F4602",
    "name": "Goddess Pose",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Utkata Konasana",
    "instructions": [
      "Stand with your feet wide apart and turn your toes out about 45 degrees.",
      "Bend your knees and lower your hips towards knee height, with your knees tracking over your toes.",
      "Keep your torso upright and your tailbone pointing down.",
      "Raise your arms out to the sides with elbows bent at shoulder height and palms facing forward.",
      "Hold and breathe, then straighten your legs to come out."
    ],
    "tips": [
      "Press your knees back in line with your toes rather than letting them fall inward.",
      "Sink only as low as you can while keeping your torso upright.",
      "Rest your hands on your hips or thighs if your shoulders tire."
    ],
    "icon": "exercise-goddess-pose"
  },
  {
    "id": "D65CE6F0-0DE4-5F87-9924-AEDE5E469997",
    "name": "Garland Pose",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Malasana",
    "instructions": [
      "Stand with your feet slightly wider than your hips and your toes turned out.",
      "Bend your knees and lower your hips all the way down into a deep squat.",
      "Bring your palms together at your chest and press your elbows against the inside of your knees.",
      "Lift your chest and lengthen your spine, keeping your heels grounded."
    ],
    "tips": [
      "Also known as a yogi squat.",
      "Slide a rolled blanket under your heels if they lift.",
      "Sit on a block or low stool to take pressure off your knees and hips."
    ],
    "icon": "exercise-garland-pose"
  },
  {
    "id": "5FAD4E48-8398-5945-9899-E079C6A27EF2",
    "name": "Tree Pose",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Vrksasana",
    "instructions": [
      "Stand tall and shift your weight onto your left foot.",
      "Place the sole of your right foot on your left inner calf or inner thigh, never on the knee.",
      "Press the foot and the leg into each other and turn the bent knee out to the side.",
      "Bring your palms together at your chest or reach your arms overhead.",
      "Fix your gaze on a still point, hold, then switch sides."
    ],
    "tips": [
      "Keep the toes of the lifted foot on the floor like a kickstand if you wobble.",
      "Stand near a wall for light support.",
      "Keep the standing hip from jutting out to the side."
    ],
    "icon": "exercise-tree-pose"
  },
  {
    "id": "7A860879-503E-5ADF-A679-08841E9FAD2A",
    "name": "Eagle Pose",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "shoulders",
      "core"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "Garudasana",
    "instructions": [
      "Stand with your knees slightly bent and shift your weight onto your left foot.",
      "Cross your right thigh over your left and hook the right foot behind the left calf if you can.",
      "Cross your left arm over your right at the elbows, bend them and bring your palms or the backs of your hands together.",
      "Lift your elbows to shoulder height and sit your hips lower.",
      "Hold with a steady gaze, then unwind and switch sides."
    ],
    "tips": [
      "Rest the toes of the crossed leg on the floor beside the standing foot if you cannot hook it.",
      "Hug opposite shoulders instead if the arm wrap is not available to you.",
      "Keep your hips and chest facing squarely forward."
    ],
    "icon": "exercise-eagle-pose"
  },
  {
    "id": "282A66C4-94A5-5495-BABD-0BFC5A7332C8",
    "name": "Half Moon Pose",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "Ardha Chandrasana",
    "instructions": [
      "From Triangle Pose on the right side, bend your right knee and place your right fingertips on the floor or a block about a hand's length in front of your little toe.",
      "Shift your weight onto the right foot and lift your left leg to hip height.",
      "Straighten the standing leg and stack your left hip over your right.",
      "Reach your left arm straight up and flex the lifted foot.",
      "Hold with your gaze on the floor or to the side, then switch sides."
    ],
    "tips": [
      "Use a block under the lower hand to bring the floor closer.",
      "Practise with your back against a wall to learn the stacked position.",
      "Keep the standing knee pointing over the toes rather than rolling inward."
    ],
    "icon": "exercise-half-moon-pose"
  },
  {
    "id": "963CFDBD-31DD-5F0B-9641-B3C0DE6F7B7E",
    "name": "Boat Pose",
    "category": "yoga",
    "muscleGroups": [
      "core",
      "legs"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "Navasana",
    "instructions": [
      "Sit with your knees bent and feet flat, holding behind your thighs.",
      "Lean back slightly with a straight spine until you balance just behind your sitting bones.",
      "Lift your feet until your shins are parallel to the floor.",
      "Straighten your legs to form a V if you can keep your chest lifted.",
      "Reach your arms forward alongside your knees with palms facing in, and hold."
    ],
    "tips": [
      "Keep your knees bent or keep hold of your thighs while you build strength.",
      "Lift your breastbone so your lower back does not round.",
      "Breathe steadily instead of holding your breath."
    ],
    "icon": "exercise-boat-pose"
  },
  {
    "id": "3AFD0F0B-5F09-5025-B9B5-853C40FF441D",
    "name": "Bridge Pose",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "back",
      "chest"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Setu Bandha Sarvangasana",
    "instructions": [
      "Lie on your back with your knees bent and feet flat, hip-width apart and close to your hips.",
      "Rest your arms by your sides with palms down.",
      "Press into your feet and lift your hips towards the ceiling.",
      "Roll your shoulders under and clasp your hands beneath you if that is comfortable.",
      "Hold with your knees parallel, then lower your spine slowly to the floor."
    ],
    "tips": [
      "Keep your knees from splaying wider than your hips.",
      "Keep your head still and facing the ceiling to look after your neck.",
      "Slide a block under the back of your pelvis for a restful supported version."
    ],
    "icon": "exercise-bridge-pose"
  },
  {
    "id": "4832E684-4F22-5CD3-A286-52D5DBFE3D1B",
    "name": "Wheel Pose",
    "category": "yoga",
    "muscleGroups": [
      "back",
      "shoulders",
      "arms"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 3,
    "tier": "pro",
    "notes": "Urdhva Dhanurasana",
    "instructions": [
      "Lie on your back with your knees bent and feet hip-width apart, close to your hips.",
      "Place your palms on the floor beside your ears with your fingers pointing towards your shoulders.",
      "Press into your feet and hands and lift onto the crown of your head, keeping your elbows parallel.",
      "Push the floor away and straighten your arms, lifting your head clear.",
      "Hold for a few breaths, then tuck your chin and lower slowly onto your upper back."
    ],
    "tips": [
      "Warm up well with Bridge Pose, lunges and shoulder stretches first.",
      "Keep your feet parallel and stop your knees splaying outward.",
      "Skip this pose if your wrists, shoulders or back are troubling you, and stay with Bridge Pose instead.",
      "Hug your knees to your chest for a few breaths afterwards."
    ],
    "icon": "exercise-wheel-pose"
  },
  {
    "id": "4A35F5D0-70ED-5D86-909F-2EF317FBC0D6",
    "name": "Camel Pose",
    "category": "yoga",
    "muscleGroups": [
      "back",
      "chest",
      "legs"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "Ustrasana",
    "instructions": [
      "Kneel with your knees hip-width apart and your hips stacked over your knees.",
      "Place your hands on your lower back with fingers pointing down and draw your elbows towards each other.",
      "Lift your chest and lean back, keeping your hips pushing forward over your knees.",
      "Reach back for your heels one hand at a time if you can do so without collapsing into the lower back.",
      "To come out, bring your hands to your lower back and lead up with your chest."
    ],
    "tips": [
      "Tuck your toes under to raise your heels and shorten the reach.",
      "Keep your hands on your lower back if reaching for the heels pinches.",
      "Keep your neck long and only release the head back if it feels comfortable.",
      "Rest in Child's Pose afterwards."
    ],
    "icon": "exercise-camel-pose"
  },
  {
    "id": "4980DFEE-6F82-5422-B85F-C9EE93141719",
    "name": "Locust Pose",
    "category": "yoga",
    "muscleGroups": [
      "back",
      "legs"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Salabhasana",
    "instructions": [
      "Lie face down with your forehead on the floor, arms by your sides and palms facing up.",
      "Inhale and lift your head, chest, arms and legs off the floor together.",
      "Reach back through your fingers and toes, keeping your legs straight.",
      "Keep your gaze on the floor a little ahead of you and breathe.",
      "Exhale and lower down, turning your head to one side to rest."
    ],
    "tips": [
      "Lift only the chest or only the legs to make it easier.",
      "Aim for length rather than height.",
      "Keep the back of your neck long instead of craning your chin up."
    ],
    "icon": "exercise-locust-pose"
  },
  {
    "id": "4CB86D5C-2E16-567F-A6B9-40D2F88E881F",
    "name": "Seated Forward Fold",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Paschimottanasana",
    "instructions": [
      "Sit with your legs straight out in front and your feet flexed.",
      "Inhale and sit tall, lengthening through your spine.",
      "Exhale and hinge forward from the hips, leading with your chest.",
      "Hold your shins, ankles or feet, wherever you can reach without straining.",
      "Relax your neck and soften a little further with each exhale."
    ],
    "tips": [
      "Sit on a folded blanket and bend your knees if your lower back rounds.",
      "Loop a strap around your feet rather than pulling with rounded shoulders.",
      "Never bounce, and ease in gradually."
    ],
    "icon": "exercise-seated-forward-fold"
  },
  {
    "id": "99715E8D-0223-5DF2-A2B3-5D95CE2C89B2",
    "name": "Bound Angle Pose",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Baddha Konasana",
    "instructions": [
      "Sit tall and bring the soles of your feet together, letting your knees fall out to the sides.",
      "Draw your heels in towards your pelvis as far as is comfortable.",
      "Hold your feet or ankles and lengthen your spine.",
      "Stay upright, or hinge forward from the hips with a long back for a deeper stretch."
    ],
    "tips": [
      "Also known as Butterfly or Cobbler's Pose.",
      "Sit on a folded blanket or block if your knees sit higher than your hips.",
      "Support your knees with cushions rather than pushing them down."
    ],
    "icon": "exercise-bound-angle-pose"
  },
  {
    "id": "8B3ADEB0-2F90-5E9D-807B-20DE9E2B55DC",
    "name": "Cow Face Pose",
    "category": "yoga",
    "muscleGroups": [
      "shoulders",
      "legs",
      "arms"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "Gomukhasana",
    "instructions": [
      "Sit and cross your right knee directly over your left, with each foot beside the opposite hip.",
      "Sit evenly on both sitting bones and lengthen your spine.",
      "Reach your left arm up, bend the elbow and drop the hand between your shoulder blades.",
      "Bring your right arm behind your back and reach up to clasp the left hand.",
      "Hold, then swap the cross of both your legs and your arms."
    ],
    "tips": [
      "Hold a strap or towel between your hands if they do not meet.",
      "Sit on a block or keep the bottom leg straight if your hips are tight.",
      "Keep your head upright rather than letting the top arm push it forward."
    ],
    "icon": "exercise-cow-face-pose"
  },
  {
    "id": "F37518BF-F928-59E7-816B-3C875C4D7413",
    "name": "Half Lord of the Fishes",
    "category": "yoga",
    "muscleGroups": [
      "back",
      "core"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Ardha Matsyendrasana",
    "instructions": [
      "Sit with your legs straight, then bend your right knee and place the right foot flat outside your left thigh.",
      "Fold your left leg so the heel rests beside your right hip, or keep it straight.",
      "Inhale and sit tall, placing your right hand on the floor behind you.",
      "Exhale and twist to the right, hooking your left elbow outside your right knee or simply hugging the knee.",
      "Lengthen on each inhale and twist gently on each exhale, then switch sides."
    ],
    "tips": [
      "Twist from your mid-back and ribs rather than cranking with your arm or neck.",
      "Keep both sitting bones on the floor.",
      "Sit on a folded blanket if your lower back rounds."
    ],
    "icon": "exercise-half-lord-of-the-fishes"
  },
  {
    "id": "2B30C50C-DB16-5AAE-9311-0C420092112B",
    "name": "Supine Twist",
    "category": "yoga",
    "muscleGroups": [
      "back",
      "core"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Supta Matsyendrasana",
    "instructions": [
      "Lie on your back and hug your right knee into your chest, with the left leg extended along the floor.",
      "Stretch your right arm out to the side at shoulder height.",
      "Guide your right knee across your body to the left with your left hand.",
      "Turn your head to the right if that feels comfortable and keep both shoulders heavy.",
      "Breathe slowly, then return to the centre and switch sides."
    ],
    "tips": [
      "Rest the bent knee on a cushion if it does not reach the floor.",
      "Let the opposite shoulder stay down rather than forcing the knee lower.",
      "Bend both knees and drop them together for a gentler version."
    ],
    "icon": "exercise-supine-twist"
  },
  {
    "id": "C1604973-2973-56A0-9BCF-CC11614D5D2C",
    "name": "Happy Baby",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Ananda Balasana",
    "instructions": [
      "Lie on your back and draw both knees towards your chest.",
      "Hold the outer edges of your feet, or your shins, with your knees wider than your torso.",
      "Stack your ankles over your knees so the soles of your feet face the ceiling.",
      "Gently draw your knees towards the floor beside your ribs while keeping your tailbone heavy.",
      "Stay still or rock slowly from side to side."
    ],
    "tips": [
      "Hold behind your thighs or loop a strap around each foot if you cannot reach.",
      "Keep your head and shoulders relaxed on the floor.",
      "Do one leg at a time if both together feels like too much."
    ],
    "icon": "exercise-happy-baby"
  },
  {
    "id": "ACAF5B7C-7FEB-59A3-B563-CB3428AF1881",
    "name": "Pigeon Pose",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "Eka Pada Rajakapotasana",
    "instructions": [
      "From hands and knees or Downward-Facing Dog, bring your right knee forward to just behind your right wrist.",
      "Angle your right shin across the mat with the foot towards your left hip.",
      "Slide your left leg straight back with the top of the foot on the floor.",
      "Level your hips, then walk your hands forward and lower your chest towards the floor.",
      "Breathe slowly into the outer right hip, then switch sides."
    ],
    "tips": [
      "Place a block or cushion under the hip of the bent leg to keep your hips level.",
      "Come out straight away if you feel anything in the front knee, and try the Figure-Four Stretch on your back instead.",
      "Keep the front foot flexed to steady the knee."
    ],
    "icon": "exercise-pigeon-pose"
  },
  {
    "id": "55721589-7206-54AF-A083-258E80E9E715",
    "name": "Thread the Needle",
    "category": "yoga",
    "muscleGroups": [
      "shoulders",
      "back"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Parsva Balasana",
    "instructions": [
      "Start on hands and knees with your hips over your knees.",
      "Inhale and reach your right arm up towards the ceiling, opening your chest.",
      "Exhale and slide the right arm under your left arm with the palm facing up.",
      "Lower your right shoulder and the side of your head to the floor.",
      "Keep your hips high over your knees, breathe, then switch sides."
    ],
    "tips": [
      "Rest your head on a cushion if it does not reach the floor comfortably.",
      "Press lightly into the supporting hand so weight does not dump into your neck.",
      "Walk the supporting hand forward or reach it overhead for more stretch."
    ],
    "icon": "exercise-thread-the-needle"
  },
  {
    "id": "01EC8A27-118E-51EE-82CA-D37976C40655",
    "name": "Crow Pose",
    "category": "yoga",
    "muscleGroups": [
      "arms",
      "core",
      "shoulders"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 3,
    "tier": "pro",
    "notes": "Bakasana",
    "instructions": [
      "Squat with your feet close together and place your hands flat on the floor, shoulder-width apart.",
      "Bend your elbows slightly and rest your knees high on the backs of your upper arms.",
      "Rise onto your toes, lean forward and look at the floor ahead of your hands.",
      "Lift one foot and then the other, drawing your heels towards your hips.",
      "Hug your knees in, round your upper back and hold, then lower your feet with control."
    ],
    "tips": [
      "Put a cushion in front of your face while you learn, in case you tip forward.",
      "Look forward rather than down between your hands to keep your balance.",
      "Practise lifting one foot at a time before trying both.",
      "Spread your fingers wide and grip the floor with your fingertips."
    ],
    "icon": "exercise-crow-pose"
  },
  {
    "id": "350F6366-CD49-5E97-BA93-1D46D14FD7D2",
    "name": "Shoulder Stand",
    "category": "yoga",
    "muscleGroups": [
      "shoulders",
      "core",
      "back"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "Salamba Sarvangasana",
    "instructions": [
      "Lie on your back with your shoulders on a folded blanket and your head on the floor beyond its edge.",
      "Bend your knees, press your arms down and roll your hips up over your shoulders.",
      "Support your lower back with your hands, keeping your elbows shoulder-width apart.",
      "Straighten your legs up towards the ceiling, stacking your hips over your shoulders as far as is comfortable.",
      "Keep your head still, gaze towards your chest and breathe calmly.",
      "To come out, bend your knees and roll down slowly with your hands supporting you."
    ],
    "tips": [
      "Never turn your head while you are up, because your neck is under load.",
      "Keep the weight on your shoulders and upper arms, and come down at once if you feel pressure or pain in your neck.",
      "Skip this pose if you have neck trouble, high blood pressure or eye pressure problems, and do Legs Up the Wall instead.",
      "Learn it with a teacher if you can."
    ],
    "icon": "exercise-shoulder-stand"
  },
  {
    "id": "9AC56BF0-4D36-5006-A770-16F5CC9DD8E0",
    "name": "Legs Up the Wall",
    "category": "yoga",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "wall",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Viparita Karani",
    "instructions": [
      "Sit sideways with one hip against a wall.",
      "Swing your legs up the wall as you lower your back and head to the floor.",
      "Shuffle your hips as close to the wall as feels comfortable.",
      "Rest your arms out to the sides with palms up and close your eyes.",
      "To come out, bend your knees, roll onto one side and pause before sitting up."
    ],
    "tips": [
      "Move your hips a little away from the wall if your hamstrings feel tight.",
      "Place a folded blanket or cushion under your hips for extra comfort.",
      "Come out if your feet tingle or go numb."
    ],
    "icon": "exercise-legs-up-the-wall"
  },
  {
    "id": "015CDE9F-1352-59C0-B81B-9494713B5CDF",
    "name": "Corpse Pose",
    "category": "yoga",
    "muscleGroups": [
      "fullBody"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "Savasana",
    "instructions": [
      "Lie on your back with your legs extended a little apart and your feet falling open.",
      "Rest your arms slightly away from your body with palms facing up.",
      "Close your eyes and let your whole body grow heavy.",
      "Breathe naturally and rest your attention on the breath without trying to control it.",
      "To finish, deepen your breath, wriggle your fingers and toes, roll onto one side and sit up slowly."
    ],
    "tips": [
      "Put a rolled blanket under your knees if your lower back feels tight.",
      "Cover yourself with a blanket, as the body cools quickly when still.",
      "If your mind wanders, simply bring your attention back to your breath."
    ],
    "icon": "exercise-corpse-pose"
  },
  {
    "id": "CFC0AB69-79B0-5FC5-AFD3-D41EC5AA4BA1",
    "name": "Sun Salutation A",
    "category": "yoga",
    "muscleGroups": [
      "fullBody"
    ],
    "equipment": "mat",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "Surya Namaskar A",
    "instructions": [
      "Stand in Mountain Pose, inhale and sweep your arms overhead, then exhale and fold forward over your legs.",
      "Inhale and lift your chest halfway with a flat back, then exhale, step or hop back and lower through Four-Limbed Staff Pose.",
      "Inhale into Upward-Facing Dog, then exhale and lift your hips back to Downward-Facing Dog.",
      "Stay in Downward-Facing Dog for five steady breaths.",
      "Step or hop your feet to your hands, inhale to a flat back and exhale to fold.",
      "Inhale and rise with your arms overhead, then exhale back to Mountain Pose to finish one round."
    ],
    "tips": [
      "One rep is one full round from Mountain Pose back to Mountain Pose.",
      "Link one movement to each breath, inhaling as you lift or open and exhaling as you fold or lower.",
      "Lower your knees, chest and chin to the floor and use Cobra Pose in place of the harder poses until you are stronger.",
      "Step back and forward instead of hopping while you learn the sequence."
    ],
    "icon": "exercise-sun-salutation-a"
  },
  {
    "id": "6A10A25B-7C70-5F67-8C50-70983310E2C8",
    "name": "Sun Salutation B",
    "category": "yoga",
    "muscleGroups": [
      "fullBody"
    ],
    "equipment": "mat",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "Surya Namaskar B",
    "instructions": [
      "From Mountain Pose, inhale and bend your knees into Chair Pose with your arms overhead, then exhale and fold forward with straight legs.",
      "Inhale to a flat back, exhale and lower through Four-Limbed Staff Pose, inhale to Upward-Facing Dog and exhale to Downward-Facing Dog.",
      "Step your right foot forward, turn the back heel down and inhale up into Warrior I, then exhale your hands down and flow through the lowering, Upward-Facing Dog and Downward-Facing Dog again.",
      "Repeat Warrior I with the left foot forward, flow through once more and hold Downward-Facing Dog for five breaths.",
      "Step or hop forward, inhale to a flat back and exhale to fold, then inhale into Chair Pose and exhale to stand in Mountain Pose."
    ],
    "tips": [
      "One rep is one full round with Warrior I on both sides.",
      "Learn Sun Salutation A first, as this version adds Chair Pose and Warrior I.",
      "Take an extra breath whenever you need it rather than rushing to keep up with the count.",
      "Check in each Warrior I that the back heel is grounded and the front knee is over the ankle."
    ],
    "icon": "exercise-sun-salutation-b"
  },
  {
    "id": "68BFB01F-C3BC-54B8-9D1E-4A563092D9CB",
    "name": "World's Greatest Stretch",
    "category": "mobility",
    "muscleGroups": [
      "legs",
      "back",
      "shoulders"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Step your right foot forward into a long lunge and place both hands on the floor inside the front foot.",
      "Keep the back leg straight and strong, or rest the back knee on the floor.",
      "Drop your right elbow towards the instep of your right foot.",
      "Rotate your chest to the right and reach your right arm up to the ceiling, following your hand with your eyes.",
      "Bring the hand back down, sit your hips back to straighten the front leg, then return to the lunge.",
      "Repeat for the set number of reps, then switch sides."
    ],
    "tips": [
      "Move slowly and pause for a breath in each position.",
      "Lower the back knee if you cannot keep your hips steady.",
      "Rotate through your upper back rather than just swinging the arm."
    ],
    "icon": "exercise-worlds-greatest-stretch"
  },
  {
    "id": "F338702B-D6F7-559D-B58C-6AF01E7555C7",
    "name": "90/90 Hip Switch",
    "category": "mobility",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Sit on the floor with your knees bent, feet flat and wider than your hips, and your hands on the floor behind you.",
      "Drop both knees to the right so that each knee is bent to about 90 degrees.",
      "Sit tall over the front shin for a moment.",
      "Lift your knees back through the centre and drop them to the left, keeping your heels on the floor.",
      "Keep switching slowly from side to side, counting each side as one rep."
    ],
    "tips": [
      "Lean back on your hands as much as you need, and move them to your lap as it gets easier.",
      "Keep both sitting bones as close to the floor as you can without forcing.",
      "Ease off if you feel pinching in the hip or strain in the knee."
    ],
    "icon": "exercise-90-90-hip-switch"
  },
  {
    "id": "614D21B6-9639-5A8B-93F3-B3730DDD884C",
    "name": "Couch Stretch",
    "category": "mobility",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "wall",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Kneel facing away from a wall or sofa and place your right knee at its base, with the shin and top of the foot resting up against it.",
      "Step your left foot forward into a lunge with the foot flat.",
      "Squeeze your right buttock and tuck your tailbone slightly under.",
      "Lift your torso as upright as you can while keeping your ribs down.",
      "Hold, breathing slowly, then switch sides."
    ],
    "tips": [
      "Pad the back knee with a cushion or folded mat.",
      "Stay leaning forward with your hands on the floor or a chair if upright is too intense.",
      "Do not arch your lower back to get upright, as the stretch belongs in the front of the thigh and hip."
    ],
    "icon": "exercise-couch-stretch"
  },
  {
    "id": "D6AF4CF2-5D56-571B-852B-939FB2E34C5F",
    "name": "Standing Hamstring Stretch",
    "category": "mobility",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand tall and step your right foot a short stride forward with the heel down and toes lifted.",
      "Bend your left knee slightly and rest your hands on your hips or left thigh.",
      "Hinge forward from your hips with a flat back until you feel a stretch behind the right thigh.",
      "Hold and breathe, then switch sides."
    ],
    "tips": [
      "Keep your back long, because rounding the spine takes the stretch away from the hamstring.",
      "Keep a tiny bend in the front knee rather than locking it.",
      "Rest the front heel on a low step for a stronger stretch."
    ],
    "icon": "exercise-standing-hamstring-stretch"
  },
  {
    "id": "B6538A1B-4F25-591B-BDFD-A54E61C117D1",
    "name": "Figure-Four Stretch",
    "category": "mobility",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Lie on your back with both knees bent and feet flat.",
      "Cross your right ankle over your left thigh just above the knee and flex the right foot.",
      "Lift your left foot and thread your hands behind the left thigh.",
      "Draw both legs towards your chest until you feel a stretch in the right buttock and outer hip.",
      "Keep your head and shoulders down, hold, then switch sides."
    ],
    "tips": [
      "Keep the bottom foot on the floor if pulling in is too strong.",
      "Loop a towel behind the thigh if you cannot reach.",
      "At a desk, make the same shape seated by crossing an ankle over the opposite knee and leaning forward."
    ],
    "icon": "exercise-figure-four-stretch"
  },
  {
    "id": "BD100684-4AFD-5065-BDD7-A9B52207940D",
    "name": "Standing Quad Stretch",
    "category": "mobility",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand tall next to a wall or chair for balance.",
      "Bend your right knee and hold the right ankle or foot behind you with your right hand.",
      "Bring your knees side by side and draw the heel towards your buttock.",
      "Tuck your tailbone under and press the hip gently forward.",
      "Hold, then switch sides."
    ],
    "tips": [
      "Keep the knee pointing straight down rather than drifting out to the side.",
      "Stay upright without arching your lower back or leaning forward.",
      "Loop a towel around the ankle if you cannot reach the foot."
    ],
    "icon": "exercise-standing-quad-stretch"
  },
  {
    "id": "940AD14D-0F46-59DB-A493-EF0CE3F748A2",
    "name": "Wall Calf Stretch",
    "category": "mobility",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "wall",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand facing a wall with both hands on it at chest height.",
      "Step your right foot back about a stride with the toes pointing straight ahead.",
      "Press the right heel into the floor and keep the right knee straight.",
      "Bend the front knee and lean your hips towards the wall until you feel the back calf stretch.",
      "Hold, bend the back knee slightly to move the stretch lower down the calf, then switch sides."
    ],
    "tips": [
      "Keep the back heel down throughout.",
      "Make sure the back foot points forward rather than turning out.",
      "Step the foot further back for more stretch."
    ],
    "icon": "exercise-wall-calf-stretch"
  },
  {
    "id": "A24ED41D-1734-5BA0-A53E-DB5A828B8DCD",
    "name": "Knee-to-Wall Ankle Mobilisation",
    "category": "mobility",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "wall",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand facing a wall in a short split stance with your front toes about a hand's width from the wall.",
      "Rest your hands on the wall for balance.",
      "Keeping the front heel down, drive the front knee forward over your toes to touch the wall.",
      "Return to the start and repeat smoothly for the set number of reps.",
      "Move the foot a little further from the wall once it becomes easy, then switch sides."
    ],
    "tips": [
      "Keep the heel glued to the floor, and move closer to the wall if it lifts.",
      "Track the knee over the second and third toes rather than letting it cave inward.",
      "Do it half-kneeling if you prefer, and add a few slow ankle circles afterwards."
    ],
    "icon": "exercise-knee-to-wall-ankle-mobilisation"
  },
  {
    "id": "0F09CC56-1352-5EE7-A4BC-AA0C6A428A6F",
    "name": "Deep Squat Hold",
    "category": "mobility",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand with your feet about shoulder-width apart and your toes turned out slightly.",
      "Lower your hips as far as you comfortably can, keeping your heels on the floor.",
      "Rest your elbows inside your knees, or hold a door frame or sturdy post for support.",
      "Keep your chest lifted and gently shift your weight from side to side.",
      "Stand up by pressing through your whole foot."
    ],
    "tips": [
      "Hold onto something sturdy and lean back slightly if you tend to fall backwards.",
      "Raise your heels on a rolled towel or a book if they lift.",
      "Build up in short holds and come out if your knees hurt."
    ],
    "icon": "exercise-deep-squat-hold"
  },
  {
    "id": "EC24107E-106E-50CC-905C-99096F8475E9",
    "name": "Leg Swings",
    "category": "mobility",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "wall",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand side-on to a wall and rest one hand on it for balance.",
      "Shift your weight onto the leg nearest the wall and stand tall.",
      "Swing the outside leg forward and back in a relaxed, controlled arc.",
      "Let the range grow gradually over the reps without forcing the height.",
      "Complete the reps, then turn round and switch legs."
    ],
    "tips": [
      "Keep your torso upright and still so the movement comes from the hip.",
      "Start small and increase the swing as you warm up.",
      "Face the wall and swing the leg from side to side across your body to work a different direction."
    ],
    "icon": "exercise-leg-swings"
  },
  {
    "id": "7D3A1992-C0E1-507B-8204-531784DF2CEA",
    "name": "Arm Circles",
    "category": "mobility",
    "muscleGroups": [
      "shoulders"
    ],
    "equipment": "none",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand tall with your feet hip-width apart and your arms out to the sides at shoulder height.",
      "Draw small circles forward with straight arms, gradually making them bigger.",
      "Keep going until the circles are as large as feels comfortable.",
      "Reverse the direction for the next set."
    ],
    "tips": [
      "Keep your ribs down and avoid arching your back as your arms pass overhead.",
      "Keep your shoulders away from your ears.",
      "Move smoothly rather than flinging your arms."
    ],
    "icon": "exercise-arm-circles"
  },
  {
    "id": "0ED31F83-BDCE-525E-A927-6518C157CA94",
    "name": "Shoulder Pass-Through",
    "category": "mobility",
    "muscleGroups": [
      "shoulders",
      "chest"
    ],
    "equipment": "band",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand tall holding a resistance band, broomstick or towel with a wide overhand grip in front of your thighs.",
      "Keeping your arms straight, raise it up and over your head.",
      "Continue the arc behind you until it reaches your lower back, or as far as is comfortable.",
      "Reverse the movement to bring it back over to the front.",
      "Repeat slowly for the set number of reps."
    ],
    "tips": [
      "Start with a very wide grip and narrow it only as your shoulders allow.",
      "Keep your ribs down and do not arch your back or bend your elbows to get through.",
      "Stop short of any pinching, because this drill, sometimes called shoulder dislocates, should always feel smooth."
    ],
    "icon": "exercise-shoulder-pass-through"
  },
  {
    "id": "74B3FC13-256B-5C74-830A-F82A064B3778",
    "name": "Wall Angels",
    "category": "mobility",
    "muscleGroups": [
      "shoulders",
      "back"
    ],
    "equipment": "wall",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand with your back against a wall, your feet a short step away and your knees slightly bent.",
      "Press your lower back, upper back and head gently into the wall.",
      "Raise your arms into a goalpost shape with your elbows and the backs of your hands touching the wall if possible.",
      "Slide your arms up overhead as far as you can while keeping contact with the wall.",
      "Slide back down until your elbows are below shoulder height, and repeat."
    ],
    "tips": [
      "Do not let your lower back arch away from the wall or your ribs flare.",
      "Go only as high as you can keep your elbows and wrists close to the wall.",
      "Move slowly and keep your chin gently tucked."
    ],
    "icon": "exercise-wall-angels"
  },
  {
    "id": "6CE793E4-239E-5772-ADF5-018370D04810",
    "name": "Doorway Chest Stretch",
    "category": "mobility",
    "muscleGroups": [
      "chest",
      "shoulders"
    ],
    "equipment": "wall",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand in a doorway or at the edge of a wall and place your right forearm on the frame with the elbow bent at shoulder height.",
      "Step your right foot forward through the doorway.",
      "Lean your chest gently forward and turn slightly away from the arm until you feel a stretch across the chest.",
      "Hold and breathe, then switch sides."
    ],
    "tips": [
      "Keep your shoulder down and back rather than letting it roll forward.",
      "Move the elbow slightly higher or lower to change where you feel the stretch.",
      "Ease off if you feel pain or tingling in the front of the shoulder or down the arm."
    ],
    "icon": "exercise-doorway-chest-stretch"
  },
  {
    "id": "F89FC4B0-BFB6-5A8B-90BC-085BA02FBE2A",
    "name": "Cross-Body Shoulder Stretch",
    "category": "mobility",
    "muscleGroups": [
      "shoulders",
      "back"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand or sit tall and bring your right arm straight across your chest at shoulder height.",
      "Hook your left forearm or hand just above the right elbow.",
      "Gently draw the right arm closer to your chest.",
      "Keep your right shoulder down away from your ear, hold, then switch sides."
    ],
    "tips": [
      "Keep your torso facing forward rather than twisting with the arm.",
      "Pull on the upper arm, not on the elbow joint itself.",
      "Lower the arm slightly if you feel pinching at the front of the shoulder."
    ],
    "icon": "exercise-cross-body-shoulder-stretch"
  },
  {
    "id": "43C5EAA8-9688-5404-9713-A6D5E062F99A",
    "name": "Overhead Triceps Stretch",
    "category": "mobility",
    "muscleGroups": [
      "arms",
      "shoulders"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Stand or sit tall and raise your right arm overhead.",
      "Bend the elbow and let your right hand drop between your shoulder blades.",
      "Hold the right elbow with your left hand and gently guide it back and towards your head.",
      "Keep your ribs down and your head upright, hold, then switch sides."
    ],
    "tips": [
      "Keep your head upright rather than pushing it forward to make room for the arm.",
      "Avoid arching your lower back.",
      "Lean slightly to the opposite side to add a stretch down the side of your body."
    ],
    "icon": "exercise-overhead-triceps-stretch"
  },
  {
    "id": "EF24E1A7-6EF9-5AC1-983D-B6EC4241785F",
    "name": "Open Book Rotation",
    "category": "mobility",
    "muscleGroups": [
      "back",
      "chest"
    ],
    "equipment": "mat",
    "tracking": "reps",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Lie on your left side with your hips and knees bent to 90 degrees and your head on a cushion.",
      "Stretch both arms out in front of you at shoulder height with palms together.",
      "Keeping your knees stacked and on the floor, lift your right arm up and over, rotating your chest open to the right.",
      "Follow your hand with your eyes and let the right shoulder blade sink towards the floor.",
      "Pause for a breath, return to the start, and finish the reps before switching sides."
    ],
    "tips": [
      "Squeeze a cushion between your knees to stop them lifting and keep the rotation in your upper back.",
      "Go only as far as your shoulder comfortably allows.",
      "Exhale as you open."
    ],
    "icon": "exercise-open-book-rotation"
  },
  {
    "id": "FCA5678D-D65E-5BED-957D-5792442F3C80",
    "name": "Foam Roller Thoracic Extension",
    "category": "mobility",
    "muscleGroups": [
      "back",
      "chest"
    ],
    "equipment": "roller",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Sit on the floor with your knees bent and place a foam roller across your mid-back, just below the shoulder blades.",
      "Support your head with your hands, elbows pointing forward, and keep your hips on the floor.",
      "Inhale, then exhale and gently lean your upper back over the roller.",
      "Return to the start and repeat for a few reps.",
      "Shift the roller a little higher up your back and repeat, staying below the neck."
    ],
    "tips": [
      "Keep your lower ribs down so the movement comes from the upper back rather than the lower back.",
      "Never place the roller under your lower back or neck.",
      "Keep the movement small and slow."
    ],
    "icon": "exercise-foam-roller-thoracic-extension"
  },
  {
    "id": "49511DFB-58B6-5130-AC94-6FE45B24CE0A",
    "name": "Neck Stretch",
    "category": "mobility",
    "muscleGroups": [
      "shoulders",
      "back"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Sit or stand tall with your shoulders relaxed.",
      "Tilt your right ear slowly towards your right shoulder without lifting the shoulder.",
      "Rest your right hand lightly on the left side of your head for a little extra weight, and reach the left hand towards the floor.",
      "Hold and breathe, then return to the centre slowly and switch sides."
    ],
    "tips": [
      "Never pull hard on your head, as the weight of the hand is enough.",
      "Keep facing forward rather than letting your chin turn.",
      "Skip full head circles and move gently to the sides and forwards instead."
    ],
    "icon": "exercise-neck-stretch"
  },
  {
    "id": "92E672B8-45E5-55DB-A102-263A32EFF244",
    "name": "Wrist Stretch",
    "category": "mobility",
    "muscleGroups": [
      "arms"
    ],
    "equipment": "none",
    "tracking": "time",
    "level": 1,
    "tier": "free",
    "notes": "",
    "instructions": [
      "Hold your right arm straight out in front with the palm facing up.",
      "Use your left hand to gently draw the fingers down and back towards you until you feel the inner forearm stretch.",
      "Hold, then turn the palm to face down and gently press the back of the hand towards you to stretch the top of the forearm.",
      "Finish with a few slow wrist circles in each direction, then switch sides."
    ],
    "tips": [
      "Keep the elbow straight but not locked.",
      "Use light pressure only, as wrists do not need force.",
      "Do this before poses that load the hands, such as Downward-Facing Dog or Crow Pose."
    ],
    "icon": "exercise-wrist-stretch"
  },
  {
    "id": "ED7B61E6-E99F-59A3-88B1-4D7BF71A36AE",
    "name": "Frog Stretch",
    "category": "mobility",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "mat",
    "tracking": "time",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Start on hands and knees on a padded surface.",
      "Slide your knees out wide to the sides, keeping them level with your hips.",
      "Turn your feet out so the inner edges of your feet and shins rest on the floor, with ankles in line with knees.",
      "Lower onto your forearms and ease your hips back until you feel a stretch in the inner thighs.",
      "Hold and breathe slowly, then walk your hands forward and bring your knees together to come out."
    ],
    "tips": [
      "Pad your knees with a folded blanket.",
      "Go only as wide as you can relax in, as this is a strong stretch.",
      "Keep your back flat rather than letting the lower back sag."
    ],
    "icon": "exercise-frog-stretch"
  },
  {
    "id": "4721E76C-BF2C-54CD-ACF7-DB41D5E19B45",
    "name": "Foam Rolling",
    "category": "mobility",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "roller",
    "tracking": "time",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Place the roller under the muscle you want to work, such as the front or outside of the thigh, the calves, the glutes or the upper back.",
      "Support yourself with your hands or the other leg so you control how much weight goes onto the roller.",
      "Roll slowly along the length of the muscle, a few centimetres at a time.",
      "Pause on a tender spot and breathe for a few seconds until it eases, then move on.",
      "Spend about a minute on each area and repeat on the other side."
    ],
    "tips": [
      "Roll muscle only, never directly over joints, bones or the lower back.",
      "Pressure should feel like firm discomfort at most, never sharp pain.",
      "Keep breathing, and reduce the pressure if you catch yourself holding your breath."
    ],
    "icon": "exercise-foam-rolling"
  },
  {
    "id": "FE05F0EF-908E-5B9B-A4BA-1CF962A0B3E1",
    "name": "Back Squat",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Set the bar in a rack just below shoulder height and step under it so it rests across your upper back.",
      "Grip the bar just outside your shoulders, lift it out of the rack and step back with feet shoulder-width apart.",
      "Take a breath, brace your core and sit down and back, pushing your knees out over your toes.",
      "Lower until your thighs are at least parallel to the floor, keeping your chest up.",
      "Drive up through your whole foot until you are standing tall, then breathe out."
    ],
    "tips": [
      "Keep the bar over the middle of your foot the whole way down and up.",
      "Do not let your knees cave inward as you stand.",
      "Use safety bars or a spotter when the weight gets heavy."
    ],
    "icon": "exercise-back-squat"
  },
  {
    "id": "696D1627-173F-5376-A16E-D47ED09BD5DC",
    "name": "Goblet Squat",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Hold one dumbbell vertically against your chest, cupping the top end with both hands and pointing your elbows down.",
      "Stand with your feet a little wider than hip-width and your toes turned slightly out.",
      "Brace your midsection and sit down between your hips while keeping your chest tall.",
      "Lower until your thighs are at least parallel to the floor, or as deep as you can go with your heels flat.",
      "Push through the whole foot to stand back up."
    ],
    "tips": [
      "Keep the weight touching your chest so it does not pull you forward.",
      "Let your knees travel in line with your toes rather than caving inwards.",
      "A kettlebell held by the sides of its handle works just as well."
    ],
    "icon": "exercise-goblet-squat"
  },
  {
    "id": "C20576FB-388A-5E00-ABDE-AB936E4DEA78",
    "name": "Dumbbell Bench Press",
    "category": "strength",
    "muscleGroups": [
      "chest",
      "arms",
      "shoulders"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Sit on the end of a flat bench with a dumbbell on each thigh, then lie back and bring the weights to the sides of your chest.",
      "Plant your feet flat on the floor and squeeze your shoulder blades together against the bench.",
      "Press both dumbbells straight up until your arms are extended above your chest.",
      "Lower them under control until your upper arms are about level with the bench.",
      "Press again without bouncing out of the bottom position."
    ],
    "tips": [
      "Keep your elbows at roughly 45 degrees from your sides rather than flared straight out.",
      "Keep your wrists stacked over your elbows so the weights do not drift.",
      "To finish a set, bring the dumbbells back to your thighs and sit up instead of dropping them out to the sides."
    ],
    "icon": "exercise-dumbbell-bench-press"
  },
  {
    "id": "DBABE1F3-5259-5CFE-A625-3AA2DF1D89BA",
    "name": "Incline Dumbbell Press",
    "category": "strength",
    "muscleGroups": [
      "chest",
      "shoulders",
      "arms"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Set a bench to an incline of about 30 to 45 degrees and sit back with a dumbbell in each hand at shoulder height.",
      "Plant your feet and pull your shoulder blades back and down against the pad.",
      "Press the dumbbells up until your arms are straight above your upper chest.",
      "Lower them slowly until the weights are beside your upper chest."
    ],
    "tips": [
      "A steeper bench shifts more of the work to the shoulders, so keep the angle moderate.",
      "Do not let your lower back arch far off the pad as the reps get hard.",
      "Press in a straight vertical line rather than letting the weights drift forwards."
    ],
    "icon": "exercise-incline-dumbbell-press"
  },
  {
    "id": "5BFBB6C4-5E62-5315-BFC4-0035BE504413",
    "name": "Dumbbell Fly",
    "category": "strength",
    "muscleGroups": [
      "chest",
      "shoulders"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Lie on a flat bench holding two dumbbells above your chest with your palms facing each other.",
      "Soften your elbows into a slight bend and keep that angle fixed.",
      "Open your arms out to the sides in a wide arc until you feel a stretch across your chest.",
      "Squeeze your chest to bring the weights back together along the same arc."
    ],
    "tips": [
      "Use lighter weights than you press with, because the long lever makes this much harder.",
      "Stop the descent when your upper arms are about level with your torso rather than forcing extra depth.",
      "If your elbows bend more as you lower, the movement has turned into a press."
    ],
    "icon": "exercise-dumbbell-fly"
  },
  {
    "id": "5A1696C7-7608-510A-8B6C-038215D2B3E2",
    "name": "Dumbbell Lateral Raise",
    "category": "strength",
    "muscleGroups": [
      "shoulders"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand tall with a dumbbell in each hand by your sides and your palms facing in.",
      "Keep a slight bend in your elbows and raise both arms out to the sides.",
      "Stop when your hands reach shoulder height.",
      "Lower the weights slowly back to your sides."
    ],
    "tips": [
      "Lead with your elbows rather than your hands.",
      "If you need to swing your torso to lift the weights, they are too heavy.",
      "Keep your shoulders down and away from your ears."
    ],
    "icon": "exercise-dumbbell-lateral-raise"
  },
  {
    "id": "00CEACC2-7B03-5616-B1F7-FE340EC270BD",
    "name": "Dumbbell Front Raise",
    "category": "strength",
    "muscleGroups": [
      "shoulders"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with a dumbbell in each hand resting in front of your thighs, palms facing your body.",
      "Brace your midsection and keep a soft bend in your elbows.",
      "Raise the weights straight forward to shoulder height.",
      "Pause briefly, then lower them under control."
    ],
    "tips": [
      "Do not lean back to swing the weights up.",
      "Raise one arm at a time if lifting both together pulls you off balance.",
      "There is no need to lift higher than shoulder level."
    ],
    "icon": "exercise-dumbbell-front-raise"
  },
  {
    "id": "465BFE3B-6A79-5515-BEBB-DD6A0C09245B",
    "name": "Dumbbell Reverse Fly",
    "category": "strength",
    "muscleGroups": [
      "shoulders",
      "back"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Hold a dumbbell in each hand and hinge forward at the hips with a flat back until your torso is close to parallel with the floor.",
      "Let the weights hang below your chest with your palms facing each other and your elbows slightly bent.",
      "Raise your arms out to the sides until they are level with your shoulders.",
      "Squeeze your shoulder blades together briefly at the top.",
      "Lower the weights slowly to the start."
    ],
    "tips": [
      "Choose light weights, as the muscles at the back of the shoulder are small.",
      "Keep your neck in line with your spine by looking at the floor just ahead of you.",
      "Hold your torso still instead of bobbing up with each rep.",
      "Lying chest-down on an incline bench takes the effort out of your lower back."
    ],
    "icon": "exercise-dumbbell-reverse-fly"
  },
  {
    "id": "F8A771AB-6C30-5022-84F2-81DE3D7CCC64",
    "name": "Arnold Press",
    "category": "strength",
    "muscleGroups": [
      "shoulders",
      "arms"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Sit or stand holding two dumbbells in front of your shoulders with your palms facing you and your elbows tucked in.",
      "Begin pressing upwards while rotating your palms outwards.",
      "Finish with your arms straight overhead and your palms facing forward.",
      "Reverse the rotation as you lower the weights back in front of your shoulders."
    ],
    "tips": [
      "Blend the rotation and the press into one smooth motion.",
      "Keep your ribs down and avoid leaning back as the weights go up.",
      "Start lighter than you would for a standard shoulder press."
    ],
    "icon": "exercise-arnold-press"
  },
  {
    "id": "78945D5D-FB79-5281-B34A-2F1D94385163",
    "name": "Hammer Curl",
    "category": "strength",
    "muscleGroups": [
      "arms"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with a dumbbell in each hand at your sides, palms facing your thighs.",
      "Keep your upper arms against your sides and bend your elbows to lift the weights towards your shoulders.",
      "Keep your palms facing each other all the way up.",
      "Lower the weights slowly until your arms are straight."
    ],
    "tips": [
      "Do not let your elbows drift forward as you curl.",
      "Stand still and avoid rocking your body to start the lift.",
      "Alternating arms is fine if you prefer to focus on one side at a time."
    ],
    "icon": "exercise-hammer-curl"
  },
  {
    "id": "725F3591-E0B8-5079-9CC3-8432777D0E79",
    "name": "Dumbbell Triceps Extension",
    "category": "strength",
    "muscleGroups": [
      "arms"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Sit or stand holding one dumbbell with both hands and press it overhead.",
      "Keep your upper arms close to your head and pointing at the ceiling.",
      "Bend your elbows to lower the weight behind your head.",
      "Straighten your arms to lift it back overhead."
    ],
    "tips": [
      "Keep your elbows pointing forward rather than flaring wide.",
      "Brace your midsection so your lower back does not arch.",
      "Lower the weight only as far as you can control."
    ],
    "icon": "exercise-dumbbell-triceps-extension"
  },
  {
    "id": "B8CB6C83-608C-5F5B-9087-D626F9A55067",
    "name": "Dumbbell Kickback",
    "category": "strength",
    "muscleGroups": [
      "arms"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Hold a dumbbell in one hand and place the other hand and knee on a bench with your back flat.",
      "Raise your working upper arm until it is parallel to the floor and tight to your side, with the elbow bent to 90 degrees.",
      "Straighten the elbow to push the weight back until your arm is fully extended.",
      "Pause for a moment, then bend the elbow to return.",
      "Complete all reps on one side, then switch arms."
    ],
    "tips": [
      "Keep the upper arm still so that only the forearm moves.",
      "Use a light weight and avoid swinging it.",
      "Keep your shoulders square to the floor rather than twisting open."
    ],
    "icon": "exercise-dumbbell-kickback"
  },
  {
    "id": "D2D72B31-442E-5D72-B4E3-F8AB72B62A95",
    "name": "Dumbbell Pullover",
    "category": "strength",
    "muscleGroups": [
      "chest",
      "back"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Lie on a flat bench holding one dumbbell with both hands above your chest, arms nearly straight.",
      "Keep a slight bend in your elbows and lower the weight in an arc back over your head.",
      "Stop when your upper arms are roughly in line with your ears or you feel a strong stretch.",
      "Pull the weight back along the same arc until it is above your chest."
    ],
    "tips": [
      "Keep your hips down and stop your ribs from flaring as the weight travels back.",
      "Cup the inside of one end of the dumbbell with both palms for a secure hold.",
      "Start light until you know how far your shoulders move comfortably."
    ],
    "icon": "exercise-dumbbell-pullover"
  },
  {
    "id": "CA20E2C0-3FAD-52B4-88DA-1B093521E61C",
    "name": "Dumbbell Shrug",
    "category": "strength",
    "muscleGroups": [
      "back",
      "shoulders"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand tall with a dumbbell in each hand by your sides and your arms straight.",
      "Lift your shoulders straight up towards your ears as high as you can.",
      "Hold the top position for a moment.",
      "Lower slowly until your shoulders are fully relaxed downwards."
    ],
    "tips": [
      "Move straight up and down rather than rolling your shoulders in circles.",
      "Keep your arms straight so they act only as hooks.",
      "Keep your chin level and avoid pushing your head forward."
    ],
    "icon": "exercise-dumbbell-shrug"
  },
  {
    "id": "81A02B64-1C3F-5C7E-AE6D-020E8D5A5166",
    "name": "Dumbbell Walking Lunge",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand tall holding a dumbbell in each hand at your sides.",
      "Take a long step forward and lower until both knees are bent to about 90 degrees.",
      "Push through the front foot and bring the back leg through into the next step.",
      "Continue forward, alternating legs with each step."
    ],
    "tips": [
      "Keep your torso upright and your eyes forward.",
      "Let the back knee hover just above the floor rather than hitting it.",
      "Step as if on two parallel tracks, not a tightrope, to help your balance.",
      "If space is short, turn around or lunge on the spot."
    ],
    "icon": "exercise-dumbbell-walking-lunge"
  },
  {
    "id": "265C546A-FF80-50C9-B44F-068D24A2F07D",
    "name": "Dumbbell Split Squat",
    "category": "strength",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Hold a dumbbell in each hand and stand in a long stride with one foot forward and the other back, rear heel raised.",
      "Keep your torso upright and bend both knees to lower straight down.",
      "Stop just before the back knee touches the floor.",
      "Press through the front foot to rise, keeping both feet where they are.",
      "Complete all reps on one side, then switch legs."
    ],
    "tips": [
      "Keep your feet hip-width apart from side to side for balance.",
      "Keep the front heel pressed into the floor throughout.",
      "Raising the back foot on a bench turns this into the harder Bulgarian version."
    ],
    "icon": "exercise-dumbbell-split-squat"
  },
  {
    "id": "5BFF6391-92D1-5E66-A898-0B7E376491E2",
    "name": "Dumbbell Step-up",
    "category": "strength",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand facing a sturdy box or bench with a dumbbell in each hand.",
      "Place the whole of one foot on the box.",
      "Drive through that foot to stand up tall on the box, bringing the other foot up alongside.",
      "Step back down with the trailing leg under control.",
      "Complete all reps on one side, then switch legs."
    ],
    "tips": [
      "Do the work with the leg on the box rather than pushing off the floor with the back foot.",
      "Pick a height that bends your knee to about 90 degrees or less.",
      "Check that the box cannot slide or tip before you start."
    ],
    "icon": "exercise-dumbbell-step-up"
  },
  {
    "id": "BA608BFF-15D8-5BF6-9FE9-BCD9CE835129",
    "name": "Dumbbell Hip Thrust",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Sit on the floor with your upper back against the long edge of a bench and a dumbbell resting across the crease of your hips.",
      "Bend your knees and plant your feet flat, about hip-width apart.",
      "Hold the weight steady with both hands and drive through your heels to lift your hips.",
      "Stop when your body forms a straight line from shoulders to knees and squeeze your glutes.",
      "Lower your hips back towards the floor under control."
    ],
    "tips": [
      "Set your feet so your shins are roughly vertical at the top.",
      "Keep your chin tucked and ribs down rather than arching your lower back.",
      "A folded towel under the dumbbell makes it more comfortable."
    ],
    "icon": "exercise-dumbbell-hip-thrust"
  },
  {
    "id": "982C50C7-678A-5A6E-ADA4-9F33B1A4BB8B",
    "name": "Renegade Row",
    "category": "strength",
    "muscleGroups": [
      "back",
      "core",
      "arms"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Place two dumbbells on the floor shoulder-width apart and take a high plank position gripping the handles.",
      "Set your feet wider than hip-width for balance.",
      "Brace your midsection and row one dumbbell up to your ribs.",
      "Lower it quietly back to the floor.",
      "Repeat with the other arm and keep alternating."
    ],
    "tips": [
      "Keep your hips level and stop them twisting as you row.",
      "Use flat-sided dumbbells so they cannot roll under your hands.",
      "Widen your feet further if you struggle to stay steady."
    ],
    "icon": "exercise-renegade-row"
  },
  {
    "id": "6C5162A1-EC47-5005-89AB-F1E2E013845E",
    "name": "Farmer's Carry",
    "category": "strength",
    "muscleGroups": [
      "fullBody",
      "core",
      "arms"
    ],
    "equipment": "dumbbells",
    "tracking": "time",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand between two heavy dumbbells and hinge down with a flat back to grip them.",
      "Stand up tall with the weights at your sides and your shoulders pulled back.",
      "Walk forward with short, steady steps for the set time.",
      "Stop, hinge at the hips and set the weights down under control."
    ],
    "tips": [
      "Stay tall and avoid leaning forward or shrugging your shoulders.",
      "Hold the weights slightly away from your thighs so they do not knock your legs.",
      "Kettlebells work equally well."
    ],
    "icon": "exercise-farmers-carry"
  },
  {
    "id": "FC396D13-70E2-5D23-9A9D-98B183A718A8",
    "name": "Suitcase Carry",
    "category": "strength",
    "muscleGroups": [
      "core",
      "fullBody"
    ],
    "equipment": "dumbbells",
    "tracking": "time",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Pick up one dumbbell or kettlebell in one hand using a flat-backed hinge.",
      "Stand tall with your shoulders level and the weight hanging at your side.",
      "Walk with steady steps without leaning towards or away from the weight.",
      "Switch hands halfway through the set so both sides do equal work."
    ],
    "tips": [
      "Imagine you are holding an equal weight in the empty hand.",
      "If you cannot stay upright, the weight is too heavy.",
      "Keep the weight just clear of your leg as you walk."
    ],
    "icon": "exercise-suitcase-carry"
  },
  {
    "id": "55342BBF-D2A0-50A1-B7C1-0BA195F05DD4",
    "name": "Dumbbell Woodchop",
    "category": "strength",
    "muscleGroups": [
      "core",
      "shoulders"
    ],
    "equipment": "dumbbells",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet shoulder-width apart, holding one dumbbell with both hands beside the outside of one knee.",
      "Bend your knees slightly and turn your torso towards the weight.",
      "Sweep the dumbbell diagonally up across your body until it is above the opposite shoulder, pivoting on the back foot.",
      "Return along the same diagonal with control.",
      "Finish all reps on one side, then switch."
    ],
    "tips": [
      "Keep your arms fairly straight so the rotation comes from your hips and trunk.",
      "Use a light weight and control it rather than swinging.",
      "Let your hips and back foot turn with you instead of twisting only through the lower back."
    ],
    "icon": "exercise-dumbbell-woodchop"
  },
  {
    "id": "FF80FC75-565D-5347-B106-F9A08E8A1655",
    "name": "Front Squat",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Set the bar in a rack at upper-chest height and step under it so it rests across the front of your shoulders.",
      "Hold it with your fingertips just outside your shoulders and your elbows lifted high, or with your arms crossed over the bar.",
      "Lift the bar out, step back and set your feet about shoulder-width apart.",
      "Brace and squat straight down, keeping your elbows high and your chest tall.",
      "Descend until your thighs are at least parallel to the floor, then drive up through the whole foot."
    ],
    "tips": [
      "Let the bar rest on your shoulders rather than holding it up with your hands.",
      "End the set when you can no longer keep your elbows up, because the bar will roll forward.",
      "Set the safety bars in the rack just below your lowest position."
    ],
    "icon": "exercise-front-squat"
  },
  {
    "id": "25CC6758-FBA0-5EEB-A9CD-E27714495019",
    "name": "Romanian Deadlift",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand tall holding a barbell with an overhand grip at hip height, feet hip-width apart.",
      "Soften your knees slightly and keep them at that angle.",
      "Push your hips straight back and slide the bar down your thighs with a flat back.",
      "Lower until you feel a strong stretch in your hamstrings, usually just below the knees.",
      "Drive your hips forward to stand tall again."
    ],
    "tips": [
      "Keep the bar in contact with your legs the whole time.",
      "Stop before your back starts to round rather than chasing the floor.",
      "Think of your hips moving backwards, not your knees bending."
    ],
    "icon": "exercise-romanian-deadlift"
  },
  {
    "id": "D4964543-C33A-56F6-B2DC-24C670398DB2",
    "name": "Sumo Deadlift",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet well outside shoulder-width, toes turned out and shins close to the bar.",
      "Bend down and grip the bar inside your knees with your arms hanging straight down.",
      "Drop your hips, lift your chest and push your knees out over your toes.",
      "Brace and push the floor away, keeping the bar against your legs.",
      "Stand fully upright, then lower the bar back down the same path."
    ],
    "tips": [
      "Keep your knees in line with your toes throughout.",
      "Take the slack out of the bar before lifting rather than jerking it off the floor.",
      "Finish standing tall without leaning back."
    ],
    "icon": "exercise-sumo-deadlift"
  },
  {
    "id": "AE687D25-2BAA-5AD7-9C75-BE69D6E45FD1",
    "name": "Barbell Row",
    "category": "strength",
    "muscleGroups": [
      "back",
      "arms"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet hip-width apart and grip the bar overhand, just wider than shoulder-width.",
      "Hinge at the hips with your knees slightly bent until your torso is between 45 degrees and parallel to the floor.",
      "Pull the bar towards your lower ribs, driving your elbows back.",
      "Squeeze your shoulder blades together briefly.",
      "Lower the bar until your arms are straight without changing your torso angle."
    ],
    "tips": [
      "Keep your back flat and braced for the whole set.",
      "Avoid jerking your torso upright to heave the bar.",
      "Keep your neck in line with your spine."
    ],
    "icon": "exercise-barbell-row"
  },
  {
    "id": "9845E38C-1C3C-5066-B3A4-C32B98CD2760",
    "name": "Incline Bench Press",
    "category": "strength",
    "muscleGroups": [
      "chest",
      "shoulders",
      "arms"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Set a bench to about 30 to 45 degrees in a rack and lie back with your eyes under the bar.",
      "Grip the bar slightly wider than shoulder-width and squeeze your shoulder blades together.",
      "Unrack the bar and hold it over your upper chest with your arms straight.",
      "Lower it under control to touch high on your chest, just below the collarbones.",
      "Press back up until your arms are straight."
    ],
    "tips": [
      "Keep your feet flat and your hips on the bench.",
      "Use a spotter or safety bars when the load is heavy.",
      "Aim for vertical forearms at the bottom of each rep."
    ],
    "icon": "exercise-incline-bench-press"
  },
  {
    "id": "FFAC0266-1AF6-55A5-A225-D7B3FE08369A",
    "name": "Close-Grip Bench Press",
    "category": "strength",
    "muscleGroups": [
      "arms",
      "chest",
      "shoulders"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Lie on a flat bench and grip the bar with your hands about shoulder-width apart.",
      "Unrack the bar and hold it above your chest with your arms straight.",
      "Lower the bar to your lower chest, keeping your elbows tucked close to your sides.",
      "Press up until your arms are fully straight."
    ],
    "tips": [
      "Shoulder-width is narrow enough, as a very close grip is awkward on the wrists.",
      "Keep your wrists straight and stacked over your elbows.",
      "Use a spotter or safety bars when the load is heavy."
    ],
    "icon": "exercise-close-grip-bench-press"
  },
  {
    "id": "FE27C092-97DE-56B0-AA02-FBDC14DD9097",
    "name": "Push Press",
    "category": "strength",
    "muscleGroups": [
      "shoulders",
      "legs",
      "arms"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with the bar resting on the front of your shoulders, hands just outside shoulder-width and feet hip-width apart.",
      "Dip a few centimetres by bending your knees while keeping your torso upright.",
      "Drive up hard through your legs and use that momentum to press the bar overhead.",
      "Lock your arms out with the bar over the middle of your feet.",
      "Lower the bar to your shoulders, bending your knees slightly to absorb it."
    ],
    "tips": [
      "Keep the dip short and straight down rather than squatting or leaning forward.",
      "Keep your heels on the floor during the dip.",
      "Move your head back slightly to let the bar pass, then bring it through under the bar."
    ],
    "icon": "exercise-push-press"
  },
  {
    "id": "97C26CD1-3230-5CEA-AE9F-753FCB1DD8D2",
    "name": "Hip Thrust",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "core"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Sit on the floor with your shoulder blades against the edge of a bench and roll a padded barbell over your hips.",
      "Plant your feet flat about hip-width apart with your knees bent.",
      "Hold the bar steady and drive through your heels to raise your hips.",
      "Finish with your torso and thighs in a straight line and your shins vertical.",
      "Lower with control until your hips are just above the floor."
    ],
    "tips": [
      "Use a thick pad or folded mat between the bar and your hips.",
      "Keep your chin tucked and ribs down rather than over-arching at the top.",
      "Brace the bench against a wall so it cannot slide."
    ],
    "icon": "exercise-hip-thrust"
  },
  {
    "id": "E98B85D2-475C-5340-B387-E1F86D9725C7",
    "name": "Good Morning",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Set the bar across your upper back as you would for a squat and stand with your feet hip-width apart.",
      "Unlock your knees slightly and brace your midsection.",
      "Push your hips back and tip your torso forward with a flat back.",
      "Stop when your torso is nearly parallel to the floor or your hamstrings will not let you go further.",
      "Drive your hips forward to return to standing."
    ],
    "tips": [
      "Start with an empty bar and add load gradually.",
      "End the rep before your back begins to round.",
      "Keep your weight over the middle of your feet."
    ],
    "icon": "exercise-good-morning"
  },
  {
    "id": "BEFA440B-0DB6-596D-9FE4-2B66D6D43A46",
    "name": "Barbell Curl",
    "category": "strength",
    "muscleGroups": [
      "arms"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand tall holding a barbell with an underhand grip, hands about shoulder-width apart and arms straight.",
      "Keep your elbows by your sides and curl the bar up towards your shoulders.",
      "Squeeze at the top without letting your elbows drift forward.",
      "Lower slowly until your arms are straight."
    ],
    "tips": [
      "Avoid leaning back or swinging your hips to start the lift.",
      "An angled curl bar is a good option if a straight bar feels awkward on your wrists.",
      "Straighten your arms fully between reps."
    ],
    "icon": "exercise-barbell-curl"
  },
  {
    "id": "BFA0B42B-6367-5D8E-B232-F19087EF51BF",
    "name": "Skull Crusher",
    "category": "strength",
    "muscleGroups": [
      "arms"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Lie on a flat bench holding a barbell or angled curl bar above your chest with a narrow overhand grip.",
      "Tilt your upper arms slightly back towards your head and keep them still.",
      "Bend your elbows to lower the bar towards your forehead or just behind your head.",
      "Straighten your elbows to return to the start."
    ],
    "tips": [
      "Keep your elbows pointing at the ceiling rather than flaring out.",
      "Start light and lower slowly, as the bar travels above your face.",
      "Keep your wrists straight and your grip firm."
    ],
    "icon": "exercise-skull-crusher"
  },
  {
    "id": "E59F61B4-A605-5929-B26D-C587610F8225",
    "name": "Landmine Press",
    "category": "strength",
    "muscleGroups": [
      "shoulders",
      "chest",
      "core"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Wedge one end of a barbell into a corner or a landmine attachment and load the other end.",
      "Stand facing the bar in a staggered stance and hold the loaded end at one shoulder with one hand.",
      "Brace and press the bar up and forward until your arm is straight.",
      "Lower it back to your shoulder with control.",
      "Complete all reps on one side, then switch arms."
    ],
    "tips": [
      "Lean slightly into the bar and keep your ribs down.",
      "Keep your hips and shoulders square rather than twisting as you press.",
      "Pad the corner with a towel if you are not using an attachment."
    ],
    "icon": "exercise-landmine-press"
  },
  {
    "id": "5282447C-F092-5975-8922-81D71BFB344A",
    "name": "Power Clean",
    "category": "strength",
    "muscleGroups": [
      "fullBody",
      "legs",
      "back"
    ],
    "equipment": "barbell",
    "tracking": "reps",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet hip-width apart and the bar over mid-foot, then grip it just outside your legs with a flat back and your shoulders over the bar.",
      "Lift the bar smoothly from the floor to above your knees by pushing through your legs.",
      "Extend your hips, knees and ankles explosively and shrug as the bar passes your thighs.",
      "Pull yourself under the bar and whip your elbows forward.",
      "Catch the bar on the front of your shoulders in a shallow squat, then stand up.",
      "Lower the bar to your hips and then to the floor under control."
    ],
    "tips": [
      "Keep the bar close to your body from start to finish.",
      "Keep your arms straight until your hips have fully extended.",
      "Catch the bar on your shoulders with high elbows rather than in your hands.",
      "Learn the movement with an empty bar, ideally with a coach watching."
    ],
    "icon": "exercise-power-clean"
  },
  {
    "id": "6AD599AB-A0AD-508C-BACA-F0CE115B31F1",
    "name": "Kettlebell Deadlift",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "back"
    ],
    "equipment": "kettlebell",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet shoulder-width apart and the kettlebell on the floor between your ankles.",
      "Push your hips back and bend your knees until you can grip the handle with both hands, keeping your back flat.",
      "Pull your shoulders back and brace your midsection.",
      "Push through the floor and stand up tall, squeezing your glutes at the top.",
      "Hinge back down to return the bell to the same spot."
    ],
    "tips": [
      "Send your hips backwards rather than simply bending your knees.",
      "Keep your arms long and let your legs and hips do the lifting.",
      "Finish standing tall without leaning back."
    ],
    "icon": "exercise-kettlebell-deadlift"
  },
  {
    "id": "3A2B24BF-7479-55E0-B93F-13B1209A9C36",
    "name": "Kettlebell Clean",
    "category": "strength",
    "muscleGroups": [
      "fullBody",
      "legs",
      "arms"
    ],
    "equipment": "kettlebell",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand with your feet shoulder-width apart and the kettlebell on the floor just in front of you.",
      "Hinge, grip the handle with one hand and hike the bell back between your legs.",
      "Drive your hips forward and keep your elbow close to your side as the bell rises.",
      "Loosen your grip and slide your hand around the bell so it rolls softly onto the back of your forearm.",
      "Finish in the rack position with the bell resting against your forearm and chest and your wrist straight.",
      "Let the bell fall back between your legs to begin the next rep."
    ],
    "tips": [
      "Generate the lift from your hips rather than curling the bell with your arm.",
      "Keep the bell close and move your hand around it so it does not flip over and bang your forearm.",
      "Practise with a light bell until the catch is smooth."
    ],
    "icon": "exercise-kettlebell-clean"
  },
  {
    "id": "0569485F-FD01-5C7B-929F-F03212F26ED7",
    "name": "Kettlebell Press",
    "category": "strength",
    "muscleGroups": [
      "shoulders",
      "arms",
      "core"
    ],
    "equipment": "kettlebell",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Bring a kettlebell to one shoulder, using both hands if needed, so it rests on the back of your forearm with your wrist straight.",
      "Stand tall with your feet hip-width apart, squeeze your glutes and brace.",
      "Press the bell overhead until your arm is straight and close to your ear.",
      "Lower it under control to your shoulder.",
      "Complete all reps on one side, then switch arms."
    ],
    "tips": [
      "Keep your wrist straight with your knuckles pointing at the ceiling.",
      "Avoid leaning back or to the side to get the bell up.",
      "Keep your forearm vertical all the way up."
    ],
    "icon": "exercise-kettlebell-press"
  },
  {
    "id": "04E12C32-E83C-5C79-9AAA-1CE77C1AE45E",
    "name": "Turkish Get-up",
    "category": "strength",
    "muscleGroups": [
      "fullBody",
      "core",
      "shoulders"
    ],
    "equipment": "kettlebell",
    "tracking": "reps",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Lie on your back and press a kettlebell straight up with one arm, bending the knee on the same side and placing the other arm and leg out at about 45 degrees.",
      "Keep your eyes on the bell and roll up onto your free elbow and then onto your hand.",
      "Lift your hips and sweep the straight leg back underneath you to kneel on that knee.",
      "Bring your torso upright into a half-kneeling position and look forward.",
      "Stand up, keeping the arm locked overhead.",
      "Reverse each step in order to lie back down, then switch sides."
    ],
    "tips": [
      "Practise without weight, or with a shoe balanced on your fist, before using a kettlebell.",
      "Keep the lifting arm vertical with the elbow locked the whole time.",
      "Move slowly and pause in each position."
    ],
    "icon": "exercise-turkish-get-up"
  },
  {
    "id": "D4553783-8198-5897-AA6F-F161F39A5C1D",
    "name": "Kettlebell Halo",
    "category": "strength",
    "muscleGroups": [
      "shoulders",
      "core"
    ],
    "equipment": "kettlebell",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand tall holding a kettlebell upside down by the sides of its handle in front of your chest.",
      "Brace your midsection and keep your head facing forward.",
      "Circle the bell closely around your head, letting it dip behind your neck.",
      "Bring it back to the front of your chest to finish one rep.",
      "Alternate the direction of the circle on each rep."
    ],
    "tips": [
      "Keep your ribs down rather than arching your back as the bell passes behind you.",
      "Move the bell around your head instead of ducking your head around the bell.",
      "Use a light bell and move slowly."
    ],
    "icon": "exercise-kettlebell-halo"
  },
  {
    "id": "324EAB94-A699-59DD-92E6-4A63D405FA66",
    "name": "Kettlebell Windmill",
    "category": "strength",
    "muscleGroups": [
      "core",
      "shoulders",
      "legs"
    ],
    "equipment": "kettlebell",
    "tracking": "reps",
    "level": 3,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Press a kettlebell overhead with one arm and stand with your feet a little wider than hip-width, toes angled away from the lifting side.",
      "Fix your eyes on the bell and keep that arm vertical.",
      "Push your hips towards the side of the raised arm and fold at the hip, sliding your free hand down the inside of the opposite leg.",
      "Lower as far as you can with a straight back and a locked arm.",
      "Squeeze your glutes to return to standing along the same path."
    ],
    "tips": [
      "Treat it as a hip hinge to the side rather than a sideways bend of the spine.",
      "Keep the leg under the bell straight.",
      "Practise the pattern without weight first.",
      "Go only as low as your hips and hamstrings allow."
    ],
    "icon": "exercise-kettlebell-windmill"
  },
  {
    "id": "68C2D7C6-91AE-51BF-8FCA-DAFA9B7E6AAF",
    "name": "Kettlebell Row",
    "category": "strength",
    "muscleGroups": [
      "back",
      "arms"
    ],
    "equipment": "kettlebell",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Place a kettlebell on the floor and stand in a staggered stance with the opposite foot forward.",
      "Hinge forward with a flat back and rest your free forearm on your front thigh.",
      "Grip the bell and pull it towards your hip, keeping your elbow close to your body.",
      "Pause briefly at the top, then lower until your arm is straight.",
      "Complete all reps on one side, then switch."
    ],
    "tips": [
      "Keep your shoulders square to the floor rather than rotating open.",
      "Lead with your elbow instead of shrugging your shoulder.",
      "Keep your back flat for the whole set."
    ],
    "icon": "exercise-kettlebell-row"
  },
  {
    "id": "91FD2F52-1A67-5A54-9AB9-A179A6D0E317",
    "name": "Band Pull-apart",
    "category": "strength",
    "muscleGroups": [
      "shoulders",
      "back"
    ],
    "equipment": "band",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Stand tall holding a band in both hands at shoulder height, arms straight in front of you and hands shoulder-width apart.",
      "Pull your hands apart by squeezing your shoulder blades together.",
      "Stretch the band until it touches your chest and your arms are out to the sides.",
      "Return slowly, resisting the pull of the band."
    ],
    "tips": [
      "Keep your arms nearly straight throughout.",
      "Keep your shoulders down and your ribs from flaring.",
      "Use a lighter band or a wider grip if you cannot reach your chest."
    ],
    "icon": "exercise-band-pull-apart"
  },
  {
    "id": "2163D01A-6037-5CB8-8E9D-F1EDE24B3730",
    "name": "Band Row",
    "category": "strength",
    "muscleGroups": [
      "back",
      "arms"
    ],
    "equipment": "band",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Anchor a band at about chest height and hold one end in each hand.",
      "Step back until the band is taut with your arms straight, then stand tall with your knees soft.",
      "Pull your hands towards your lower ribs, drawing your elbows back close to your sides.",
      "Squeeze your shoulder blades together, then slowly straighten your arms."
    ],
    "tips": [
      "Check that the anchor is secure and the band has no nicks before you pull.",
      "Stay upright rather than leaning back to finish the rep.",
      "Step further from the anchor to make it harder."
    ],
    "icon": "exercise-band-row"
  },
  {
    "id": "99F40EE7-CE70-543A-9595-002CBA600587",
    "name": "Band Face Pull",
    "category": "strength",
    "muscleGroups": [
      "shoulders",
      "back"
    ],
    "equipment": "band",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Anchor a band at about face height and hold one end in each hand with your palms facing down.",
      "Step back until the band is taut with your arms straight.",
      "Pull the band towards your face, lifting your elbows high and wide.",
      "Finish with your hands beside your ears and your shoulder blades squeezed together.",
      "Return slowly to straight arms."
    ],
    "tips": [
      "Keep your elbows at or above shoulder height.",
      "Use a light band and move slowly.",
      "Avoid leaning back or pushing your chin forward."
    ],
    "icon": "exercise-band-face-pull"
  },
  {
    "id": "1B1D34C1-B900-5AC8-ACE5-1E4AEC64A385",
    "name": "Band Chest Press",
    "category": "strength",
    "muscleGroups": [
      "chest",
      "arms",
      "shoulders"
    ],
    "equipment": "band",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Anchor a band behind you at chest height, or wrap it around your upper back, and hold one end in each hand beside your chest.",
      "Stand in a staggered stance facing away from the anchor with the band taut.",
      "Press both hands forward until your arms are straight.",
      "Return slowly until your hands are beside your chest."
    ],
    "tips": [
      "Keep your wrists straight and your elbows slightly below shoulder height.",
      "Brace your midsection so the band does not pull you backwards.",
      "Step further from the anchor to add resistance."
    ],
    "icon": "exercise-band-chest-press"
  },
  {
    "id": "081E5DB9-FD94-5DEC-B2C6-02D7D8D1F4EB",
    "name": "Lateral Band Walk",
    "category": "strength",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "band",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Place a small loop band around your legs just above the knees or around the ankles.",
      "Stand with your feet hip-width apart so the band is taut and sink into a quarter squat.",
      "Step sideways with the leading foot, then follow with the trailing foot without letting your feet touch.",
      "Take the planned number of steps, then return leading with the other leg."
    ],
    "tips": [
      "Keep tension on the band by never bringing your feet closer than hip-width.",
      "Point your toes forward and keep your knees over your feet.",
      "Stay low and avoid rocking your upper body from side to side."
    ],
    "icon": "exercise-lateral-band-walk"
  },
  {
    "id": "7880C895-02A2-50DE-A16A-9D64A061CD1F",
    "name": "Band Pallof Press",
    "category": "strength",
    "muscleGroups": [
      "core"
    ],
    "equipment": "band",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Anchor a band at chest height and stand side-on to it, holding the band with both hands against your breastbone.",
      "Step away until the band is taut and set your feet shoulder-width apart with your knees soft.",
      "Press your hands straight out in front of your chest without letting the band turn you towards the anchor.",
      "Hold for a second or two, then bring your hands back to your chest.",
      "Finish all reps, then face the other way and repeat."
    ],
    "tips": [
      "Keep your hips and shoulders square to the front.",
      "Moving slowly makes it harder, not easier.",
      "A narrower stance or a step further from the anchor increases the challenge."
    ],
    "icon": "exercise-band-pallof-press"
  },
  {
    "id": "0A7EDD0D-163E-587F-9C2F-1A37BD990330",
    "name": "Lat Pulldown",
    "category": "strength",
    "muscleGroups": [
      "back",
      "arms"
    ],
    "equipment": "cable",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Adjust the thigh pad so your legs are held firmly and grip the bar overhand, slightly wider than shoulder-width.",
      "Sit down with your arms fully stretched overhead and lean back just slightly.",
      "Pull the bar down to your upper chest by driving your elbows down and back.",
      "Squeeze your shoulder blades down briefly.",
      "Let the bar rise under control until your arms are straight."
    ],
    "tips": [
      "Pull the bar to the front of your chest, not behind your neck.",
      "Avoid swinging your torso back to move the weight.",
      "Begin each rep by drawing your shoulders down away from your ears."
    ],
    "icon": "exercise-lat-pulldown"
  },
  {
    "id": "9DC2083C-C34D-5D51-B36A-A26B9DC53AAA",
    "name": "Seated Cable Row",
    "category": "strength",
    "muscleGroups": [
      "back",
      "arms"
    ],
    "equipment": "cable",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Sit at a low cable station with your feet on the footplate and your knees slightly bent, then grip the handle.",
      "Sit tall with your arms straight and your shoulders reaching slightly forward.",
      "Pull the handle to your lower ribs, drawing your elbows back past your sides.",
      "Squeeze your shoulder blades together, then return slowly until your arms are straight."
    ],
    "tips": [
      "Keep your torso nearly upright rather than rocking back and forth.",
      "Do not let your lower back round as you reach forward.",
      "Keep your shoulders away from your ears."
    ],
    "icon": "exercise-seated-cable-row"
  },
  {
    "id": "97250B0D-52F2-5466-886E-1EE01E02F886",
    "name": "Cable Face Pull",
    "category": "strength",
    "muscleGroups": [
      "shoulders",
      "back"
    ],
    "equipment": "cable",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Set a cable pulley at about face height and fit a rope attachment.",
      "Grip the rope ends with your thumbs pointing back towards you and step back until your arms are straight.",
      "Pull the rope towards your face, spreading the ends apart and lifting your elbows high.",
      "Finish with your hands beside your ears and your upper arms out to the sides.",
      "Return slowly to straight arms."
    ],
    "tips": [
      "Choose a light weight that you can control at the end position.",
      "Use a staggered stance so the cable does not pull you forward.",
      "Stay upright so the movement does not turn into a row."
    ],
    "icon": "exercise-cable-face-pull"
  },
  {
    "id": "4E5C9C49-DD08-55F4-B82F-D55EF2FEF325",
    "name": "Cable Triceps Pushdown",
    "category": "strength",
    "muscleGroups": [
      "arms"
    ],
    "equipment": "cable",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Attach a bar or rope to a high pulley and grip it with your elbows bent and tucked into your sides.",
      "Stand tall with a slight forward lean and soft knees.",
      "Push the handle down until your arms are fully straight.",
      "Let it rise slowly until your forearms are just above parallel to the floor."
    ],
    "tips": [
      "Keep your elbows pinned to your sides so only your forearms move.",
      "Avoid leaning your body weight over the handle.",
      "With a rope, pull the ends apart at the bottom."
    ],
    "icon": "exercise-cable-triceps-pushdown"
  },
  {
    "id": "7F976A7D-3136-59F8-8AA1-AC3C3E8E625E",
    "name": "Cable Fly",
    "category": "strength",
    "muscleGroups": [
      "chest",
      "shoulders"
    ],
    "equipment": "cable",
    "tracking": "reps",
    "level": 2,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Set both pulleys of a cable station at about shoulder height and take a handle in each hand.",
      "Step forward into a staggered stance with your arms open wide and your elbows slightly bent.",
      "Sweep your hands together in front of your chest in a hugging arc.",
      "Squeeze your chest briefly as your hands meet.",
      "Open your arms slowly until you feel a stretch across your chest."
    ],
    "tips": [
      "Keep the bend in your elbows fixed throughout.",
      "Keep your chest up and stop your shoulders rolling forward.",
      "Raising or lowering the pulleys changes which part of the chest works hardest."
    ],
    "icon": "exercise-cable-fly"
  },
  {
    "id": "B96C794F-534E-5A5F-9B67-3E27BD1E1246",
    "name": "Cable Woodchop",
    "category": "strength",
    "muscleGroups": [
      "core",
      "shoulders"
    ],
    "equipment": "cable",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Set a pulley at its highest position and stand side-on to the machine, holding the handle with both hands.",
      "Stand with your feet shoulder-width apart and your arms nearly straight, reaching up towards the pulley.",
      "Pull the handle diagonally down across your body to the outside of the opposite knee, rotating your torso and pivoting on the back foot.",
      "Return slowly along the same line.",
      "Finish all reps on one side, then switch."
    ],
    "tips": [
      "Keep your arms long so your trunk does the work.",
      "Let your hips turn together with your shoulders.",
      "Set the pulley at the bottom and pull upwards for the low-to-high version."
    ],
    "icon": "exercise-cable-woodchop"
  },
  {
    "id": "3C34C6E7-488E-5904-9DF8-FA47AE9FBFE5",
    "name": "Leg Press",
    "category": "strength",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "machine",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Sit in the machine with your back and hips flat against the pad and place your feet shoulder-width apart in the middle of the platform.",
      "Press the platform away and release the safety catches.",
      "Bend your knees to lower the platform until they reach about 90 degrees or a little deeper.",
      "Push through the whole foot until your legs are almost straight.",
      "Re-engage the safety catches before taking your feet off."
    ],
    "tips": [
      "Stop just short of locking your knees at the top.",
      "End the descent before your hips curl up off the pad.",
      "Keep your knees in line with your toes."
    ],
    "icon": "exercise-leg-press"
  },
  {
    "id": "09B3A7B4-821B-5893-A5F4-F8AEA096BD36",
    "name": "Leg Extension",
    "category": "strength",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "machine",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Adjust the seat so your knees line up with the pivot of the machine and the pad rests on your lower shins.",
      "Sit back against the pad and hold the handles.",
      "Straighten your legs until they are almost fully extended.",
      "Pause briefly and squeeze your thighs.",
      "Lower slowly without letting the weight stack slam down."
    ],
    "tips": [
      "Move smoothly instead of kicking the weight up.",
      "Keep your hips in the seat throughout.",
      "Choose a moderate weight that you can pause with at the top."
    ],
    "icon": "exercise-leg-extension"
  },
  {
    "id": "86031B76-F707-5527-9508-58D0599B7CD5",
    "name": "Leg Curl",
    "category": "strength",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "machine",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Set up the machine so your knees line up with its pivot and the pad sits on the back of your lower legs just above the heels.",
      "Lie face down, or sit back on a seated machine, and hold the handles.",
      "Bend your knees to pull the pad towards your buttocks as far as you can.",
      "Pause, then straighten your legs slowly."
    ],
    "tips": [
      "Keep your hips pressed into the pad rather than lifting them.",
      "Control the return instead of letting the weight drop.",
      "Stop just before the weight stack touches down to keep tension on the muscles."
    ],
    "icon": "exercise-leg-curl"
  },
  {
    "id": "7EAFC29A-3C25-5503-8DAA-1E126BDCBA9E",
    "name": "Chest Press Machine",
    "category": "strength",
    "muscleGroups": [
      "chest",
      "arms",
      "shoulders"
    ],
    "equipment": "machine",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Adjust the seat so the handles are level with the middle of your chest.",
      "Sit with your back and head against the pad and your feet flat on the floor.",
      "Grip the handles and press forward until your arms are straight but not locked hard.",
      "Return slowly until your hands are beside your chest."
    ],
    "tips": [
      "Keep your shoulder blades back against the pad.",
      "Keep your elbows slightly below shoulder level.",
      "Stop the weight stack from crashing down between reps."
    ],
    "icon": "exercise-chest-press-machine"
  },
  {
    "id": "92E9FD16-A32F-5296-BFCD-7D8E31813CFA",
    "name": "Assisted Pull-up",
    "category": "strength",
    "muscleGroups": [
      "back",
      "arms"
    ],
    "equipment": "machine",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Select an assistance weight, grip the overhead handles slightly wider than shoulder-width and kneel on the assistance pad.",
      "Start with your arms straight and your shoulders drawn down.",
      "Pull yourself up until your chin clears the handles, driving your elbows down towards your sides.",
      "Lower slowly until your arms are straight.",
      "Hold the frame and step off the pad carefully when you finish."
    ],
    "tips": [
      "More weight on the stack means more help, so reduce it as you get stronger.",
      "Avoid swinging or kicking to finish a rep.",
      "Use the full range from straight arms to chin over the handles."
    ],
    "icon": "exercise-assisted-pull-up"
  },
  {
    "id": "71584313-C2A3-546D-A777-88CA54F0E975",
    "name": "Back Extension",
    "category": "strength",
    "muscleGroups": [
      "back",
      "legs"
    ],
    "equipment": "machine",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Adjust a back extension bench so the pad sits just below the crease of your hips and hook your heels under the rollers.",
      "Cross your arms over your chest and hold your body in a straight line from head to heels.",
      "Hinge at the hips to lower your torso towards the floor with a flat back.",
      "Squeeze your glutes and hamstrings to lift until your body is straight again."
    ],
    "tips": [
      "Stop at a straight line rather than arching beyond it.",
      "Move slowly in both directions.",
      "Hold a weight plate against your chest once your body weight is easy."
    ],
    "icon": "exercise-back-extension"
  },
  {
    "id": "9282D33C-382A-5BF9-83DE-0AC5DD1FB1C9",
    "name": "Seated Calf Raise",
    "category": "strength",
    "muscleGroups": [
      "legs"
    ],
    "equipment": "machine",
    "tracking": "reps",
    "level": 1,
    "tier": "pro",
    "notes": "",
    "instructions": [
      "Sit at the machine with the balls of your feet on the footplate and the pads resting on your lower thighs just above the knees.",
      "Lift your heels slightly and release the safety lever.",
      "Lower your heels as far as is comfortable for a full stretch.",
      "Push up onto the balls of your feet as high as you can and pause.",
      "Replace the safety lever after the last rep."
    ],
    "tips": [
      "Move through the full range without bouncing at the bottom.",
      "Keep the pressure across the balls of your feet rather than rolling onto the outer edges.",
      "Pause for a second at the top of each rep."
    ],
    "icon": "exercise-seated-calf-raise"
  }
];
