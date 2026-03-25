'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-secondary text-background-light pt-32 pb-16">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Wordmark */}
        <div className="text-center mb-24">
          <h2 className="font-label text-6xl md:text-8xl lg:text-[10rem] text-primary tracking-[0.2em] font-bold opacity-10">
            FAB CLINIC
          </h2>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-24 mb-24">
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-label text-white text-2xl mb-8 font-bold tracking-tighter">FAB <span className="text-primary italic">CLINIC</span></h3>
            <p className="font-sans font-light text-background-light/50 text-sm leading-relaxed max-w-xs mb-10">
              The new standard in medical aesthetics. Boutique procedures with clinical precision.
            </p>
          </div>
          <div>
            <h4 className="font-label text-primary text-[11px] tracking-[0.3em] uppercase mb-10 font-bold">
              Treatments
            </h4>
            <ul className="space-y-6 font-sans font-light text-sm text-background-light/70 uppercase tracking-[0.15em]">
              <li><a href="#botox" className="hover:text-primary transition-colors block">Bespoke Botox</a></li>
              <li><a href="#fillers" className="hover:text-primary transition-colors block">Dermal Fillers</a></li>
              <li><a href="#lifestyle" className="hover:text-primary transition-colors block">Medical Wellness</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label text-primary text-[11px] tracking-[0.3em] uppercase mb-10 font-bold">
              Practice
            </h4>
            <ul className="space-y-6 font-sans font-light text-sm text-background-light/70 uppercase tracking-[0.15em]">
              <li><a href="#team" className="hover:text-primary transition-colors block">Our Specialists</a></li>
              <li><a href="#how" className="hover:text-primary transition-colors block">Methodology</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors block">Locations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label text-primary text-[11px] tracking-[0.3em] uppercase mb-10 font-bold">
              Assessments
            </h4>
            <ul className="space-y-6 font-sans font-light text-sm text-background-light/70 uppercase tracking-[0.15em]">
              <li><a href="#bmi" className="hover:text-primary transition-colors block">BMI Calculator</a></li>
              <li><a href="#consult" className="hover:text-primary transition-colors block">Online Consult</a></li>
              <li><a href="#team" className="hover:text-primary transition-colors block">Private Booking</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label text-primary text-[11px] tracking-[0.3em] uppercase mb-10 font-bold">
              Legal
            </h4>
            <ul className="space-y-6 font-sans font-light text-sm text-background-light/70 uppercase tracking-[0.15em]">
              <li><a href="#" className="hover:text-primary transition-colors block">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors block">Patient Terms</a></li>
              <li><a href="#" className="hover:text-primary transition-colors block">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary/10 mb-16" />

        {/* Disclaimer */}
        <div className="mb-20 text-center max-w-5xl mx-auto">
          <p className="font-sans text-[10px] md:text-[11px] italic text-background-light/30 leading-relaxed uppercase tracking-[0.3em] font-bold">
            {t('disclaimer')}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0 text-background-light/40 uppercase tracking-[0.3em] font-bold">
          <p className="font-sans text-[10px]">
            {t('copyright')}
          </p>

          {/* Payment Badges */}
          <div className="flex flex-wrap justify-center gap-6">
            {['iDEAL', 'Amex', 'Visa', 'Mastercard', 'STP'].map((method) => (
              <span key={method} className="font-label text-[10px] tracking-widest uppercase border border-background-light/5 px-4 py-1.5 rounded-full hover:border-primary/20 transition-all cursor-default">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
