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
    { name: t('team'), href: '#team' },
    { name: t('fillers'), href: '#fillers' },
    { name: t('botox'), href: '#botox' },
    { name: t('lifestyle'), href: '#lifestyle' },
    { name: t('contact'), href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full border-b ${isScrolled
          ? 'bg-background-light/95 backdrop-blur-md border-primary/10 shadow-sm py-2'
          : 'bg-transparent border-transparent py-4'
        }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">

          {/* Logo Section */}
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Sparkles size={20} />
            </div>
            <a href="/" className="font-label text-xl md:text-2xl text-secondary tracking-tight font-bold">
              FAB <span className="text-primary">CLINIC</span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-secondary/70 hover:text-primary transition-colors text-[13px] font-medium uppercase tracking-[0.1em]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions & Floating Consult */}
          <div className="hidden md:flex items-center space-x-8">
            <LanguageToggle />
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#consult"
              className="px-8 py-3 bg-primary text-white rounded-full font-label text-[12px] uppercase tracking-widest font-semibold shadow-[0_10px_30px_-10px_rgba(198,166,93,0.5)] hover:shadow-primary/40 transition-all"
            >
              {t('cta')}
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-secondary p-2"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
        className="lg:hidden overflow-hidden bg-background-light fixed inset-x-0 h-screen"
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-label text-secondary hover:text-primary tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#consult"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center px-10 py-5 bg-primary text-white rounded-full font-label text-sm uppercase tracking-widest transition-all"
          >
            {t('cta')}
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
