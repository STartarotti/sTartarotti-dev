import { Layout } from "antd";
import { useEffect, useRef, useState } from "react";
import "./index.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import TypingTitle from "./components/TypingTitle";
import { CustomHeader } from "./components/CustomHeader/CustomHeader";

const { Content } = Layout;

const experiences = [
  {
    company: "Firstance srl",
    role: "Software Engineer",
    description: [
      "Designed AWS architectures for overcoming problems and cutting costs",
      "Working closely with AWS Lambda functions and serverless architecture",
      "Developed an infrastructure for delivering automatic custom push notifications to the users",
    ],
    date: "Sep 2024 - present",
  },
  {
    company: "Rnb4Culture",
    role: "Backend Software Engineer",
    description: [
      "Responsible of company’s main product backend, developing and engineering new solution, services and features",
      "Refined and enhanced outdated architectures for reporting services",
      "Improved the development and deployment of products through the implementation of Github Actions paired upwith docker",
    ],
    date: "Dec 2022 - Sep 2024",
  },

  {
    company: "Mia-Platform",
    role: "Fullstack Developer",
    description: [
      "Working on company’s main product, developing new features that performed remarkably on the market.",
      "Developed realtime data aggregation application using Kafka and MongoDB",
      "Developing microservices, experience with Docker and Kubernetes, CI/CD pipelines",
      "Agile Scrum work methodology, experience as Scrum Master",
    ],
    date: "Sep 2021 - Dec 2022",
  },
];

const education = [
  {
    school: "Univeristy of Pavia",
    degree: "Msc in Computer Engineering",
    description:
      "Master's degree with particular focus on computer science and multimedia",
    date: "Sep 2019 - Oct 2021",
  },
  {
    school: "Univeristy of Pavia",
    degree: "Bachlor in Computer Engineering",
    description:
      "Bachelor's degree with courses from both computer and electronics engineering",
    date: "Sep 2016 - Sep 2019",
  },
  {
    school: "Liceo Scientifico T. Taramelli",
    degree: "Degree",
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

function App() {
  const [current, setCurrent] = useState("about");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      const offsets = Object.entries(sectionRefs.current).map(([key, el]) => {
        const rect = el?.getBoundingClientRect();
        return {
          key,
          top: rect?.top ?? Infinity,
        };
      });

      const visibleSection = offsets.reduce((closest, section) => {
        return Math.abs(section.top) < Math.abs(closest.top)
          ? section
          : closest;
      });

      if (visibleSection.key !== current) {
        setCurrent(visibleSection.key);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [current]);

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
    const drops = Array.from({ length: columns }, (_, i) => ({
      x: i * fontSize,
      y: Math.random() * -window.innerHeight,
      originalX: i * fontSize,
      velocityY: 2 + Math.random() * 3,
    }));

    const mouse = { x: -9999, y: -9999 };

    const drawAsciiRain = () => {
      rainCtx.fillStyle = "rgba(0, 0, 0, 0.08)";
      rainCtx.fillRect(0, 0, rainCanvas.width, rainCanvas.height);
      rainCtx.font = `${fontSize}px monospace`;
      rainCtx.fillStyle = "#00ff99";

      drops.forEach((drop) => {
        const dx = drop.x - mouse.x;
        const dy = drop.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 100;

        // Apply repulsion
        if (dist < maxDist && dist > 0.01) {
          const force = (1 - dist / maxDist) * 8;
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
      });
    };

    const animate = () => {
      drawAsciiRain();
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
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

  return (
    <Layout>
      <CustomHeader
        current={current}
        setCurrent={setCurrent}
        scrollToSection={scrollToSection}
      />

      <Content className="content">
        <div className="hero-section">
          <canvas id="ascii-rain"></canvas>
          <canvas id="hero-canvas"></canvas>

          <div className="hero-content">
            <h1 className="hero-title animated-glitch">Simone Tartarotti</h1>
            <p className="hero-subtitle animated-sub">Software Engineer</p>
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
              <strong>Self-motivated software engineer</strong> with almost 4
              years of work experience and exemplary academic qualifications at
              the
              <strong> University of Pavia</strong>.
              <br />
              <br />
              Advanced knowledge of the theoretical and practical aspects of
              engineering disciplines in the Information and Communication
              Technology (ICT), multimedia, and service engineering sectors.
              <br />
              <br />
              Able to analyze complex situations and ensure prompt resolutions.
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
                  <h2 className="experience-role">{exp.role}</h2>
                  <span className="experience-date">{exp.date}</span>
                </div>
                <h3 className="experience-company">{exp.company}</h3>
                <ul className="experience-description">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
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
                  <h2 className="education-degree">{item.degree}</h2>
                  <span className="education-date">{item.date}</span>
                </div>
                <h3 className="education-school">{item.school}</h3>
                <p className="education-description">{item.description}</p>
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
              href="https://github.com/sTartarotti"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <FaGithub className="contact-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/simone-tartarotti-485887208/"
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
