'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Container from './ui/Container';
import { Link } from '@/lib/navigation';
import { EASE_PREMIUM } from '@/lib/motion';

export default function TeamPreview() {
  const t = useTranslations('team_preview');

  const teamMembers = [
    { name: t('member1_name'), role: t('member1_role'), image: '/images/Newteam/athina-barza.jpg', position: 'object-[center_20%]' },
    { name: t('member2_name'), role: t('member2_role'), image: '/images/Newteam/Ava.jpg', position: 'object-[center_15%]' },
    { name: t('member3_name'), role: t('member3_role'), image: '/images/Newteam/Elissa.jpg', position: 'object-top' },
  ];

  return (
    <section className="py-section-y bg-white overflow-hidden" aria-label={t('label')}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="text-center mb-12"
        >
          <span className="font-sans text-primary text-xs tracking-[0.2em] uppercase mb-6 block font-semibold">
            {t('label')}
          </span>
          <h2 className="font-display text-display-lg text-secondary mb-4">
            {t('title')} <span className="italic font-light text-primary">{t('title_accent')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-10">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_PREMIUM }}
              className="text-center group"
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-md overflow-hidden bg-secondary/5 ring-2 ring-primary/10 group-hover:ring-primary/40 group-hover:shadow-[0_0_25px_rgba(198,166,93,0.5)] transition-all duration-300">
                <Image
                  src={member.image}
                  alt={`Portret van ${member.name}, ${member.role}`}
                  fill
                  loading="lazy"
                  className={`object-cover ${member.position || 'object-top'}`}
                  sizes="128px"
                />
              </div>
              <h3 className="font-sans text-secondary text-sm font-semibold">{member.name}</h3>
              <p className="font-sans text-muted text-xs mt-0.5">{member.role}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/team" className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-primary font-bold hover:underline">
            {t('cta')} <ArrowRight size={14} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
