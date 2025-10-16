

import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

const beltProgression = [
    {
        name: 'White Belt (10th Gup)',
        style: { borderTopColor: '#ddd' },
        description: 'Signifies innocence and a blank slate, like a student with no prior knowledge of Taekwondo.',
        focus: 'Fundamental stances, basic blocks, punches, and introductory kicks.',
        techniques: 'Front Kick, Low Block, Middle Punch',
        trainingTips: [
            "Focus on keeping your back straight and shoulders relaxed in every stance to build a strong foundation.",
            "Practice your Front Kick slowly in front of a mirror to ensure your knee is chambered high before extending."
        ],
        promotionCriteria: {
            forms: "None required. Focus on individual movements.",
            sparring: "Three-step sparring (basic pre-arranged sequences).",
            knowledge: "Basic terminology (stances, blocks, kicks), Dojo etiquette, How to tie your belt."
        }
    },
    {
        name: 'Yellow Belt (8th Gup)',
        style: { borderTopColor: 'var(--yellow)' },
        description: 'Represents the earth, from which a plant sprouts and takes root as the foundation of Taekwondo is being laid.',
        focus: 'Improving balance, coordination, and learning the first form (Poomsae).',
        techniques: 'Roundhouse Kick, Side Kick, Taegeuk Il Jang',
        trainingTips: [
            "When performing a Roundhouse Kick, pivot your standing foot completely to generate power from your hips, not just your leg.",
            "Memorize Taegeuk Il Jang by breaking it into smaller sections. Practice one section until it's smooth before adding the next."
        ],
        promotionCriteria: {
            forms: "Taegeuk Il Jang (Form 1) & Taegeuk Ee Jang (Form 2).",
            sparring: "One-step sparring (demonstrating block and counter).",
            knowledge: "Meaning of Taegeuk Il & Ee Jang, Tenets of Taekwondo (Courtesy, Integrity, Perseverance, Self-Control, Indomitable Spirit)."
        }
    },
    {
        name: 'Green Belt (6th Gup)',
        style: { borderTopColor: 'var(--green)' },
        description: 'Symbolizes the plant\'s growth as Taekwondo skills begin to develop.',
        focus: 'More complex forms, combination kicks, and introductory one-step sparring.',
        techniques: 'Back Kick, Combination Kicking, Taegeuk Sam Jang',
        trainingTips: [
            "For the Back Kick, always look over your shoulder at the target before executing the kick to ensure accuracy.",
            "In combination kicking, focus on a smooth, continuous flow between kicks rather than executing them as separate movements."
        ],
        promotionCriteria: {
            forms: "Taegeuk Sam Jang (Form 3) & Taegeuk Sa Jang (Form 4).",
            sparring: "Controlled free sparring (light contact), demonstrating footwork and combinations.",
            knowledge: "Meaning of Taegeuk Sam & Sa Jang, understanding of blocking applications."
        }
    },
    {
        name: 'Blue Belt (4th Gup)',
        style: { borderTopColor: 'var(--blue)' },
        description: 'Represents the sky or heaven, towards which the plant matures into a towering tree as training progresses.',
        focus: 'Advanced forms, spinning techniques, and the basics of free sparring.',
        techniques: 'Spinning Hook Kick, Free Sparring, Taegeuk O Jang',
        trainingTips: [
            "In sparring, practice maintaining your guard (hands up) at all times, even when you're tired.",
            "For spinning kicks, spot your target before and after the spin to maintain balance and accuracy."
        ],
        promotionCriteria: {
            forms: "Taegeuk Oh Jang (Form 5) & Taegeuk Yuk Jang (Form 6).",
            sparring: "Free sparring (increased intensity), demonstrating counter-attacks and timing.",
            knowledge: "Meaning of Taegeuk Oh & Yuk Jang, basic competition rules."
        }
    },
    {
        name: 'Red Belt (2nd Gup)',
        style: { borderTopColor: 'var(--red)' },
        description: 'Signifies danger, cautioning the student to exercise control, and warning the opponent to stay away.',
        focus: 'High-level forms, jumping kicks, board breaking, and developing self-control.',
        techniques: 'Jumping Kicks, Board Breaking, Taegeuk Chil Jang',
        trainingTips: [
            "Develop explosive power for jumping kicks by practicing box jumps and squats to strengthen your legs.",
            "For board breaking, focus on speed and aiming *through* the target, not just at the surface. A confident 'Kihap' (yell) helps!"
        ],
        promotionCriteria: {
            forms: "Taegeuk Chil Jang (Form 7) & Taegeuk Pal Jang (Form 8).",
            sparring: "Advanced free sparring, demonstrating strategy, ring management, and advanced combinations.",
            knowledge: "Meaning of Taegeuk Chil & Pal Jang, history of Taekwondo."
        }
    },
    {
        name: 'Brown Belt (1st Gup)',
        style: { borderTopColor: 'var(--brown)' },
        description: 'Represents maturity and the ripening of skills, as a student prepares for the final step.',
        focus: 'Refining all techniques and developing a deeper understanding of Taekwondo philosophy.',
        techniques: 'Advanced Sparring, All previous forms, Mental conditioning',
        trainingTips: [
            "Focus on the 'why' behind each movement in your forms. Understand the practical application of each block, strike, and stance.",
            "During advanced sparring, work on setting up your opponent with feints and footwork to create openings for your techniques."
        ],
        promotionCriteria: {
            forms: "Review and perfect all 8 Taegeuk forms.",
            sparring: "Demonstrate mastery in sparring, including setting up techniques and controlling the match.",
            knowledge: "Deep understanding of the philosophy behind all Taegeuk forms, ability to explain techniques."
        }
    },
    {
        name: 'Black Belt (1st Dan)',
        style: { borderTopColor: 'var(--primary-color)' },
        description: 'The opposite of white, signifying mastery of the basics. It is not an end, but a new beginning.',
        focus: 'Mastery of all techniques, leadership, teaching, and continued personal growth.',
        techniques: 'Leadership, Advanced Self-Defense, Koryo Poomsae',
        trainingTips: [
            "As a leader, be patient and clear when teaching junior belts. Breaking down techniques into simple steps is key.",
            "Continuously refine your basic techniques. Mastery is not about learning new things, but perfecting the fundamentals."
        ],
        promotionCriteria: {
            forms: "Koryo Poomsae, plus a demonstration of a previous form chosen by judges.",
            sparring: "Multiple rounds of high-level sparring, showcasing endurance and spirit.",
            knowledge: "Thesis or essay on a Taekwondo topic, ability to teach junior students."
        }
    },
];

const danProgression = [
    {
        dan: '1st Dan (Il Dan)',
        title: 'Instructor (Jo-kyo-nim)',
        age: '15+',
        duration: 'N/A',
        requirements: [
            'Poomsae: All 8 Taegeuk forms, Koryo',
            'Sparring: Advanced free sparring, one-step sparring',
            'Breaking: Power breaking (hand and foot techniques)',
            'Knowledge: Taekwondo history, philosophy, and terminology'
        ]
    },
    {
        dan: '2nd Dan (Ee Dan)',
        title: 'Instructor (Kyo-sa-nim)',
        age: '16+',
        duration: '1 Year',
        requirements: [
            'Poomsae: Keumgang',
            'Sparring: Enhanced proficiency in free sparring',
            'Breaking: Combination breaking techniques',
            'Other: Assistant teaching experience'
        ]
    },
    {
        dan: '3rd Dan (Sam Dan)',
        title: 'Instructor (Kyo-sa-nim)',
        age: '18+',
        duration: '2 Years',
        requirements: [
            'Poomsae: Taebaek',
            'Sparring: Strategic application of techniques',
            'Breaking: Advanced speed and power breaking',
            'Other: Increased teaching responsibilities'
        ]
    },
    {
        dan: '4th Dan (Sa Dan)',
        title: 'Master (Sa-beom-nim)',
        age: '21+',
        duration: '3 Years',
        requirements: [
            'Poomsae: Pyongwon, Sipjin',
            'Sparring: Mastery of competitive strategy',
            'Breaking: Creative/demonstration breaking',
            'Other: Completion of Master Instructor course'
        ]
    },
    {
        dan: '5th Dan (Oh Dan)',
        title: 'Master (Sa-beom-nim)',
        age: '25+',
        duration: '4 Years',
        requirements: [
            'Poomsae: Jitae, Chonkwon',
            'Other: Submission of a research thesis on a Taekwondo topic',
            'Must demonstrate significant contribution to Taekwondo'
        ]
    },
    {
        dan: '6th Dan (Yuk Dan)',
        title: 'Grandmaster (Kwan-jang-nim)',
        age: '30+',
        duration: '5 Years',
        requirements: [
            'Poomsae: Hansu, Ilyeo',
            'Other: Continued research and contribution to Taekwondo development',
            'Recognized leadership within the Taekwondo community'
        ]
    },
    {
        dan: '7th Dan (Chil Dan)',
        title: 'Grandmaster (Kwan-jang-nim)',
        age: '36+',
        duration: '6 Years',
        requirements: [
            'Must be recommended by senior Grandmasters',
            'Significant, demonstrable contributions to the global Taekwondo community',
            'Submission of an advanced thesis'
        ]
    },
    {
        dan: '8th Dan (Pal Dan)',
        title: 'Grandmaster (Kwan-jang-nim)',
        age: '44+',
        duration: '8 Years',
        requirements: [
            'Highest level of leadership and influence in Taekwondo',
            'Appointment requires approval from the Kukkiwon Promotion Committee',
            'Represents a lifetime of dedication and achievement'
        ]
    },
    {
        dan: '9th Dan (Gu Dan)',
        title: 'Grandmaster (Kwan-jang-nim)',
        age: '53+',
        duration: '9 Years',
        requirements: [
            'The highest attainable rank in Kukkiwon Taekwondo',
            'Awarded to individuals who have shown exceptional character and made monumental contributions to the art',
            'Represents the pinnacle of technical, philosophical, and spiritual understanding'
        ]
    }
];


const techniquesData = [
    {
        category: 'Foundational Skills',
        description: 'The core building blocks essential for every practitioner.',
        id: 'foundations',
        details: [
            {
                title: 'Basic Stances (Seogi)',
                techniques: [
                    { name: 'Ready Stance (Joonbi Seogi)', belt: 'white', level: 'Beginner', youtubeId: 'luaRUqNIfQE' },
                    { name: 'Walking Stance (Ap Seogi)', belt: 'white', level: 'Beginner', youtubeId: 'PfrfkKA51Q0' },
                    { name: 'Front Stance (Ap Kubi)', belt: 'yellow', level: 'Beginner', youtubeId: 'PuWO6aoAFbU' },
                    { name: 'Back Stance (Dwit Kubi)', belt: 'green', level: 'Intermediate', youtubeId: 'cAe5ACVkorY' },
                ],
            },
            {
                title: 'Essential Blocks (Makgi)',
                techniques: [
                    { name: 'Low Block (Arae Makgi)', belt: 'white', level: 'Beginner' },
                    { name: 'Inner Forearm Block (Momtong An Makgi)', belt: 'yellow', level: 'Beginner' },
                    { name: 'High Block (Olgul Makgi)', belt: 'green', level: 'Intermediate' },
                    { name: 'Knife Hand Block (Sonnal Makgi)', belt: 'blue', level: 'Intermediate' },
                ],
            },
            {
                title: 'Fundamental Kicks (Chagi)',
                techniques: [
                    { name: 'Front Snap Kick (Ap Chagi)', belt: 'white', level: 'Beginner' },
                    { name: 'Roundhouse Kick (Dollyo Chagi)', belt: 'yellow', level: 'Beginner' },
                    { name: 'Side Kick (Yeop Chagi)', belt: 'green', level: 'Intermediate' },
                    { name: 'Back Kick (Dwi Chagi)', belt: 'blue', level: 'Intermediate' },
                    { name: 'Crescent Kick (Bandal Chagi)', belt: 'red', level: 'Advanced' },
                ],
            },
        ],
    },
    {
        category: 'Forms (Poomsae)',
        description: 'A series of defined movements to practice techniques and principles.',
        id: 'poomsae',
        details: [
            {
                title: 'Taegeuk Il Jang (Form 1)',
                belt: 'yellow',
                level: 'Beginner',
                description: 'Represents "Keon" (Heaven), symbolizing the beginning of creation. It is the foundation of all Taegeuk forms.',
                keyMovements: 'Walking Stance, Front Stance, Low Block, Inner Forearm Block, Middle Punch, and Front Snap Kick.',
                philosophy: 'Teaches the basics of movement, focusing on simplicity, power, and building a strong foundation in fundamental stances and blocks.'
            },
            {
                title: 'Taegeuk Ee Jang (Form 2)',
                belt: 'yellow',
                level: 'Beginner',
                description: 'Represents "Tae" (Joyfulness), symbolizing inner strength expressed with external gentleness and serenity.',
                keyMovements: 'Introduces High Block and High Punch, while emphasizing fluid transitions and the combination of Front Snap Kicks with punches.',
                philosophy: 'Focuses on the principle of inner strength with external softness, teaching practitioners to remain calm and joyful even while executing powerful techniques.'
            },
            {
                title: 'Taegeuk Sam Jang (Form 3)',
                belt: 'green',
                level: 'Intermediate',
                description: 'Represents "Ri" (Fire & Sun), symbolizing passion and energy. The movements are active, varied, and full of life.',
                keyMovements: 'Introduces Knife Hand Strike, Knife Hand Block, and Back Stance. It emphasizes quick transitions between stances.',
                philosophy: 'Teaches the ability to control passion and energy. The form encourages practitioners to be dynamic and adaptable, like a flickering flame.'
            },
            {
                title: 'Taegeuk Sa Jang (Form 4)',
                belt: 'green',
                level: 'Intermediate',
                description: 'Represents "Jin" (Thunder), symbolizing great power and dignity. The movements are powerful and dignified.',
                keyMovements: 'Features more advanced techniques like Knife Hand Guarding Block, Side Kick, and Swallow Form Strike. It demands stability and power.',
                philosophy: 'Cultivates calmness and bravery in the face of danger, teaching the practitioner to act with the power and decisiveness of a thunderclap.'
            },
            {
                title: 'Taegeuk Oh Jang (Form 5)',
                belt: 'blue',
                level: 'Intermediate',
                description: 'Represents "Seon" (Wind), symbolizing the dual nature of wind—gentle and yielding, yet powerful and destructive.',
                keyMovements: 'Introduces the Hammer Fist, Elbow Strike, and combination Side Kick with a hand strike. It emphasizes flexibility and coordination.',
                philosophy: 'Teaches the principle of alternating between soft, yielding movements and powerful, decisive strikes, embodying the unpredictable nature of wind.'
            },
            {
                title: 'Taegeuk Yuk Jang (Form 6)',
                belt: 'blue',
                level: 'Intermediate',
                description: 'Represents "Gam" (Water), symbolizing the flow and adaptability of water. The movements are fluid and continuous.',
                keyMovements: 'Introduces the Outward Crescent Kick (Bakat Chagi) and a high turning kick. It focuses on flowing transitions and maintaining balance through continuous motion.',
                philosophy: 'Teaches the practitioner to be adaptable and persistent, like water that can overcome any obstacle by flowing around or through it.'
            },
            {
                title: 'Taegeuk Chil Jang (Form 7)',
                belt: 'red',
                level: 'Advanced',
                description: 'Represents "Gan" (Mountain), symbolizing stability and majesty. The movements are powerful and firmly grounded.',
                keyMovements: 'Introduces Tiger Stance (Beom Seogi), Knee Strike, and various blocks like the Low Double Knife Hand Block. It emphasizes powerful, deliberate movements.',
                philosophy: 'Cultivates a sense of stability, composure, and immovable resolve, teaching the practitioner to stand firm and dignified like a mountain.'
            },
            {
                title: 'Taegeuk Pal Jang (Form 8)',
                belt: 'red',
                level: 'Advanced',
                description: 'Represents "Gon" (Earth), symbolizing the creative and receptive nature of the earth. It is the last of the Taegeuk series, summarizing the previous forms.',
                keyMovements: 'Features combination kicks like the Jumping Front Kick, Double Punch, and Elbow Strikes. It is a comprehensive form that tests a wide range of skills.',
                philosophy: 'Represents the culmination of the beginner and intermediate journey, teaching the practitioner to embrace both the yin and yang elements of Taekwondo.'
            },
            {
                title: 'Koryo Poomsae',
                belt: 'black',
                level: 'Advanced',
                description: 'The first of the "Dan" or black belt forms. Koryo represents the "Seonbae" spirit of the Koryo dynasty, known for their strong martial spirit and conviction.',
                keyMovements: 'Features advanced techniques like the Arc Hand Strike, Side Punch, and a variety of complex stances and footwork. The movements are powerful and dignified.',
                philosophy: 'Symbolizes a strong and unwavering spirit, emphasizing self-control, discipline, and the readiness to defend justice.'
            }
        ]
    },
    {
        category: 'Board Breaking (Gyeokpa)',
        description: 'The discipline of breaking boards to demonstrate power, precision, and mental focus.',
        id: 'breaking',
        details: [
            {
                title: 'Common Breaking Techniques',
                techniques: [
                    { name: 'Downward Hammer Fist Break', belt: 'green', level: 'Intermediate', youtubeId: 'J87NQeRs9Bw' },
                    { name: 'Front Kick Break', belt: 'blue', level: 'Intermediate', youtubeId: 'rDAIlfTFDqU' },
                    { name: 'Side Kick Break', belt: 'blue', level: 'Advanced', youtubeId: '98boTtEjgfw' },
                ],
            },
            {
                title: 'Safety & Core Principles',
                level: 'Intermediate',
                description: 'Board breaking is a test of proper technique, not brute force. It requires correct alignment, speed, and follow-through. Always practice under supervision.',
                keyMovements: 'Focus on a small target area. Exhale sharply on impact (Kihap) to maximize power. Aim to strike *through* the target, not just at its surface. Ensure your wrist, ankle, and joints are properly aligned to prevent injury.',
                philosophy: 'Start with re-breakable practice boards before moving to wood. Ensure proper hand and foot conditioning over time. Never attempt a break without a qualified instructor present to hold the board and provide guidance.'
            }
        ]
    }
];

const sparringDrillsData = [
    {
        title: 'One-Step Sparring (Hanbon Kyorugi)',
        level: 'Beginner',
        style: 'var(--yellow)',
        detailsByLevel: {
            Beginner: {
                description: 'A foundational partner drill focusing on reaction to a single, pre-arranged attack. It builds the muscle memory for blocking and countering, teaching vital concepts of distance and timing in a controlled environment.',
                keyFocusAreas: ['Correct Stance and Guard', 'Accurate Blocking', 'Basic Counter-Attacks (e.g., punch)', 'Maintaining Balance'],
            },
            Intermediate: {
                description: 'An evolution of the basic drill, incorporating more complex counters and varied attacks. The focus shifts from just reacting to reacting with speed, precision, and a wider range of techniques.',
                keyFocusAreas: ['Faster Reaction Time', 'Countering with Kicks', 'Controlling Distance (entering and exiting)', 'Adding a Kihap (yell)'],
            },
            Advanced: {
                description: 'At this level, one-step sparring becomes a laboratory for self-defense applications. Counters should be explosive and decisive, often involving multiple strikes, takedowns, or joint-lock setups.',
                keyFocusAreas: ['Multiple Counter-Attacks', 'Using Footwork to Create Angles', 'Applying Self-Defense Scenarios', 'Seamless Transitions from Defense to Offense'],
            }
        },
        equipment: ['Partner', 'Optional: Hogu (chest protector), headgear'],
        safetyTips: [
            'Start slowly to master the sequence before increasing speed.',
            'Maintain clear communication with your partner.',
            'Focus on control; techniques should be stopped just short of making contact.',
            'Always bow to your partner before and after the drill as a sign of respect.'
        ]
    },
    {
        title: 'Free Sparring (Jayu Kyorugi)',
        level: 'Intermediate',
        style: 'var(--green)',
        detailsByLevel: {
            Beginner: {
                description: 'Light, controlled free sparring focusing on movement and defense. The goal is not to score points but to get comfortable with the dynamic, unpredictable nature of sparring while practicing basic footwork and blocks.',
                keyFocusAreas: ['Maintaining Guard', 'Basic Footwork (forward, backward, side-to-side)', 'Using Front Kick to Manage Distance', 'Blocking Basic Attacks'],
            },
            Intermediate: {
                description: 'Unrehearsed sparring simulating a competition match. The focus is on applying techniques fluidly, using combinations, and developing a basic strategy. This is where you connect your drills to real-time application.',
                keyFocusAreas: ['Using Combinations (e.g., punch-kick)', 'Basic Counter-Attacks', 'Offensive and Defensive Footwork', 'Ring Awareness'],
            },
            Advanced: {
                description: 'High-level, strategic sparring that involves setting up opponents, using feints, and controlling the pace of the match. The focus is on out-thinking the opponent, not just out-fighting them.',
                keyFocusAreas: ['Advanced Combinations and Feints', 'Strategic Counter-Attacking', 'Ring Management and Control', 'Adapting Strategy Mid-Match'],
            }
        },
        equipment: ['Partner', 'Full sparring gear: Hogu, headgear, shin guards, arm guards, mouthguard, groin cup (for males)'],
        safetyTips: [
            'Always wear complete, properly-fitted protective gear.',
            'Agree on the intensity level with your partner beforehand (e.g., light contact, no head contact).',
            'A referee or instructor should supervise to ensure safety and enforce rules.',
            'Never spar when angry or overly tired.'
        ],
    },
    {
        title: 'Counter-Attacks (Bada Chagi)',
        level: 'Advanced',
        style: 'var(--blue)',
        detailsByLevel: {
            Beginner: {
                description: 'Introduction to the concept of countering. Drills focus on responding to a slow, telegraphed attack with a single, basic counter-attack after a successful block. The goal is to build the "block and respond" instinct.',
                keyFocusAreas: ['Block-Then-Counter Timing', 'Countering with a Middle Punch', 'Maintaining Guard After Countering', 'Resetting to Stance'],
            },
            Intermediate: {
                description: 'Drills focusing on reacting to an opponent\'s attack with an immediate counter, often turning their offense into an opportunity. This involves evading or angling off to create an opening for a strike.',
                keyFocusAreas: ['Simultaneous Block and Counter', 'Using Footwork to Evade and Counter', 'Countering with a Side Kick or Roundhouse Kick', 'Anticipating Common Attacks'],
            },
            Advanced: {
                description: 'A hallmark of an expert fighter, these drills focus on "attacking the attacker." Counters are executed as the opponent initiates their own technique, intercepting their movement and capitalizing on their momentary vulnerability.',
                keyFocusAreas: ['Intercepting an Attack (e.g., cut kick)', 'Drawing an Attack to Set Up a Counter', 'Advanced Footwork for Angle Creation', 'Countering with Spinning or Jumping Kicks'],
            }
        },
        equipment: ['Partner', 'Pads or kicking shield', 'Optional: Sparring gear'],
        safetyTips: [
            'The attacker should execute their technique with predictable timing initially.',
            'The defender should focus on the timing of the counter, not raw power.',
            'Use kicking pads or shields to allow for safe, full-power counters.',
            'Both partners should be aware of their surroundings to avoid collisions.'
        ],
    },
];

const trainingProgramsData = [
    {
        level: 'Beginner',
        title: 'The Foundation (White to Green Belt)',
        description: 'This program is designed for new students to build a strong base in Taekwondo. The focus is on mastering fundamental stances, basic kicks, and understanding the core principles of discipline and respect.',
        focus: ['Basic Stances (Ap Seogi, Ap Kubi)', 'Fundamental Kicks (Ap Chagi, Dollyo Chagi)', 'Essential Blocks (Arae Makgi, Momtong An Makgi)', 'Forms: Taegeuk Il Jang & Ee Jang'],
        schedule: [
            { day: 'Day 1 & 4', activity: 'Stance and Footwork Drills (30 mins), Basic Kicks Practice (30 mins)' },
            { day: 'Day 2 & 5', activity: 'Poomsae (Form) Practice (45 mins), Basic Blocks (15 mins)' },
            { day: 'Day 3 & 6', activity: 'Flexibility and Conditioning (30 mins), Review and Repetition (30 mins)' },
            { day: 'Day 7', activity: 'Rest or light activity like stretching' }
        ],
        style: 'var(--green)'
    },
    {
        level: 'Intermediate',
        title: 'The Path of Growth (Green to Blue Belt)',
        description: 'For students who have grasped the basics, this program introduces more complex techniques, combinations, and the fundamentals of sparring. The goal is to enhance coordination, power, and strategic thinking.',
        focus: ['Advanced Stances (Dwit Kubi)', 'Combination Kicking', 'Introductory Sparring Drills', 'Forms: Taegeuk Sam Jang & Sa Jang'],
        schedule: [
            { day: 'Day 1 & 4', activity: 'Combination Kicking Drills (40 mins), Footwork for Sparring (20 mins)' },
            { day: 'Day 2 & 5', activity: 'Poomsae (Form) Practice (30 mins), One-Step Sparring (30 mins)' },
            { day: 'Day 3 & 6', activity: 'Strength and Conditioning (45 mins), Advanced Blocks (15 mins)' },
            { day: 'Day 7', activity: 'Rest or light sparring' }
        ],
        style: 'var(--blue)'
    },
    {
        level: 'Advanced',
        title: 'The Edge of Mastery (Blue to Red/Black Belt)',
        description: 'This program is for dedicated practitioners aiming for precision, speed, and power. It focuses on advanced techniques, free sparring, and a deeper philosophical understanding of Taekwondo as a martial art.',
        focus: ['Spinning and Jumping Kicks', 'Advanced Sparring Strategies', 'Board Breaking Techniques', 'Forms: Taegeuk Oh Jang and higher'],
        schedule: [
            { day: 'Day 1 & 4', activity: 'Advanced Kicking Techniques (Jumping/Spinning) (45 mins), Reaction Drills (15 mins)' },
            { day: 'Day 2 & 5', activity: 'Poomsae (Form) Mastery (30 mins), Free Sparring Sessions (30 mins)' },
            { day: 'Day 3 & 6', activity: 'Power and Agility Training (30 mins), Self-Defense Scenarios (30 mins)' },
            { day: 'Day 7', activity: 'Rest and mental training (visualization, meditation)' }
        ],
        style: 'var(--red)'
    }
];

const timerPresets = {
    stance: { label: 'Stance Hold (1 min)', duration: 60 },
    form: { label: 'Form Practice (5 min)', duration: 300 },
    interval: { label: 'Interval Training (3 Rounds)', duration: 180 },
    custom: { label: 'Quick Spar (30 sec)', duration: 30 },
};

const getVideoPromptForTechnique = (techniqueName: string, difficulty: string): string => {
    const basePrompt = `A high-definition, 1080p, 30fps video of a Taekwondo practitioner in a traditional white dobok, set in a clean, minimalist dojo with wooden floors. The video must clearly demonstrate the technique with precision and control. It must include a clear, instructional voice-over in English, explaining the key steps, proper form, and common mistakes to avoid. The video should feature multiple camera angles (front and side views) and use slow-motion to highlight critical movements.`;
    const virtualDojoPrompt = `A high-definition, 1080p, 30fps video. A Taekwondo practitioner in a sleek, modern dobok is in a futuristic, minimalist dojo with neon blue accents.`;

    let difficultyPrompt = '';
    switch (difficulty) {
        case 'Beginner':
            difficultyPrompt = "The video should be paced slowly with extra emphasis on fundamental steps. The voice-over should be very clear and break down each part of the movement simply.";
            break;
        case 'Intermediate':
            difficultyPrompt = "The video should be at a moderate pace, focusing on smooth transitions and power generation. The voice-over should mention common mistakes and how to correct them.";
            break;
        case 'Advanced':
            difficultyPrompt = "The video should be at full speed, demonstrating precision and control. The voice-over can discuss advanced applications, timing, and strategic use of the technique.";
            break;
    }

    const techniquePrompts: Record<string, string> = {
        // Stances
        'Ready Stance (Joonbi Seogi)': `${basePrompt} ${difficultyPrompt} Demonstrate the Ready Stance (Joonbi Seogi). The voice-over should explain the meaning of 'Joonbi' (ready) and instruct on correct foot placement (one foot-length apart, parallel), hand positioning (forming fists, rising to solar plexus, then moving down), and maintaining a straight but relaxed posture.`,
        'Walking Stance (Ap Seogi)': `${basePrompt} ${difficultyPrompt} Demonstrate the Walking Stance (Ap Seogi). The voice-over should explain its use for moving forward and backward. Instructions should cover the length (one shoulder-width), width (one shoulder-width), and weight distribution (roughly 60% front, 40% back).`,
        'Front Stance (Ap Kubi)': `${basePrompt} ${difficultyPrompt} Demonstrate the Front Stance (Ap Kubi). The voice-over should emphasize its power and stability. Instructions must cover the deep bend in the front knee (so the kneecap is over the ankle), the straight back leg, and weight distribution (70% front, 30% back).`,
        'Back Stance (Dwit Kubi)': `${basePrompt} ${difficultyPrompt} Demonstrate the Back Stance (Dwit Kubi). The voice-over should explain its defensive nature. Instructions must focus on the L-shape of the feet, the 90-degree angle between them, and the weight distribution (70% on the back leg).`,

        // Blocks
        'Low Block (Arae Makgi)': `${basePrompt} ${difficultyPrompt} Demonstrate the Low Block (Arae Makgi). The voice-over must explain the preparation (chambering the blocking arm across the opposite shoulder) and execution (a sharp downward motion). It should specify the final position of the fist (one fist-width above the knee).`,
        'Inner Forearm Block (Momtong An Makgi)': `${basePrompt} ${difficultyPrompt} Demonstrate the Inner Forearm Block (Momtong An Makgi). The voice-over should detail the circular motion, starting from the opposite side of the body and ending at the solar plexus height. Emphasize the rotation of the forearm for blocking power.`,
        'High Block (Olgul Makgi)': `${basePrompt} ${difficultyPrompt} Demonstrate the High Block (Olgul Makgi). The voice-over should explain how it protects the head. Instructions must cover the upward sweeping motion, crossing the arms, and the final position (one fist-width above the forehead at a 45-degree angle).`,
        'Knife Hand Block (Sonnal Makgi)': `${basePrompt} ${difficultyPrompt} Demonstrate the Knife Hand Block (Sonnal Makgi). The voice-over needs to explain the "knife hand" shape and the dual motion of the blocking hand and the retracting (guarding) hand. Slow motion should focus on the hand shape and the block's execution.`,

        // Kicks
        'Front Snap Kick (Ap Chagi)': `${basePrompt} ${difficultyPrompt} Demonstrate the Front Snap Kick (Ap Chagi). The voice-over must break down the four stages: chambering the knee, extending the leg (the "snap"), striking with the ball of the foot, and re-chambering before returning to stance.`,
        'Roundhouse Kick (Dollyo Chagi)': `${basePrompt} ${difficultyPrompt} Demonstrate the Roundhouse Kick (Dollyo Chagi). The voice-over must explain the importance of pivoting on the supporting foot and rotating the hips to generate power. Slow-motion should highlight the pivot and hip rotation.`,
        'Side Kick (Yeop Chagi)': `${basePrompt} ${difficultyPrompt} Demonstrate the Side Kick (Yeop Chagi). The voice-over should explain the chambering (bringing the knee to the chest and pivoting) and the powerful thrusting motion, striking with the blade of the foot or the heel.`,
        'Back Kick (Dwi Chagi)': `${basePrompt} ${difficultyPrompt} Demonstrate the Back Kick (Dwi Chagi). The voice-over must instruct the practitioner to look over their shoulder at the target before executing the kick. It should describe the straight-back trajectory and striking with the heel.`,
        'Crescent Kick (Bandal Chagi)': `${basePrompt} ${difficultyPrompt} Demonstrate the Crescent Kick (Bandal Chagi), both outward and inward versions. The voice-over should explain the circular "slapping" motion of the kick and its use for blocking or striking.`,

        // Board Breaking
        'Downward Hammer Fist Break': `${basePrompt} ${difficultyPrompt} Demonstrate a Downward Hammer Fist Break on a standard pine board held by a partner. The voice-over must explain the principles of power generation: using body weight, speed, and focus. Instructions should cover proper fist formation (hammer fist) and aiming *through* the target.`,
        'Front Kick Break': `${basePrompt} ${difficultyPrompt} Demonstrate a Front Kick Break on a board. The voice-over should reiterate the key points of the Front Kick but emphasize generating maximum power and speed for the break, striking with the ball of the foot.`,
        'Side Kick Break': `${basePrompt} ${difficultyPrompt} Demonstrate a Side Kick Break on a board. The voice-over must focus on the powerful thrust from the hip and striking with the heel or blade of the foot. It should also cover proper body alignment to prevent injury.`,
        
        // Forms
        'Taegeuk Il Jang (Form 1)': `Generate a high-definition, 1080p, 30fps video of a Taekwondo master performing the complete Taegeuk Il Jang (Form 1). ${difficultyPrompt} The camera should follow the practitioner from multiple angles (front, side, and elevated wide-angle) to capture all movements and transitions. A clear, instructional voice-over should announce the name of each major technique (e.g., 'Low Block in Walking Stance', 'Middle Punch in Front Stance') as it is performed. The video should be at a deliberate, steady pace.`,
        'Taegeuk Ee Jang (Form 2)': `Generate a high-definition, 1080p, 30fps video of a Taekwondo master performing the complete Taegeuk Ee Jang (Form 2). ${difficultyPrompt} The camera should follow the practitioner from multiple angles. A clear, instructional voice-over should announce the name of each major technique as it is performed. The video should be at a deliberate, steady pace.`,
        'Taegeuk Sam Jang (Form 3)': `Generate a high-definition, 1080p, 30fps video of a Taekwondo master performing the complete Taegeuk Sam Jang (Form 3). ${difficultyPrompt} The camera should follow the practitioner from multiple angles. A clear, instructional voice-over should announce the name of each major technique as it is performed. The video should be at a deliberate, steady pace.`,
        'Taegeuk Sa Jang (Form 4)': `Generate a high-definition, 1080p, 30fps video of a Taekwondo master performing the complete Taegeuk Sa Jang (Form 4). ${difficultyPrompt} The camera should follow the practitioner from multiple angles. A clear, instructional voice-over should announce the name of each major technique as it is performed. The video should be at a deliberate, steady pace.`,
        'Taegeuk Oh Jang (Form 5)': `Generate a high-definition, 1080p, 30fps video of a Taekwondo master performing the complete Taegeuk Oh Jang (Form 5). ${difficultyPrompt} The camera should follow the practitioner from multiple angles. A clear, instructional voice-over should announce the name of each major technique as it is performed. The video should be at a deliberate, steady pace.`,
        'Taegeuk Yuk Jang (Form 6)': `Generate a high-definition, 1080p, 30fps video of a Taekwondo master performing the complete Taegeuk Yuk Jang (Form 6). ${difficultyPrompt} The camera should follow the practitioner from multiple angles. A clear, instructional voice-over should announce the name of each major technique as it is performed. The video should be at a deliberate, steady pace.`,
        'Taegeuk Chil Jang (Form 7)': `Generate a high-definition, 1080p, 30fps video of a Taekwondo master performing the complete Taegeuk Chil Jang (Form 7). ${difficultyPrompt} The camera should follow the practitioner from multiple angles. A clear, instructional voice-over should announce the name of each major technique as it is performed. The video should be at a deliberate, steady pace.`,
        'Taegeuk Pal Jang (Form 8)': `Generate a high-definition, 1080p, 30fps video of a Taekwondo master performing the complete Taegeuk Pal Jang (Form 8). ${difficultyPrompt} The camera should follow the practitioner from multiple angles. A clear, instructional voice-over should announce the name of each major technique as it is performed. The video should be at a deliberate, steady pace.`,
        'Koryo Poomsae': `Generate a high-definition, 1080p, 30fps video of a Taekwondo master performing the complete Koryo Poomsae (Black Belt Form). ${difficultyPrompt} The camera should follow the practitioner from multiple angles. A clear, instructional voice-over should announce the name of each major technique as it is performed with power and dignity. The video should be at a deliberate, steady pace.`,
        
        // Virtual Dojo
        'Virtual Instructor Intro': `A high-definition, 1080p, 30fps video. A female Taekwondo master, "Master Jin," with a confident and welcoming expression, is in a futuristic, minimalist dojo with neon blue accents. She performs a respectful Taekwondo bow towards the camera. Master Jin should speak with a clear, welcoming voice, saying: 'Welcome to the Virtual Dojo. I am Master Jin, your guide on this journey. Let's begin.' The video must include synchronized lip movements and high-quality audio.`,
        'Virtual Warm-up': `${virtualDojoPrompt} The practitioner demonstrates a dynamic warm-up routine. The sequence should include neck rotations, arm circles, torso twists, leg swings, and light jogging on the spot. Include a subtle, motivating background music track and occasional voice-over cues like 'Good, now switch sides.' or 'Keep your breathing steady.' The audio must be clear.`,
        'Virtual Stance Clinic': `${virtualDojoPrompt} A tutorial-style video. The camera focuses from a low angle on the feet and legs of the master. The video demonstrates a slow, precise transition between Walking Stance, Front Stance, and Back Stance. A clear, instructional voice-over must name each stance as it is demonstrated: 'Walking Stance... Front Stance... Back Stance.' The audio quality should be excellent.`,
        'Advanced Kicking Clinic': `${virtualDojoPrompt} A tutorial on advanced kicks. The video demonstrates a sequence: Spinning Hook Kick, Jumping Front Kick, and a 360-degree Roundhouse Kick. Each kick is shown at full speed, then in slow-motion with on-screen labels. A clear, instructional voice-over must explain the key mechanics for each kick, focusing on hip rotation and balance. The audio quality must be excellent.`,
        'Sparring Strategy Session': `A high-definition, 1080p, 30fps video. Two practitioners in a futuristic dojo demonstrate controlled sparring drills. Two scenarios are shown: 1) Evading a roundhouse kick and countering with a back kick. 2) Blocking a punch and countering with a side kick. The video must use slow-motion and graphical overlays (e.g., arrows) to highlight footwork and timing. A strategic voice-over explains the principles of distance and turning defense into offense. The audio must be clear.`
    };

    return techniquePrompts[techniqueName] || `${basePrompt} ${difficultyPrompt} Demonstrate the ${techniqueName}. The voice-over should provide a step-by-step guide to performing the technique correctly.`;
};

type VideoError = { message: string; type: 'quota' | 'generic' };

// Initialize Gemini AI client. Assumes API_KEY is set in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper function to parse promotion criteria strings into a clean array
const parseCriteria = (criteriaString: string): string[] => {
    if (!criteriaString || criteriaString.toLowerCase().includes('none required')) return [];
    return criteriaString
        .replace(/\.$/, '') // Remove trailing period
        .split(/[,&]+/) // Split by comma or ampersand
        .map(item => item.trim())
        .filter(Boolean); // Filter out empty strings
};

const defaultBeltColors = {
    yellow: '#ffc107',
    green: '#28a745',
    blue: '#007bff',
    red: '#dc3545',
    brown: '#a52a2a',
};


const DifficultySelector = ({ currentDifficulty, onSelectDifficulty }) => (
    <div className="difficulty-selector">
        <label>Select Your Level:</label>
        <div className="difficulty-buttons-group">
            {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                <button
                    key={level}
                    className={`difficulty-button ${currentDifficulty === level ? 'active' : ''}`}
                    onClick={() => onSelectDifficulty(level)}
                >
                    {level}
                </button>
            ))}
        </div>
    </div>
);


const App = () => {
    // AI State
    const [prompt, setPrompt] = useState('Explain the history of Taekwondo.');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<VideoError | null>(null);
    const [openAccordion, setOpenAccordion] = useState('foundations');
    const [videoStates, setVideoStates] = useState<Record<string, { url?: string; isLoading: boolean; error?: VideoError }>>({});
    const [activeModalTechnique, setActiveModalTechnique] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);

    // Theme Customizer State
    const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
    const defaultBgUrl = 'https://images.unsplash.com/photo-1620152288427-4860b7692138?q=80&w=2574&auto=format&fit=crop';
    const [bgUrl, setBgUrl] = useState(localStorage.getItem('tkd-bg-url') || defaultBgUrl);
    const [tempBgUrl, setTempBgUrl] = useState(bgUrl);
    const [beltColors, setBeltColors] = useState(() => {
        try {
            const savedColors = localStorage.getItem('tkd-belt-colors');
            return savedColors ? JSON.parse(savedColors) : defaultBeltColors;
        } catch (error) {
            console.error("Could not load belt colors", error);
            return defaultBeltColors;
        }
    });
    const [tempBeltColors, setTempBeltColors] = useState(beltColors);
    
    // UI State
    const [activeTab, setActiveTab] = useState('journey');
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState('Beginner'); // New state for difficulty

    // Progress Tracker State
    const [progressData, setProgressData] = useState(() => {
        try {
            const savedProgress = localStorage.getItem('tkd-progress');
            return savedProgress ? JSON.parse(savedProgress) : {};
        } catch (error) {
            console.error("Could not load progress data", error);
            return {};
        }
    });


    // Timer State
    const [timerPreset, setTimerPreset] = useState(Object.keys(timerPresets)[0]);
    const [timeRemaining, setTimeRemaining] = useState(timerPresets[timerPreset].duration);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    // Video Player Ref
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (bgUrl) {
            document.body.style.backgroundImage = `url('${bgUrl}')`;
            localStorage.setItem('tkd-bg-url', bgUrl);
        } else {
            document.body.style.backgroundImage = `url('${defaultBgUrl}')`;
            localStorage.removeItem('tkd-bg-url');
        }
    }, [bgUrl]);

    // Effect to apply custom belt colors and save them
    useEffect(() => {
        const root = document.documentElement;
        for (const [name, color] of Object.entries(beltColors)) {
            root.style.setProperty(`--${name}`, color);
        }
        try {
            localStorage.setItem('tkd-belt-colors', JSON.stringify(beltColors));
        } catch (error) {
            console.error("Could not save belt colors", error);
        }
    }, [beltColors]);


    // Save progress to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('tkd-progress', JSON.stringify(progressData));
        } catch (error) {
            console.error("Could not save progress data", error);
        }
    }, [progressData]);
    
    // Timer Effect
    useEffect(() => {
        if (isTimerActive) {
            timerIntervalRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(timerIntervalRef.current!);
                        setIsTimerActive(false);
                        audioRef.current?.play();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(timerIntervalRef.current!);
        }

        return () => clearInterval(timerIntervalRef.current!);
    }, [isTimerActive]);

    // Video Keyboard Controls Effect
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!videoRef.current) return;

            const key = e.key.toLowerCase();
            switch (key) {
                case ' ':
                    e.preventDefault();
                    videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
                    break;
                case 'm':
                    videoRef.current.muted = !videoRef.current.muted;
                    break;
                case 'arrowup':
                    e.preventDefault();
                    videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.1);
                    break;
                case 'arrowdown':
                    e.preventDefault();
                    videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.1);
                    break;
                case 'arrowright':
                    videoRef.current.currentTime += 5;
                    break;
                case 'arrowleft':
                    videoRef.current.currentTime -= 5;
                    break;
                case 'f':
                    if (videoRef.current.requestFullscreen) {
                        videoRef.current.requestFullscreen();
                    }
                    break;
                case 'p':
                    togglePictureInPicture();
                    break;
            }
        };

        if (activeModalTechnique) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeModalTechnique]);

    const handleApplyCustomization = () => {
        setBgUrl(tempBgUrl);
        setBeltColors(tempBeltColors);
        setIsCustomizerOpen(false);
    };

    const handleResetCustomization = () => {
        setTempBgUrl(defaultBgUrl);
        setTempBeltColors(defaultBeltColors);
    };


    const handleAccordionToggle = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };
    
    const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPreset = e.target.value;
        setTimerPreset(newPreset);
        setIsTimerActive(false);
        setTimeRemaining(timerPresets[newPreset].duration);
    };

    const handleStartPauseTimer = () => {
        setIsTimerActive(prev => !prev);
    };

    const handleResetTimer = () => {
        setIsTimerActive(false);
        setTimeRemaining(timerPresets[timerPreset].duration);
    };

    const handleProgressChange = (beltName: string, criterion: string, isChecked: boolean) => {
        setProgressData(prev => {
            const newBeltProgress = { ...(prev[beltName] || {}), [criterion]: isChecked };
            return { ...prev, [beltName]: newBeltProgress };
        });
    };

    const handleResetProgress = () => {
        if (window.confirm("Are you sure you want to reset all your progress? This action cannot be undone.")) {
            setProgressData({});
        }
    };
    
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const generateAnswer = async (currentPrompt: string) => {
        if (!currentPrompt) {
            setError({ message: 'Please enter a prompt.', type: 'generic' });
            return;
        }

        setLoading(true);
        setError(null);
        setResponse('');
        document.getElementById('ai-section')?.scrollIntoView({ behavior: 'smooth' });

        try {
            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: currentPrompt,
            });
            setResponse(result.text);
        } catch (e) {
            // FIX: Add robust error handling for unknown error types to fix TypeScript error.
            console.error(e);
            let errorPayload: VideoError = {
                message: 'An unknown error occurred while generating content.',
                type: 'generic'
            };

            const errorMessage = e instanceof Error ? e.message : String(e);

            if (errorMessage.toLowerCase().includes('quota') || errorMessage.toLowerCase().includes('resource_exhausted')) {
                errorPayload = {
                    message: "You've reached the API usage limit for generating answers. To continue, please check your Google AI Studio account for more details or set up billing.",
                    type: 'quota'
                };
            } else {
                try {
                    const jsonMatch = errorMessage.match(/{.*}/);
                    if (jsonMatch) {
                        const errorJson = JSON.parse(jsonMatch[0]);
                        if (errorJson?.error?.message) {
                            errorPayload.message = `Failed to generate content: ${String(errorJson.error.message)}`;
                        } else {
                            errorPayload.message = `Failed to generate content: ${errorMessage}`;
                        }
                    } else {
                        errorPayload.message = `Failed to generate content: ${errorMessage}`;
                    }
                } catch (parseError) {
                    errorPayload.message = `Failed to generate content: ${errorMessage}`;
                }
            }
            setError(errorPayload);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateVideo = async (techniqueName: string) => {
        setVideoStates(prev => ({ ...prev, [techniqueName]: { isLoading: true } }));

        try {
            const videoPrompt = getVideoPromptForTechnique(techniqueName, difficulty);
            
            // FIX: Use the correct model name for video generation as per guidelines.
            let operation = await ai.models.generateVideos({
                model: 'veo-2.0-generate-001',
                prompt: videoPrompt,
                config: { numberOfVideos: 1 }
            });

            while (!operation.done) {
                await new Promise(resolve => setTimeout(resolve, 10000));
                operation = await ai.operations.getVideosOperation({ operation: operation });
            }

            const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

            if (!downloadLink) {
                throw new Error("Video generation succeeded but no download link was provided.");
            }

            const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
            if (!videoResponse.ok) {
                throw new Error(`Failed to download video: ${videoResponse.statusText}`);
            }
            const videoBlob = await videoResponse.blob();
            const videoUrl = URL.createObjectURL(videoBlob);

            setVideoStates(prev => ({ ...prev, [techniqueName]: { isLoading: false, url: videoUrl } }));

        } catch (e) {
            console.error(e);
            let errorPayload: VideoError = { 
                message: 'An unknown error occurred while generating the video.', 
                type: 'generic' 
            };
            
            const errorMessage = e instanceof Error ? e.message : String(e);

            if (errorMessage.toLowerCase().includes('quota') || errorMessage.toLowerCase().includes('resource_exhausted')) {
                errorPayload = {
                    message: "You've reached the API usage limit for video generation. To continue, please check your Google AI Studio account for more details or set up billing.",
                    type: 'quota'
                };
            } else {
                try {
                    const jsonMatch = errorMessage.match(/{.*}/);
                    if (jsonMatch) {
                        const errorJson = JSON.parse(jsonMatch[0]);
                        if (errorJson?.error?.message) {
                            errorPayload.message = `Failed to generate video: ${String(errorJson.error.message)}`;
                        } else {
                            errorPayload.message = `Failed to generate video: ${errorMessage}`;
                        }
                    } else {
                        errorPayload.message = `Failed to generate video: ${errorMessage}`;
                    }
                } catch (parseError) {
                    errorPayload.message = `Failed to generate video: ${errorMessage}`;
                }
            }
            setVideoStates(prev => ({ ...prev, [techniqueName]: { isLoading: false, error: errorPayload } }));
        }
    };

    const openVideoModal = (techniqueName: string) => {
        setActiveModalTechnique(techniqueName);
        const videoState = videoStates[techniqueName];
        if (!videoState?.url && !videoState?.isLoading) {
            handleGenerateVideo(techniqueName);
        }
    };

    const closeVideoModal = () => {
        setActiveModalTechnique(null);
    };
    
    const togglePictureInPicture = async () => {
        if (videoRef.current) {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else if (document.pictureInPictureEnabled) {
                await videoRef.current.requestPictureInPicture();
            }
        }
    };

    const handleSubmit = () => {
        generateAnswer(prompt);
    };

    const handleContextualSubmit = (contextualPrompt) => {
        setPrompt(contextualPrompt);
        generateAnswer(contextualPrompt);
    };

    const handleCopyToClipboard = () => {
        if (!response) return;
        navigator.clipboard.writeText(response).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };
    
    const handleShare = async () => {
        if (!response) return;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Taekwondo AI Assistant Response',
                    text: response,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        }
    };

    return (
        <>
            <audio ref={audioRef} src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" preload="auto" />
            <header className="app-header">
                <div className="header-content">
                    <h1>Taekwondo AI Assistant</h1>
                    <h2>Your Digital Training Partner</h2>
                    <p>Select a category to begin your training, or scroll down to ask the AI a question.</p>
                </div>
            </header>
            <main>
                <div className="app-container">
                    <nav className="tab-nav">
                        <button className={`tab-button ${activeTab === 'journey' ? 'active' : ''}`} onClick={() => setActiveTab('journey')}>The Journey</button>
                        <button className={`tab-button ${activeTab === 'techniques' ? 'active' : ''}`} onClick={() => setActiveTab('techniques')}>Techniques</button>
                        <button className={`tab-button ${activeTab === 'sparring' ? 'active' : ''}`} onClick={() => setActiveTab('sparring')}>Sparring Drills</button>
                        <button className={`tab-button ${activeTab === 'programs' ? 'active' : ''}`} onClick={() => setActiveTab('programs')}>Training Programs</button>
                        <button className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`} onClick={() => setActiveTab('progress')}>My Progress</button>
                        <button className={`tab-button ${activeTab === 'dojo' ? 'active' : ''}`} onClick={() => setActiveTab('dojo')}>Virtual Dojo</button>
                        <button className={`tab-button ${activeTab === 'timer' ? 'active' : ''}`} onClick={() => setActiveTab('timer')}>Practice Timer</button>
                    </nav>

                    <div className="tab-content">
                        {activeTab === 'journey' && (
                             <section className="section">
                                <h2 className="section-title">The Path of Progression</h2>
                                <p className="section-subtitle">Understanding the meaning and focus of each colored belt from beginner to expert.</p>
                                <div className="belt-grid">
                                    {beltProgression.map((belt, index) => (
                                        <div key={index} className="belt-card" style={belt.style}>
                                            <h3>{belt.name}</h3>
                                            <p>{belt.description}</p>
                                            <p><strong>Primary Focus:</strong> {belt.focus}</p>
                                            <div className="belt-card-skill">
                                                Common Techniques: {belt.techniques}
                                            </div>

                                            <div className="belt-training-tips">
                                                <strong className="tips-title">Training Tips</strong>
                                                <ul className="tips-list">
                                                    {belt.trainingTips.map((tip, tipIndex) => (
                                                        <li key={tipIndex}>{tip}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="belt-promotion-criteria">
                                                <strong className="criteria-title">Promotion Criteria</strong>
                                                <ul className="criteria-list">
                                                    <li><strong>Forms:</strong> {belt.promotionCriteria.forms}</li>
                                                    <li><strong>Sparring:</strong> {belt.promotionCriteria.sparring}</li>
                                                    <li><strong>Knowledge:</strong> {belt.promotionCriteria.knowledge}</li>
                                                </ul>
                                            </div>

                                            <button className="context-button" onClick={() => handleContextualSubmit(`Explain the significance and key techniques for the ${belt.name}.`)}>
                                                Ask AI about this Belt
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <h2 className="section-title" style={{ marginTop: '60px' }}>The Path of the Master</h2>
                                <p className="section-subtitle">Kukkiwon requirements for advancing through the Black Belt (Dan) ranks.</p>
                                <div className="dan-grid">
                                    {danProgression.map((rank, index) => (
                                        <div key={index} className="dan-card">
                                            <h3>{rank.dan}</h3>
                                            <h4>{rank.title}</h4>
                                            <div className="dan-info">
                                                <span><strong>Min. Age:</strong> {rank.age}</span>
                                                <span><strong>Min. Duration:</strong> {rank.duration}</span>
                                            </div>
                                            <div className="dan-requirements">
                                                <h5>Key Requirements</h5>
                                                <ul>
                                                    {rank.requirements.map((req, i) => (
                                                        <li key={i}>{req}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeTab === 'techniques' && (
                            <section className="section">
                                <h2 className="section-title">Core Techniques</h2>
                                <p className="section-subtitle">Explore fundamental movements, from stances and blocks to powerful kicks and forms.</p>
                                <DifficultySelector currentDifficulty={difficulty} onSelectDifficulty={setDifficulty} />
                                <div>
                                    {techniquesData.map(item => (
                                        <div key={item.id} className={`accordion-item ${openAccordion === item.id ? 'open' : ''}`}>
                                            <div className="accordion-header" onClick={() => handleAccordionToggle(item.id)}>
                                                <div>
                                                    <h3>{item.category}</h3>
                                                    <p>{item.description}</p>
                                                </div>
                                                <span className="accordion-icon">▼</span>
                                            </div>
                                            <div className="accordion-content">
                                                <div className="content-grid">
                                                    {item.details.filter(card => {
                                                        if ('techniques' in card) {
                                                            return card.techniques.some(tech => tech.level === difficulty);
                                                        }
                                                        if ('level' in card) {
                                                            return (card as any).level === difficulty;
                                                        }
                                                        return true;
                                                    }).map((card, cardIndex) => (
                                                        <div key={cardIndex} className="content-card">
                                                            <div className="card-body">
                                                                <h4>{card.title}</h4>
                                                                {'techniques' in card ? (
                                                                    <ul className="technique-list">
                                                                        {card.techniques.filter(tech => tech.level === difficulty).map((tech, techIndex) => {
                                                                            const contextualPrompt = `How do I perform a ${tech.name}? Provide step-by-step instructions and common mistakes to avoid for a ${difficulty} level practitioner.`;
                                                                            const isVideoOpen = activeVideo === tech.name;
                                                                            
                                                                            return (
                                                                                <React.Fragment key={techIndex}>
                                                                                    <li className="technique-item">
                                                                                        <button className="ask-ai-button" onClick={() => handleContextualSubmit(contextualPrompt)}>
                                                                                            <span className="play-icon">?</span>
                                                                                            <div className="technique-info">
                                                                                                <strong>{tech.name}</strong>
                                                                                            </div>
                                                                                            {tech.belt !== 'white' && <span className={`tag ${tech.belt.toLowerCase()}`}>{tech.belt}</span>}
                                                                                        </button>
                                                                                        <div className="technique-buttons-group">
                                                                                            {'youtubeId' in tech && tech.youtubeId && (
                                                                                                <button className="youtube-button" onClick={() => setActiveVideo(isVideoOpen ? null : tech.name)} title="Watch YouTube Tutorial">
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm6.44,11.33-6,3.33a.62.62,0,0,1-.94-.53V8.89a.62.62,0,0,1,.94-.53l6,3.33A.62.62,0,0,1,18.44,12.23Z"/></svg>
                                                                                                </button>
                                                                                            )}
                                                                                            <button className="video-button" onClick={() => openVideoModal(tech.name)} disabled={videoStates[tech.name]?.isLoading} title="Generate AI Video">
                                                                                                {videoStates[tech.name]?.isLoading ? '...' : '▶'}
                                                                                            </button>
                                                                                        </div>
                                                                                    </li>
                                                                                    {isVideoOpen && 'youtubeId' in tech && tech.youtubeId && (
                                                                                         <li className="youtube-embed-wrapper">
                                                                                            <div className="youtube-video-container">
                                                                                                <iframe
                                                                                                    src={`https://www.youtube.com/embed/${tech.youtubeId}?autoplay=1`}
                                                                                                    title={tech.name}
                                                                                                    frameBorder="0"
                                                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                                                    allowFullScreen>
                                                                                                </iframe>
                                                                                            </div>
                                                                                        </li>
                                                                                    )}
                                                                                </React.Fragment>
                                                                            );
                                                                        })}
                                                                    </ul>
                                                                ) : (
                                                                    <div className="poomsae-details">
                                                                        {'belt' in card && (
                                                                            <p className="poomsae-belt">
                                                                                <strong>Belt:</strong> <span className={`tag ${(card as any).belt.toLowerCase()}`}>{ (card as any).belt}</span>
                                                                            </p>
                                                                        )}
                                                                        <p><strong>Purpose:</strong> {'description' in card && (card as any).description}</p>
                                                                        <p><strong>Key Movements:</strong> {'keyMovements' in card && (card as any).keyMovements}</p>
                                                                        <p><strong>Philosophy:</strong> {'philosophy' in card && (card as any).philosophy}</p>
                                                                        <div className="technique-actions">
                                                                            <button className="context-button" onClick={() => handleContextualSubmit(`Explain ${card.title} in detail for a ${difficulty} level practitioner. Describe its purpose, key movements, and the philosophical concepts it represents.`)}>
                                                                                Ask AI about this Form
                                                                            </button>
                                                                            <button className="video-button" onClick={() => openVideoModal(card.title)} disabled={videoStates[card.title]?.isLoading}>
                                                                                {videoStates[card.title]?.isLoading ? 'Generating...' : 'Watch Video'}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        {activeTab === 'sparring' && (
                            <section className="section">
                                <h2 className="section-title">Sparring Drills</h2>
                                <p className="section-subtitle">Hone your combat skills with structured drills for timing, defense, and strategy.</p>
                                <DifficultySelector currentDifficulty={difficulty} onSelectDifficulty={setDifficulty} />
                                <div className="program-grid">
                                    {sparringDrillsData.filter(drill => drill.level === difficulty || (difficulty === 'Intermediate' && drill.level === 'Beginner') || (difficulty === 'Advanced' && (drill.level === 'Beginner' || drill.level === 'Intermediate'))).map((drill, index) => {
                                        const details = drill.detailsByLevel[difficulty];
                                        const prompt = `Provide a detailed breakdown of the Taekwondo drill: ${drill.title}, tailored for a ${difficulty} level practitioner. Explain the purpose, step-by-step execution for both attacker and defender, and focus on these key areas: ${details.keyFocusAreas.join(', ')}.`;
                                        return (
                                            <div key={index} className="program-card" style={{ borderLeftColor: drill.style }}>
                                                <h3>{drill.title}</h3>
                                                <p>{details.description}</p>
                                                
                                                <div className="program-details">
                                                    <h5>Key Focus Areas for {difficulty}s:</h5>
                                                    <ul>
                                                        {details.keyFocusAreas.map((item, i) => <li key={i}>{item}</li>)}
                                                    </ul>
                                                    
                                                    <h5>Required Equipment:</h5>
                                                    <ul>
                                                        {drill.equipment.map((item, i) => <li key={i}>{item}</li>)}
                                                    </ul>

                                                    <h5>Safety Tips:</h5>
                                                    <ul>
                                                        {drill.safetyTips.map((tip, i) => <li key={i}>{tip}</li>)}
                                                    </ul>
                                                </div>
                                                
                                                <button className="program-button" onClick={() => handleContextualSubmit(prompt)}>
                                                    Ask AI for Variations & Tips
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </section>
                        )}

                        {activeTab === 'programs' && (
                            <section className="section">
                                <h2 className="section-title">Structured Training Programs</h2>
                                <p className="section-subtitle">Follow a guided path to enhance your skills, from foundational techniques to advanced mastery.</p>
                                <DifficultySelector currentDifficulty={difficulty} onSelectDifficulty={setDifficulty} />
                                <div className="program-grid">
                                    {trainingProgramsData.filter(p => p.level === difficulty).map((program) => {
                                        const prompt = `Create a detailed 4-week training plan for a Taekwondo ${program.level}. The program title is "${program.title}". The goal is: "${program.description}". Key focus areas are: ${program.focus.join(', ')}. Use this sample schedule as a guide: ${program.schedule.map(s => `${s.day}: ${s.activity}`).join('; ')}. Break down the plan day-by-day with specific drills, rep counts, and goals for each week.`;
                                        return (
                                            <div key={program.level} className="program-card" style={{ borderLeftColor: program.style }}>
                                                <h3>{program.level} Program</h3>
                                                <h4>{program.title}</h4>
                                                <p>{program.description}</p>
                                                
                                                <div className="program-details">
                                                    <h5>Key Focus Areas:</h5>
                                                    <ul>
                                                        {program.focus.map((item, i) => <li key={i}>{item}</li>)}
                                                    </ul>

                                                    <h5>Sample Weekly Schedule:</h5>
                                                    <div className="program-schedule">
                                                        {program.schedule.map((item, i) => (
                                                            <div key={i}><strong>{item.day}:</strong> {item.activity}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                                <button className="program-button" onClick={() => handleContextualSubmit(prompt)}>
                                                    Generate Detailed Plan with AI
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </section>
                        )}

                        {activeTab === 'progress' && (() => {
                            const completedBelts = beltProgression.filter(belt => {
                                const allCriteria = [
                                    ...parseCriteria(belt.promotionCriteria.forms),
                                    ...parseCriteria(belt.promotionCriteria.sparring),
                                    ...parseCriteria(belt.promotionCriteria.knowledge),
                                ];
                                if (allCriteria.length === 0) return false;
                                return allCriteria.every(item => progressData[belt.name]?.[item]);
                            }).length;
                            const totalBeltsWithCriteria = beltProgression.filter(b => [...parseCriteria(b.promotionCriteria.forms), ...parseCriteria(b.promotionCriteria.sparring), ...parseCriteria(b.promotionCriteria.knowledge)].length > 0).length;

                            return (
                                <section className="section">
                                    <h2 className="section-title">My Progress Tracker</h2>
                                    <p className="section-subtitle">Mark your accomplishments and track your journey to Black Belt.</p>
                                    
                                    <div className="progress-summary-card">
                                        <h4>Overall Progress</h4>
                                        <p>You have mastered <strong>{completedBelts}</strong> out of <strong>{totalBeltsWithCriteria}</strong> core belt ranks.</p>
                                        <div className="belt-progress-bar-container">
                                            <div className="belt-progress-bar-fill" style={{ width: `${(completedBelts / totalBeltsWithCriteria) * 100}%` }}></div>
                                        </div>
                                        <button className="reset-progress-button" onClick={handleResetProgress}>Reset All Progress</button>
                                    </div>

                                    <div className="belt-grid">
                                        {beltProgression.map((belt) => {
                                            const criteria = {
                                                Forms: parseCriteria(belt.promotionCriteria.forms),
                                                Sparring: parseCriteria(belt.promotionCriteria.sparring),
                                                Knowledge: parseCriteria(belt.promotionCriteria.knowledge),
                                            };
                                            const allCriteria = [...criteria.Forms, ...criteria.Sparring, ...criteria.Knowledge];
                                            if (allCriteria.length === 0) return null;

                                            const totalCriteriaCount = allCriteria.length;
                                            const completedCriteriaCount = allCriteria.filter(item => progressData[belt.name]?.[item]).length;
                                            const progressPercentage = totalCriteriaCount > 0 ? (completedCriteriaCount / totalCriteriaCount) * 100 : 0;

                                            return (
                                                <div key={belt.name} className="progress-card" style={belt.style}>
                                                    <h3>{belt.name}</h3>
                                                    <p>{belt.description}</p>
                                                    
                                                    <div className="progress-criteria-container">
                                                        {Object.entries(criteria).map(([category, items]) => items.length > 0 && (
                                                            <div key={category} className="progress-criteria-group">
                                                                <strong>{category}:</strong>
                                                                <ul className="progress-criteria-list">
                                                                    {items.map(item => (
                                                                        <li key={item} className="progress-criteria-item">
                                                                            <label className="custom-checkbox-container">
                                                                                <span className="criterion-text">{item}</span>
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={!!progressData[belt.name]?.[item]}
                                                                                    onChange={(e) => handleProgressChange(belt.name, item, e.target.checked)}
                                                                                />
                                                                                <span className="checkmark"></span>
                                                                            </label>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="belt-progress-bar-container">
                                                        <div className="belt-progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
                                                    </div>
                                                    <span className="progress-percentage-text">{Math.round(progressPercentage)}% Complete</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            );
                        })()}
                        
                        {activeTab === 'dojo' && (
                             <section className="section">
                                <h2 className="section-title">Welcome to the Virtual Dojo</h2>
                                <p className="section-subtitle">Train with Master Jin, your personal AI instructor, in a futuristic training environment.</p>
                                
                                <div className="virtual-dojo-intro">
                                    <h4>What is Virtual Taekwondo?</h4>
                                    <p>Virtual Taekwondo uses AI to provide an interactive and accessible training partner. It's a supplementary tool to enhance your practice, receive instant visual feedback on techniques, and learn at your own pace, anytime, anywhere.</p>
                                    
                                    <h4>How to Practice</h4>
                                    <p>Find a safe, open space. Use the video modules below to warm up and practice specific techniques. Watch the AI instructor, mimic the movements, and use the AI Assistant to ask questions about form, function, or philosophy.</p>
                                    
                                    <h4>Required Equipment</h4>
                                    <p><strong>Essential:</strong> Comfortable workout clothes and enough space to move freely. <br/><strong>Recommended:</strong> A device with a large screen for clear viewing. <br/><strong>Optional:</strong> A full-length mirror or webcam to self-assess your form against the instructor's.</p>

                                    <h4>Rules & Etiquette</h4>
                                    <p>Even in a virtual space, respect and discipline are key. Begin each session with a bow. Focus on performing each movement with precision, not just speed. Maintain a positive and determined mindset throughout your training.</p>
                                </div>

                                <div className="virtual-dojo-grid">
                                    <div className="dojo-card">
                                        <h3>Meet Your Instructor</h3>
                                        <p>Begin your session with a greeting from Master Jin.</p>
                                        <button className="dojo-button" onClick={() => openVideoModal('Virtual Instructor Intro')}>
                                            Generate Introduction
                                        </button>
                                    </div>
                                    <div className="dojo-card">
                                        <h3>Guided Warm-up</h3>
                                        <p>Prepare your body for training with a dynamic warm-up routine.</p>
                                        <button className="dojo-button" onClick={() => openVideoModal('Virtual Warm-up')}>
                                            Start Warm-up Video
                                        </button>
                                    </div>
                                    <div className="dojo-card">
                                        <h3>Stance Clinic</h3>
                                        <p>Refine your foundational stances with a focused tutorial.</p>
                                        <button className="dojo-button" onClick={() => openVideoModal('Virtual Stance Clinic')}>
                                            Begin Stance Practice
                                        </button>
                                    </div>
                                    <div className="dojo-card">
                                        <h3>Advanced Kicking Clinic</h3>
                                        <p>Master spinning and jumping kicks with an in-depth tutorial.</p>
                                        <button className="dojo-button" onClick={() => openVideoModal('Advanced Kicking Clinic')}>
                                            Master Advanced Kicks
                                        </button>
                                    </div>
                                    <div className="dojo-card">
                                        <h3>Sparring Strategy</h3>
                                        <p>Learn defensive maneuvers and effective counter-attacks.</p>
                                        <button className="dojo-button" onClick={() => openVideoModal('Sparring Strategy Session')}>
                                            Learn Sparring Tactics
                                        </button>
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab === 'timer' && (
                            <section className="section">
                                <h2 className="section-title">Practice Timer</h2>
                                <p className="section-subtitle">Focus your training with timed sessions for stances, forms, or intervals.</p>
                                <div className="practice-timer-container">
                                    <div className="timer-display-wrapper">
                                        <svg className="timer-progress-circle" width="200" height="200" viewBox="0 0 120 120">
                                            <circle className="progress-bg" cx="60" cy="60" r="54" />
                                            <circle
                                                className="progress-bar"
                                                cx="60" cy="60" r="54"
                                                style={{
                                                    strokeDasharray: 339.292,
                                                    strokeDashoffset: 339.292 * (1 - timeRemaining / timerPresets[timerPreset].duration)
                                                }}
                                            />
                                        </svg>
                                        <div className="timer-time-text">
                                            {formatTime(timeRemaining)}
                                        </div>
                                    </div>
                                    <div className="timer-controls">
                                        <select className="timer-preset-select" value={timerPreset} onChange={handlePresetChange}>
                                            {Object.entries(timerPresets).map(([key, { label }]) => (
                                                <option key={key} value={key}>{label}</option>
                                            ))}
                                        </select>
                                        <div className="timer-buttons">
                                            <button className="timer-button-start" onClick={handleStartPauseTimer}>
                                                {isTimerActive ? 'Pause' : 'Start'}
                                            </button>
                                            <button className="timer-button-reset" onClick={handleResetTimer}>Reset</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                    
                     <section id="ai-section" className="section">
                        <div className="ai-interaction-box">
                            <label htmlFor="prompt-textarea" className="prompt-label">
                                Ask the AI
                            </label>
                            <textarea
                                id="prompt-textarea"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="e.g., What are the five tenets of Taekwondo?"
                                rows={5}
                                className="prompt-textarea"
                                disabled={loading}
                            />
                            <button 
                                onClick={handleSubmit} 
                                disabled={loading || !prompt}
                                className="submit-button"
                            >
                                {loading ? 'Generating...' : 'Get Answer'}
                            </button>
                            
                            {error && (
                                <div className="error-message">
                                    <strong>Error:</strong> {error.message}
                                    {error.type === 'quota' && (
                                        <a 
                                            href="https://aistudio.google.com/app/apikey" 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="modal-action-button"
                                        >
                                            Check Billing Status
                                        </a>
                                    )}
                                </div>
                            )}
                            
                            {loading && (
                                <div className="loading-container">
                                    <h3>Generating Answer...</h3>
                                    <div className="progress-bar-container">
                                        <div className="progress-bar loading-animation"></div>
                                    </div>
                                </div>
                            )}

                            {response && !loading && (
                                <div className="ai-response-container">
                                    <div className="ai-response-header">
                                        <div className="header-title-group">
                                            <svg className="ai-response-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                                <path d="M12 2.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V3.25a.75.75 0 0 1 .75-.75ZM18.06 5.94a.75.75 0 0 1 0 1.06l-2.475 2.475a.75.75 0 0 1-1.06-1.06L17 5.94a.75.75 0 0 1 1.06 0ZM20.75 12a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5h3.5a.75.75 0 0 1 .75.75ZM18.06 18.06a.75.75 0 0 1-1.06 0l-2.475-2.475a.75.75 0 0 1 1.06-1.06L17 17a.75.75 0 0 1 0 1.06ZM12 20.75a.75.75 0 0 1-.75.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75-.75ZM5.94 18.06a.75.75 0 0 1 0-1.06l2.475-2.475a.75.75 0 0 1 1.06 1.06L7 18.06a.75.75 0 0 1-1.06 0ZM3.25 12a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75ZM5.94 5.94a.75.75 0 0 1 1.06 0l2.475 2.475a.75.75 0 0 1-1.06 1.06L7 7a.75.75 0 0 1 0-1.06Z" />
                                            </svg>
                                            <h3>AI Generated Answer</h3>
                                        </div>
                                         <div className="ai-response-actions">
                                            <button onClick={handleCopyToClipboard} className={`share-button ${copySuccess ? 'copied' : ''}`} title="Copy to clipboard" disabled={copySuccess}>
                                                {copySuccess ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                                                )}
                                                <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
                                            </button>
                                            {navigator.share && (
                                                <button onClick={handleShare} className="share-button" title="Share response">
                                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 8.81C7.5 8.31 6.79 8 6 8c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
                                                    <span>Share</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <pre className="ai-response-body">
                                        {response}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
            <footer className="app-footer">
                <div>
                    <p>&copy; 2024 Taekwondo AI Assistant. All rights reserved.</p>
                    <p className="author-credit">Created by Raja Mehraj Aslam</p>
                </div>
                <div className="footer-buttons">
                     <button className="settings-button" onClick={() => {
                        setTempBgUrl(bgUrl);
                        setTempBeltColors(beltColors);
                        setIsCustomizerOpen(true);
                     }} aria-label="Customize theme">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.82 10.93a1 1 0 0 0-1.64-.78l-.13.22a8.03 8.03 0 0 0-1.4-1.4l.22-.13a1 1 0 0 0-.78-1.64L14.2 4.18a1 1 0 0 0-1.2 0l-.5.86a8.03 8.03 0 0 0-1.99 0l-.5-.86a1 1 0 0 0-1.2 0l-1.88 3.02a1 1 0 0 0-.79 1.64l.22.13a8.03 8.03 0 0 0-1.4 1.4l-.13-.22a1 1 0 0 0-1.64.78l-3.02 1.88a1 1 0 0 0 0 1.2l3.02 1.88a1 1 0 0 0 1.64-.78l.13-.22a8.03 8.03 0 0 0 1.4 1.4l-.22.13a1 1 0 0 0 .78 1.64l1.88 3.02a1 1 0 0 0 1.2 0l.5-.86a8.03 8.03 0 0 0 1.99 0l.5.86a1 1 0 0 0 1.2 0l1.88-3.02a1 1 0 0 0 .78-1.64l-.22-.13a8.03 8.03 0 0 0 1.4-1.4l.13.22a1 1 0 0 0 1.64-.78l-3.02-1.88Zm-7.82 5.57a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"></path></svg>
                    </button>
                </div>
            </footer>

            {activeModalTechnique && (
                <div className="video-modal-overlay open" onClick={closeVideoModal}>
                    <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="video-modal-close" onClick={closeVideoModal}>&times;</button>
                        <div className="video-wrapper">
                            {videoStates[activeModalTechnique]?.isLoading && (
                                <div className="modal-status-indicator">
                                    <div className="loading-spinner"></div>
                                    <h3>Generating Video...</h3>
                                    <p>This can take a few minutes. Please be patient.</p>
                                </div>
                            )}
                            {videoStates[activeModalTechnique]?.url && (
                                <>
                                    <video ref={videoRef} src={videoStates[activeModalTechnique].url} controls autoPlay loop playsInline />
                                    <div className="video-controls-overlay">
                                        <button onClick={togglePictureInPicture} className="pip-button" title="Picture-in-Picture (P)">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM15 11h4v6h-4z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </>
                            )}
                            {videoStates[activeModalTechnique]?.error && (
                                <div className="modal-status-indicator error">
                                    <h3>{videoStates[activeModalTechnique].error.type === 'quota' ? 'API Quota Exceeded' : 'Video Generation Failed'}</h3>
                                    <p>{videoStates[activeModalTechnique].error.message}</p>
                                    {videoStates[activeModalTechnique].error.type === 'quota' && (
                                        <a 
                                            href="https://aistudio.google.com/app/apikey" 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="modal-action-button"
                                        >
                                            Check Billing Status
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {isCustomizerOpen && (
                <div className="customizer-overlay" onClick={() => setIsCustomizerOpen(false)}>
                    <div className="customizer-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Customize Theme</h3>
                        <div className="form-group">
                            <label htmlFor="bg-url-input">Background Image URL</label>
                            <input
                                id="bg-url-input"
                                type="text"
                                value={tempBgUrl}
                                onChange={(e) => setTempBgUrl(e.target.value)}
                                placeholder="https://..."
                            />
                        </div>

                        <h4>Belt Colors</h4>
                        <div className="color-picker-grid">
                            {Object.entries(tempBeltColors).map(([name, color]) => (
                                <div key={name} className="form-group color-picker-group">
                                    <label htmlFor={`${name}-color-input`}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
                                    <input
                                        id={`${name}-color-input`}
                                        type="color"
                                        value={color}
                                        onChange={(e) => setTempBeltColors(prev => ({ ...prev, [name]: e.target.value }))}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="customizer-actions">
                             <button className="reset-button" onClick={handleResetCustomization}>Reset to Defaults</button>
                            <button className="cancel-button" onClick={() => setIsCustomizerOpen(false)}>Cancel</button>
                            <button className="apply-button" onClick={handleApplyCustomization}>Apply</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Standard React entry point to render the App component.
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Fatal: Could not find the 'root' element to mount the React application.");
}