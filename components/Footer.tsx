'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Instagram, Mail, MapPinned, Phone } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import Container from './ui/Container';
import { Link } from '@/lib/navigation';
import { getClinicContactInfo } from '@/lib/clinic-data';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const contact = getClinicContactInfo(locale as 'nl' | 'en');
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
    <footer className="bg-secondary border-t border-primary/10 pt-24 pb-24 text-background-light">
      <Container>
        {/* Wordmark - Ultra subtle */}
        <motion.div
          className="text-center mb-28"
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.5 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: easePremium }}
        >
          <span className="font-display text-7xl md:text-8xl lg:text-[11rem] text-white tracking-ultra-wide font-light opacity-[0.05] select-none uppercase">
            Fab Clinic
          </span>
        </motion.div>

        {/* Links Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10 mb-28"
          variants={footerColumnsVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.1 }}
        >
          <motion.div className="col-span-2 lg:col-span-1" variants={footerColumnItemVariants}>
            <h3 className="font-display text-primary text-3xl mb-8 italic font-light">FAB <span className="text-primary italic">CLINIC</span></h3>
            <p className="font-sans font-light text-white/70 text-sm leading-relaxed max-w-xs uppercase tracking-wider">
              {t('about_text')}
            </p>
            <div className="flex gap-4 mt-10">
              <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-all duration-500" aria-label="Instagram">
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a href={`tel:${contact.phone}`} className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-all duration-500" aria-label="Phone">
                <Phone size={16} strokeWidth={1.5} />
              </a>
              <a href={`mailto:${contact.email}`} className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-all duration-500" aria-label="Email">
                <Mail size={16} strokeWidth={1.5} />
              </a>
              <a href={contact.routeUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-all duration-500" aria-label="Route">
                <MapPinned size={16} strokeWidth={1.5} />
              </a>
            </div>
            <div className="mt-8 space-y-2 font-sans text-sm text-white/70">
              <p><a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors">{contact.phoneDisplay}</a></p>
              <p><a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">{contact.email}</a></p>
            </div>
          </motion.div>

          {[
            {
              title: t('treatments'), links: [
                { href: '/botox', label: t('link_botox') },
                { href: '/fillers', label: t('link_fillers') },
                { href: '/shape', label: 'BBL' },
                { href: '/weightloss', label: t('link_weightloss') },
                { href: '/medicatie', label: t('link_medicatie') },
                { href: '/trajecten', label: t('link_wellness') },
              ]
            },
            {
              title: t('practice'), links: [
                { href: '/team', label: t('link_specialists') },
                { href: '/weightloss', label: t('link_methodology') },
                { href: '/contact', label: t('link_locations') },
                { href: '/faq', label: t('link_faq') },
              ]
            },
            {
              title: t('assessments'), links: [
                { href: '/bmi', label: t('link_bmi') },
                { href: '/contact', label: t('link_consult') },
                { href: '/contact', label: t('link_booking') },
              ]
            },
            {
              title: t('legal'), links: [
                { href: '/privacy', label: t('link_privacy') },
                { href: '/terms', label: t('link_terms') },
                { href: '/cookies', label: t('link_cookies') },
                { href: '/wkkgz', label: t('link_wkkgz') },
                { href: '/klachten', label: locale === 'nl' ? 'Klachten' : 'Complaints' },
              ]
            },
          ].map((col) => (
            <motion.nav key={col.title} aria-label={col.title} variants={footerColumnItemVariants}>
              <h4 className="font-sans text-white/45 text-[11px] tracking-[0.2em] uppercase mb-10 font-light">
                {col.title}
              </h4>
              <ul className="space-y-4 font-sans font-light text-[11px] text-white/70 uppercase tracking-[0.15em]">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.href}-${link.label}`}><Link href={link.href} className={linkClass}>{link.label}</Link></li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-14" />

        {/* Disclaimer */}
        <p className="mb-16 text-center max-w-4xl mx-auto font-sans text-[10px] md:text-[11px] italic text-white/35 leading-relaxed uppercase tracking-[0.2em]">
          {t('disclaimer')}
        </p>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-white/35 uppercase tracking-[0.2em] font-light">
          <p className="font-sans text-[10px]">{t('copyright')}</p>

          {/* Payment Badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {['iDEAL', 'Amex', 'Visa', 'Mastercard', 'STP'].map((method, index) => (
              <motion.span
                key={method}
                className="font-sans text-[10px] uppercase border border-white/10 px-4 py-1.5 rounded-full hover:border-primary/40 transition-all duration-500 cursor-default"
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
