'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function NewsletterSection() {
  const t = useTranslations('newsletter');

  return (
    <section className="py-24 bg-brand-charcoal text-brand-ivory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-ivory font-light mb-6"
        >
          {t('title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans font-light text-brand-ivory/70 text-lg max-w-2xl mx-auto mb-12"
        >
          {t('subtitle')}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="w-full border-b border-brand-gold pb-2">
              <input
                type="email"
                aria-label="Email address"
                placeholder={t('placeholder')}
                className="w-full bg-transparent text-brand-ivory font-sans text-lg outline-none placeholder:text-brand-ivory/30 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-brand-gold text-brand-teal-deep font-label text-xs tracking-widest uppercase rounded-full hover:bg-brand-gold-light transition-colors whitespace-nowrap"
            >
              {t('button')}
            </button>
          </div>

          <label className="flex items-center justify-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-brand-gold border-brand-gold/30 rounded focus:ring-brand-gold bg-transparent"
              required
            />
            <span className="font-sans font-light text-[11px] text-brand-ivory/60">
              {t('consent')}
            </span>
          </label>
        </motion.form>
      </div>
    </section>
  );
}
