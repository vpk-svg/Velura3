'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-brand-teal-deep text-brand-ivory pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wordmark */}
        <div className="text-center mb-16">
          <h2 className="font-label text-4xl md:text-5xl text-brand-gold tracking-[0.2em]">
            VELURA
          </h2>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="font-label text-brand-gold text-xs tracking-widest uppercase mb-6">
              {t('treatments')}
            </h4>
            <ul className="space-y-4 font-sans font-light text-sm text-brand-ivory/70">
              <li><a href="https://www.getwellis.com/products/ozempic" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors block">Ozempic</a></li>
              <li><a href="https://www.getwellis.com/products/mounjaro" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors block">Mounjaro</a></li>
              <li><a href="https://www.getwellis.com/products/wegovy" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors block">Wegovy</a></li>
              <li><a href="https://www.getwellis.com/products/saxenda" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors block">Saxenda</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label text-brand-gold text-xs tracking-widest uppercase mb-6">
              {t('methods')}
            </h4>
            <ul className="space-y-4 font-sans font-light text-sm text-brand-ivory/70">
              <li><a href="#" className="hover:text-brand-gold transition-colors focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none rounded-sm px-1 py-0.5 -ml-1 border-transparent border inline-block">{t('glp1_injecties')}</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none rounded-sm px-1 py-0.5 -ml-1 border-transparent border inline-block">{t('voedingsplannen')}</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none rounded-sm px-1 py-0.5 -ml-1 border-transparent border inline-block">{t('beweging')}</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none rounded-sm px-1 py-0.5 -ml-1 border-transparent border inline-block">{t('supplementen')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label text-brand-gold text-xs tracking-widest uppercase mb-6">
              {t('support')}
            </h4>
            <ul className="space-y-4 font-sans font-light text-sm text-brand-ivory/70">
              <li><a href="#" className="hover:text-brand-gold transition-colors">{t('faq')}</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">{t('contact')}</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">{t('delivery')}</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">{t('privacy')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label text-brand-gold text-xs tracking-widest uppercase mb-6">
              {t('company')}
            </h4>
            <ul className="space-y-4 font-sans font-light text-sm text-brand-ivory/70">
              <li><a href="#" className="hover:text-brand-gold transition-colors">{t('about')}</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">{t('reviews')}</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">{t('careers')}</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">{t('blog')}</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-brand-gold/20 mb-12" />

        {/* Disclaimer */}
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <p className="font-sans text-[11px] italic text-brand-ivory/50 leading-relaxed">
            {t('disclaimer')}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-brand-ivory/40">
          <p className="font-sans text-xs">
            {t('copyright')}
          </p>

          {/* Payment Badges */}
          <div className="flex space-x-4">
            {['iDEAL', 'PayPal', 'Visa', 'Mastercard', 'Bancontact'].map((method) => (
              <span key={method} className="font-label text-[10px] tracking-widest uppercase border border-brand-ivory/20 px-3 py-1 rounded-sm">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
