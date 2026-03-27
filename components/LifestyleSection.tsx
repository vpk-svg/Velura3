'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { UserCheck, Compass, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

export default function LifestyleSection() {
    const t = useTranslations('lifestyle');

    const features = [
        { icon: <UserCheck size={26} strokeWidth={1.5} />, title: t('item1_title'), desc: t('item1_desc') },
        { icon: <Compass size={26} strokeWidth={1.5} />, title: t('item2_title'), desc: t('item2_desc') },
        { icon: <MessageSquare size={26} strokeWidth={1.5} />, title: t('item3_title'), desc: t('item3_desc') },
    ];

    return (
        <section id="lifestyle" className="py-section-y bg-background-light overflow-hidden" aria-labelledby="lifestyle-heading">
            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                    {/* Image */}
                    <figure className="flex-1 relative w-full h-[500px] md:h-[650px] rounded-card overflow-hidden group shadow-soft-lg bg-secondary/5">
                        <motion.div
                            initial={{ x: -60, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
                            className="w-full h-full relative"
                        >
                            <Image
                                src="/images/lifestyle-coaching.png"
                                alt="Personalized Lifestyle Coaching Session"
                                fill
                                loading="lazy"
                                className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-secondary/5 group-hover:opacity-0 transition-opacity duration-500" />
                        </motion.div>
                    </figure>

                    {/* Content */}
                    <div className="flex-1 w-full">
                        <SectionHeader
                            label={t('label')}
                            title={<>{t('title')} <br /><span className="italic font-light text-primary">{t('subtitle')}</span></>}
                            align="left"
                        />

                        <dl className="space-y-10">
                            {features.map((item, idx) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.15 + idx * 0.1, ease: EASE_PREMIUM }}
                                    className="flex gap-5 group"
                                >
                                    <div className="p-3.5 bg-primary/5 rounded-2xl text-primary transition-all duration-300 ease-premium group-hover:bg-primary group-hover:text-white group-hover:scale-105 h-min shrink-0" aria-hidden="true">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <dt className="font-display text-display-sm text-secondary mb-1.5 group-hover:text-primary transition-colors duration-200 italic">{item.title}</dt>
                                        <dd className="font-sans font-light text-secondary/70 text-base md:text-lg leading-relaxed">{item.desc}</dd>
                                    </div>
                                </motion.div>
                            ))}
                        </dl>

                        <motion.div
                            className="mt-12 pt-8 border-t border-primary/15"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <a href="#consult" className="font-label text-sm text-primary tracking-widest uppercase font-bold group inline-flex items-center gap-3 hover:gap-5 transition-all duration-300">
                                {t('cta')} <span aria-hidden="true">→</span>
                            </a>
                        </motion.div>
                    </div>

                </div>
            </Container>
        </section>
    );
}
