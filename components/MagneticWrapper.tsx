'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useRef } from 'react';

interface MagneticWrapperProps {
    children: React.ReactElement;
    className?: string;
}

export default function MagneticWrapper({ children, className = '' }: MagneticWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { clientX, clientY } = e;
        const element = ref.current;
        if (element) {
            const { height, width, left, top } = element.getBoundingClientRect();
            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);
            x.set(middleX * 0.2); // Adjust the multiplier (0.2) to increase/decrease magnetic strength
            y.set(middleY * 0.2);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={`relative inline-block ${className}`}
        >
            {children}
        </motion.div>
    );
}
