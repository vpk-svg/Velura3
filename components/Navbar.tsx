'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Menu, X, Sparkles } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const t = useTranslations('nav');
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('contact'), href: '#contact' },
    { name: t('team'), href: '#team' },
    { name: t('weightloss'), href: '#bmi' },
    { name: t('botox'), href: '#botox' },
    { name: t('bbl'), href: '#bbl' },
    { name: t('lifestyle'), href: '#lifestyle' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full border-b ${isScrolled
        ? 'bg-background-light/95 backdrop-blur-md border-primary/20 shadow-sm py-2'
        : 'bg-transparent border-transparent py-6'
        }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">

          {/* Logo Section */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Sparkles size={24} />
            </div>
            <a href="/" className={`font-label text-2xl md:text-3xl tracking-tight font-bold transition-colors duration-500 ${isScrolled ? 'text-secondary' : 'text-background-light'
              }`}>
              FAB <span className={`${isScrolled ? 'text-brand-gold-dark' : 'text-primary'} italic`}>CLINIC</span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition-colors duration-500 text-[13px] font-bold uppercase tracking-[0.15em] hover:text-primary ${isScrolled ? 'text-secondary/80' : 'text-background-light'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions & Floating Consult */}
          <div className="hidden md:flex items-center space-x-10">
            <LanguageToggle isScrolled={isScrolled} />
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#consult"
              className="px-8 py-3 bg-primary text-white rounded-full font-label text-[12px] uppercase tracking-[0.2em] font-bold shadow-[0_15px_45px_-10px_rgba(198,166,93,0.5)] hover:shadow-primary/40 transition-all"
            >
              {t('cta')}
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-6">
            <LanguageToggle isScrolled={isScrolled} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors duration-500 ${isScrolled ? 'text-secondary' : 'text-background-light'
                }`}
            >
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? '100vh' : 0,
          opacity: mobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="lg:hidden overflow-hidden bg-background-light fixed inset-x-0 h-screen shadow-2xl"
      >
        <div className="flex flex-col items-center justify-center h-full space-y-12 px-10 pb-32 overflow-y-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-label text-secondary hover:text-primary tracking-widest font-bold"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#consult"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full max-w-sm text-center px-10 py-6 bg-primary text-white rounded-full font-label text-sm uppercase tracking-[0.3em] transition-all shadow-2xl font-bold"
          >
            {t('cta')}
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
