const birthday = "2001-02-13";
const calculateAge = (date: string) => {
  const birth= new Date(date);
  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if(days<0){
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += prevMonth;
  }
  if(months<0){
    years--;
    months += 12;
  }
return `${years} years, ${months} months, ${days} days`;
};
const age = calculateAge(birthday);

export const personal = {
  name: "Syed Akhter Hussain",
  shortName: "Syed",
  role: "Full Stack Web Developer",
  tagline:
    "B.Tech CSE student building scalable web apps with React, PHP, Node.js & Firebase.",
  bio: [
    "I'm a passionate Full Stack Web Developer and B.Tech CSE student from Nagaon, Assam, India. Currently pursuing my Bachelor's in Computer Science & Engineering at Barak Valley Engineering College, Karimganj.",
    "My journey began with a Diploma in CSE from Nalbari Polytechnic, where I built my first real-world project — an Automatic Timetable Management System still used by the college today.",
    "I specialize in full-stack web development with strong command over HTML5, CSS3, JavaScript, PHP, and React. I work with Node.js, MySQL, Firebase, and Supabase for modern cloud-native applications.",
    "I founded 8BitBannar — a WebTech company in Assam offering web development, UI/UX design, and maintenance services to local and national clients across India.",
    "I speak four languages — English, Assamese, Hindi, and Bengali — which helps me connect with clients across India.",
  ],
  quote:
    '"Transforming complex challenges into intuitive solutions through clean, maintainable code."',
  email: "ah076145@gmail.com",
  phone: "+91-9127222171",
  location: "Nagaon, Assam — 782003, India",
  birthday: "13 Feb 2001",
  age: age,
  degree: "B.Tech CSE",
  freelance: true,
  portfolio: "https://www.syedakhterhussain.online/",
  github: "https://github.com/Ak7865",
  company: "8BitBannar",
  companyUrl: "https://8bitbannar.in/",
  linkedin: "https://www.linkedin.com/in/syed-akhter-hussain-026361233/",
  own_instagram: "https://www.instagram.com/syed_akhter_hussain/",
  company_instagram:
    "https://www.instagram.com/8bitbanner?igsh=MXN0ZTJleDdkYnJzZQ==",
  cvUrl: "https://www.syedakhterhussain.online/Syed_Akhter_Hussain_2026.pdf",
  stats: [
    { num: "8+", label: "Certifications" },
    { num: "3+", label: "Projects Built" },
    { num: "4", label: "Languages Spoken" },
  ],
  languages: ["English", "Assamese", "Hindi", "Bengali"],
  currentFocus: [
    "⚛️ Advancing React.js proficiency",
    "🔥 MERN Stack (MongoDB, Express, React, Node)",
    "☁️ Cloud-native with Firebase & Supabase",
    "🌱 Contributing to open-source JS projects",
  ],
  tags: [
    "Full Stack",
    "React Learner",
    "PHP/MySQL",
    "Firebase",
    "Freelancer",
    "8BitBannar",
    "B.Tech CSE",
    "MERN Stack",
  ],
};

export const story = [
  {
    num: "01",
    icon: "🎮",
    title: "The Curiosity",
    desc: "Growing up in Nagaon, Assam — I was always the kid who wanted to know how things worked. That curiosity led me to computers.",
  },
  {
    num: "02",
    icon: "🎓",
    title: "The Foundation",
    desc: "Diploma in CSE at Nalbari Polytechnic, then B.Tech at Barak Valley Engineering College. Theory met practice — and I loved every minute.",
  },
  {
    num: "03",
    icon: "💻",
    title: "The Build",
    desc: "Built a Timetable Management System for my college, a Real-Time Chat App, an E-Commerce platform — each project leveled me up.",
  },
  {
    num: "04",
    icon: "🌐",
    title: "8BitBannar",
    desc: "Founded 8BitBannar — a WebTech company in Assam, offering professional development, maintenance & design services.",
  },
];

export const globeStats = [
  { icon: "📍", text: "Nagaon, Assam", sub: "Home base" },
  { icon: "🏢", text: "8BitBannar.in", sub: "WebTech company" },
  { icon: "💼", text: "Internshala", sub: "Certified developer" },
  { icon: "🤝", text: "Remote Freelance", sub: "Open across India" },
];

export const skillCategories = [
  {
    title: "🌐 Frontend",
    color: "green" as const,
    skills: [
      { name: "HTML5 / CSS3", pct: 90 },
      { name: "JavaScript", pct: 80 },
      { name: "React.js", pct: 55 },
      { name: "Bootstrap 5", pct: 85 },
      { name: "UI / UX Design", pct: 72 },
    ],
  },
  {
    title: "⚙️ Backend & DB",
    color: "blue" as const,
    skills: [
      { name: "PHP", pct: 82 },
      { name: "Node.js", pct: 60 },
      { name: "MySQL", pct: 84 },
      { name: "Firebase", pct: 68 },
      { name: "MongoDB", pct: 50 },
    ],
  },
  {
    title: "💻 Languages",
    color: "purple" as const,
    skills: [
      { name: "Java", pct: 78 },
      { name: "Python", pct: 72 },
      { name: "PHP", pct: 82 },
      { name: "REST APIs", pct: 65 },
      { name: "Git / GitHub", pct: 76 },
    ],
  },
];

export const certifications = [
  { icon: "🌾", name: "AI-ML in Agriculture", org: "NIT Silchar" },
  { icon: "🌐", name: "Web Dev Internship", org: "Internshala" },
  { icon: "💼", name: "Job & Placement Training", org: "Internshala" },
  { icon: "🔌", name: "Networking & Hardware", org: "TRTC Guwahati" },
  { icon: "🎮", name: "Game Dev with Python", org: "GUVI × IITM" },
  { icon: "☕", name: "Java Programming", org: "Great Learning" },
  { icon: "📊", name: "Data Entry Operator", org: "MSME Skill India" },
  { icon: "🚀", name: "Full Stack Web Dev", org: "Prodigy Infotech" },
];

export const education = [
  {
    period: "2024 — Pursuing",
    badge: "🟢 Currently Enrolled",
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Barak Valley Engineering College, Karimganj, Assam",
    desc: "Studying advanced data structures, operating systems, DBMS, software engineering and modern web technologies. Actively applying classroom knowledge to real-world freelance projects.",
    tags: ["B.Tech CSE", "Data Structures", "DBMS", "Software Engineering"],
  },
  {
    period: "2020 — 2023",
    degree: "Diploma in Computer Science & Engineering",
    institution: "Nalbari Polytechnic, Chandkuchi, Nalbari, Assam",
    desc: "Hands-on polytechnic training in programming, networking, and web technologies. Built the Automatic Timetable Management System as final project — still in use by the institution. Reduced scheduling conflicts by 70%.",
    tags: ["PHP", "MySQL", "HTML/CSS", "Networking"],
  },
  {
    period: "2017 — 2020",
    degree: "Higher Secondary — Science Stream (HS)",
    institution: "Kalong Kapili Vidyapeeth Jr. College, Nagaon",
    desc: "Studied Physics, Chemistry, Mathematics and Computer Science. Developed strong analytical thinking and problem-solving skills.",
    tags: ["Science", "Mathematics", "Computer Science"],
  },
  {
    period: "2007 — 2017",
    degree: "High School Leaving Certificate (HSLC)",
    institution: "Morikolong High School, Nagaon, Assam",
    desc: "Completed schooling in Nagaon. Discovered passion for computers and technology during these foundational years.",
    tags: ["HSLC", "Nagaon, Assam"],
  },
];

export const career = [
  {
    period: "2024 — Present",
    badge: "🟢 Active",
    title: "Founder & Web Developer",
    company: "8BitBannar — WebTech Company, Assam",
    desc: "Founded 8BitBannar, a WebTech company offering professional website development, UI/UX design, maintenance and full-stack web application services. Building the go-to web partner for businesses in Northeast India.",
    tags: ["React", "PHP", "Firebase", "Freelance", "Founder"],
  },
  {
    period: "NOV — DEC 2023",
    title: "IT Executive",
    company: "Yashraj Software Private Ltd",
    desc: "Served as IT Executive handling software operations, technical support and IT infrastructure tasks. Gained professional industry experience in a software company environment.",
    tags: ["IT Operations", "Technical Support", "Software"],
  },
  {
    period: "2022",
    title: "Web Development Intern",
    company: "Internshala",
    desc: "Completed intensive web development training. Built projects with HTML, CSS, JavaScript and PHP. Designed and deployed a full-stack e-commerce website as the capstone project.",
    tags: ["HTML/CSS", "JavaScript", "PHP", "E-Commerce"],
  },
  {
    period: "2021",
    title: "Networking & Hardware Intern",
    company: "Tool Room and Training Center (TRTC), Guwahati",
    desc: "Assisted in network setup, maintenance and troubleshooting. Gained hands-on experience configuring routers, switches and managing LAN/WAN networks.",
    tags: ["Networking", "LAN/WAN", "Hardware", "Routers"],
  },
];

export const projects = [
  {
    icon: "📅",
    name: "Automatic Timetable System",
    desc: "Web-based system automating class scheduling for Nalbari Polytechnic. Reduced scheduling conflicts by 70%. Used daily by faculty and students.",
    lang: "PHP / MySQL",
    langColor: "#4f5d95",
    badge: "✅ Live",
    link: "https://github.com/Ak7865",
  },
  {
    icon: "💬",
    name: "Real-Time Chat Application",
    desc: "Full-featured chat app built with React and Firebase. User authentication, real-time messaging via Firestore, and responsive mobile-first design.",
    lang: "React / Firebase",
    langColor: "#f7c948",
    badge: "🔥 Firebase",
    link: "https://github.com/Ak7865",
  },
  {
    icon: "🛒",
    name: "E-Commerce Platform",
    desc: "Full-stack e-commerce website with product catalog, cart management, and secure payment integration. Built during Internshala Full Stack internship.",
    lang: "PHP / MySQL",
    langColor: "#4f5d95",
    badge: "💳 Payments",
    link: "https://github.com/Ak7865",
  },
  {
    icon: "🌐",
    name: "Personal Portfolio v2",
    desc: "Personal portfolio website showcasing projects, skills and services. Deployed on Vercel. HTML/CSS/JS optimized for SEO.",
    lang: "JS / HTML / CSS",
    langColor: "#f1e05a",
    badge: "🚀 Deployed",
    link: "https://www.syedakhterhussain.online/",
  },
  {
    icon: "🎮",
    name: "Python Game Dev",
    desc: "Game built with Python as part of GUVI × IITM certification. Implemented game logic, sprite management and collision detection.",
    lang: "Python",
    langColor: "#3572a5",
    badge: "🐍 Python",
    link: "https://github.com/Ak7865",
  },
  {
    icon: "🏢",
    name: "8BitBannar Website",
    desc: "Company website for 8BitBannar WebTech — showcasing services, portfolio, and client contact. SEO-optimized for Assam web development searches.",
    lang: "Web",
    langColor: "#3fb950",
    badge: "🌐 Live",
    link: "https://8bitbannar.in/",
  },
];

export const githubRepos = [
  {
    name: "timetable-management-system",
    desc: "Automated scheduling system for Nalbari Polytechnic. PHP/MySQL backend.",
    lang: "PHP",
  },
  {
    name: "react-firebase-chat",
    desc: "Real-time chat app with Firebase authentication and Firestore messaging.",
    lang: "JavaScript",
  },
  {
    name: "ecommerce-php",
    desc: "Full-stack e-commerce platform with cart and payment integration.",
    lang: "PHP",
  },
  {
    name: "portfolio-v2",
    desc: "Personal portfolio — deployed on Vercel. HTML/CSS/JS + SEO optimized.",
    lang: "JavaScript",
  },
];

export const services = [
  {
    icon: "🎨",
    title: "Web Design",
    desc: "Visually appealing, responsive, user-centric website designs using HTML5, CSS3 and modern UI/UX practices. Mobile-first on every project.",
  },
  {
    icon: "⚙️",
    title: "Website Maintenance",
    desc: "Reliable ongoing support to keep your website updated, secure and optimized. Regular backups, performance checks and content updates.",
  },
  {
    icon: "💼",
    title: "Freelance Projects",
    desc: "Available for freelance engagements — from static portfolio sites to full e-commerce platforms. Transparent pricing for Assam-based clients.",
  },
  {
    icon: "🚀",
    title: "Web App Development",
    desc: "Dynamic, database-driven web applications using React, PHP, Node.js, Firebase and Supabase. Scalable architecture from day one.",
  },
  {
    icon: "🤝",
    title: "Collaboration",
    desc: "Open to collaborate on group projects, GitHub-based development and open-source initiatives. Happy to pair program and learn together.",
  },
  {
    icon: "📱",
    title: "Responsive Design",
    desc: "Every site works flawlessly on mobile, tablet and desktop. Tested across devices and browsers before delivery.",
  },
];

export const chatKB: Record<string, string> = {
  stack:
    "Syed works with HTML5, CSS3, JavaScript, PHP, React (learning), Node.js, MySQL, Firebase, and Supabase. He codes in Java and Python too.",
  hire: "Syed is available for freelance, internship and full-time roles! Contact him at ah076145@gmail.com or call +91-9127222171.",
  project:
    "Key projects: ✅ Timetable System (PHP/MySQL), 💬 Real-Time Chat App (React/Firebase), 🛒 E-Commerce Platform, and 🌐 8BitBannar site.",
  "8bitbannar":
    "8BitBannar (8bitbannar.in) is Syed's own WebTech company in Assam. It offers web design, development, maintenance and app services.",
  education:
    "B.Tech CSE at Barak Valley Engineering College (2024–present). Diploma CSE from Nalbari Polytechnic (2020–2023).",
  certification:
    "He holds 8 certifications: AI-ML (NIT Silchar), Web Dev (Internshala), Networking (TRTC Guwahati), Game Dev (GUVI×IITM), Java (Great Learning), Full Stack (Prodigy Infotech), Data Entry (MSME Skill India).",
  contact:
    "📧 ah076145@gmail.com | 📱 +91-9127222171 | Based in Nagaon, Assam 782003.",
  language:
    "Syed speaks 4 languages: English, Assamese, Hindi and Bengali — great for working across India!",
  about:
    "Syed Akhter Hussain is a passionate software developer and founder of 8BitBannar. He builds modern web applications, business websites, and scalable web tools.",
  portfolio:
    "You can view Syed's portfolio at syedakhterhussain.online where his projects, services, and technical skills are showcased.",
  github:
    "Syed's GitHub profile is github.com/Ak7865 where he shares open-source projects, coding experiments, and development work.",
  services:
    "Through 8BitBannar, Syed offers services like business website development, portfolio websites, e-commerce websites, web apps, and website maintenance.",
  frontend:
    "Syed specializes in frontend development using HTML, CSS, JavaScript, and React. He focuses on responsive UI and modern user experience.",
  backend:
    "Syed builds backend systems using PHP, Node.js, MySQL, Firebase, and Supabase to create scalable web applications.",
  internship:
    "Syed is actively looking for internships and real-world software development opportunities to improve his industry experience.",
  freelancing:
    "Yes! Syed accepts freelance web development projects such as business websites, landing pages, and full web applications.",
  location:
    "Syed is based in Nagaon, Assam, India but he works remotely with clients across India.",
  experience:
    "Syed has experience building full-stack web applications, real-time chat systems, business websites, and database-driven applications.",
  ai: "Syed is also interested in Artificial Intelligence and Machine Learning and has completed AI-ML training from NIT Silchar.",
  goals:
    "Syed aims to become a skilled full-stack software engineer and build innovative technology products that solve real-world problems.",
  company:
    "8BitBannar is Syed's startup focused on web technology services including development, design, and digital solutions for businesses.",
  skills:
    "Syed's core skills include web development, database management, API integration, responsive design, and full-stack development.",
  resume:
    "You can request Syed's resume by emailing him at ah076145@gmail.com.",
};
