'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Instagram, Facebook, Phone } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import Container from './ui/Container';
import { Link } from '@/lib/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();

  const linkClass = 'hover:text-primary focus-visible:text-primary transition-colors duration-200 block';
  const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const footerColumnsVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.08,
      },
    },
  };

  const footerColumnItemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easePremium },
    },
  };

  return (
    <footer className="bg-secondary text-background-light pt-section-y pb-16">
      <Container>
        {/* Wordmark */}
        <motion.div
          className="text-center mb-20"
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.5 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: easePremium }}
        >
          <span className="font-display text-6xl md:text-8xl lg:text-[10rem] text-primary tracking-[0.2em] font-semibold opacity-[0.06] select-none">
            FAB CLINIC
          </span>
        </motion.div>

        {/* Links Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-20"
          variants={footerColumnsVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.2 }}
        >
          <motion.div className="col-span-2 lg:col-span-1" variants={footerColumnItemVariants}>
            <h3 className="font-display text-white text-xl mb-6 font-bold tracking-tighter">FAB <span className="text-primary italic drop-shadow-[0_0_10px_rgba(198,166,93,0.4)]">CLINIC</span></h3>
            <p className="font-sans font-light text-background-light/50 text-sm leading-relaxed max-w-xs">
              {t('about_text')}
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/fabclinic.nl/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-background-light/60 hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-300" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/fabclinic" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-background-light/60 hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-300" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://wa.me/31600000000" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-background-light/60 hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/10 transition-all duration-300" aria-label="WhatsApp">
                <Phone size={18} />
              </a>
            </div>
          </motion.div>

          {[
            { title: t('treatments'), links: [
              { href: '/botox', label: t('link_botox') },
              { href: '/fillers', label: t('link_fillers') },
              { href: '/shape', label: 'BBL' },
              { href: '/weightloss', label: t('link_weightloss') },
              { href: '/medicatie', label: t('link_medicatie') },
              { href: '/trajecten', label: t('link_wellness') },
              { href: '/cursus', label: locale === 'nl' ? 'Cursus' : 'Course' },
            ]},
            { title: t('practice'), links: [
              { href: '/team', label: t('link_specialists') },
              { href: '/weightloss', label: t('link_methodology') },
              { href: '/contact', label: t('link_locations') },
              { href: '/faq', label: t('link_faq') },
            ]},
            { title: t('assessments'), links: [
              { href: '/weightloss', label: t('link_bmi') },
              { href: '/contact', label: t('link_consult') },
              { href: '/contact', label: t('link_booking') },
            ]},
            { title: t('legal'), links: [
              { href: '/privacy', label: t('link_privacy') },
              { href: '/terms', label: t('link_terms') },
              { href: '/cookies', label: t('link_cookies') },
              { href: '/wkkgz', label: t('link_wkkgz') },
            ]},
          ].map((col) => (
            <motion.nav key={col.title} aria-label={col.title} variants={footerColumnItemVariants}>
              <h4 className="font-sans text-primary text-[11px] tracking-[0.3em] uppercase mb-8 font-semibold">
                {col.title}
              </h4>
              <ul className="space-y-5 font-sans font-light text-sm text-background-light/70 uppercase tracking-[0.15em]">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.href}-${link.label}`}><Link href={link.href} className={linkClass}>{link.label}</Link></li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-primary/10 mb-12" />

        {/* Disclaimer */}
        <p className="mb-16 text-center max-w-4xl mx-auto font-sans text-[10px] md:text-[11px] italic text-background-light/30 leading-relaxed uppercase tracking-[0.25em] font-semibold">
          {t('disclaimer')}
        </p>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-background-light/40 uppercase tracking-[0.25em] font-semibold">
          <p className="font-sans text-[10px]">{t('copyright')}</p>

          {/* Payment Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {['iDEAL', 'Amex', 'Visa', 'Mastercard', 'STP'].map((method, index) => (
              <motion.span
                key={method}
                className="font-sans text-[10px] tracking-widest uppercase border border-background-light/5 px-4 py-1.5 rounded-pill hover:border-primary/20 transition-colors duration-200 cursor-default"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.8 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : index * 0.05, ease: easePremium }}
              >
                {method}
              </motion.span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
