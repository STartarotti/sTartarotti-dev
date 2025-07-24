import { useEffect, useRef, useState } from "react";

const TypingTitle = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText((_prev) => text.slice(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 80);

        return () => clearInterval(interval);
    }, [isVisible, text]);

    return (
        <h1 ref={ref} className="section-title typing">
            {displayedText}
        </h1>
    );
};

export default TypingTitle;
