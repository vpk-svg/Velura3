'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import BmiCalculator from './BmiCalculator';
import Card from './ui/Card';
import Container from './ui/Container';
import ConsultTrigger from './consult/ConsultTrigger';
import { EASE_PREMIUM } from '@/lib/motion';

export default function BblBmiDualRow() {
    const t_bbl = useTranslations('bbl');

    return (
        <section id="bbl" className="py-section-y bg-background-light overflow-hidden" aria-labelledby="bbl-heading">
            <Container>
                <h2 id="bbl-heading" className="sr-only">BBL &amp; BMI</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

                    {/* BBL Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: EASE_PREMIUM }}
                    >
                        <Card className="group flex flex-col h-full">
                            <figure className="relative aspect-[16/10] overflow-hidden bg-secondary/5">
                                <Image
                                    src="/images/bbl-example.png"
                                    alt="Liquid BBL Contouring Illustration"
                                    fill
                                    loading="lazy"
                                    className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-secondary/5 group-hover:bg-transparent transition-colors duration-700" />
                                <span className="absolute top-8 left-8 text-secondary/[0.07] font-display text-7xl pointer-events-none group-hover:opacity-40 transition-opacity italic select-none" aria-hidden="true">BBL</span>
                            </figure>
                            <div className="p-8 md:p-10 flex flex-col flex-grow">
                                <span className="font-sans text-primary-dark text-xs tracking-[0.2em] uppercase mb-6 block font-semibold">
                                    {t_bbl('label')}
                                </span>
                                <h3 className="font-display text-display-md text-secondary mb-8 italic leading-tight">
                                    {t_bbl('title1')} <span className="text-primary not-italic">{t_bbl('title2')}</span>
                                </h3>
                                <p className="font-sans font-light text-secondary/70 text-lg md:text-xl leading-relaxed mb-10 flex-grow">
                                    {t_bbl('desc')}
                                </p>
                                <ConsultTrigger from="bbl" className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-8 py-4 text-xs tracking-[0.2em] bg-secondary text-white shadow-soft-lg hover:bg-secondary/90 transition-all duration-300 active:scale-[0.97]">
                                    {t_bbl('cta')}
                                </ConsultTrigger>
                            </div>
                        </Card>
                    </motion.div>

                    {/* BMI Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.15, ease: EASE_PREMIUM }}
                    >
                        <Card hover={false} className="flex flex-col p-8 md:p-10 h-full">
                            <BmiCalculator isEmbed />
                        </Card>
                    </motion.div>

                </div>
            </Container>
        </section>
    );
}
