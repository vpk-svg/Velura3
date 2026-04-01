'use client';

import { motion, type Variants } from 'motion/react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Syringe, Sparkles, Dumbbell, TrendingDown, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

const TREATMENTS = [
  {
    key: 'botox',
    href: '/botox',
    icon: Syringe,
    image: '/images/treatments/botox-hero.jpg',
    nl: { title: 'Botox', desc: 'Rimpels verminderen met veilige, subtiele injecties door ervaren artsen.' },
    en: { title: 'Botox', desc: 'Reduce wrinkles with safe, subtle injections by experienced doctors.' },
  },
  {
    key: 'fillers',
    href: '/fillers',
    icon: Sparkles,
    image: '/images/treatments/fillers-hero.jpg',
    nl: { title: 'Fillers', desc: 'Volume herstellen en contouren verfijnen voor een natuurlijk resultaat.' },
    en: { title: 'Fillers', desc: 'Restore volume and refine contours for a natural result.' },
  },
  {
    key: 'bbl',
    href: '/shape',
    icon: Dumbbell,
    image: '/images/treatments/shape-hero.jpg',
    nl: { title: 'BBL', desc: 'Non-invasieve body contouring voor een strakker silhouet.' },
    en: { title: 'BBL', desc: 'Non-invasive body contouring for a tighter silhouette.' },
  },
  {
    key: 'weightloss',
    href: '/weightloss',
    icon: TrendingDown,
    image: '/images/treatments/weightloss-hero.jpg',
    nl: { title: 'Gewichtsverlies', desc: 'Medisch begeleid afvallen met GLP-1 medicatie en coaching.' },
    en: { title: 'Weight Loss', desc: 'Medically supervised weight loss with GLP-1 medication and coaching.' },
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
};

export default function BehandelingenPage() {
  const locale = useLocale();

  return (
    <>
      {/* Hero */}
      <section className="relative w-full pt-40 pb-20 bg-secondary overflow-hidden">
        <Container>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-6 block font-semibold"
          >
            {locale === 'nl' ? 'BEHANDELINGEN' : 'TREATMENTS'}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: EASE_PREMIUM }}
            className="font-display text-display-xl text-background-light mb-6"
          >
            {locale === 'nl' ? 'Ontdek onze ' : 'Discover our '}
            <span className="italic font-light text-primary">{locale === 'nl' ? 'behandelingen' : 'treatments'}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
            className="font-sans font-light text-background-light/70 text-lg max-w-2xl"
          >
            {locale === 'nl'
              ? 'Van injectables tot medisch gewichtsverlies — alle behandelingen worden uitgevoerd door BIG-geregistreerde artsen in onze kliniek in Ede.'
              : 'From injectables to medical weight loss — all treatments are performed by BIG-registered doctors at our clinic in Ede.'}
          </motion.p>
        </Container>
      </section>

      {/* Treatment Grid */}
      <section className="py-section-y bg-background-light">
        <Container>
          <SectionHeader
            label={locale === 'nl' ? 'SPECIALISATIES' : 'SPECIALIZATIONS'}
            title={
              locale === 'nl'
                ? <>Kies uw <span className="italic font-light text-primary">categorie</span></>
                : <>Choose your <span className="italic font-light text-primary">category</span></>
            }
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {TREATMENTS.map((item) => {
              const Icon = item.icon;
              const content = locale === 'nl' ? item.nl : item.en;
              return (
                <motion.div key={item.key} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className="group relative block rounded-2xl overflow-hidden border border-primary/10 bg-white shadow-soft-sm hover:shadow-soft-lg transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={content.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-gold-glow">
                          <Icon size={22} />
                        </span>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="p-6">
                      <h3 className="font-display text-2xl italic text-secondary mb-2 group-hover:text-primary transition-colors">
                        {content.title}
                      </h3>
                      <p className="font-sans font-light text-secondary/60 text-sm leading-relaxed mb-4">
                        {content.desc}
                      </p>
                      <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] font-bold text-primary group-hover:gap-3 transition-all duration-300">
                        {locale === 'nl' ? 'Bekijk behandelingen' : 'View treatments'} <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
