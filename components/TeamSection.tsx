'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function TeamSection() {
    const t = useTranslations('team');

    const team = [
        {
            name: t('dr1_name'),
            role: t('dr1_role'),
            img: '/images/hero-atmos.png', // Placeholder until actual doctor images
        },
        {
            name: t('dr2_name'),
            role: t('dr2_role'),
            img: '/images/cta-atmos.png',
        },
        {
            name: t('dr3_name'),
            role: t('dr3_role'),
            img: '/images/hero-atmos.png',
        },
    ];

    return (
        <section id="team" className="py-32 bg-background-light overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                <div className="text-center mb-24 md:mb-40">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-label text-primary text-xs tracking-[0.5em] uppercase mb-6 block font-bold"
                    >
                        {t('label')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-6xl md:text-8xl lg:text-[10rem] text-secondary tracking-tighter mb-8"
                    >
                        {t('title')} <span className="italic font-light text-primary">{t('subtitle')}</span>
                    </motion.h2>
                    <p className="font-sans font-light text-secondary/70 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                        {t('desc')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group flex flex-col items-center text-center"
                        >
                            <div className="relative w-full aspect-[4/5] rounded-[60px] overflow-hidden mb-12 shadow-2xl group-hover:shadow-primary/20 transition-all duration-700">
                                <Image
                                    src={member.img}
                                    alt={member.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply opacity-40 group-hover:opacity-0 transition-opacity duration-700" />
                            </div>
                            <h3 className="font-display text-3xl md:text-4xl text-secondary mb-4 italic group-hover:text-primary transition-colors">
                                {member.name}
                            </h3>
                            <p className="font-label text-primary text-[11px] tracking-[0.3em] uppercase font-bold">
                                {member.role}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
