'use client';

import { useId } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Container from './ui/Container';
import Button from './ui/Button';

export default function NewsletterSection() {
  const t = useTranslations('newsletter');
  const emailId = useId();
  const consentId = useId();

  return (
    <section className="py-section-y bg-primary-dark text-background-light" aria-label="Newsletter signup">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-display-lg text-background-light tracking-tighter mb-6"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans font-light text-background-light/70 text-lg md:text-xl max-w-2xl mx-auto mb-12"
          >
            {t('subtitle')}
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter subscription"
          >
            <div className="flex flex-col sm:flex-row items-end gap-5 mb-8">
              <div className="flex-grow border-b-2 border-primary/30 focus-within:border-primary pb-2 transition-colors">
                <label htmlFor={emailId} className="sr-only">{t('placeholder')}</label>
                <input
                  id={emailId}
                  type="email"
                  placeholder={t('placeholder')}
                  className="w-full bg-transparent text-background-light font-display text-xl md:text-2xl outline-none placeholder:text-background-light/20 py-2 italic font-light"
                  required
                  autoComplete="email"
                />
              </div>
              <button
                type="submit"
                className="px-10 py-4 bg-primary text-ivory font-sans text-xs tracking-[0.2em] uppercase rounded-pill hover:bg-background-light hover:text-primary-dark transition-all duration-300 ease-premium font-light whitespace-nowrap shadow-warm-glow focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                {t('button')}
              </button>
            </div>

            <label htmlFor={consentId} className="flex items-center justify-center space-x-3 cursor-pointer group">
              <input
                id={consentId}
                type="checkbox"
                className="w-5 h-5 text-primary border-primary/30 rounded bg-transparent focus:ring-primary"
                required
              />
              {t('consent')}
            </label>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
