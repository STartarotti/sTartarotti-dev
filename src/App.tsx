import { Menu } from "antd";
import type { MenuProps } from "antd";
import { Layout } from "antd";
import { useEffect, useRef, useState } from "react";
import "./index.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import TypingTitle from "./components/TypingTitle";

const { Header, Content } = Layout;

const Sections = [
    {
        key: "about",
        label: "About",
        content: "ciao sono io",
    },
    {
        key: "experience",
        label: "Experience",
        content: "ciao sono io",
    },
    { key: "education", label: "Education", content: "ciao sono io" },
    { key: "skills", label: "Skills", content: "ciao sono io" },
    { key: "contacts", label: "Contacts", content: "ciao sono io" },
];

const experiences = [
    {
        company: "Firstance srl",
        role: "Software Engineer",
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit",
        date: "Sep 2024 - present",
    },
    {
        company: "Rnb4Culture",
        role: "Backend Software Engineer",
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit",
        date: "Dec 2022 - Sep 2024",
    },

    {
        company: "Mia-Platform",
        role: "Fullstack Developer",
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit",
        date: "Sep 2021 - Dec 2022",
    },
];

const education = [
    {
        school: "Univeristy of Pavia",
        degree: "Msc in Computer Engineering",
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit",
        date: "Sep 2019 - Oct 2021",
    },
    {
        school: "Univeristy of Pavia",
        degree: "Bachlor in Computer Engineering",
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit",
        date: "Sep 2016 - Sep 2019",
    },
    {
        school: "Liceo Scientifico T. Taramelli",
        degree: "Degree",
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit",
        date: "Sep 2011 - Sep 2016",
    },
];

const techStack = [
    {
        area: "Programming",
        items: ["JavaScript", "TypeScript", "PHP", "Python", "Shell", "Java"],
    },
    {
        area: "Frameworks",
        items: ["Symfony", "NodeJS", "React"],
    },
    {
        area: "Database",
        items: ["MySQL", "PostgreSQL", "MongoDB"],
    },
    {
        area: "DevOps",
        items: ["AWS", "Git", "Docker", "Kubernetes", "CI/CD"],
    },
    {
        area: "Languages",
        items: ["Italian (Native)", "English (Proficient)", "Spanish (Basic)"],
    },
];

const items: MenuProps["items"] = Sections.map((section) => ({
    label: section.label,
    key: section.key,
}));

interface Drop {
    x: number;
    y: number;
    originalX: number;
    velocityY: number;
}

function App() {
    const [current, setCurrent] = useState("about");
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 120; // Offset for header

            for (let i = 0; i < Sections.length; i++) {
                const section = Sections[i];
                const el = sectionRefs.current[section.key];
                if (el) {
                    const offsetTop = el.offsetTop;
                    const offsetBottom = offsetTop + el.offsetHeight;

                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetBottom
                    ) {
                        setCurrent(section.key);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const cursorCanvas = document.getElementById(
            "hero-canvas"
        ) as HTMLCanvasElement;
        const rainCanvas = document.getElementById(
            "ascii-rain"
        ) as HTMLCanvasElement;
        const cursorCtx = cursorCanvas?.getContext("2d");
        const rainCtx = rainCanvas?.getContext("2d");

        if (!cursorCanvas || !cursorCtx || !rainCanvas || !rainCtx) return;

        const setCanvasSize = () => {
            cursorCanvas.width = window.innerWidth;
            cursorCanvas.height = window.innerHeight;
            rainCanvas.width = window.innerWidth;
            rainCanvas.height = window.innerHeight;
        };
        setCanvasSize();

        const chars = "#$%&*01X".split("");
        const fontSize = 16;
        const columns = Math.floor(window.innerWidth / fontSize);
        let drops: Drop[] = [];

        for (let i = 0; i < columns; i++) {
            const x = i * fontSize;
            drops.push({
                x,
                y: Math.random() * -window.innerHeight,
                originalX: x,
                velocityY: 5 + Math.random() * 5,
            });
        }

        const mouse = { x: 0, y: 0 };

        let rainFrame = 0;
        const drawAsciiRain = () => {
            rainFrame++;
            if (rainFrame % 2 !== 0) return;

            rainCtx.fillStyle = "rgba(0, 0, 0, 0.05)";
            rainCtx.fillRect(0, 0, rainCanvas.width, rainCanvas.height);
            rainCtx.font = fontSize + "px monospace";
            rainCtx.fillStyle = "#00ff99";

            for (let drop of drops) {
                const dx = drop.x - mouse.x;
                const dy = drop.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 150;

                if (
                    dist < maxDist &&
                    dist > 0.01 &&
                    mouse.x > 0 &&
                    mouse.y > 0
                ) {
                    const force = (1 - dist / maxDist) * 10;
                    drop.x += (dx / dist) * force;
                } else {
                    drop.x += (drop.originalX - drop.x) * 0.05;
                }

                const char = chars[Math.floor(Math.random() * chars.length)];
                rainCtx.fillText(char, drop.x, drop.y);

                drop.y += drop.velocityY;

                if (drop.y > rainCanvas.height) {
                    drop.y = Math.random() * -50;
                    drop.x = drop.originalX;
                }
            }
        };

        const animate = () => {
            drawAsciiRain();
            requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY - 100;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", setCanvasSize);
        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", setCanvasSize);
        };
    }, []);

    const scrollToSection = (key: string) => {
        const el = sectionRefs.current[key];
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
        scrollToSection(e.key);
    };

    return (
        <Layout>
            <Header className="custom-header">
                <div className="header-content">
                    <div
                        className="logo"
                        onClick={() => scrollToSection("about")}
                    >
                        <span className="logo-icon">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#00ff99"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="4 17 10 11 4 5" />
                                <line x1="12" y1="19" x2="20" y2="19" />
                            </svg>
                        </span>
                        <span className="logo-text">sTartarotti</span>
                    </div>
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={items}
                        theme="dark"
                        className="custom-menu"
                    />
                </div>
            </Header>

            <Content className="content">
                <div className="hero-section">
                    <canvas id="ascii-rain"></canvas>
                    <canvas id="hero-canvas"></canvas>

                    <div className="hero-content">
                        <h1 className="hero-title">Simone Tartarotti</h1>
                        <p className="hero-subtitle">Software Engineer</p>
                    </div>
                </div>

                <div
                    id="about"
                    ref={(el) => {
                        sectionRefs.current["about"] = el;
                        return;
                    }}
                    className="section about-section"
                >
                    <TypingTitle text="About me" />
                    <div className="about-box">
                        <p>
                            <strong>Self-motivated software engineer</strong>{" "}
                            with almost 4 years of work experience and exemplary
                            academic qualifications at the
                            <strong> University of Pavia</strong>.
                            <br />
                            <br />
                            Advanced knowledge of the theoretical and practical
                            aspects of engineering disciplines in the
                            Information and Communication Technology (ICT),
                            multimedia, and service engineering sectors.
                            <br />
                            <br />
                            Able to analyze complex situations and ensure prompt
                            resolutions.
                            <br />
                            <br />
                            <span className="highlight">proactive</span> and
                            <span className="highlight"> precise</span>.
                        </p>
                    </div>
                </div>

                <div
                    id="experience"
                    ref={(el) => {
                        sectionRefs.current["experience"] = el;
                        return;
                    }}
                    className="section experience-section"
                >
                    <TypingTitle text="Experience" />

                    <div className="experience-list">
                        {experiences.map((exp, index) => (
                            <div key={index} className="experience-card">
                                <div className="experience-header">
                                    <h2 className="experience-role">
                                        {exp.role}
                                    </h2>
                                    <span className="experience-date">
                                        {exp.date}
                                    </span>
                                </div>
                                <h3 className="experience-company">
                                    {exp.company}
                                </h3>
                                <p className="experience-description">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    id="education"
                    ref={(el) => {
                        sectionRefs.current["education"] = el;
                        return;
                    }}
                    className="section education-section"
                >
                    <TypingTitle text="Education" />

                    <div className="education-list">
                        {education.map((item, index) => (
                            <div key={index} className="education-card">
                                <div className="education-header">
                                    <h2 className="education-degree">
                                        {item.degree}
                                    </h2>
                                    <span className="education-date">
                                        {item.date}
                                    </span>
                                </div>
                                <h3 className="education-school">
                                    {item.school}
                                </h3>
                                <p className="education-description">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    id="skills"
                    ref={(el) => {
                        sectionRefs.current["skills"] = el;
                        return;
                    }}
                    className="section skills-section"
                >
                    <TypingTitle text="Skills" />

                    <div className="skills-grid">
                        {techStack.map((stack, index) => (
                            <div key={index} className="skill-card">
                                <h2 className="skill-area">{stack.area}</h2>
                                <div className="skill-items">
                                    {stack.items.map((item, i) => (
                                        <span key={i} className="skill-tag">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    id="contacts"
                    ref={(el) => {
                        sectionRefs.current["contacts"] = el;
                        return;
                    }}
                    className="section contacts-section"
                >
                    <h2 className="contacts-title">Let's connect</h2>

                    <div className="contacts-icons">
                        <a
                            href="https://github.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                            <FaGithub className="contact-icon" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/yourusername/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                            <FaLinkedin className="contact-icon" />
                        </a>
                    </div>

                    <p className="contact-footer">
                        © 2025 Simone Tartarotti — All Rights Reserved.
                    </p>
                </div>
            </Content>
        </Layout>
    );
}

export default App;
