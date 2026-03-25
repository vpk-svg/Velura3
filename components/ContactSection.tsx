'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';

export default function ContactSection() {
    const t = useTranslations('contact');

    const contactItems = [
        { icon: <Mail className="text-primary" />, title: t('email'), desc: 'info@fabclinic.be', href: 'mailto:info@fabclinic.be' },
        { icon: <Phone className="text-primary" />, title: t('phone'), desc: '+32 400 000 000', href: 'tel:+32400000000' },
        { icon: <MapPin className="text-primary" />, title: t('visit'), desc: t('address'), href: '#' },
        { icon: <Instagram className="text-primary" />, title: t('follow'), desc: '@fabclinic', href: '#' }
    ];

    return (
        <section id="contact" className="py-32 bg-secondary text-background-light overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">

                    {/* Left Side: Contact Info */}
                    <div className="flex-1 w-full text-left order-2 lg:order-1">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-label text-primary text-xs tracking-[0.5em] uppercase mb-6 block font-bold"
                        >
                            {t('label')}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-6xl md:text-8xl lg:text-[10rem] text-background-light tracking-tighter mb-16"
                        >
                            {t('title')} <span className="italic font-light text-primary">{t('subtitle')}</span>
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                            {contactItems.map((item, idx) => (
                                <motion.a
                                    key={item.title}
                                    href={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="group flex items-start gap-6 p-10 rounded-[40px] border border-white/5 hover:border-primary/20 transition-all hover:bg-white/5 shadow-sm hover:shadow-2xl"
                                >
                                    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-primary transition-all duration-500 text-white">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-3 font-bold">{item.title}</h4>
                                        <p className="font-sans text-xl text-background-light/80 group-hover:text-background-light transition-colors">{item.desc}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        <MagneticWrapper>
                            <a
                                href="#consult"
                                className="inline-flex px-14 py-7 bg-primary text-white rounded-full font-label text-xs uppercase tracking-[0.4em] font-bold shadow-2xl hover:shadow-primary/40 transition-all active:scale-95"
                            >
                                {t('cta')}
                            </a>
                        </MagneticWrapper>
                    </div>

                    {/* Right Side: Visual Accent */}
                    <div className="flex-1 relative w-full h-[600px] lg:h-[900px] rounded-[100px] overflow-hidden order-1 lg:order-2 group">
                        <motion.div
                            initial={{ scale: 1.2, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                            className="h-full w-full"
                        >
                            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-secondary to-transparent z-10" />
                            <img
                                src="/images/cta-atmos.png"
                                alt="Contact FAB Clinic"
                                className="h-full w-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
