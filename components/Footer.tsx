'use client';

import { useTranslations } from 'next-intl';
import Container from './ui/Container';

export default function Footer() {
  const t = useTranslations('footer');

  const linkClass = 'hover:text-primary focus-visible:text-primary transition-colors duration-200 block';

  return (
    <footer className="bg-secondary text-background-light pt-section-y pb-16" role="contentinfo">
      <Container>
        {/* Wordmark */}
        <div className="text-center mb-20" aria-hidden="true">
          <span className="font-display text-6xl md:text-8xl lg:text-[10rem] text-primary tracking-[0.2em] font-semibold opacity-[0.06] select-none">
            FAB CLINIC
          </span>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-20">
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-display text-white text-xl mb-6 font-bold tracking-tighter">FAB <span className="text-primary italic drop-shadow-[0_0_10px_rgba(198,166,93,0.4)]">CLINIC</span></h3>
            <p className="font-sans font-light text-background-light/50 text-sm leading-relaxed max-w-xs">
              {t('about_text')}
            </p>
          </div>

          {[
            { title: t('treatments'), links: [
              { href: '/botox', label: t('link_botox') },
              { href: '/fillers', label: t('link_fillers') },
              { href: '/shape', label: t('link_shape') },
              { href: '/weightloss', label: t('link_weightloss') },
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
              { href: '#', label: t('link_privacy') },
              { href: '#', label: t('link_terms') },
              { href: '#', label: t('link_cookies') },
              { href: '#', label: t('link_wkkgz') },
            ]},
          ].map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="font-sans text-primary text-[11px] tracking-[0.3em] uppercase mb-8 font-semibold">
                {col.title}
              </h4>
              <ul className="space-y-5 font-sans font-light text-sm text-background-light/70 uppercase tracking-[0.15em]">
                {col.links.map((link) => (
                  <li key={link.label}><a href={link.href} className={linkClass}>{link.label}</a></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

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
            {['iDEAL', 'Amex', 'Visa', 'Mastercard', 'STP'].map((method) => (
              <span key={method} className="font-sans text-[10px] tracking-widest uppercase border border-background-light/5 px-4 py-1.5 rounded-pill hover:border-primary/20 transition-colors duration-200 cursor-default">
                {method}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
