// Plan templates, written by exercise name. Data only — builtin.js turns
// each into a weekly plan.
//
// A day lists its exercises with `sets` and either `reps` or `seconds`.
// On interval days `seconds` is the work time and `restSeconds` the rest after
// it; the app runs them as a circuit. Days that are not listed are rest days.

export const PLAN_DATA = [
  {
    "name": "Calisthenics Basics",
    "summary": "For beginners with no equipment who want three short full-body sessions a week to build a base of strength.",
    "level": 1,
    "equipment": "none",
    "focus": "calisthenics",
    "tier": "free",
    "days": [
      {
        "dayOfWeek": 1,
        "dayType": "strength",
        "title": "Full Body A",
        "exercises": [
          {
            "name": "Push-up",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Squat",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Split Squat",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Glute Bridge",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Superman",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Plank",
            "sets": 3,
            "seconds": 30
          }
        ]
      },
      {
        "dayOfWeek": 3,
        "dayType": "strength",
        "title": "Full Body B",
        "exercises": [
          {
            "name": "Wide Push-up",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Reverse Lunges",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Wall Sit",
            "sets": 3,
            "seconds": 30
          },
          {
            "name": "Single-Leg Calf Raise",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Lying Leg Raise",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Bird Dog",
            "sets": 3,
            "reps": 10
          }
        ]
      },
      {
        "dayOfWeek": 5,
        "dayType": "strength",
        "title": "Full Body C",
        "exercises": [
          {
            "name": "Push-up",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Squat",
            "sets": 3,
            "reps": 15
          },
          {
            "name": "Lunge",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Glute Bridge",
            "sets": 3,
            "reps": 15
          },
          {
            "name": "Superman",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Side Plank",
            "sets": 3,
            "seconds": 20
          }
        ]
      }
    ]
  },
  {
    "name": "Pull-up Bar Strength",
    "summary": "For people with a pull-up bar who can already do a few pull-ups and want a four-day plan to build pulling, pushing, leg and core strength.",
    "level": 2,
    "equipment": "bar",
    "focus": "calisthenics",
    "tier": "pro",
    "days": [
      {
        "dayOfWeek": 1,
        "dayType": "strength",
        "title": "Pull",
        "exercises": [
          {
            "name": "Scapular Pull-up",
            "sets": 2,
            "reps": 8
          },
          {
            "name": "Pull-up",
            "sets": 4,
            "reps": 5
          },
          {
            "name": "Chin-up",
            "sets": 3,
            "reps": 5
          },
          {
            "name": "Negative Pull-up",
            "sets": 3,
            "reps": 3
          },
          {
            "name": "Hanging Knee Raise",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Dead Hang",
            "sets": 2,
            "seconds": 30
          }
        ]
      },
      {
        "dayOfWeek": 2,
        "dayType": "strength",
        "title": "Push and Legs",
        "exercises": [
          {
            "name": "Push-up",
            "sets": 4,
            "reps": 12
          },
          {
            "name": "Pike Push-up",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Diamond Push-up",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Split Squat",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Cossack Squat",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Single-Leg Calf Raise",
            "sets": 3,
            "reps": 12
          }
        ]
      },
      {
        "dayOfWeek": 4,
        "dayType": "strength",
        "title": "Pull and Core",
        "exercises": [
          {
            "name": "Dead Hang",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Wide-Grip Pull-up",
            "sets": 3,
            "reps": 5
          },
          {
            "name": "Close-Grip Pull-up",
            "sets": 3,
            "reps": 5
          },
          {
            "name": "Negative Pull-up",
            "sets": 2,
            "reps": 4
          },
          {
            "name": "Hanging Leg Raise",
            "sets": 3,
            "reps": 6
          },
          {
            "name": "Hollow Hold",
            "sets": 3,
            "seconds": 25
          }
        ]
      },
      {
        "dayOfWeek": 5,
        "dayType": "strength",
        "title": "Push, Legs and Core",
        "exercises": [
          {
            "name": "Wide Push-up",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Pike Push-up",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Jump Squat",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Single-Leg Glute Bridge",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Lying Leg Raise",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Plank",
            "sets": 3,
            "seconds": 45
          }
        ]
      }
    ]
  },
  {
    "name": "First Skills",
    "summary": "For experienced trainees with solid push-ups and pull-ups who want to start working towards the handstand, planche and front lever.",
    "level": 3,
    "equipment": "bar",
    "focus": "calisthenics",
    "tier": "pro",
    "days": [
      {
        "dayOfWeek": 1,
        "dayType": "strength",
        "title": "Handstand and Planche",
        "exercises": [
          {
            "name": "Wall Handstand",
            "sets": 4,
            "seconds": 30
          },
          {
            "name": "Frog Stand",
            "sets": 4,
            "seconds": 20
          },
          {
            "name": "Tuck Planche",
            "sets": 4,
            "seconds": 8
          },
          {
            "name": "Pseudo Planche Push-up",
            "sets": 3,
            "reps": 6
          },
          {
            "name": "Pike Push-up",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Hollow Hold",
            "sets": 3,
            "seconds": 30
          }
        ]
      },
      {
        "dayOfWeek": 3,
        "dayType": "strength",
        "title": "Levers and Pulling",
        "exercises": [
          {
            "name": "Tuck Front Lever",
            "sets": 5,
            "seconds": 10
          },
          {
            "name": "Pull-up",
            "sets": 4,
            "reps": 6
          },
          {
            "name": "Archer Pull-up",
            "sets": 3,
            "reps": 4
          },
          {
            "name": "Chin-up",
            "sets": 3,
            "reps": 6
          },
          {
            "name": "Hanging Leg Raise",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Dead Hang",
            "sets": 2,
            "seconds": 40
          }
        ]
      },
      {
        "dayOfWeek": 5,
        "dayType": "strength",
        "title": "Balance, Legs and Core",
        "exercises": [
          {
            "name": "Wall Handstand",
            "sets": 3,
            "seconds": 40
          },
          {
            "name": "Handstand Hold",
            "sets": 5,
            "seconds": 10
          },
          {
            "name": "Assisted Pistol Squat",
            "sets": 3,
            "reps": 6
          },
          {
            "name": "Cossack Squat",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Toes-to-Bar",
            "sets": 3,
            "reps": 5
          },
          {
            "name": "Hollow Hold",
            "sets": 3,
            "seconds": 30
          }
        ]
      }
    ]
  },
  {
    "name": "Tabata Starter",
    "summary": "For beginners with no equipment: two 8-minute Tabata sessions a week of 20 seconds on and 10 seconds off, plus a few minutes to warm up first.",
    "level": 1,
    "equipment": "none",
    "focus": "hiit",
    "tier": "free",
    "days": [
      {
        "dayOfWeek": 2,
        "dayType": "hiit",
        "title": "Tabata A",
        "exercises": [
          {
            "name": "Jumping Jacks",
            "sets": 4,
            "seconds": 20,
            "restSeconds": 10
          },
          {
            "name": "Shadow Boxing",
            "sets": 4,
            "seconds": 20,
            "restSeconds": 10
          },
          {
            "name": "High Knees",
            "sets": 4,
            "seconds": 20,
            "restSeconds": 10
          },
          {
            "name": "Mountain Climbers",
            "sets": 4,
            "seconds": 20,
            "restSeconds": 10
          }
        ]
      },
      {
        "dayOfWeek": 5,
        "dayType": "hiit",
        "title": "Tabata B",
        "exercises": [
          {
            "name": "Butt Kicks",
            "sets": 4,
            "seconds": 20,
            "restSeconds": 10
          },
          {
            "name": "Lateral Shuffle",
            "sets": 4,
            "seconds": 20,
            "restSeconds": 10
          },
          {
            "name": "Fast Feet",
            "sets": 4,
            "seconds": 20,
            "restSeconds": 10
          },
          {
            "name": "Plank Shoulder Taps",
            "sets": 4,
            "seconds": 20,
            "restSeconds": 10
          }
        ]
      }
    ]
  },
  {
    "name": "HIIT 20",
    "summary": "For intermediate home trainers with no equipment: three 20-minute interval sessions a week, each using a different work-to-rest format.",
    "level": 2,
    "equipment": "none",
    "focus": "hiit",
    "tier": "pro",
    "days": [
      {
        "dayOfWeek": 1,
        "dayType": "hiit",
        "title": "40/20 Full Body",
        "exercises": [
          {
            "name": "Jump Squat",
            "sets": 4,
            "seconds": 40,
            "restSeconds": 20
          },
          {
            "name": "Push-up",
            "sets": 4,
            "seconds": 40,
            "restSeconds": 20
          },
          {
            "name": "Mountain Climbers",
            "sets": 4,
            "seconds": 40,
            "restSeconds": 20
          },
          {
            "name": "Reverse Lunges",
            "sets": 4,
            "seconds": 40,
            "restSeconds": 20
          },
          {
            "name": "Burpee",
            "sets": 4,
            "seconds": 40,
            "restSeconds": 20
          }
        ]
      },
      {
        "dayOfWeek": 3,
        "dayType": "hiit",
        "title": "30/30 Speed",
        "exercises": [
          {
            "name": "High Knees",
            "sets": 4,
            "seconds": 30,
            "restSeconds": 30
          },
          {
            "name": "Skaters",
            "sets": 4,
            "seconds": 30,
            "restSeconds": 30
          },
          {
            "name": "Squat Thrust",
            "sets": 4,
            "seconds": 30,
            "restSeconds": 30
          },
          {
            "name": "Fast Feet",
            "sets": 4,
            "seconds": 30,
            "restSeconds": 30
          },
          {
            "name": "Plank Jacks",
            "sets": 4,
            "seconds": 30,
            "restSeconds": 30
          }
        ]
      },
      {
        "dayOfWeek": 5,
        "dayType": "hiit",
        "title": "45/15 Engine",
        "exercises": [
          {
            "name": "Seal Jacks",
            "sets": 4,
            "seconds": 45,
            "restSeconds": 15
          },
          {
            "name": "Up-Down Plank",
            "sets": 4,
            "seconds": 45,
            "restSeconds": 15
          },
          {
            "name": "Pop Squat",
            "sets": 4,
            "seconds": 45,
            "restSeconds": 15
          },
          {
            "name": "Cross-Body Mountain Climbers",
            "sets": 4,
            "seconds": 45,
            "restSeconds": 15
          },
          {
            "name": "Bicycle Crunches",
            "sets": 4,
            "seconds": 45,
            "restSeconds": 15
          }
        ]
      }
    ]
  },
  {
    "name": "Kettlebell & Bodyweight Intervals",
    "summary": "For intermediate trainers with one kettlebell: three 24-minute interval sessions a week that pair swings with bodyweight moves.",
    "level": 2,
    "equipment": "kettlebell",
    "focus": "hiit",
    "tier": "pro",
    "days": [
      {
        "dayOfWeek": 2,
        "dayType": "hiit",
        "title": "Every Minute 30/30",
        "exercises": [
          {
            "name": "Kettlebell Swing",
            "sets": 6,
            "seconds": 30,
            "restSeconds": 30
          },
          {
            "name": "Push-up",
            "sets": 6,
            "seconds": 30,
            "restSeconds": 30
          },
          {
            "name": "Jump Squat",
            "sets": 6,
            "seconds": 30,
            "restSeconds": 30
          },
          {
            "name": "Plank Shoulder Taps",
            "sets": 6,
            "seconds": 30,
            "restSeconds": 30
          }
        ]
      },
      {
        "dayOfWeek": 4,
        "dayType": "hiit",
        "title": "40/20 Circuit",
        "exercises": [
          {
            "name": "Kettlebell Swing",
            "sets": 4,
            "seconds": 40,
            "restSeconds": 20
          },
          {
            "name": "Reverse Lunges",
            "sets": 4,
            "seconds": 40,
            "restSeconds": 20
          },
          {
            "name": "Mountain Climbers",
            "sets": 4,
            "seconds": 40,
            "restSeconds": 20
          },
          {
            "name": "Russian Twists",
            "sets": 4,
            "seconds": 40,
            "restSeconds": 20
          },
          {
            "name": "Squat Thrust",
            "sets": 4,
            "seconds": 40,
            "restSeconds": 20
          },
          {
            "name": "Plank",
            "sets": 4,
            "seconds": 40,
            "restSeconds": 20
          }
        ]
      },
      {
        "dayOfWeek": 6,
        "dayType": "hiit",
        "title": "45/15 Grind",
        "exercises": [
          {
            "name": "Kettlebell Swing",
            "sets": 4,
            "seconds": 45,
            "restSeconds": 15
          },
          {
            "name": "Up-Down Plank",
            "sets": 4,
            "seconds": 45,
            "restSeconds": 15
          },
          {
            "name": "Skaters",
            "sets": 4,
            "seconds": 45,
            "restSeconds": 15
          },
          {
            "name": "Bear Crawl",
            "sets": 4,
            "seconds": 45,
            "restSeconds": 15
          },
          {
            "name": "Glute Bridge March",
            "sets": 4,
            "seconds": 45,
            "restSeconds": 15
          },
          {
            "name": "Flutter Kicks",
            "sets": 4,
            "seconds": 45,
            "restSeconds": 15
          }
        ]
      }
    ]
  },
  {
    "name": "Cardio Base",
    "summary": "For beginners building steady endurance: three easy-paced sessions a week of 30 to 45 minutes, mixing run-walk intervals, cycling and a longer brisk walk.",
    "level": 1,
    "equipment": "bike",
    "focus": "cardio",
    "tier": "pro",
    "days": [
      {
        "dayOfWeek": 2,
        "dayType": "cardio",
        "title": "Run-Walk 30",
        "exercises": [
          {
            "name": "Run-Walk Intervals",
            "sets": 1,
            "seconds": 1800,
            "restSeconds": 0
          }
        ]
      },
      {
        "dayOfWeek": 4,
        "dayType": "cardio",
        "title": "Steady Ride 40",
        "exercises": [
          {
            "name": "Cycling",
            "sets": 1,
            "seconds": 2400,
            "restSeconds": 0
          }
        ]
      },
      {
        "dayOfWeek": 7,
        "dayType": "cardio",
        "title": "Long Brisk Walk 45",
        "exercises": [
          {
            "name": "Walking",
            "sets": 1,
            "seconds": 2700,
            "restSeconds": 0
          }
        ]
      }
    ]
  },
  {
    "name": "Morning Yoga Flow",
    "summary": "A gentle, energising flow for beginners who want to start the day moving, taking about 15 minutes per session.",
    "level": 1,
    "equipment": "none",
    "focus": "yoga",
    "tier": "free",
    "days": [
      {
        "dayOfWeek": 1,
        "dayType": "yogaStretch",
        "title": "Wake-Up Flow",
        "exercises": [
          {
            "name": "Cat-Cow",
            "sets": 1,
            "reps": 10
          },
          {
            "name": "Child's Pose",
            "sets": 1,
            "seconds": 60
          },
          {
            "name": "Downward-Facing Dog",
            "sets": 2,
            "seconds": 45
          },
          {
            "name": "Sun Salutation A",
            "sets": 1,
            "reps": 4
          },
          {
            "name": "Warrior II",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Triangle Pose",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Standing Forward Fold",
            "sets": 1,
            "seconds": 45
          },
          {
            "name": "Corpse Pose",
            "sets": 1,
            "seconds": 120
          }
        ]
      },
      {
        "dayOfWeek": 3,
        "dayType": "yogaStretch",
        "title": "Balance & Strength",
        "exercises": [
          {
            "name": "Mountain Pose",
            "sets": 1,
            "seconds": 30
          },
          {
            "name": "Sun Salutation A",
            "sets": 1,
            "reps": 4
          },
          {
            "name": "Chair Pose",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "High Lunge",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Tree Pose",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Wide-Legged Forward Fold",
            "sets": 1,
            "seconds": 45
          },
          {
            "name": "Bridge Pose",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Corpse Pose",
            "sets": 1,
            "seconds": 120
          }
        ]
      },
      {
        "dayOfWeek": 5,
        "dayType": "yogaStretch",
        "title": "Hips & Spine",
        "exercises": [
          {
            "name": "Cat-Cow",
            "sets": 1,
            "reps": 10
          },
          {
            "name": "Sun Salutation A",
            "sets": 1,
            "reps": 4
          },
          {
            "name": "Low Lunge",
            "sets": 2,
            "seconds": 40
          },
          {
            "name": "Warrior I",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Extended Side Angle",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Cobra Pose",
            "sets": 2,
            "seconds": 20
          },
          {
            "name": "Supine Twist",
            "sets": 2,
            "seconds": 45
          },
          {
            "name": "Corpse Pose",
            "sets": 1,
            "seconds": 120
          }
        ]
      }
    ]
  },
  {
    "name": "Desk Reset Mobility",
    "summary": "A quick, mostly standing mobility routine for people who sit for most of the day, taking about 10 minutes per session with nothing but a wall.",
    "level": 1,
    "equipment": "wall",
    "focus": "yoga",
    "tier": "pro",
    "days": [
      {
        "dayOfWeek": 1,
        "dayType": "yogaStretch",
        "title": "Neck & Shoulders",
        "exercises": [
          {
            "name": "Neck Stretch",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Arm Circles",
            "sets": 2,
            "reps": 10
          },
          {
            "name": "Cross-Body Shoulder Stretch",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Overhead Triceps Stretch",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Doorway Chest Stretch",
            "sets": 2,
            "seconds": 40
          },
          {
            "name": "Wall Angels",
            "sets": 2,
            "reps": 10
          },
          {
            "name": "Wrist Stretch",
            "sets": 2,
            "seconds": 30
          }
        ]
      },
      {
        "dayOfWeek": 2,
        "dayType": "yogaStretch",
        "title": "Hips & Hamstrings",
        "exercises": [
          {
            "name": "Leg Swings",
            "sets": 2,
            "reps": 12
          },
          {
            "name": "World's Greatest Stretch",
            "sets": 2,
            "reps": 5
          },
          {
            "name": "Hip Flexor Stretch",
            "sets": 2,
            "seconds": 40
          },
          {
            "name": "Standing Hamstring Stretch",
            "sets": 2,
            "seconds": 40
          },
          {
            "name": "Standing Quad Stretch",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Deep Squat Hold",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Wall Calf Stretch",
            "sets": 2,
            "seconds": 30
          }
        ]
      },
      {
        "dayOfWeek": 3,
        "dayType": "yogaStretch",
        "title": "Spine & Posture",
        "exercises": [
          {
            "name": "Arm Circles",
            "sets": 2,
            "reps": 10
          },
          {
            "name": "Wall Angels",
            "sets": 2,
            "reps": 10
          },
          {
            "name": "Doorway Chest Stretch",
            "sets": 2,
            "seconds": 40
          },
          {
            "name": "Neck Stretch",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "World's Greatest Stretch",
            "sets": 2,
            "reps": 5
          },
          {
            "name": "Standing Forward Fold",
            "sets": 1,
            "seconds": 60
          },
          {
            "name": "Deep Squat Hold",
            "sets": 2,
            "seconds": 40
          }
        ]
      },
      {
        "dayOfWeek": 4,
        "dayType": "yogaStretch",
        "title": "Ankles & Hips",
        "exercises": [
          {
            "name": "Knee-to-Wall Ankle Mobilisation",
            "sets": 2,
            "reps": 10
          },
          {
            "name": "Wall Calf Stretch",
            "sets": 2,
            "seconds": 40
          },
          {
            "name": "Leg Swings",
            "sets": 2,
            "reps": 12
          },
          {
            "name": "90/90 Hip Switch",
            "sets": 1,
            "reps": 10
          },
          {
            "name": "Hip Flexor Stretch",
            "sets": 2,
            "seconds": 40
          },
          {
            "name": "Standing Hamstring Stretch",
            "sets": 2,
            "seconds": 40
          },
          {
            "name": "Deep Squat Hold",
            "sets": 2,
            "seconds": 40
          }
        ]
      },
      {
        "dayOfWeek": 5,
        "dayType": "yogaStretch",
        "title": "Full-Body Reset",
        "exercises": [
          {
            "name": "Arm Circles",
            "sets": 2,
            "reps": 10
          },
          {
            "name": "World's Greatest Stretch",
            "sets": 2,
            "reps": 5
          },
          {
            "name": "Wall Angels",
            "sets": 1,
            "reps": 10
          },
          {
            "name": "Doorway Chest Stretch",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Standing Quad Stretch",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Standing Hamstring Stretch",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Wrist Stretch",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Neck Stretch",
            "sets": 2,
            "seconds": 30
          }
        ]
      }
    ]
  },
  {
    "name": "Evening Wind-Down",
    "summary": "A slow, restful floor sequence for anyone who wants to unwind before bed, taking about 15 minutes per session with a mat and a bit of wall space.",
    "level": 1,
    "equipment": "none",
    "focus": "yoga",
    "tier": "pro",
    "days": [
      {
        "dayOfWeek": 2,
        "dayType": "yogaStretch",
        "title": "Hips & Hamstrings Unwind",
        "exercises": [
          {
            "name": "Child's Pose",
            "sets": 1,
            "seconds": 90
          },
          {
            "name": "Downward-Facing Dog",
            "sets": 1,
            "seconds": 45
          },
          {
            "name": "Low Lunge",
            "sets": 2,
            "seconds": 45
          },
          {
            "name": "Figure-Four Stretch",
            "sets": 2,
            "seconds": 75
          },
          {
            "name": "Seated Forward Fold",
            "sets": 1,
            "seconds": 90
          },
          {
            "name": "Supine Twist",
            "sets": 2,
            "seconds": 60
          },
          {
            "name": "Legs Up the Wall",
            "sets": 1,
            "seconds": 180
          },
          {
            "name": "Corpse Pose",
            "sets": 1,
            "seconds": 120
          }
        ]
      },
      {
        "dayOfWeek": 4,
        "dayType": "yogaStretch",
        "title": "Back & Shoulders Unwind",
        "exercises": [
          {
            "name": "Cat-Cow",
            "sets": 1,
            "reps": 10
          },
          {
            "name": "Thread the Needle",
            "sets": 2,
            "seconds": 45
          },
          {
            "name": "Sphinx Pose",
            "sets": 2,
            "seconds": 45
          },
          {
            "name": "Child's Pose",
            "sets": 1,
            "seconds": 90
          },
          {
            "name": "Cross-Body Shoulder Stretch",
            "sets": 2,
            "seconds": 30
          },
          {
            "name": "Happy Baby",
            "sets": 1,
            "seconds": 60
          },
          {
            "name": "Supine Twist",
            "sets": 2,
            "seconds": 60
          },
          {
            "name": "Corpse Pose",
            "sets": 1,
            "seconds": 180
          }
        ]
      },
      {
        "dayOfWeek": 7,
        "dayType": "yogaStretch",
        "title": "Full Restore",
        "exercises": [
          {
            "name": "Cat-Cow",
            "sets": 1,
            "reps": 10
          },
          {
            "name": "Child's Pose",
            "sets": 1,
            "seconds": 90
          },
          {
            "name": "Sphinx Pose",
            "sets": 1,
            "seconds": 60
          },
          {
            "name": "Bound Angle Pose",
            "sets": 1,
            "seconds": 90
          },
          {
            "name": "Seated Forward Fold",
            "sets": 1,
            "seconds": 90
          },
          {
            "name": "Happy Baby",
            "sets": 1,
            "seconds": 60
          },
          {
            "name": "Legs Up the Wall",
            "sets": 1,
            "seconds": 180
          },
          {
            "name": "Corpse Pose",
            "sets": 1,
            "seconds": 180
          }
        ]
      }
    ]
  },
  {
    "name": "Dumbbell Full Body",
    "summary": "For beginners training at home or in a gym who want three whole-body sessions a week using a pair of dumbbells and a bench or sturdy step.",
    "level": 1,
    "equipment": "dumbbells",
    "focus": "strength",
    "tier": "free",
    "days": [
      {
        "dayOfWeek": 1,
        "dayType": "strength",
        "title": "Full Body A",
        "exercises": [
          {
            "name": "Goblet Squat",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Dumbbell Bench Press",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Dumbbell Rows",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Dumbbell Romanian Deadlift",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Dumbbell Lateral Raise",
            "sets": 2,
            "reps": 12
          },
          {
            "name": "Plank",
            "sets": 3,
            "seconds": 30
          }
        ]
      },
      {
        "dayOfWeek": 3,
        "dayType": "strength",
        "title": "Full Body B",
        "exercises": [
          {
            "name": "Dumbbell Split Squat",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Dumbbell Overhead Press",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Dumbbell Rows",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Dumbbell Hip Thrust",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Hammer Curl",
            "sets": 2,
            "reps": 12
          },
          {
            "name": "Farmer's Carry",
            "sets": 3,
            "seconds": 30
          }
        ]
      },
      {
        "dayOfWeek": 5,
        "dayType": "strength",
        "title": "Full Body C",
        "exercises": [
          {
            "name": "Dumbbell Step-up",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Dumbbell Romanian Deadlift",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Dumbbell Floor Press",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Dumbbell Reverse Fly",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Dumbbell Triceps Extension",
            "sets": 2,
            "reps": 12
          },
          {
            "name": "Suitcase Carry",
            "sets": 3,
            "seconds": 40
          }
        ]
      }
    ]
  },
  {
    "name": "Upper / Lower Split",
    "summary": "For intermediate lifters with access to a fully equipped gym who want four sessions a week alternating upper-body and lower-body days.",
    "level": 2,
    "equipment": "machine",
    "focus": "strength",
    "tier": "pro",
    "days": [
      {
        "dayOfWeek": 1,
        "dayType": "strength",
        "title": "Upper A",
        "exercises": [
          {
            "name": "Bench Press",
            "sets": 4,
            "reps": 6
          },
          {
            "name": "Barbell Row",
            "sets": 4,
            "reps": 8
          },
          {
            "name": "Dumbbell Overhead Press",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Lat Pulldown",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Dumbbell Lateral Raise",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Cable Triceps Pushdown",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Barbell Curl",
            "sets": 3,
            "reps": 10
          }
        ]
      },
      {
        "dayOfWeek": 2,
        "dayType": "strength",
        "title": "Lower A",
        "exercises": [
          {
            "name": "Back Squat",
            "sets": 4,
            "reps": 6
          },
          {
            "name": "Romanian Deadlift",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Leg Press",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Leg Curl",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Calf Raises",
            "sets": 3,
            "reps": 15
          },
          {
            "name": "Plank",
            "sets": 3,
            "seconds": 45
          }
        ]
      },
      {
        "dayOfWeek": 4,
        "dayType": "strength",
        "title": "Upper B",
        "exercises": [
          {
            "name": "Overhead Press",
            "sets": 4,
            "reps": 6
          },
          {
            "name": "Pull-up",
            "sets": 4,
            "reps": 6
          },
          {
            "name": "Incline Dumbbell Press",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Seated Cable Row",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Cable Face Pull",
            "sets": 3,
            "reps": 15
          },
          {
            "name": "Skull Crusher",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Hammer Curl",
            "sets": 3,
            "reps": 12
          }
        ]
      },
      {
        "dayOfWeek": 5,
        "dayType": "strength",
        "title": "Lower B",
        "exercises": [
          {
            "name": "Deadlift",
            "sets": 3,
            "reps": 5
          },
          {
            "name": "Dumbbell Split Squat",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Hip Thrust",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Leg Extension",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Seated Calf Raise",
            "sets": 3,
            "reps": 15
          },
          {
            "name": "Cable Woodchop",
            "sets": 3,
            "reps": 12
          }
        ]
      }
    ]
  },
  {
    "name": "Push Pull Legs",
    "summary": "For intermediate lifters with access to a gym with barbells, cables and machines who want three focused sessions a week split into pushing, pulling and leg days.",
    "level": 2,
    "equipment": "machine",
    "focus": "strength",
    "tier": "pro",
    "days": [
      {
        "dayOfWeek": 1,
        "dayType": "strength",
        "title": "Push",
        "exercises": [
          {
            "name": "Bench Press",
            "sets": 4,
            "reps": 8
          },
          {
            "name": "Overhead Press",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Incline Dumbbell Press",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Dumbbell Lateral Raise",
            "sets": 3,
            "reps": 15
          },
          {
            "name": "Cable Fly",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Cable Triceps Pushdown",
            "sets": 3,
            "reps": 12
          }
        ]
      },
      {
        "dayOfWeek": 3,
        "dayType": "strength",
        "title": "Pull",
        "exercises": [
          {
            "name": "Barbell Row",
            "sets": 4,
            "reps": 8
          },
          {
            "name": "Lat Pulldown",
            "sets": 4,
            "reps": 10
          },
          {
            "name": "Seated Cable Row",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Cable Face Pull",
            "sets": 3,
            "reps": 15
          },
          {
            "name": "Barbell Curl",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Hammer Curl",
            "sets": 2,
            "reps": 12
          }
        ]
      },
      {
        "dayOfWeek": 5,
        "dayType": "strength",
        "title": "Legs",
        "exercises": [
          {
            "name": "Back Squat",
            "sets": 4,
            "reps": 8
          },
          {
            "name": "Romanian Deadlift",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Leg Press",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Leg Curl",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Calf Raises",
            "sets": 4,
            "reps": 15
          },
          {
            "name": "Plank",
            "sets": 3,
            "seconds": 45
          }
        ]
      }
    ]
  },
  {
    "name": "Kettlebell Basics",
    "summary": "For beginners who want three short whole-body sessions a week using a single kettlebell and a little floor space.",
    "level": 1,
    "equipment": "kettlebell",
    "focus": "strength",
    "tier": "pro",
    "days": [
      {
        "dayOfWeek": 1,
        "dayType": "strength",
        "title": "Kettlebell A",
        "exercises": [
          {
            "name": "Kettlebell Deadlift",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Goblet Squat",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Kettlebell Press",
            "sets": 3,
            "reps": 6
          },
          {
            "name": "Kettlebell Row",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Kettlebell Halo",
            "sets": 2,
            "reps": 8
          },
          {
            "name": "Suitcase Carry",
            "sets": 3,
            "seconds": 40
          }
        ]
      },
      {
        "dayOfWeek": 3,
        "dayType": "strength",
        "title": "Kettlebell B",
        "exercises": [
          {
            "name": "Reverse Lunges",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Kettlebell Deadlift",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Push-up",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Kettlebell Row",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Kettlebell Halo",
            "sets": 2,
            "reps": 8
          },
          {
            "name": "Side Plank",
            "sets": 2,
            "seconds": 20
          }
        ]
      },
      {
        "dayOfWeek": 5,
        "dayType": "strength",
        "title": "Kettlebell C",
        "exercises": [
          {
            "name": "Goblet Squat",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Kettlebell Deadlift",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Kettlebell Press",
            "sets": 3,
            "reps": 8
          },
          {
            "name": "Kettlebell Row",
            "sets": 3,
            "reps": 10
          },
          {
            "name": "Glute Bridge",
            "sets": 3,
            "reps": 12
          },
          {
            "name": "Suitcase Carry",
            "sets": 3,
            "seconds": 40
          }
        ]
      }
    ]
  }
];
