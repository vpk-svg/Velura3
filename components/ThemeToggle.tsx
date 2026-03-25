'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'default' | 'clinic'>('default');

    useEffect(() => {
        const savedTheme = localStorage.getItem('velura-theme') as 'default' | 'clinic';
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle('theme-clinic', savedTheme === 'clinic');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'default' ? 'clinic' : 'default';
        setTheme(newTheme);
        localStorage.setItem('velura-theme', newTheme);
        document.documentElement.classList.toggle('theme-clinic', newTheme === 'clinic');
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/20 bg-brand-ivory/50 backdrop-blur-sm transition-all duration-300 hover:border-brand-gold/50 group overflow-hidden"
            aria-label="Toggle Theme"
        >
            <div className="relative z-10 flex items-center gap-2">
                <motion.div
                    animate={{ rotate: theme === 'default' ? 0 : 180 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                >
                    {theme === 'default' ? (
                        <Sparkles className="w-4 h-4 text-brand-gold" />
                    ) : (
                        <Moon className="w-4 h-4 text-brand-gold" />
                    )}
                </motion.div>
                <span className="font-label text-[10px] tracking-[0.2em] uppercase text-brand-teal-deep">
                    {theme === 'default' ? 'VELURA MODE' : 'CLINIC MODE'}
                </span>
            </div>

            {/* Animated Background Glow */}
            <motion.div
                className="absolute inset-0 bg-brand-gold/5 -z-0 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
            />
        </button>
    );
}
