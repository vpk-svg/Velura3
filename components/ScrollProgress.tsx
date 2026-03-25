'use client';

import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed top-0 right-0 left-0 h-1 bg-transparent z-[9999] pointer-events-none">
            <motion.div
                className="h-full bg-brand-gold shadow-[0_0_10px_#C9A84C]"
                style={{ scaleX: scaleY, transformOrigin: '0%' }}
            />
        </div>
    );
}
