'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Clock, GraduationCap, UserCheck, MessageCircle } from 'lucide-react';
import Container from './ui/Container';
import { EASE_PREMIUM } from '@/lib/motion';

export default function TeamTrustPillars() {
  const t = useTranslations('team_trust');

  const pillars = [
    {
      icon: <Clock className="w-10 h-10" />,
      title: t('exp_title'),
      desc: t('exp_desc'),
    },
    {
      icon: <GraduationCap className="w-10 h-10" />,
      title: t('edu_title'),
      desc: t('edu_desc'),
    },
    {
      icon: <UserCheck className="w-10 h-10" />,
      title: t('personal_title'),
      desc: t('personal_desc'),
    },
    {
      icon: <MessageCircle className="w-10 h-10" />,
      title: t('reach_title'),
      desc: t('reach_desc'),
    },
  ];

  return (
    <section className="py-section-y bg-background-light border-y border-secondary/5" aria-labelledby="team-trust-heading">
      <Container>
        <h2 id="team-trust-heading" className="sr-only">{t('sr_heading')}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 list-none p-0 m-0" role="list">
          {pillars.map((pillar, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_PREMIUM }}
              className="group flex flex-col items-center text-center"
            >
              <div className="text-primary mb-6 transition-transform duration-300 ease-premium group-hover:scale-110 group-hover:rotate-6" aria-hidden="true">
                {pillar.icon}
              </div>
              <h3 className="font-sans text-secondary text-sm tracking-[0.3em] uppercase mb-3 font-semibold group-hover:text-primary transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="font-sans font-light text-muted-strong text-base leading-relaxed max-w-xs transition-colors duration-300 group-hover:text-secondary">
                {pillar.desc}
              </p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
