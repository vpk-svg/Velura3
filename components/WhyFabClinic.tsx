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
    <section className="py-section-y bg-clinic-beige/40 border-y border-secondary/5 overflow-hidden" aria-label={t('label')}>
      <Container>
        <SectionHeader
          label={t('label')}
          title={<>{t('title')} <span className="font-script text-primary text-4xl lowercase relative -top-1 ml-1">{t('title_accent')}</span></>}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <motion.div
                key={usp.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: EASE_PREMIUM }}
                className="group flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 mb-8 flex items-center justify-center text-secondary/40 group-hover:text-primary transition-all duration-700" aria-hidden="true">
                  <Icon className="w-10 h-10" strokeWidth={1} />
                </div>

                <h3 className="font-sans text-secondary text-[10px] tracking-ultra-wide uppercase mb-4 font-bold group-hover:text-secondary/80 transition-colors duration-500">
                  {t(`${usp.key}_title`)}
                </h3>

                <p className="font-sans font-light text-secondary/60 text-xs leading-relaxed max-w-[180px] uppercase tracking-wider">
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
