'use client';

import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed top-0 right-0 left-0 h-0.5 bg-transparent z-top pointer-events-none">
            <motion.div
                className="h-full bg-primary shadow-[0_0_15px_rgba(198,166,93,0.5)]"
                style={{ scaleX, transformOrigin: '0%' }}
            />
        </div>
    );
}
