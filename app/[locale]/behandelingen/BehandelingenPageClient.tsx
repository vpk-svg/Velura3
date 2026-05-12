'use client';

import { motion, type Variants } from 'motion/react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Syringe, Sparkles, Dumbbell, TrendingDown, ArrowRight, ClipboardList, ShoppingBag } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

const TREATMENTS = [
  {
    key: 'botox',
    href: '/botox',
    icon: Syringe,
    image: '/images/botox-example.png',
    nl: {
      title: 'Botox',
      desc: 'Rimpels verminderen met veilige, subtiele injecties door ervaren artsen.',
      items: ['Voorhoofd', 'Fronsrimpel', 'Kraaienpootjes', 'Masseter (kaak)', 'Hyperhidrose'],
    },
    en: {
      title: 'Botox',
      desc: 'Reduce wrinkles with safe, subtle injections by experienced doctors.',
      items: ['Forehead', 'Frown lines', "Crow's feet", 'Masseter (jaw)', 'Hyperhidrosis'],
    },
  },
  {
    key: 'fillers',
    href: '/fillers',
    icon: Sparkles,
    image: '/images/filler-example.png',
    nl: {
      title: 'Fillers',
      desc: 'Volume herstellen en contouren verfijnen voor een natuurlijk resultaat.',
      items: ['Lipfillers', 'Kaaklijn', 'Wangen', 'Traangoot', 'Neus'],
    },
    en: {
      title: 'Fillers',
      desc: 'Restore volume and refine contours for a natural result.',
      items: ['Lip fillers', 'Jawline', 'Cheeks', 'Tear troughs', 'Nose'],
    },
  },
  {
    key: 'bbl',
    href: '/shape',
    icon: Dumbbell,
    image: '/images/bbl-example.png',
    nl: {
      title: 'BBL',
      desc: 'Non-invasieve body contouring voor een strakker silhouet.',
      items: ['Brazilian Butt Lift', 'Ooglidcorrectie', 'Onderkin behandeling'],
    },
    en: {
      title: 'BBL',
      desc: 'Non-invasive body contouring for a tighter silhouette.',
      items: ['Brazilian Butt Lift', 'Eyelid correction', 'Chin treatment'],
    },
  },
  {
    key: 'weightloss',
    href: '/weightloss',
    icon: TrendingDown,
    image: '/images/lifestyle-coaching.png',
    nl: {
      title: 'Gewichtsverlies',
      desc: 'Medisch begeleid afvallen met GLP-1 medicatie en coaching.',
      items: ['Ozempic', 'Mounjaro', 'Wegovy', 'GLP-1 medicatie', 'Medisch afvallen'],
    },
    en: {
      title: 'Weight Loss',
      desc: 'Medically supervised weight loss with GLP-1 medication and coaching.',
      items: ['Ozempic', 'Mounjaro', 'Wegovy', 'GLP-1 medication', 'Medical weight loss'],
    },
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
            className="font-display text-display-xl text-background-light mb-6 md:mb-8"
          >
            {locale === 'nl' ? 'Ontdek onze ' : 'Discover our '}
            {locale === 'nl' ? 'behandelingen' : 'treatments'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
            className="font-sans font-light text-background-light/70 text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            {locale === 'nl'
              ? 'Van injectables tot medisch gewichtsverlies: alle behandelingen worden uitgevoerd door BIG-geregistreerde artsen in onze kliniek in Ede.'
              : 'From injectables to medical weight loss: all treatments are performed by BIG-registered doctors at our clinic in Ede.'}
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
                ? <>Kies uw categorie</>
                : <>Choose your category</>
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
                      <p className="font-sans font-light text-secondary/60 text-sm leading-relaxed mb-3">
                        {content.desc}
                      </p>
                      <ul className="space-y-1 mb-4">
                        {content.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 font-sans text-sm text-secondary/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] font-bold text-primary group-hover:gap-3 transition-all duration-300">
                        {locale === 'nl' ? 'Bekijk behandelingen' : 'View treatments'} <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Test + Webshop CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE_PREMIUM }}
            className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href={`/${locale}/weightloss`}
              className="inline-flex items-center justify-center gap-3 rounded-pill font-sans uppercase font-bold px-10 py-4 text-[11px] tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]"
            >
              <ClipboardList size={16} />
              {locale === 'nl' ? 'Doe de test' : 'Take the test'}
            </Link>
            <Link
              href={`/${locale}/medicatie`}
              className="inline-flex items-center justify-center gap-3 rounded-pill font-sans uppercase font-bold px-10 py-4 text-[11px] tracking-[0.25em] bg-secondary text-white hover:bg-secondary/90 transition-all duration-300 active:scale-[0.97]"
            >
              <ShoppingBag size={16} />
              {locale === 'nl' ? 'Naar de webshop' : 'Go to webshop'}
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
