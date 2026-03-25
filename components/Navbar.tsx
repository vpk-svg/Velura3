'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const t = useTranslations('nav');
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navLinks = [
    { name: t('methods'), href: '#methods' },
    { name: t('shop'), href: '#shop' },
    { name: t('bmi'), href: '#bmi' },
    { name: t('about'), href: '#about' },
    { name: t('blog'), href: '#blog' },
  ];

  return (
    <motion.header
      className={`fixed left-4 right-4 md:left-8 md:right-8 z-50 transition-all duration-500 rounded-full border ${isScrolled ? 'top-4 bg-brand-teal-deep/80 backdrop-blur-xl border-brand-gold/30 shadow-lg' : 'top-6 bg-transparent border-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="font-label text-2xl text-brand-gold tracking-widest">
              VELURA
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-brand-ivory hover:text-brand-gold transition-colors text-sm font-medium focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none rounded-sm px-2 py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <LanguageToggle />
            <a
              href="#shop"
              className="px-6 py-2 rounded-full border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-teal-deep transition-colors font-label text-sm tracking-wider"
            >
              {t('cta')}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-gold p-2 focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none rounded-md"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-brand-teal-deep border-b border-brand-gold"
      >
        <div className="px-4 pt-2 pb-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-brand-ivory hover:text-brand-gold text-base font-medium"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 flex flex-col space-y-4">
            <LanguageToggle />
            <a
              href="#shop"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block text-center px-6 py-3 rounded-full border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-teal-deep transition-colors font-label text-sm tracking-wider"
            >
              {t('cta')}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
