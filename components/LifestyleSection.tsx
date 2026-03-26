'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Heart, Activity, Coffee } from 'lucide-react';
import Image from 'next/image';

export default function LifestyleSection() {
    const t = useTranslations('lifestyle');

    return (
        <section id="lifestyle" className="relative py-20 bg-background-light overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-20">

                    {/* Left: Interactive Image Component */}
                    <div className="flex-1 relative w-full h-[500px] md:h-[700px] rounded-[48px] overflow-hidden group">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="flex-1 relative w-full h-[500px] md:h-[700px] rounded-[48px] overflow-hidden group shadow-2xl"
                        >
                            <Image
                                src="/images/cta-atmos.png"
                                alt="Elite Aesthetics Lifestyle"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </motion.div>
                    </div>

                    {/* Right: Modern Content */}
                    <div className="flex-1 w-full text-left">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-label text-primary text-xs tracking-[0.4em] uppercase mb-6 block font-bold"
                        >
                            {t('label')}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-4xl md:text-8xl text-secondary tracking-tighter mb-12"
                        >
                            {t('title')} <br />
                            <span className="italic font-light text-primary">{t('subtitle')}</span>
                        </motion.h2>

                        <div className="space-y-12">
                            {[
                                { icon: <Heart size={28} />, title: t('item1_title'), desc: t('item1_desc') },
                                { icon: <Activity size={28} />, title: t('item2_title'), desc: t('item2_desc') },
                                { icon: <Coffee size={28} />, title: t('item3_title'), desc: t('item3_desc') }
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="flex gap-6 group"
                                >
                                    <div className="p-4 bg-primary/5 rounded-2xl text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110 h-min">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-display text-3xl text-secondary mb-2 group-hover:text-primary transition-colors italic">{item.title}</h3>
                                        <p className="font-sans font-light text-secondary/70 text-lg md:text-xl leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="mt-16 pt-10 border-t border-primary/20"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <a href="#consult" className="font-label text-sm text-primary tracking-widest uppercase font-bold group">
                                {t('cta')} <span className="ml-4 transition-transform group-hover:translate-x-3 inline-block">→</span>
                            </a>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
