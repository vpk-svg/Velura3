'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import Image from 'next/image';
import Container from './ui/Container';
import Button from './ui/Button';
import { EASE_PREMIUM } from '@/lib/motion';

export default function ContactSection() {
    const t = useTranslations('contact');

    const contactItems = [
        { icon: <Mail className="text-primary" />, title: t('email'), desc: 'info@fabclinic.be', href: 'mailto:info@fabclinic.be' },
        { icon: <Phone className="text-primary" />, title: t('phone'), desc: '+32 400 000 000', href: 'tel:+32400000000' },
        { icon: <MapPin className="text-primary" />, title: t('visit'), desc: t('address'), href: '#' },
        { icon: <Instagram className="text-primary" />, title: t('follow'), desc: '@fabclinic', href: '#' }
    ];

    return (
        <section id="contact" className="py-section-y bg-secondary text-background-light overflow-hidden">
            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Side: Contact Info */}
                    <div className="flex-1 w-full text-left order-2 lg:order-1">
                        <motion.span
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-label text-primary text-xs tracking-[0.5em] uppercase mb-5 block font-bold"
                        >
                            {t('label')}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-display-xl text-background-light tracking-tighter mb-12"
                        >
                            {t('title')} <span className="italic font-light text-primary">{t('subtitle')}</span>
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {contactItems.map((item, idx) => (
                                <motion.a
                                    key={item.title}
                                    href={item.href}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.15 + idx * 0.08, ease: EASE_PREMIUM }}
                                    className="group flex items-start gap-5 p-8 rounded-panel border border-white/5 hover:border-primary/20 transition-all duration-300 ease-premium hover:bg-white/5 shadow-soft-sm hover:shadow-soft-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                                >
                                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary transition-colors duration-300 text-white" aria-hidden="true">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-2 font-bold">{item.title}</h4>
                                        <p className="font-sans text-lg text-background-light/80 group-hover:text-background-light transition-colors">{item.desc}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        <Button href="#consult" variant="primary" size="lg" magnetic>
                            {t('cta')}
                        </Button>
                    </div>

                    {/* Right Side: Visual Accent */}
                    <div className="flex-1 relative w-full h-[500px] lg:h-[800px] rounded-panel overflow-hidden order-1 lg:order-2 group">
                        <motion.div
                            initial={{ scale: 1.15, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: EASE_PREMIUM }}
                            className="h-full w-full relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-secondary to-transparent z-10" aria-hidden="true" />
                            <Image
                                src="/images/cta-atmos.png"
                                alt="Contact FAB Clinic"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                loading="lazy"
                                className="object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            />
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
