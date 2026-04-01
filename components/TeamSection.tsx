'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

export default function TeamSection() {
    const t = useTranslations('team');

    const team = [
        {
            name: t('member1_name'),
            role: t('member1_role'),
            big: t('member1_big'),
            img: "/images/Newteam/Athina Barza.jpg",
        },
        {
            name: t('member2_name'),
            role: t('member2_role'),
            big: t('member2_big'),
            img: "/images/Newteam/Ava.jpg",
        },
        {
            name: t('member3_name'),
            role: t('member3_role'),
            big: t('member3_big'),
            img: "/images/Newteam/Elissa.jpg",
        },
        {
            name: t('member4_name'),
            role: t('member4_role'),
            big: t('member4_big'),
            img: "/images/Newteam/Ryan.jpg",
        },
        {
            name: t('member5_name'),
            role: t('member5_role'),
            big: t('member5_big'),
            img: "/images/Newteam/Mevlut.jpg",
        },
        {
            name: t('member6_name'),
            role: t('member6_role'),
            big: t('member6_big'),
            img: "/images/Newteam/Fleur.jpg",
        },
    ];

    return (
        <section id="team" className="py-section-y bg-background-light overflow-hidden" aria-labelledby="team-title">
            <Container>
                <SectionHeader
                    label={t('label')}
                    title={<>{t('title')} <span className="italic font-light text-primary">{t('subtitle')}</span></>}
                    subtitle={t('desc')}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
                    {team.map((member, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.1, ease: EASE_PREMIUM }}
                            className="group flex flex-col items-center text-center"
                        >
                            <div className="relative w-full aspect-[4/5] rounded-md overflow-hidden mb-10 shadow-soft-md group-hover:shadow-[0_8px_40px_rgba(198,166,93,0.45)] transition-shadow duration-500">
                                <Image
                                    src={member.img}
                                    alt={member.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    loading="lazy"
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply opacity-40 group-hover:opacity-0 transition-opacity duration-500" aria-hidden="true" />
                            </div>
                            <h3 className="font-display text-2xl md:text-3xl text-secondary mb-3 italic group-hover:text-primary transition-colors duration-300">
                                {member.name}
                            </h3>
                            <p className="font-sans text-primary text-[11px] tracking-[0.3em] uppercase font-semibold">
                                {member.role}
                            </p>
                            {member.big && (
                                <p className="font-sans text-secondary/50 text-[10px] tracking-[0.15em] mt-2">
                                    {member.big}
                                </p>
                            )}
                        </motion.article>
                    ))}
                </div>
            </Container>
        </section>
    );
}
