'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import LogoSvg from './LogoSvg';
import LanguageToggle from './LanguageToggle';
import Container from './ui/Container';
import ConsultTrigger from './consult/ConsultTrigger';
import { Link, usePathname } from '@/lib/navigation';
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
    { name: 'Skinboosters', href: '/skinboosters' },
    { name: locale === 'nl' ? 'Cursus' : 'Course', href: '/cursus' },
    { name: t('contact'), href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: EASE_PREMIUM }}
      className={`fixed top-0 left-0 right-0 z-nav transition-all duration-700 w-full border-b ${isScrolled
        ? 'glass-heavy border-primary/10 shadow-soft-sm py-1'
        : 'bg-transparent border-transparent py-4'
        }`}
    >
      <Container>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center group -ml-4" aria-label="FAB CLINIC - Home">
            <LogoSvg className="h-9 w-auto md:h-11 transition-all duration-700 group-hover:scale-105" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-12" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative transition-all duration-500 ease-premium text-[10px] font-light uppercase tracking-[0.2em] hover:text-primary focus-visible:text-primary ${isActive ? 'text-primary' : 'text-primary/60'}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-10 justify-end -mr-4 pl-10">
            <LanguageToggle isScrolled={isScrolled} />
            <ConsultTrigger className="btn-primary">
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
              className={`p-2 transition-colors duration-300 text-primary hover:text-primary/70`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
        transition={{ duration: 0.8, ease: EASE_PREMIUM }}
        className="lg:hidden overflow-hidden glass-heavy fixed inset-x-0 h-screen"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col items-center justify-center h-full gap-12 px-10 pb-32">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-display italic text-primary/70 hover:text-primary tracking-[0.15em] transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
          <div onClick={() => setMobileMenuOpen(false)} className="w-full max-w-xs mt-4">
            <ConsultTrigger
              className="btn-primary w-full"
            >
              {t('cta')}
            </ConsultTrigger>
          </div>
        </div>
      </motion.nav>
    </motion.header>
  );
}
