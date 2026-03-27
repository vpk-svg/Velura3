'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Card from './ui/Card';
import Button from './ui/Button';
import Container from './ui/Container';
import { EASE_PREMIUM } from '@/lib/motion';

export default function TreatmentsDualRow() {
    const t = useTranslations('treatments');

    return (
        <section id="botox" className="py-section-y bg-background-light overflow-hidden" aria-labelledby="treatments-heading">
            <Container>
                <h2 id="treatments-heading" className="sr-only">Treatments</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

                    {/* Botox Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: EASE_PREMIUM }}
                    >
                        <Card className="group flex flex-col h-full">
                            <figure className="relative aspect-[16/10] overflow-hidden bg-secondary/5">
                                <Image
                                    src="/images/treatments/botox.jpg"
                                    alt="Clinical Botox Procedure Example"
                                    fill
                                    loading="lazy"
                                    className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-secondary/5 group-hover:bg-transparent transition-colors duration-700" />
                                <span className="absolute top-8 left-8 text-secondary/[0.07] font-display text-8xl pointer-events-none group-hover:opacity-40 transition-opacity italic select-none" aria-hidden="true">01</span>
                            </figure>
                            <div className="p-8 md:p-10 flex flex-col flex-grow">
                                <span className="font-sans text-primary-dark text-xs tracking-[0.2em] uppercase mb-6 block font-semibold">
                                    {t('botox_title')}
                                </span>
                                <h3 className="font-display text-display-md text-secondary mb-8 italic">
                                    {t('botox_subtitle')}
                                </h3>
                                <p className="font-sans font-light text-secondary/70 text-lg md:text-xl leading-relaxed mb-10 flex-grow">
                                    {t('botox_desc')}
                                </p>
                                <Button href="#consult" variant="primary" size="md">
                                    {t('botox_cta')}
                                </Button>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Fillers Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.15, ease: EASE_PREMIUM }}
                    >
                        <Card className="group flex flex-col h-full">
                            <figure className="relative aspect-[16/10] overflow-hidden bg-secondary/5">
                                <Image
                                    src="/images/treatments/fillers.jpg"
                                    alt="Dermal Filler Lip Enhancement Result"
                                    fill
                                    loading="lazy"
                                    className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-secondary/5 group-hover:bg-transparent transition-colors duration-700" />
                                <span className="absolute top-8 right-8 text-secondary/[0.07] font-display text-8xl pointer-events-none group-hover:opacity-40 transition-opacity italic select-none" aria-hidden="true">02</span>
                            </figure>
                            <div className="p-8 md:p-10 flex flex-col flex-grow">
                                <span className="font-sans text-primary-dark text-xs tracking-[0.2em] uppercase mb-6 block font-semibold">
                                    {t('fillers_title')}
                                </span>
                                <h3 className="font-display text-display-md text-secondary mb-8 italic">
                                    {t('fillers_subtitle')}
                                </h3>
                                <p className="font-sans font-light text-secondary/70 text-lg md:text-xl leading-relaxed mb-10 flex-grow">
                                    {t('fillers_desc')}
                                </p>
                                <Button href="#consult" variant="secondary" size="md">
                                    {t('fillers_cta')}
                                </Button>
                            </div>
                        </Card>
                    </motion.div>

                </div>
            </Container>
        </section>
    );
}
