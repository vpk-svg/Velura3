'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Menu, X, Sparkles } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import Button from './ui/Button';
import { EASE_PREMIUM } from '@/lib/motion';

export default function Navbar() {
  const t = useTranslations('nav');
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  // Close mobile menu on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, mobileMenuOpen]);

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
      transition={{ duration: 0.8, ease: EASE_PREMIUM }}
      className={`fixed top-0 left-0 right-0 z-nav transition-all duration-500 w-full border-b ${isScrolled
        ? 'bg-background-light/95 backdrop-blur-md border-primary/10 shadow-soft-sm py-2'
        : 'bg-transparent border-transparent py-6'
        }`}
      role="banner"
    >
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <a href="/" className="flex items-center gap-4 group" aria-label="FAB CLINIC — Home">
            <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-white shadow-gold-glow group-hover:scale-110 transition-transform duration-300 ease-premium">
              <Sparkles size={22} />
            </div>
            <span className={`font-label text-2xl md:text-3xl tracking-tight font-bold transition-colors duration-500 ${isScrolled ? 'text-secondary' : 'text-background-light'}`}>
              FAB <span className={`${isScrolled ? 'text-primary-dark' : 'text-primary'} italic`}>CLINIC</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition-all duration-300 ease-premium text-[13px] font-bold uppercase tracking-[0.15em] hover:text-primary focus-visible:text-primary ${isScrolled ? 'text-secondary/80' : 'text-background-light'}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-8">
            <LanguageToggle isScrolled={isScrolled} />
            <Button href="#consult" size="sm" variant="primary">
              {t('cta')}
            </Button>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-6">
            <LanguageToggle isScrolled={isScrolled} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className={`p-2 transition-colors duration-300 ${isScrolled ? 'text-secondary' : 'text-background-light'}`}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.nav
        id="mobile-nav"
        initial={false}
        animate={{
          height: mobileMenuOpen ? '100vh' : 0,
          opacity: mobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        className="lg:hidden overflow-hidden bg-background-light fixed inset-x-0 h-screen shadow-soft-xl"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col items-center justify-center h-full gap-10 px-10 pb-32 overflow-y-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-label text-secondary hover:text-primary tracking-widest font-bold transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <Button
            href="#consult"
            size="lg"
            variant="primary"
            magnetic={false}
            className="w-full max-w-xs text-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('cta')}
          </Button>
        </div>
      </motion.nav>
    </motion.header>
  );
}
