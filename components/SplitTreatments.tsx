'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image'; // Added import for Image
import MagneticWrapper from '@/components/magnetic-wrapper'; // Added import for MagneticWrapper
// Removed Sparkles, Zap as they are no longer used

export default function SplitTreatments() {
    const t = useTranslations('treatments');

    return (
        <div id="fillers" className="flex-1 relative flex flex-col justify-center p-12 md:p-24 group cursor-none">
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div className="mb-10 w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-primary/30">
                    <Sparkles size={40} />
                </div>
                <h3 className="font-display text-5xl md:text-7xl text-secondary mb-8">
                    {t('fillers_title')} <br />
                    <span className="text-primary italic">{t('fillers_subtitle')}</span>
                </h3>
                <p className="font-sans font-light text-secondary/70 text-xl md:text-2xl leading-relaxed max-w-lg mb-12">
                    {t('fillers_desc')}
                </p>
                <a href="#booking" className="inline-flex items-center text-primary font-label text-sm tracking-widest uppercase font-bold group-hover:gap-6 transition-all duration-500">
                    {t('fillers_cta')} <span className="ml-4">→</span>
                </a>
            </motion.div>
            <div className="absolute top-10 right-10 text-[10rem] font-display text-primary/5 select-none transition-opacity group-hover:opacity-20 pointer-events-none">02</div>
        </div>

            </div >
        </section >
    );
}
