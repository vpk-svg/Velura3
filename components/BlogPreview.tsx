'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function BlogPreview() {
  const t = useTranslations('blog');

  const articles = [
    {
      tag: t('b1_tag'),
      title: t('b1_title'),
      excerpt: t('b1_excerpt'),
      date: '12 OCT 2025',
      img: '/images/hero-atmos.png'
    },
    {
      tag: t('b2_tag'),
      title: t('b2_title'),
      excerpt: t('b2_excerpt'),
      date: '05 OCT 2025',
      img: '/images/cta-atmos.png'
    },
    {
      tag: t('b3_tag'),
      title: t('b3_title'),
      excerpt: t('b3_excerpt'),
      date: '28 SEP 2025',
      img: '/images/hero-atmos.png'
    },
  ];

  return (
    <section id="blog" className="py-20 md:py-32 bg-background-light">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-label text-primary text-xs tracking-[0.5em] uppercase mb-6 block font-bold"
            >
              Medical Journal
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-8xl text-secondary tracking-tighter"
            >
              {t('title')}
            </motion.h2>
          </div>
          <a href="#" className="font-label text-secondary hover:text-primary transition-colors text-xs tracking-widest uppercase font-bold border-b border-secondary/20 pb-2">
            View All Articles
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] bg-secondary/5 rounded-[48px] overflow-hidden mb-10 border border-secondary/5 ring-1 ring-secondary/5 group-hover:ring-primary/20 transition-all duration-500">
                <Image
                  src={article.img}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute top-8 left-8">
                  <span className="px-5 py-2 bg-white/90 backdrop-blur-md rounded-full font-label text-[10px] tracking-[0.2em] text-secondary uppercase font-bold shadow-xl">
                    {article.tag}
                  </span>
                </div>
              </div>

              <div className="p-10 md:p-12 flex flex-col flex-grow">
                <span className="font-sans text-[11px] text-primary tracking-widest uppercase mb-6 font-bold opacity-60">
                  {article.date}
                </span>
                <h3 className="font-display text-3xl text-secondary mb-6 leading-[1.2] group-hover:text-primary transition-colors italic font-bold">
                  {article.title}
                </h3>
                <p className="font-sans font-light text-secondary/70 text-lg leading-relaxed mb-10 flex-grow">
                  {article.excerpt}
                </p>
                <div className="pt-8 border-t border-secondary/5 mt-auto">
                  <a href="#" className="inline-flex items-center font-label text-primary text-xs tracking-[0.3em] uppercase font-bold group/link">
                    Read Article <span className="ml-4 transition-transform duration-500 group-hover/link:translate-x-3">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
