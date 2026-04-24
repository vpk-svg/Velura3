'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(true); // default hidden until check

    useEffect(() => {
        // Disable on touch / coarse-pointer devices
        const mq = window.matchMedia('(pointer: fine)');
        setIsTouchDevice(!mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsTouchDevice(!e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        if (isTouchDevice) return;

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Skip custom cursor effects inside [data-no-custom-cursor] sections
            if (target.closest?.('[data-no-custom-cursor]')) {
                setIsHovering(false);
                return;
            }
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.role === 'tab'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isTouchDevice]);

    if (isTouchDevice) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[100000]"
            animate={{
                x: mousePosition.x,
                y: mousePosition.y,
            }}
            transition={{
                type: 'spring',
                stiffness: 1000,
                damping: 50,
                mass: 0.2,
            }}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-10deg)', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                <path d="M3 3L11 21L14 14L21 11L3 3Z" fill="#C5A059" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        </motion.div>
    );
}
