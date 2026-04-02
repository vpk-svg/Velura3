'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import LogoSvg from './LogoSvg';
import LanguageToggle from './LanguageToggle';
import Container from './ui/Container';
import ConsultTrigger from './consult/ConsultTrigger';
import { usePathname } from '@/lib/navigation';
import { EASE_PREMIUM } from '@/lib/motion';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
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
    { name: t('team'), href: '/team' },
    { name: t('weightloss'), href: '/weightloss' },
    { name: locale === 'nl' ? 'Medicatie' : 'Medicine', href: '/medicatie' },
    { name: t('botox'), href: '/botox' },
    { name: t('fillers'), href: '/fillers' },
    { name: 'BBL', href: '/shape' },
    { name: locale === 'nl' ? 'Cursus' : 'Course', href: '/cursus' },
    { name: t('contact'), href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: EASE_PREMIUM }}
      className={`fixed top-0 left-0 right-0 z-nav transition-all duration-500 w-full border-b ${isScrolled
        ? 'bg-background-light/95 backdrop-blur-md border-primary/10 shadow-soft-sm py-2'
        : 'bg-background-light/80 backdrop-blur-sm border-transparent py-4'
        }`}
      role="banner"
    >
      <Container>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16">

          {/* Logo */}
          <a href="/" className="flex items-center group -ml-6" aria-label="FAB CLINIC - Home">
            <LogoSvg className="h-10 w-auto md:h-12 drop-shadow-[0_0_12px_rgba(198,166,93,0.25)] group-hover:drop-shadow-[0_0_18px_rgba(198,166,93,0.35)] transition-all duration-500" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative transition-all duration-300 ease-premium text-xs font-semibold uppercase tracking-[0.15em] hover:text-primary focus-visible:text-primary ${isActive ? 'text-primary' : 'text-secondary/80'}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-8 justify-end -mr-6 pl-10">
            <LanguageToggle isScrolled={isScrolled} />
            <ConsultTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-8 py-3 text-[10px] tracking-[0.2em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
              {t('cta')}
            </ConsultTrigger>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-6 justify-end col-start-3">
            <LanguageToggle isScrolled={isScrolled} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className={`p-2 transition-colors duration-300 text-secondary`}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </Container>

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
              className="text-2xl font-sans text-secondary hover:text-primary tracking-widest font-bold transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <div onClick={() => setMobileMenuOpen(false)}>
            <ConsultTrigger
              className="w-full max-w-xs inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]"
            >
              {t('cta')}
            </ConsultTrigger>
          </div>
        </div>
      </motion.nav>
    </motion.header>
  );
}
