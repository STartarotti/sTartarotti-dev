import { useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "./CustomHeader.css"; // Custom styling if needed

const navItems = [
    { key: "about", label: "About" },
    { key: "experience", label: "Experience" },
    { key: "education", label: "Education" },
    { key: "skills", label: "Skills" },
    { key: "contacts", label: "Contacts" },
];

type CustomHeaderProps = {
    current: string;
    setCurrent: (key: string) => void;
    scrollToSection: (key: string) => void;
};

export function CustomHeader({
    current,
    setCurrent,
    scrollToSection,
}: CustomHeaderProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (key: string) => {
        setCurrent(key);
        scrollToSection(key);
        setIsOpen(false);
    };

    return (
        <header className="custom-header">
            <div className="nav-container">
                <div
                    className="logo neon-text"
                    onClick={() => {
                        setCurrent("about");
                        scrollToSection("about");
                        setIsOpen(false);
                    }}
                    style={{ cursor: "pointer" }}
                >
                    &gt;_ sTartarotti
                </div>

                <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <CloseOutlined /> : <MenuOutlined />}
                </div>

                <nav className={`nav-links ${isOpen ? "open" : ""}`}>
                    {navItems.map((item) => (
                        <div
                            key={item.key}
                            className={`nav-item ${
                                current === item.key ? "active" : ""
                            }`}
                            onClick={() => handleClick(item.key)}
                        >
                            {item.label}
                        </div>
                    ))}
                </nav>
            </div>
        </header>
    );
}
