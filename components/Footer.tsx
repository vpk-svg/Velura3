'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-secondary text-background-light pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wordmark */}
        <div className="text-center mb-16">
          <h2 className="font-label text-4xl md:text-5xl text-primary tracking-[0.2em] font-bold">
            FAB CLINIC
          </h2>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="font-label text-primary text-xs tracking-widest uppercase mb-6 font-bold">
              {t('treatments')}
            </h4>
            <ul className="space-y-4 font-sans font-light text-sm text-background-light/70 uppercase tracking-wider">
              <li><a href="#fillers" className="hover:text-primary transition-colors block">Fillers</a></li>
              <li><a href="#botox" className="hover:text-primary transition-colors block">Botox</a></li>
              <li><a href="#lifestyle" className="hover:text-primary transition-colors block">Lifestyle</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label text-primary text-xs tracking-widest uppercase mb-6 font-bold">
              Quick Links
            </h4>
            <ul className="space-y-4 font-sans font-light text-sm text-background-light/70 uppercase tracking-wider">
              <li><a href="#team" className="hover:text-primary transition-colors block">Team</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors block">Contact</a></li>
              <li><a href="#consult" className="hover:text-primary transition-colors block">Consultatie</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label text-primary text-xs tracking-widest uppercase mb-6 font-bold">
              {t('support')}
            </h4>
            <ul className="space-y-4 font-sans font-light text-sm text-background-light/70 uppercase tracking-wider">
              <li><a href="#" className="hover:text-primary transition-colors">{t('faq')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('contact')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('delivery')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('privacy')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label text-primary text-xs tracking-widest uppercase mb-6 font-bold">
              {t('company')}
            </h4>
            <ul className="space-y-4 font-sans font-light text-sm text-background-light/70 uppercase tracking-wider">
              <li><a href="#" className="hover:text-primary transition-colors">{t('about')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('reviews')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('careers')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('blog')}</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary/20 mb-12" />

        {/* Disclaimer */}
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <p className="font-sans text-[11px] italic text-background-light/50 leading-relaxed uppercase tracking-widest">
            {t('disclaimer')}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-background-light/40 uppercase tracking-[0.2em]">
          <p className="font-sans text-[10px]">
            {t('copyright')}
          </p>

          {/* Payment Badges */}
          <div className="flex space-x-4">
            {['iDEAL', 'PayPal', 'Visa', 'Mastercard'].map((method) => (
              <span key={method} className="font-label text-[10px] tracking-widest uppercase border border-background-light/20 px-3 py-1 rounded-sm">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
