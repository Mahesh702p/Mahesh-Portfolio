// Portfolio Data - Single Source of Truth

const portfolioData = {
    profile: {
        name: "Mahesh Patel",
        title: "AI & Data Science Student",
        subtitle: "Backend Developer | AI Intern | Placement Coordinator",
        bio: "Backend developer passionate about AI/ML, Linux systems, and clean scalable architectures. Currently pursuing AI&DS at Thadomal Shahani Engineering College (TSEC). Outside of that, drawing and creative work play a big role in how I think and express ideas. Always learning and exploring.",
        location: "Mumbai, India",
        email: "patelbhiyaram757@gmail.com",
        github: "https://github.com/Mahesh702p",
        linkedin: "https://www.linkedin.com/in/mahesh-patel-0308b72ba/",
        instagram: "https://www.instagram.com/mahesh_702p/",
        leetcode: "https://leetcode.com/u/mahesh_702p/"
    },

    education: [
        {
            institution: "Thadomal Shahani Engineering College",
            university: "Mumbai University",
            degree: "B.E in Artificial Intelligence and Data Science",
            cgpa: "8.23",
            duration: "August 2023 – June 2027",
            current: true
        },
        {
            institution: "SVKM's Mithibai Junior College",
            location: "Mumbai",
            degree: "Higher Secondary Certificate",
            score: "88.5%",
            duration: "May 2021 – April 2023",
            current: false
        }
    ],

    skills: {
        "programming-languages": [
            { name: "Python", version: "3.11", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "Java", version: "17", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
            { name: "C", version: "11", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
            { name: "C++", version: "17", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
            { name: "JavaScript", version: "ES6+", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
        ],
        "web-development": [
            { name: "HTML", version: "5", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
            { name: "CSS", version: "3", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
            { name: "React", version: "18", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Flask", version: "3.0", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
            { name: "FastAPI", version: "0.104", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
            { name: "Express", version: "4.18", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
            { name: "Node.js", version: "20", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Streamlit", version: "1.3", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg" }
        ],
        "ai-ml": [
            { name: "NumPy", version: "1.24", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
            { name: "Pandas", version: "2.0", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
            { name: "Scikit-learn", version: "1.3", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
            { name: "TensorFlow", version: "2.14", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
            { name: "PyTorch", version: "2.1", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
            { name: "LangChain", version: "0.1", status: "installed", logo: "assets/langchain_v2.png" },
            { name: "CrewAI", version: "0.1", status: "installed", logo: "assets/crewai_logo.png" }
        ],
        "data-visualization": [
            { name: "Matplotlib", version: "3.8", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" },
            { name: "Power BI", version: "Desktop", status: "installed", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
            { name: "Tableau", version: "2023.3", status: "installed", logo: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
            { name: "Google Looker", version: "Cloud", status: "installed", logo: "https://www.svgrepo.com/show/354012/looker-icon.svg" }
        ],
        "database-deployment": [
            { name: "PostgreSQL", version: "15", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            { name: "Supabase", version: "2.0", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
            { name: "Git", version: "2.4", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
            { name: "GitHub", version: "Cloud", status: "installed", logo: "https://cdn.simpleicons.org/github/white" },
            { name: "Vercel", version: "Cloud", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
            { name: "AWS", version: "Cloud", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
            { name: "Render", version: "Cloud", status: "installed", logo: "https://cdn.simpleicons.org/render/white" }
        ],
        "others": [
            { name: "Linux Ubuntu", version: "22.04", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
            { name: "Figma", version: "Design", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
            { name: "Canva", version: "Design", status: "installed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" }
        ]
    },

    projects: [
        {
            id: "municipal-grievance-routing",
            name: "Municipal Grievance Routing Engine",
            description: "Built a multilingual NLP pipeline for automated grievance classification and department routing across Hindi, English, and Hinglish using a TextCNN + BiLSTM + Attention architecture with a custom Byte-Pair Encoding tokenizer. Integrated a FAISS-based RAG engine for contextual FAQ retrieval, enabling dynamic response generation without retraining.",
            features: [
                "Multilingual NLP pipeline (Hindi, English, Hinglish)",
                "TextCNN + BiLSTM + Attention architecture",
                "Custom Byte-Pair Encoding tokenizer",
                "FAISS-based RAG engine for contextual FAQ retrieval"
            ],
            tech: ["Python", "TensorFlow", "FAISS", "RAG", "Scikit-Learn"],
            status: "complete",
            github: "https://github.com/Mahesh702p/Municipal_Corporation_MPR",
            demo: null,
            highlight: true
        },
        {
            id: "warden-security",
            name: "Warden – Security Log Analytics & Threat Detection",
            description: "Built a security log parser in Python using custom regex to extract login and privilege escalation events from Linux system logs into SQLite. Created detection rules for SSH brute-force, botnet attacks, and compromised credentials, reducing log analysis time via automated HTML audit reports.",
            features: [
                "Custom regex log parser for Linux system logs",
                "SSH brute-force & botnet attack detection",
                "Compromised credential identification",
                "Automated HTML audit report generation"
            ],
            tech: ["Python", "SQLite", "Linux", "HTML5"],
            status: "complete",
            github: "https://github.com/Mahesh702p/Warden",
            demo: null,
            highlight: true
        }
    ],

    experience: [
        {
            role: "Artificial Intelligence Intern",
            organization: "Hiranandani Group, Mumbai",
            duration: "June 2026 - July 2026",
            current: false,
            description: "Built CardVault, a PWA to digitize and manage 1,000+ business cards using Google Gemini Vision API. Implemented smart search with AI query expansion, caching, and role-based access control. Contributed to a real-time Gate Check-In/Check-Out app and enterprise Purchase Order website.",
            responsibilities: [
                "Built CardVault PWA with Gemini Vision API",
                "Smart search engine with AI query expansion",
                "Gate Check-In/Check-Out application",
                "Enterprise Purchase Order website"
            ]
        },
        {
            role: "AI/ML Research Intern",
            organization: "Thadomal Shahani Engineering College, Mumbai",
            duration: "December 2025 - January 2026",
            current: false,
            description: "Conducted comparative study of GCNs, GATs, and hybrid models for node classification. Developed EAGRPO/KL-GRPO step-level gradient routing framework for RLVR, achieving 72.94% on MATH-500 and 15.83% on AIME 2025 on Qwen3-4B.",
            responsibilities: [
                "Graph Neural Network architecture research",
                "Reinforcement Learning via Verifiable Rewards (RLVR)",
                "Step-level gradient routing framework (EAGRPO/KL-GRPO)",
                "Benchmarking on MATH-500 and AIME 2025"
            ]
        }
    ],

    achievements: [
        {
            title: "Augenblick Hackathon 2026, Finalist",
            date: "2026-03",
            description: "Selected as a finalist at the Augenblick Hackathon 2026",
            category: "competition"
        },
        {
            title: "2nd Rank at IES MCRC Hackathon 2.0",
            date: "2025-03",
            description: "Secured 2nd rank in Round 1 and Round 2 Qualifier",
            category: "competition"
        }
    ],

    leadership: [
        {
            role: "Envoy and Placement Coordinator",
            organization: "Training and Placement Cell - TSEC",
            duration: "July 2026 - Present",
            current: true,
            description: "Coordinated pre-placement talks and hiring protocols with companies while managing recruitment databases. Organized campus interviews and guided students on resumes, applications, and placement protocols."
        },
        {
            role: "Design Head",
            organization: "TSEC CodeTantra",
            duration: "March 2025 - March 2026",
            current: false,
            description: "Led the design team for the flagship annual hackathon, coordinated cross-functional deliverables under tight deadlines, and contributed to the annual department magazine."
        }
    ],

    contact: {
        email: "patelbhiyaram757@gmail.com",
        github: "Mahesh702p",
        linkedin: "mahesh-patel-0308b72ba",
        instagram: "mahesh_702p",
        leetcode: "mahesh_702p",
        resume: "Mahesh_Deloitte.pdf"
    },

    art: [
        {
            id: "art-19",
            title: "Radial Mandala",
            category: "Ink Art",
            description: "Symmetrical radial mandala in ink.",
            image: "assets/art/19.jpg",
            size: "0.4 MB"
        },
        {
            id: "art-2",
            title: "Divine Harmony",
            category: "Concept Art",
            description: "Concept art exploring divine themes.",
            image: "assets/art/2.jpg",
            size: "0.1 MB"
        },
        {
            id: "art-14",
            title: "Salute to Indian Heroes",
            category: "Patriotic Art",
            description: "Patriotic tribute to Indian heroes.",
            image: "assets/art/14.jpg",
            rotation: -90,
            size: "0.2 MB"
        },
        {
            id: "art-17",
            title: "Mahatma Gandhi Portrait",
            category: "Pencil Portrait",
            description: "Pencil study of Mahatma Gandhi.",
            image: "assets/art/17.jpg",
            size: "0.1 MB"
        },
        {
            id: "art-9",
            title: "Kitchen Still Life",
            category: "Watercolor",
            description: "Watercolor painting of common kitchen items.",
            image: "assets/art/9.jpg",
            rotation: -90,
            size: "0.1 MB"
        },
        {
            id: "art-1",
            title: "Ganesha Mandala",
            category: "Ink Art",
            description: "Intricate mandala design featuring Ganesha.",
            image: "assets/art/1.jpg",
            size: "0.2 MB"
        },
        {
            id: "art-20",
            title: "Ink Art",
            category: "Zentangle Art",
            description: "Detailed Zentangle patterns in ink.",
            image: "assets/art/20.jpg",
            rotation: -90,
            size: "0.2 MB"
        },
        {
            id: "art-3",
            title: "Save Nature",
            category: "Awareness Art",
            description: "Art piece focused on environmental awareness.",
            image: "assets/art/3.jpg",
            rotation: -90,
            size: "0.2 MB"
        },
        {
            id: "art-4",
            title: "Abstract Landscape",
            category: "Abstract Art",
            description: "Exploration of shapes and colors in a landscape format.",
            image: "assets/art/4.jpg",
            rotation: -90,
            size: "0.3 MB"
        },
        {
            id: "art-5",
            title: "Still Life Study",
            category: "Watercolor",
            description: "Watercolor study of still life objects.",
            image: "assets/art/5.jpg",
            size: "0.1 MB"
        },
        {
            id: "art-6",
            title: "Geometric T-Shirt Pattern",
            category: "Pattern Design",
            description: "Modern geometric design for apparel.",
            image: "assets/art/6.jpg",
            rotation: -90,
            size: "0.2 MB"
        },
        {
            id: "art-7",
            title: "Decorative Calligraphy Composition",
            category: "Calligraphy",
            description: "Artistic composition using calligraphy techniques.",
            image: "assets/art/7.jpg",
            size: "0.3 MB"
        },
        {
            id: "art-8",
            title: "Village Life Sketch",
            category: "Line Art",
            description: "Sketch depicting scenes from village life.",
            image: "assets/art/8.jpg",
            rotation: -90,
            size: "0.2 MB"
        },
        {
            id: "art-10",
            title: "Traditional Motif Design",
            category: "Folk Art",
            description: "Detailed traditional motif inspired by folk art.",
            image: "assets/art/10.jpg",
            size: "0.1 MB"
        },
        {
            id: "art-11",
            title: "Decorative Pot Illustration",
            category: "Folk Art",
            description: "Illustrative study of a decorated traditional pot.",
            image: "assets/art/11.jpg",
            size: "0.2 MB"
        },
        {
            id: "art-12",
            title: "Ganpati Bappa Morya",
            category: "Devotional Art",
            description: "Devotional art piece dedicated to Lord Ganesha.",
            image: "assets/art/12.jpg",
            rotation: -90,
            size: "0.2 MB"
        },
        {
            id: "art-13",
            title: "Frontline Heroes",
            category: "Social Awareness",
            description: "Art piece honoring frontline workers.",
            image: "assets/art/13.jpg",
            rotation: -90,
            size: "0.2 MB"
        },
        {
            id: "art-15",
            title: "Family Time",
            category: "Narrative Art",
            description: "Narrative illustration of a family gathering.",
            image: "assets/art/15.jpg",
            rotation: -90,
            size: "0.1 MB"
        },
        {
            id: "art-16",
            title: "Children at Play",
            category: "Illustrative Art",
            description: "Whimsical illustration of children playing.",
            image: "assets/art/16.jpg",
            rotation: -90,
            size: "0.2 MB"
        },
        {
            id: "art-18",
            title: "Chhatrapati Shivaji Maharaj",
            category: "Portrait",
            description: "Portrait of the visionary leader Shivaji Maharaj.",
            image: "assets/art/18.jpg",
            size: "0.2 MB"
        }
    ],

    sections: [
        { id: "hero", name: "Home", path: "/" },
        { id: "skills", name: "Skills", path: "/skills" },
        { id: "experience", name: "Experience", path: "/experience" },
        { id: "projects", name: "Projects", path: "/projects" },
        { id: "education", name: "Education", path: "/education" },
        { id: "achievements", name: "Achievements", path: "/achievements" },
        { id: "art", name: "Gallery", path: "/gallery" },
        { id: "contact", name: "Contact", path: "/contact" }
    ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioData;
}
