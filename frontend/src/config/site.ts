const ownerName = import.meta.env.VITE_OWNER_NAME || 'Balaji Bhargav';
const ownerEmail = import.meta.env.VITE_OWNER_EMAIL || 'balajibhargav6@gmail.com';

export const siteConfig = {
  name: ownerName,
  initials: 'BB',
  email: ownerEmail,
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  social: {
    github: 'https://github.com/BALAJIBHARGAV6',
    linkedin: 'https://www.linkedin.com/in/balaji-bhargav-95a149260/',
    twitter: 'https://www.instagram.com/balajibhargav_6/',
  },
  navLinks: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    badge: 'Available for Opportunities',
    heading: `Hi, I'm ${ownerName}`,
    typingTexts: [
      'Full Stack Developer',
      'Mobile App Developer',
      'AI Enthusiast',
      'Blockchain Explorer',
    ],
    bio: `Full Stack Developer crafting production-ready web and mobile applications for healthcare, e-commerce, and government sectors. From concept to deployment, I deliver secure, high-performance solutions that solve real-world problems.`,
    stats: [
      { value: '10+', label: 'Projects' },
      { value: '1+', label: 'Years Exp' },
      { value: '5+', label: 'Clients' },
    ],
  },
  about: {
    heading: 'Who I Am',
    paragraphs: [
      `I'm a Full Stack Developer with proven experience building scalable, production-ready web and mobile applications. Currently working at NextHub Technologies, I specialize in delivering secure, high-performance solutions across healthcare, e-commerce, and government sectors while also serving clients as a freelance developer.`,
      `My expertise covers the complete development stack — crafting responsive, intuitive interfaces and engineering robust backend systems with a track record of shipping reliable applications that meet real-world demands. I'm skilled in API development, authentication systems, cloud deployment, and performance optimization.`,
      `What sets me apart is my commitment to clean code, systematic debugging, and continuous improvement. I don't just build features — I architect solutions with scalability and maintainability in mind. Whether collaborating within agile teams or managing client projects independently, I bring professionalism, clear communication, and a results-oriented approach.`,
    ],
    quickFacts: [
      { label: 'Location', value: 'India' },
      { label: 'Education', value: 'B.Tech Computer Science' },
      { label: 'Focus', value: 'Full Stack + Mobile + AI' },
      { label: 'Languages', value: 'English, Hindi, Telugu' },
    ],
    features: [
      {
        title: 'Frontend Development',
        description: 'Building responsive, interactive UIs with React, Next.js, TypeScript, and modern CSS frameworks like Tailwind.',
        icon: 'Monitor',
      },
      {
        title: 'Backend & APIs',
        description: 'Engineering scalable APIs with Node.js, Express, Python, FastAPI, and databases like PostgreSQL & MongoDB.',
        icon: 'Server',
      },
      {
        title: 'Mobile & AI',
        description: 'Developing cross-platform mobile apps with React Native and integrating AI features using Groq LLaMA models.',
        icon: 'Brain',
      },
    ],
  },
  skills: {
    heading: 'Technical Arsenal',
    categories: [
      {
        title: 'Frontend',
        skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Bootstrap'],
      },
      {
        title: 'Backend',
        skills: ['Node.js', 'Express.js', 'Python', 'FastAPI', 'PHP', 'RESTful APIs'],
      },
      {
        title: 'Database',
        skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Supabase', 'SQLite'],
      },
      {
        title: 'Mobile',
        skills: ['React Native', 'Expo SDK', 'Zustand'],
      },
      {
        title: 'AI & Blockchain',
        skills: ['Groq LLaMA 3.1/3.3', 'ChatGPT', 'Claude AI', 'Blockchain', 'Motoko', 'ICP', 'Algorand'],
      },
      {
        title: 'Tools & DevOps',
        skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'Vercel', 'Render', 'Railway', 'AWS', 'CI/CD'],
      },
    ],
  },
  projects: [
    {
      title: 'Inventory Management & E-commerce',
      description: 'Full-stack AI-powered inventory management and ecommerce platform with real-time stock tracking, demand forecasting using Groq LLaMA 3.1, and automated reordering. Features secure REST APIs, role-based access control, and admin analytics dashboards.',
      image: 'https://img.freepik.com/premium-photo/smart-warehouse-inventory-management-system-concept-manager-using-digital-tablet-showing-warehouse-software-management-dashboard-blurred-warehouse-as-background_114016-20887.jpg',
      tags: ['Next.js 14', 'TypeScript', 'Tailwind', 'Fastify', 'Supabase', 'Groq LLaMA'],
      liveUrl: 'https://inventory-management-ecommerce.vercel.app/',
      githubUrl: 'https://github.com/BALAJIBHARGAV6/Inventory-management.git',
      gradient: 'from-primary to-blue-400',
    },
    {
      title: 'NutriPro – AI Nutrition Tracker',
      description: 'Cross-platform AI-powered nutrition tracking mobile app generating personalized meal recommendations based on health conditions, dietary restrictions, allergies, and fitness goals. Integrated Groq LLaMA 3.3 for real-time meal generation.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop&auto=format&q=80',
      tags: ['React Native', 'Expo SDK 54', 'TypeScript', 'Supabase', 'Groq LLaMA 3.3'],
      liveUrl: '#',
      githubUrl: 'https://github.com/BALAJIBHARGAV6/NutriPro',
      gradient: 'from-accent-green to-emerald-400',
    },
    {
      title: 'EduPath AI – Learning Platform',
      description: 'Full-stack AI-powered learning platform delivering personalized roadmaps, coding challenges, study notes, quizzes, and code evaluations. Integrated Groq LLaMA 3.3 for dynamic content generation with secure auth and progress tracking.',
      image: 'https://st3.depositphotos.com/1350793/13201/i/450/depositphotos_132018554-stock-photo-career-concept-with-hand.jpg',
      tags: ['Next.js 14', 'TypeScript', 'Tailwind', 'Express.js', 'Groq LLaMA 3.3'],
      liveUrl: 'https://edu-path-learner.vercel.app/',
      githubUrl: 'https://github.com/BALAJIBHARGAV6/Edu-Path',
      gradient: 'from-accent-pink to-rose-400',
    },
    {
      title: 'ESI Healthcare System',
      description: 'Government healthcare platform for ESI hospitals featuring patient discovery mobile app and admin dashboard. React Native mobile with offline support, maps integration, and Next.js admin panel with role-based access.',
      image: 'https://imageio.forbes.com/specials-images/imageserve/5f3a3c3430980e19e607e68a/0x0.jpg?format=jpg&width=1200',
      tags: ['React Native', 'Expo 54', 'Next.js 14', 'Supabase', 'Tailwind'],
      liveUrl: '#',
      githubUrl: 'https://github.com/BALAJIBHARGAV6/ESI-Hospital',
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Algo-nodes – Algorand DApp',
      description: 'Cutting-edge Algorand staking DApp with real-time blockchain integration, multi-wallet support, and interactive 3D node visualization. Features instant staking, governance participation, and analytics dashboard.',
      image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1000',
      tags: ['React', 'Tailwind CSS', 'Three.js', 'PyTeal', 'Algorand'],
      liveUrl: '#',
      githubUrl: 'https://github.com/BALAJIBHARGAV6/Algo-nodes',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Medi-Care-Dapp',
      description: 'Integrated medical blockchain platform on Internet Computer Protocol featuring blood donation, organ donation, vaccination management, and secure medical records. Built with privacy and security at its core.',
      image: 'https://images.pexels.com/photos/3957987/pexels-photo-3957987.jpeg?auto=compress&cs=tinysrgb&w=1000',
      tags: ['React', 'Tailwind CSS', 'Motoko', 'ICP'],
      liveUrl: '#',
      githubUrl: 'https://github.com/BALAJIBHARGAV6/Medi-Care-Dapp',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ],
  experience: [
    {
      company: 'NextHub Technologies',
      role: 'Full Stack Developer',
      duration: 'Jan 2025 – Present',
      achievements: [
        'Building production-ready web & mobile applications for healthcare and government sectors',
        'Developed ESI Healthcare System — a government platform with React Native mobile app and Next.js admin dashboard',
        'Implementing secure REST APIs, role-based access control, and cloud deployments',
        'Collaborating with cross-functional teams using Agile methodology',
      ],
      type: 'work' as const,
    },
    {
      company: 'Freelance',
      role: 'Full Stack Web Developer',
      duration: '2024 – Present',
      achievements: [
        'Delivered 5+ client projects including CareerInEdu, MuskanMedicare, and DrWinzPharma',
        'Built and deployed responsive e-commerce and business websites',
        'Managed full project lifecycle from design to deployment for multiple clients',
        'Achieved 100% client satisfaction rate with on-time deliveries',
      ],
      type: 'work' as const,
    },
    {
      company: 'University',
      role: 'B.Tech Computer Science',
      duration: '2022 – 2026',
      achievements: [
        'Relevant coursework: DSA, DBMS, OS, Computer Networks, AI/ML',
        'Built 10+ projects spanning web, mobile, blockchain, and AI domains',
        'Actively learning and integrating emerging technologies like LLMs and blockchain',
      ],
      type: 'education' as const,
    },
  ],
  contact: {
    heading: "Let's Connect",
    description: "Ready to bring your ideas to life? I'm always open to discussing new projects, creative ideas, or opportunities. Drop me a message — I'll get back to you within 24 hours!",
    availability: 'Available for full-time & freelance',
  },
};
