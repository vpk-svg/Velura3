'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function BlogPreview() {
  const t = useTranslations('blog');

  const articles = [
    {
      tag: t('b1_tag'),
      title: t('b1_title'),
      excerpt: t('b1_excerpt'),
      date: '12 Okt 2025',
    },
    {
      tag: t('b2_tag'),
      title: t('b2_title'),
      excerpt: t('b2_excerpt'),
      date: '05 Okt 2025',
    },
    {
      tag: t('b3_tag'),
      title: t('b3_title'),
      excerpt: t('b3_excerpt'),
      date: '28 Sep 2025',
    },
  ];

  return (
    <section id="blog" className="py-24 bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-teal-deep italic font-light">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-brand-charcoal/5 flex flex-col group"
            >
              <div className="h-48 bg-gradient-to-br from-brand-teal-light to-brand-teal-deep relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iI2ZmZiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay"></div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="font-label text-brand-gold text-[10px] tracking-widest uppercase mb-4 block">
                  {article.tag}
                </span>
                <h3 className="font-display text-2xl text-brand-teal-deep font-semibold mb-3 leading-snug group-hover:text-brand-teal-light transition-colors">
                  {article.title}
                </h3>
                <p className="font-sans font-light text-brand-charcoal/60 text-sm leading-relaxed mb-6 flex-grow">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-charcoal/10">
                  <span className="font-sans text-xs text-brand-charcoal/40">{article.date}</span>
                  <a href="#" className="font-label text-brand-gold text-xs tracking-widest hover:text-brand-gold-light transition-colors">
                    {t('read_more')}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
