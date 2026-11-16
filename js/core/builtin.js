// Built-in exercises and plans.
// Swift: OddForm/Models/BuiltInContent.swift
//
// Exercise IDs are fixed and identical to the iOS app, so plans and session
// logs in a backup file point at the same exercises on both platforms.

import { newBlock, newExercise, newPlan, newPlanDay, newSlot } from './models.js';

const RAW_EXERCISES = [
  {
    "id": "4F1E3A0E-B38C-5DA8-BA5A-068F76754CCF",
    "name": "Squat",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "core"
    ],
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
    ]
  },
  {
    "id": "C9E0B1A9-B56A-5641-B560-24DAF93EDD55",
    "name": "Deadlift",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "back"
    ],
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
    ]
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
    ]
  },
  {
    "id": "7A54F72F-2CB7-5599-8D24-73AF52CAF2D8",
    "name": "Pull-up",
    "category": "strength",
    "muscleGroups": [
      "back",
      "arms"
    ],
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
    ]
  },
  {
    "id": "25EF25D4-9D9E-5FBA-B9E2-98149E0B409D",
    "name": "Overhead Press",
    "category": "strength",
    "muscleGroups": [
      "shoulders",
      "arms"
    ],
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
    ]
  },
  {
    "id": "4335A13E-983A-57A2-931E-39F0F5FB1720",
    "name": "Plank",
    "category": "strength",
    "muscleGroups": [
      "core"
    ],
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
    ]
  },
  {
    "id": "15620997-D5DA-50CC-9D3E-8F3CC8EE600E",
    "name": "Push-up",
    "category": "strength",
    "muscleGroups": [
      "chest",
      "arms"
    ],
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
    ]
  },
  {
    "id": "204E2C41-35A7-5042-8E51-F5B6FEF07BFD",
    "name": "Lunge",
    "category": "strength",
    "muscleGroups": [
      "legs"
    ],
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
    ]
  },
  {
    "id": "6A670B3D-F030-58CD-B5B4-C6490CEB4B8A",
    "name": "Glute Bridge",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "core"
    ],
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
    ]
  },
  {
    "id": "5C2CED84-FA13-59A2-B201-BB1B8D7D8277",
    "name": "Dumbbell Rows",
    "category": "strength",
    "muscleGroups": [
      "back",
      "arms"
    ],
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
    ]
  },
  {
    "id": "C58E9DEC-6275-5493-821A-551429C1FAC1",
    "name": "Dumbbell Overhead Press",
    "category": "strength",
    "muscleGroups": [
      "shoulders",
      "arms"
    ],
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
    ]
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
    ]
  },
  {
    "id": "6BD69FE1-55BC-5B3B-8029-1A93F65E9356",
    "name": "Dumbbell Bicep Curls",
    "category": "strength",
    "muscleGroups": [
      "arms"
    ],
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
    ]
  },
  {
    "id": "C50A920A-8099-5DEB-BFCC-CD62FFCE58EB",
    "name": "Dumbbell Romanian Deadlift",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "back"
    ],
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
    ]
  },
  {
    "id": "158F138D-E25B-5E24-94B1-5C13BA67C8B9",
    "name": "Tricep Dips",
    "category": "strength",
    "muscleGroups": [
      "arms",
      "shoulders"
    ],
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
    ]
  },
  {
    "id": "9D462510-52B1-59F7-80BB-A7F541FD0838",
    "name": "Reverse Lunges",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "core"
    ],
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
    ]
  },
  {
    "id": "64BF2D39-8C64-5C11-9545-063803A79BCA",
    "name": "Calf Raises",
    "category": "strength",
    "muscleGroups": [
      "legs"
    ],
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
    ]
  },
  {
    "id": "6B56598C-36C9-5D4F-A666-402F6952BE95",
    "name": "Side Plank",
    "category": "strength",
    "muscleGroups": [
      "core"
    ],
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
    ]
  },
  {
    "id": "75C8E04A-1D3E-560E-A23A-EE2797979171",
    "name": "Burpee",
    "category": "hiit",
    "muscleGroups": [
      "fullBody"
    ],
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
    ]
  },
  {
    "id": "447A026F-1EED-55BC-8963-308BBA960346",
    "name": "Jumping Jacks",
    "category": "hiit",
    "muscleGroups": [
      "fullBody"
    ],
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
    ]
  },
  {
    "id": "98A23AC3-0AF6-5B89-A642-2042F5A769F1",
    "name": "Plank Jacks",
    "category": "hiit",
    "muscleGroups": [
      "core",
      "fullBody"
    ],
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
    ]
  },
  {
    "id": "7891A675-004A-58ED-96CF-07151FD38241",
    "name": "Inchworms",
    "category": "hiit",
    "muscleGroups": [
      "fullBody",
      "core"
    ],
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
    ]
  },
  {
    "id": "F829CC36-544A-5AE4-B231-19E56CB3CA49",
    "name": "Sit-up",
    "category": "strength",
    "muscleGroups": [
      "core"
    ],
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
    ]
  },
  {
    "id": "C8706514-4574-5CBF-B78B-6B4DC8853B26",
    "name": "Bicycle Crunches",
    "category": "strength",
    "muscleGroups": [
      "core"
    ],
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
    ]
  },
  {
    "id": "7CC50CFF-FC36-51B3-B80D-942E55BDD053",
    "name": "Superman",
    "category": "mobility",
    "muscleGroups": [
      "back",
      "core"
    ],
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
    ]
  },
  {
    "id": "47B14806-229F-5DFC-9447-1B844C2C6F3C",
    "name": "Bird Dog",
    "category": "mobility",
    "muscleGroups": [
      "core",
      "back"
    ],
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
    ]
  },
  {
    "id": "4645CB5F-CA3F-58A7-B3F7-2A92B1512CFA",
    "name": "Russian Twists",
    "category": "strength",
    "muscleGroups": [
      "core"
    ],
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
    ]
  },
  {
    "id": "36A9F2DF-BBCF-599B-9F8A-FB912112FE4C",
    "name": "Glute Bridge March",
    "category": "strength",
    "muscleGroups": [
      "legs",
      "core"
    ],
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
    ]
  },
  {
    "id": "E2F1C3ED-D7A2-5D26-9149-99020A6B7AA8",
    "name": "Hip Flexor Stretch",
    "category": "mobility",
    "muscleGroups": [
      "legs"
    ],
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
    ]
  },
  {
    "id": "04D0C107-2669-5851-B5EB-5045EF29D294",
    "name": "Cat-Cow",
    "category": "mobility",
    "muscleGroups": [
      "core",
      "back"
    ],
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
    ]
  },
  {
    "id": "F597842B-A15C-532B-940A-A2B8F5CC8F68",
    "name": "Running",
    "category": "cardio",
    "muscleGroups": [
      "fullBody"
    ],
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
    ]
  },
  {
    "id": "C8530728-2430-55A1-A566-69BD5C2DCACE",
    "name": "Cycling",
    "category": "cardio",
    "muscleGroups": [
      "legs"
    ],
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
    ]
  },
  {
    "id": "A147A737-D607-5A17-9365-51EC55229F5E",
    "name": "Jump Rope",
    "category": "hiit",
    "muscleGroups": [
      "fullBody"
    ],
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
    ]
  }
];

export const BUILT_IN_EXERCISES = RAW_EXERCISES.map(e => newExercise(e));

/// Built-in exercise name -> icon asset (img/exercises/<name>.png).
// An exercise without a drawing of its own (Running, Push-up, the stretches)
// has no entry and shows its category glyph — never another exercise's picture.
export const ICON_MAP = {
  "Squat": "exercise-squat",
  "Deadlift": "exercise-dumbbell-romanian-deadlift",
  "Bench Press": "exercise-dumbbell-floor-press",
  "Pull-up": "exercise-pull-up",
  "Overhead Press": "exercise-dumbbell-overhead-press",
  "Plank": "exercise-plank",
  "Lunge": "exercise-lunges",
  "Glute Bridge": "exercise-glute-bridge",
  "Dumbbell Rows": "exercise-dumbbell-rows",
  "Dumbbell Overhead Press": "exercise-dumbbell-overhead-press",
  "Dumbbell Floor Press": "exercise-dumbbell-floor-press",
  "Dumbbell Bicep Curls": "exercise-dumbbell-bicep-curls",
  "Dumbbell Romanian Deadlift": "exercise-dumbbell-romanian-deadlift",
  "Tricep Dips": "exercise-tricep-dips",
  "Reverse Lunges": "exercise-reverse-lunges",
  "Calf Raises": "exercise-calf-raises",
  "Side Plank": "exercise-side-plank",
  "Sit-up": "exercise-situp",
  "Bicycle Crunches": "exercise-bicycle-crunches",
  "Superman": "exercise-superman",
  "Bird Dog": "exercise-bird-dog",
  "Russian Twists": "exercise-russian-twists",
  "Glute Bridge March": "exercise-glute-march",
  "Burpee": "exercise-burpees",
  "Jumping Jacks": "exercise-jumping-jacks",
  "Plank Jacks": "exercise-plank-jacks",
  "Inchworms": "exercise-inchworms",
  "Cycling": "exercise-spinning",
  "Jump Rope": "exercise-skipping-rope"
};

/// Every icon a custom exercise can pick. Swift: IconPickerSheet.allIcons
export const ALL_ICONS = [
  'exercise-situp', 'exercise-squat', 'exercise-lunges', 'exercise-reverse-lunges',
  'exercise-lateral-lunge', 'exercise-glute-bridge', 'exercise-glute-march',
  'exercise-calf-raises', 'exercise-plank', 'exercise-side-plank', 'exercise-plank-jacks',
  'exercise-inchworms', 'exercise-bird-dog', 'exercise-dead-bug', 'exercise-superman',
  'exercise-bicycle-crunches', 'exercise-russian-twists', 'exercise-burpees',
  'exercise-jumping-jacks', 'exercise-high-knees', 'exercise-mountain-climbers',
  'exercise-tricep-dips', 'exercise-pull-up', 'exercise-negative-pistol-squat',
  'exercise-step-up', 'exercise-dumbbell-rows', 'exercise-dumbbell-overhead-press',
  'exercise-dumbbell-floor-press', 'exercise-dumbbell-bicep-curls',
  'exercise-dumbbell-romanian-deadlift', 'exercise-single-leg-romanian-deadlift',
  'exercise-kettlebell-swing', 'exercise-farmers-carry', 'exercise-lateral-band-walk',
  'exercise-skipping-rope', 'exercise-boxing', 'exercise-shadow-boxing',
  'exercise-rowing', 'exercise-spinning',
];

/// Swift: Exercise.iconAssetName
export function iconAssetName(exercise) {
  if (!exercise) return null;
  return exercise.customIconName || ICON_MAP[exercise.name] || null;
}

const byName = name => BUILT_IN_EXERCISES.find(e => e.name === name);
const slot = (name, targets) => newSlot({ exerciseID: byName(name).id, ...targets });

// MARK: - Built-in plans
// Plan/day/slot IDs are generated fresh, exactly as on iOS — the store saves
// them on first launch so they stay stable from then on.

/// Bodyweight only: nothing here needs a bar, a bench or a gym.
function homeMaintenance() {
  return newPlan({
    name: 'Home Maintenance',
    planMode: 'weeklyCycle',
    days: [
      newPlanDay({ dayOfWeek: 1, dayType: 'strength', blocks: [
        newBlock({ blockName: 'Full Body A', exercises: [
          slot('Squat', { targetSets: 3, targetReps: 10 }),
          slot('Push-up', { targetSets: 3, targetReps: 8 }),
          slot('Plank', { targetSets: 3, targetDurationSeconds: 45 }),
        ] }),
      ] }),
      newPlanDay({ dayOfWeek: 2, dayType: 'rest' }),
      newPlanDay({ dayOfWeek: 3, dayType: 'cardio', blocks: [
        newBlock({ blockName: 'Cardio', exercises: [
          slot('Running', { targetDurationSeconds: 1800, unit2: 'Min' }),
        ] }),
      ] }),
      newPlanDay({ dayOfWeek: 4, dayType: 'rest' }),
      newPlanDay({ dayOfWeek: 5, dayType: 'strength', blocks: [
        newBlock({ blockName: 'Full Body B', exercises: [
          slot('Lunge', { targetSets: 3, targetReps: 10 }),
          slot('Glute Bridge', { targetSets: 3, targetReps: 12 }),
          slot('Superman', { targetSets: 3, targetReps: 10 }),
        ] }),
      ] }),
      newPlanDay({ dayOfWeek: 6, dayType: 'rest' }),
      newPlanDay({ dayOfWeek: 7, dayType: 'rest' }),
    ],
  });
}

function beginnerStrength() {
  const strengthDay = (index, blockName, sets, primary, secondary, accessory) =>
    newPlanDay({ dayIndex: index, dayType: 'strength', blocks: [
      newBlock({ blockName, exercises: [
        slot(primary, { targetSets: sets, targetReps: 5 }),
        slot(secondary, { targetSets: sets, targetReps: 5 }),
        slot(accessory, { targetSets: 3, targetReps: 10 }),
      ] }),
    ] });
  const restDay = index => newPlanDay({ dayIndex: index, dayType: 'rest' });

  const days = [];
  for (let week = 0; week < 4; week++) {
    const base = week * 7;
    const sets = 3 + (week < 2 ? 0 : 1);
    days.push(strengthDay(base + 0, `Week ${week + 1} \u00b7 Workout A`, sets, 'Squat', 'Bench Press', 'Plank'));
    days.push(restDay(base + 1));
    days.push(strengthDay(base + 2, `Week ${week + 1} \u00b7 Workout B`, sets, 'Squat', 'Overhead Press', 'Pull-up'));
    days.push(restDay(base + 3));
    days.push(strengthDay(base + 4, `Week ${week + 1} \u00b7 Workout A`, sets, 'Deadlift', 'Bench Press', 'Push-up'));
    days.push(restDay(base + 5));
    days.push(restDay(base + 6));
  }
  return newPlan({ name: 'Beginner Strength', planMode: 'finiteProgram', days });
}

function mobilityAndStretch() {
  return newPlan({
    name: 'Mobility & Stretch',
    planMode: 'weeklyCycle',
    days: [
      newPlanDay({ dayOfWeek: 2, dayType: 'yogaStretch', blocks: [
        newBlock({ blockName: 'Morning Mobility', exercises: [
          slot('Cat-Cow', { targetSets: 2, targetReps: 10 }),
          slot('Hip Flexor Stretch', { targetDurationSeconds: 60 }),
        ] }),
      ] }),
      newPlanDay({ dayOfWeek: 3, dayType: 'rest' }),
      newPlanDay({ dayOfWeek: 4, dayType: 'rest' }),
      newPlanDay({ dayOfWeek: 5, dayType: 'yogaStretch', blocks: [
        newBlock({ blockName: 'Evening Stretch', exercises: [
          slot('Hip Flexor Stretch', { targetDurationSeconds: 90 }),
          slot('Cat-Cow', { targetSets: 2, targetReps: 10 }),
        ] }),
      ] }),
      newPlanDay({ dayOfWeek: 1, dayType: 'rest' }),
      newPlanDay({ dayOfWeek: 6, dayType: 'rest' }),
      newPlanDay({ dayOfWeek: 7, dayType: 'rest' }),
    ],
  });
}

/// Swift: PlanTemplate.builtIn — a fresh copy (new IDs) on every call.
export function builtInPlans() {
  return [homeMaintenance(), beginnerStrength(), mobilityAndStretch()];
}
