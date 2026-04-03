'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Stethoscope, ShieldCheck, HeartPulse, Sparkles, Award } from 'lucide-react';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

const ICONS = [Stethoscope, ShieldCheck, HeartPulse, Sparkles, Award];

export default function WhyFabClinic() {
  const t = useTranslations('why_fab');

  const usps = [
    { key: 'doctors', icon: ICONS[0] },
    { key: 'safety', icon: ICONS[1] },
    { key: 'personal', icon: ICONS[2] },
    { key: 'results', icon: ICONS[3] },
    { key: 'experience', icon: ICONS[4] },
  ];

  return (
    <section className="py-section-y bg-background-light border-y border-secondary/5 overflow-hidden" aria-label={t('label')}>
      <Container>
        <SectionHeader
          label={t('label')}
          title={<>{t('title')} <span className="italic font-light text-primary">{t('title_accent')}</span></>}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <motion.div
                key={usp.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_PREMIUM }}
                className="group flex flex-col items-center text-center"
              >
                <div className="text-primary mb-6 transition-transform duration-300 ease-premium group-hover:scale-110 group-hover:rotate-6" aria-hidden="true">
                  <Icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans text-secondary text-sm tracking-[0.2em] uppercase mb-3 font-semibold group-hover:text-primary transition-colors duration-300">
                  {t(`${usp.key}_title`)}
                </h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed max-w-[200px]">
                  {t(`${usp.key}_desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
