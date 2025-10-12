// Fix: Replaced the entire file content which was causing parsing errors.
// The new content is a complete, functional React component that demonstrates
// the correct usage of the Gemini API as per the coding guidelines.
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// Per coding guidelines, API key is sourced from `process.env.API_KEY`.
// It's assumed to be pre-configured and accessible in the execution environment.
const apiKey = process.env.API_KEY;

// Per coding guidelines, initialize GoogleGenAI with a named apiKey parameter.
// If the API key is not available, we initialize with an empty string
// and handle the error gracefully in the UI.
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

const beltProgression = [
    {
        name: 'White Belt (10th Gup)',
        style: { borderTopColor: '#ddd' },
        description: 'Signifies innocence and a blank slate, like a student with no prior knowledge of Taekwondo.',
        focus: 'Fundamental stances, basic blocks, punches, and introductory kicks.',
        techniques: 'Front Kick, Low Block, Middle Punch'
    },
    {
        name: 'Yellow Belt (8th Gup)',
        style: { borderTopColor: 'var(--yellow)' },
        description: 'Represents the earth, from which a plant sprouts and takes root as the foundation of Taekwondo is being laid.',
        focus: 'Improving balance, coordination, and learning the first form (Poomsae).',
        techniques: 'Roundhouse Kick, Side Kick, Taegeuk Il Jang'
    },
    {
        name: 'Green Belt (6th Gup)',
        style: { borderTopColor: 'var(--green)' },
        description: 'Symbolizes the plant\'s growth as Taekwondo skills begin to develop.',
        focus: 'More complex forms, combination kicks, and introductory one-step sparring.',
        techniques: 'Back Kick, Combination Kicking, Taegeuk Sam Jang'
    },
    {
        name: 'Blue Belt (4th Gup)',
        style: { borderTopColor: 'var(--blue)' },
        description: 'Represents the sky or heaven, towards which the plant matures into a towering tree as training progresses.',
        focus: 'Advanced forms, spinning techniques, and the basics of free sparring.',
        techniques: 'Spinning Hook Kick, Free Sparring, Taegeuk O Jang'
    },
    {
        name: 'Red Belt (2nd Gup)',
        style: { borderTopColor: 'var(--red)' },
        description: 'Signifies danger, cautioning the student to exercise control, and warning the opponent to stay away.',
        focus: 'High-level forms, jumping kicks, board breaking, and developing self-control.',
        techniques: 'Jumping Kicks, Board Breaking, Taegeuk Chil Jang'
    },
    {
        name: 'Brown Belt',
        style: { borderTopColor: 'var(--brown)' },
        description: 'Represents maturity and the ripening of skills, as a student prepares for the final step.',
        focus: 'Refining all techniques and developing a deeper understanding of Taekwondo philosophy.',
        techniques: 'Advanced Sparring, All previous forms, Mental conditioning'
    },
    {
        name: 'Black Belt (1st Dan)',
        style: { borderTopColor: 'var(--primary-color)' },
        description: 'The opposite of white, signifying mastery of the basics. It is not an end, but a new beginning.',
        focus: 'Mastery of all techniques, leadership, teaching, and continued personal growth.',
        techniques: 'Leadership, Advanced Self-Defense, Koryo Poomsae'
    },
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
                    { name: 'Ready Stance (Joonbi Seogi)', belt: 'white' },
                    { name: 'Walking Stance (Ap Seogi)', belt: 'white' },
                    { name: 'Front Stance (Ap Kubi)', belt: 'yellow' },
                    { name: 'Back Stance (Dwit Kubi)', belt: 'green' },
                ],
            },
            {
                title: 'Essential Blocks (Makgi)',
                techniques: [
                    { name: 'Low Block (Arae Makgi)', belt: 'white' },
                    { name: 'Inner Forearm Block (Momtong An Makgi)', belt: 'yellow' },
                    { name: 'High Block (Olgul Makgi)', belt: 'green' },
                    { name: 'Knife Hand Block (Sonnal Makgi)', belt: 'blue' },
                ],
            },
            {
                title: 'Fundamental Kicks (Chagi)',
                techniques: [
                    { name: 'Front Snap Kick (Ap Chagi)', belt: 'white' },
                    { name: 'Roundhouse Kick (Dollyo Chagi)', belt: 'yellow' },
                    { name: 'Side Kick (Yeop Chagi)', belt: 'green' },
                    { name: 'Back Kick (Dwi Chagi)', belt: 'blue' },
                    { name: 'Crescent Kick (Bandal Chagi)', belt: 'red' },
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
                description: 'Represents "Keon" (Heaven), symbolizing the beginning of creation. It is the foundation of all Taegeuk forms.',
                keyMovements: 'Walking Stance, Front Stance, Low Block, Inner Forearm Block, Middle Punch, and Front Snap Kick.',
                philosophy: 'Teaches the basics of movement, focusing on simplicity, power, and building a strong foundation in fundamental stances and blocks.'
            },
            {
                title: 'Taegeuk Ee Jang (Form 2)',
                belt: 'yellow',
                description: 'Represents "Tae" (Joyfulness), symbolizing inner strength expressed with external gentleness and serenity.',
                keyMovements: 'Introduces High Block and High Punch, while emphasizing fluid transitions and the combination of Front Snap Kicks with punches.',
                philosophy: 'Focuses on the principle of inner strength with external softness, teaching practitioners to remain calm and joyful even while executing powerful techniques.'
            },
            {
                title: 'Taegeuk Sam Jang (Form 3)',
                belt: 'green',
                description: 'Represents "Ri" (Fire & Sun), symbolizing passion and energy. The movements are active, varied, and full of life.',
                keyMovements: 'Introduces Knife Hand Strike, Knife Hand Block, and Back Stance. It emphasizes quick transitions between stances.',
                philosophy: 'Teaches the ability to control passion and energy. The form encourages practitioners to be dynamic and adaptable, like a flickering flame.'
            },
            {
                title: 'Taegeuk Sa Jang (Form 4)',
                belt: 'green',
                description: 'Represents "Jin" (Thunder), symbolizing great power and dignity. The movements are powerful and dignified.',
                keyMovements: 'Features more advanced techniques like Knife Hand Guarding Block, Side Kick, and Swallow Form Strike. It demands stability and power.',
                philosophy: 'Cultivates calmness and bravery in the face of danger, teaching the practitioner to act with the power and decisiveness of a thunderclap.'
            },
            {
                title: 'Taegeuk Oh Jang (Form 5)',
                belt: 'blue',
                description: 'Represents "Seon" (Wind), symbolizing the dual nature of wind—gentle and yielding, yet powerful and destructive.',
                keyMovements: 'Introduces the Hammer Fist, Elbow Strike, and combination Side Kick with a hand strike. It emphasizes flexibility and coordination.',
                philosophy: 'Teaches the principle of alternating between soft, yielding movements and powerful, decisive strikes, embodying the unpredictable nature of wind.'
            }
        ]
    }
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


const getVideoPromptForTechnique = (techniqueName: string): string => {
    const basePrompt = `A high-definition, 1080p, 30fps video of a Taekwondo practitioner in a traditional white dobok, set in a clean, minimalist dojo with wooden floors. The video must clearly demonstrate the technique with precision and control.`;
    const virtualDojoPrompt = `A high-definition, 1080p, 30fps video. A Taekwondo practitioner in a sleek, modern dobok is in a futuristic, minimalist dojo with neon blue accents.`;

    const techniquePrompts: Record<string, string> = {
        // Stances
        'Ready Stance (Joonbi Seogi)': `${basePrompt} Demonstrate the Ready Stance (Joonbi Seogi). The camera should be front-facing. Show the practitioner starting from a relaxed position, then moving hands and feet into the formal ready stance, holding for 3 seconds.`,
        'Walking Stance (Ap Seogi)': `${basePrompt} Demonstrate the Walking Stance (Ap Seogi). Use a side-view perspective to clearly show the foot placement, step length, and weight distribution as the practitioner takes a few steps forward.`,
        'Front Stance (Ap Kubi)': `${basePrompt} Demonstrate the Front Stance (Ap Kubi). The camera should be at a low, 45-degree side angle to emphasize the deep bend in the front knee and the straight back leg. Show a slow-motion transition into the stance.`,
        'Back Stance (Dwit Kubi)': `${basePrompt} Demonstrate the Back Stance (Dwit Kubi). Use a side-view angle to highlight the L-shape of the feet and the majority of the weight on the back leg. The movement should be deliberate and stable.`,

        // Blocks
        'Low Block (Arae Makgi)': `${basePrompt} Demonstrate the Low Block (Arae Makgi). Use a front-view perspective. Show the full motion in slow-motion, including the chambering of the arm across the shoulder and the final downward block.`,
        'Inner Forearm Block (Momtong An Makgi)': `${basePrompt} Demonstrate the Inner Forearm Block (Momtong An Makgi). Use a 45-degree front angle. The video should emphasize the rotation of the forearm and the final position of the block at solar plexus height. Use slow-motion for clarity.`,
        'High Block (Olgul Makgi)': `${basePrompt} Demonstrate the High Block (Olgul Makgi). Use a front-view perspective. Clearly show the block rising from the waist, crossing the body, and finishing above the head. A slow-motion replay should be included.`,
        'Knife Hand Block (Sonnal Makgi)': `${basePrompt} Demonstrate the Knife Hand Block (Sonnal Makgi). Use a side-view to show the preparatory "chamber" and the execution. Use slow-motion to highlight the correct hand shape (knife hand) and the dual motion of the blocking and retracting arms.`,

        // Kicks
        'Front Snap Kick (Ap Chagi)': `${basePrompt} Demonstrate the Front Snap Kick (Ap Chagi). The video should have two slow-motion shots: a side view showing the knee lift and the "snap" extension, and a front view showing the kick aimed at a target.`,
        'Roundhouse Kick (Dollyo Chagi)': `${basePrompt} Demonstrate the Roundhouse Kick (Dollyo Chagi). Use a dynamic side-view angle. Show the pivot on the standing foot, the hip rotation, and the kick extension in one fluid motion, followed by a slow-motion replay of the key mechanics.`,
        'Side Kick (Yeop Chagi)': `${basePrompt} Demonstrate the Side Kick (Yeop Chagi). The video needs a clear side view. It must show the chambering of the kicking leg (pivoting, bringing the knee to the chest) and the powerful thrusting extension. A slow-motion replay is essential.`,
        'Back Kick (Dwi Chagi)': `${basePrompt} Demonstrate the Back Kick (Dwi Chagi). The camera should be positioned to the side and slightly behind the practitioner to capture the look over the shoulder, the chamber, and the powerful, straight-back extension of the leg. Include a slow-motion sequence.`,
        'Crescent Kick (Bandal Chagi)': `${basePrompt} Demonstrate the Crescent Kick (Bandal Chagi), specifically the outward version. Use a front-view angle to clearly show the circular path of the kicking leg. The movement should be shown at normal speed and then in slow-motion to trace the arc.`,

        // Forms
        'Taegeuk Il Jang (Form 1)': `Generate a high-definition, 1080p, 30fps video of a Taekwondo master performing the complete Taegeuk Il Jang (Form 1). The camera should follow the practitioner from a slightly elevated, wide-angle perspective to capture all movements and transitions within a traditional dojo setting. Each stance and technique should be performed with precision and control. The video should be at a deliberate, steady pace to allow for clear observation of the form's sequence.`,
        'Taegeuk Ee Jang (Form 2)': `Generate a high-definition, 1080p, 30fps video of a Taekwondo master performing the complete Taegeuk Ee Jang (Form 2). The camera should follow the practitioner from a slightly elevated, wide-angle perspective to capture all movements and transitions within a traditional dojo setting. Each stance and technique should be performed with precision and control. The video should be at a deliberate, steady pace to allow for clear observation of the form's sequence.`,
        'Taegeuk Sam Jang (Form 3)': `Generate a high-definition, 1080p, 30fps video of a Taekwondo master performing the complete Taegeuk Sam Jang (Form 3). The camera should follow the practitioner from a slightly elevated, wide-angle perspective to capture all movements and transitions within a traditional dojo setting. Each stance and technique should be performed with precision and control. The video should be at a deliberate, steady pace to allow for clear observation of the form's sequence.`,
        'Taegeuk Sa Jang (Form 4)': `Generate a high-definition, 1080p, 30fps video of a Taekwondo master performing the complete Taegeuk Sa Jang (Form 4). The camera should follow the practitioner from a slightly elevated, wide-angle perspective to capture all movements and transitions within a traditional dojo setting. Each stance and technique should be performed with precision and control. The video should be at a deliberate, steady pace to allow for clear observation of the form's sequence.`,
        'Taegeuk Oh Jang (Form 5)': `Generate a high-definition, 1080p, 30fps video of a Taekwondo master performing the complete Taegeuk Oh Jang (Form 5). The camera should follow the practitioner from a slightly elevated, wide-angle perspective to capture all movements and transitions within a traditional dojo setting. Each stance and technique should be performed with precision and control. The video should be at a deliberate, steady pace to allow for clear observation of the form's sequence.`,
        
        // Virtual Dojo
        'Virtual Instructor Intro': `A high-definition, 1080p, 30fps video. A female Taekwondo master, "Master Jin," with a confident and welcoming expression, is in a futuristic, minimalist dojo with neon blue accents. She performs a respectful Taekwondo bow towards the camera. Master Jin should speak with a clear, welcoming voice, saying: 'Welcome to the Virtual Dojo. I am Master Jin, your guide on this journey. Let's begin.' The video must include synchronized lip movements and high-quality audio.`,
        'Virtual Warm-up': `${virtualDojoPrompt} The practitioner demonstrates a dynamic warm-up routine. The sequence should include neck rotations, arm circles, torso twists, leg swings, and light jogging on the spot. Include a subtle, motivating background music track and occasional voice-over cues like 'Good, now switch sides.' or 'Keep your breathing steady.' The audio must be clear.`,
        'Virtual Stance Clinic': `${virtualDojoPrompt} A tutorial-style video. The camera focuses from a low angle on the feet and legs of the master. The video demonstrates a slow, precise transition between Walking Stance, Front Stance, and Back Stance. A clear, instructional voice-over must name each stance as it is demonstrated: 'Walking Stance... Front Stance... Back Stance.' The audio quality should be excellent.`
    };

    return techniquePrompts[techniqueName] || `${basePrompt} Demonstrate the ${techniqueName}. The video should use a side-view perspective and include a slow-motion replay to ensure clarity of the movement and perfect form.`;
};


const App = () => {
    const [prompt, setPrompt] = useState('Explain the history of Taekwondo.');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openAccordion, setOpenAccordion] = useState('foundations');
    const [videoStates, setVideoStates] = useState<Record<string, { url?: string; isLoading: boolean; error?: string }>>({});
    const [activeModalTechnique, setActiveModalTechnique] = useState<string | null>(null);

    const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
    const defaultBgUrl = 'https://images.unsplash.com/photo-1620152288427-4860b7692138?q=80&w=2574&auto=format&fit=crop';
    const [bgUrl, setBgUrl] = useState(localStorage.getItem('tkd-bg-url') || defaultBgUrl);
    const [tempBgUrl, setTempBgUrl] = useState(bgUrl);
    
    // UI State
    const [activeTab, setActiveTab] = useState('journey');

    // Timer State
    const [timerPreset, setTimerPreset] = useState(Object.keys(timerPresets)[0]);
    const [timeRemaining, setTimeRemaining] = useState(timerPresets[timerPreset].duration);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const timerIntervalRef = useRef<number | null>(null);
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
        setIsCustomizerOpen(false);
    };

    const handleAccordionToggle = (id) => {
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
    
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };


    const generateAnswer = async (currentPrompt) => {
        if (!apiKey) {
            setError('API_KEY is not configured. Please set up your environment variables.');
            return;
        }
        if (!currentPrompt) {
            setError('Please enter a prompt.');
            return;
        }

        setLoading(true);
        setError('');
        setResponse('');
        document.getElementById('ai-section')?.scrollIntoView({ behavior: 'smooth' });

        try {
            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: currentPrompt,
            });
            setResponse(result.text);
        } catch (e) {
            console.error(e);
            if (e instanceof Error) {
                setError(`Failed to generate content: ${e.message}`);
            } else {
                setError('An unknown error occurred while generating content.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateVideo = async (techniqueName: string) => {
        if (!apiKey) {
            setError('API_KEY is not configured.');
            return;
        }

        setVideoStates(prev => ({ ...prev, [techniqueName]: { isLoading: true } }));

        try {
            const videoPrompt = getVideoPromptForTechnique(techniqueName);
            
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

            const videoResponse = await fetch(`${downloadLink}&key=${apiKey}`);
            if (!videoResponse.ok) {
                throw new Error(`Failed to download video: ${videoResponse.statusText}`);
            }
            const videoBlob = await videoResponse.blob();
            const videoUrl = URL.createObjectURL(videoBlob);

            setVideoStates(prev => ({ ...prev, [techniqueName]: { isLoading: false, url: videoUrl } }));

        } catch (e) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setVideoStates(prev => ({ ...prev, [techniqueName]: { isLoading: false, error: `Failed to generate video: ${errorMessage}` } }));
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
                        <button className={`tab-button ${activeTab === 'programs' ? 'active' : ''}`} onClick={() => setActiveTab('programs')}>Training Programs</button>
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
                                            <button className="context-button" onClick={() => handleContextualSubmit(`Explain the significance and key techniques for the ${belt.name}.`)}>
                                                Ask AI about this Belt
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeTab === 'techniques' && (
                            <section className="section">
                                <h2 className="section-title">Core Techniques</h2>
                                <p className="section-subtitle">Explore fundamental movements, from stances and blocks to powerful kicks and forms.</p>
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
                                                    {item.details.map((card, cardIndex) => (
                                                        <div key={cardIndex} className="content-card">
                                                            {card.image && <img src={card.image} alt={card.title} className="card-image"/>}
                                                            <div className="card-body">
                                                                <h4>{card.title}</h4>
                                                                {card.techniques ? (
                                                                    <ul className="technique-list">
                                                                        {card.techniques.map((tech, techIndex) => {
                                                                            const contextualPrompt = `How do I perform a ${tech.name}? Provide step-by-step instructions and common mistakes to avoid.`;
                                                                            
                                                                            return (
                                                                                <li key={techIndex} className="technique-item">
                                                                                    <button className="ask-ai-button" onClick={() => handleContextualSubmit(contextualPrompt)}>
                                                                                        <span className="play-icon">?</span>
                                                                                        <div className="technique-info">
                                                                                            <strong>{tech.name}</strong>
                                                                                        </div>
                                                                                        {tech.belt !== 'white' && <span className={`tag ${tech.belt.toLowerCase()}`}>{tech.belt}</span>}
                                                                                    </button>
                                                                                    <button className="video-button" onClick={() => openVideoModal(tech.name)} disabled={videoStates[tech.name]?.isLoading}>
                                                                                        {videoStates[tech.name]?.isLoading ? '...' : '▶'}
                                                                                    </button>
                                                                                </li>
                                                                            );
                                                                        })}
                                                                    </ul>
                                                                ) : (
                                                                    <div className="poomsae-details">
                                                                        <p className="poomsae-belt">
                                                                            <strong>Belt:</strong> <span className={`tag ${card.belt.toLowerCase()}`}>{card.belt}</span>
                                                                        </p>
                                                                        <p><strong>Purpose:</strong> {card.description}</p>
                                                                        <p><strong>Key Movements:</strong> {card.keyMovements}</p>
                                                                        <p><strong>Philosophy:</strong> {card.philosophy}</p>
                                                                        <div className="technique-actions">
                                                                            <button className="context-button" onClick={() => handleContextualSubmit(`Explain ${card.title} in detail. Describe its purpose, key movements, and the philosophical concepts it represents.`)}>
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

                        {activeTab === 'programs' && (
                            <section className="section">
                                <h2 className="section-title">Structured Training Programs</h2>
                                <p className="section-subtitle">Follow a guided path to enhance your skills, from foundational techniques to advanced mastery.</p>
                                <div className="program-grid">
                                    {trainingProgramsData.map((program) => {
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
                            
                            {error && <div className="error-message"><strong>Error:</strong> {error}</div>}
                            
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
                                        <svg className="ai-response-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                            <path d="M12 2.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V3.25a.75.75 0 0 1 .75-.75ZM18.06 5.94a.75.75 0 0 1 0 1.06l-2.475 2.475a.75.75 0 0 1-1.06-1.06L17 5.94a.75.75 0 0 1 1.06 0ZM20.75 12a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5h3.5a.75.75 0 0 1 .75.75ZM18.06 18.06a.75.75 0 0 1-1.06 0l-2.475-2.475a.75.75 0 0 1 1.06-1.06L17 17a.75.75 0 0 1 0 1.06ZM12 20.75a.75.75 0 0 1-.75.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75-.75ZM5.94 18.06a.75.75 0 0 1 0-1.06l2.475-2.475a.75.75 0 0 1 1.06 1.06L7 18.06a.75.75 0 0 1-1.06 0ZM3.25 12a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75ZM5.94 5.94a.75.75 0 0 1 1.06 0l2.475 2.475a.75.75 0 0 1-1.06 1.06L7 7a.75.75 0 0 1 0-1.06Z" />
                                        </svg>
                                        <h3>AI Generated Answer</h3>
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
                <p>&copy; 2024 Taekwondo AI Assistant. All rights reserved.</p>
                <button className="settings-button" onClick={() => setIsCustomizerOpen(true)} aria-label="Customize theme">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.82 10.93a1 1 0 0 0-1.64-.78l-.13.22a8.03 8.03 0 0 0-1.4-1.4l.22-.13a1 1 0 0 0-.78-1.64L14.2 4.18a1 1 0 0 0-1.2 0l-.5.86a8.03 8.03 0 0 0-1.99 0l-.5-.86a1 1 0 0 0-1.2 0l-1.88 3.02a1 1 0 0 0-.79 1.64l.22.13a8.03 8.03 0 0 0-1.4 1.4l-.13-.22a1 1 0 0 0-1.64.78l-3.02 1.88a1 1 0 0 0 0 1.2l3.02 1.88a1 1 0 0 0 1.64-.78l.13-.22a8.03 8.03 0 0 0 1.4 1.4l-.22.13a1 1 0 0 0 .78 1.64l1.88 3.02a1 1 0 0 0 1.2 0l.5-.86a8.03 8.03 0 0 0 1.99 0l.5.86a1 1 0 0 0 1.2 0l1.88-3.02a1 1 0 0 0 .78-1.64l-.22-.13a8.03 8.03 0 0 0 1.4-1.4l.13.22a1 1 0 0 0 1.64-.78l-3.02-1.88Zm-7.82 5.57a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"></path></svg>
                </button>
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
                                    <h3>Video Generation Failed</h3>
                                    <p>{videoStates[activeModalTechnique].error}</p>
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
                        <div className="customizer-actions">
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