'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function NewsletterSection() {
  const t = useTranslations('newsletter');

  return (
    <section className="py-32 bg-secondary text-background-light">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-background-light tracking-tighter mb-8"
        >
          {t('title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-sans font-light text-background-light/70 text-lg md:text-2xl max-w-2xl mx-auto mb-16"
        >
          {t('subtitle')}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col sm:flex-row items-end gap-6 mb-10">
            <div className="flex-grow border-b-2 border-primary/30 focus-within:border-primary pb-2 transition-colors">
              <input
                type="email"
                placeholder={t('placeholder')}
                className="w-full bg-transparent text-background-light font-display text-2xl md:text-3xl outline-none placeholder:text-background-light/20 py-2 italic font-light"
                required
              />
            </div>
            <button
              type="submit"
              className="px-12 py-5 bg-primary text-white font-label text-xs tracking-[0.2em] uppercase rounded-full hover:bg-white hover:text-secondary transition-all font-bold whitespace-nowrap shadow-xl"
            >
              {t('button')}
            </button>
          </div>

          <label className="flex items-center justify-center space-x-4 cursor-pointer group">
            <input
              type="checkbox"
              className="w-5 h-5 text-primary border-primary/30 rounded bg-transparent focus:ring-primary"
              required
            />
            <span className="font-sans font-light text-xs text-background-light/50 group-hover:text-background-light/80 transition-colors uppercase tracking-widest">
              {t('consent')}
            </span>
          </label>
        </motion.form>
      </div>
    </section>
  );
}
