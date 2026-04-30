'use client';

import { useState, useCallback } from 'react';
import { motion, type Variants } from 'motion/react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
    ShieldCheck,
    CircleDot,
    Diamond,
    Eye,
    Gem,
    FileSearch,
    ClipboardCheck,
    Package,
    Droplets,
    Heart,
    Feather,
    ArrowDown,
    Sparkles
} from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ConsultTrigger from '@/components/consult/ConsultTrigger';
import { SKINBOOSTERS_ZONES } from '@/lib/data/skinboosters-zones';
import { EASE_PREMIUM } from '@/lib/motion';
import TreatmentMapGrid from '@/components/treatments/TreatmentMapGrid';
import { type Locale } from '@/lib/clinic-data';

export default function SkinboostersPageClient() {
    const t = useTranslations('skinboosters_page');
    const locale = useLocale() as Locale;

    /* -- Zone info cards -- */
    const faceZones = [
        { title: t('zone1_title'), desc: t('zone1_desc'), icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} /> },
        { title: t('zone2_title'), desc: t('zone2_desc'), icon: <CircleDot className="w-6 h-6" strokeWidth={1.5} /> },
        { title: t('zone3_title'), desc: t('zone3_desc'), icon: <Gem className="w-6 h-6" strokeWidth={1.5} /> },
        { title: t('zone4_title'), desc: t('zone4_desc'), icon: <Eye className="w-6 h-6" strokeWidth={1.5} /> },
    ];

    const safetyItems = [
        t('safety_item1'),
        t('safety_item2'),
        t('safety_item3'),
        t('safety_item4'),
    ];

    const processSteps = [
        { num: '1', title: t('process_step1_title'), desc: t('process_step1_desc'), icon: <FileSearch className="w-8 h-8" strokeWidth={1.5} /> },
        { num: '2', title: t('process_step2_title'), desc: t('process_step2_desc'), icon: <ClipboardCheck className="w-8 h-8" strokeWidth={1.5} /> },
        { num: '3', title: t('process_step3_title'), desc: t('process_step3_desc'), icon: <Package className="w-8 h-8" strokeWidth={1.5} /> },
    ];

    const aftercareItems = [
        t('aftercare_item1'),
        t('aftercare_item2'),
        t('aftercare_item3'),
        t('aftercare_item4'),
    ];

    const philosophyItems = [
        { icon: <Droplets className="w-5 h-5" strokeWidth={1.5} />, text: 'Natuurlijke hydratatie' },
        { icon: <Heart className="w-5 h-5" strokeWidth={1.5} />, text: 'Eigen collageen stimulatie' },
        { icon: <Feather className="w-5 h-5" strokeWidth={1.5} />, text: 'Minimaal invasief' },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
    };

    return (
        <main>
            {/* ═══════════════════════════════════════════════
          HERO — Centralized, marble & bottles
        ═══════════════════════════════════════════════ */}
            <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#FAF8F4] text-center pt-24">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/skinbooster-hero.png"
                        alt="Skinbooster — luxe glazen flacons op marmer"
                        fill
                        priority
                        className="object-cover object-bottom opacity-40 mix-blend-multiply"
                        sizes="100vw"
                    />
                    {/* Fade at bottom/center so text stays readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F4] via-[#FAF8F4]/50 to-transparent" />
                </div>

                <Container>
                    <div className="relative z-10 max-w-3xl mx-auto py-24 pb-32">
                        <motion.span
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
                            className="block font-sans text-[#c2a36d] text-[10px] tracking-[0.35em] uppercase font-semibold mb-5"
                        >
                            Medische Esthetiek
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.06, ease: EASE_PREMIUM }}
                            className="font-display text-[clamp(2.8rem,6vw,5rem)] leading-[1.08] text-[#1a1a1a] mb-7 mx-auto drop-shadow-sm"
                        >
                            Onze<br />
                            <em className="text-[#c2a36d]">Skinbooster</em>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.12, ease: EASE_PREMIUM }}
                            className="font-sans font-light text-[#1a1a1a]/70 text-base md:text-lg leading-relaxed mb-10 mx-auto max-w-2xl"
                        >
                            Herstel de natuurlijke glans en elasticiteit van uw huid met onze geavanceerde hydratatie-technieken. Deze intensieve behandeling werkt diep in de huidlagen om vocht terug te herstellen, rimpels te verfijnen en de huid een directe lift te geven — voor een stralende, natuurlijke schoonheid van binnenuit.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.18, ease: EASE_PREMIUM }}
                        >
                            <ConsultTrigger className="inline-flex items-center justify-center rounded-full font-sans uppercase font-semibold px-10 py-4 text-[10px] tracking-[0.3em] bg-[#c2a36d] text-white hover:bg-[#a8894d] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                                Maak een afspraak
                            </ConsultTrigger>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* ═══════════════════════════════════════════════
          TAILORMADE CONCEPT — two-column, white bg
        ═══════════════════════════════════════════════ */}
            <section className="py-28 bg-white overflow-hidden">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Left: text */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
                        >
                            <span className="block font-sans text-[#c2a36d] text-[10px] tracking-[0.35em] uppercase font-semibold mb-5">
                                Maatwerk
                            </span>
                            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.12] text-[#1a1a1a] mb-7">
                                Tailormade Concept
                            </h2>
                            <p className="font-sans font-light text-[#1a1a1a]/65 text-[15px] leading-relaxed mb-8">
                                Bij FAB Clinic geloven we dat elke huid een uniek ecosysteem met eigen behoeften en uitdagingen heeft. Daarom leveren we een persoonlijke aanpak en kiezen wij voor harmonieuze en natuurlijk esthetisch resultaat. Door onze jarenlange expertise te combineren met een grondige analyse, stellen wij een behandelingsplan dat perfect aansluit bij uw specifieke wensen.
                            </p>
                            <blockquote className="border-l-2 border-[#c2a36d] pl-6">
                                <p className="font-display text-lg italic text-[#1a1a1a]/75 leading-relaxed">
                                    &ldquo;Bij FAB alles op maat.&rdquo;
                                </p>
                            </blockquote>
                        </motion.div>

                        {/* Right: tool image */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
                            className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl"
                        >
                            <Image
                                src="/images/skinbooster-tool.png"
                                alt="Medisch precisie-apparaat voor skinbooster behandeling"
                                fill
                                loading="lazy"
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* ═══════════════════════════════════════════════
          INNOVATION SPOTLIGHT — dark charcoal bg
        ═══════════════════════════════════════════════ */}
            <section className="py-28 bg-[#1a1a1a] overflow-hidden">
                <Container>
                    {/* Section label */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE_PREMIUM }}
                        className="text-center mb-16"
                    >
                        <span className="font-sans text-[#c2a36d] text-[10px] tracking-[0.45em] uppercase font-semibold">
                            Innovation Spotlight
                        </span>
                        <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-white mt-4 leading-[1.1]">
                            Focus op Polynucleotides
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
                        {/* Left: grey box */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
                            className="bg-white/[0.06] rounded-lg p-10 border border-white/10 h-full flex flex-col justify-center gap-6"
                        >
                            <div className="space-y-5">
                                <h3 className="font-display text-2xl italic text-white">
                                    Wat zijn het?
                                </h3>
                                <p className="font-sans font-light text-white/60 text-[15px] leading-relaxed">
                                    Polynucleotides zijn stukken enzymbehandeld DNA verkrijgbaar uit de natuurlijke RNA-fragmenten van DNA-werken dat op uw huid ingebracht wordt. Het blijkt bruikbaar te zijn elimineren, als herstelbod, niet alleen de aanmaak van collageen en elastaan, maar ook om een hele velerlei natuurlijke groeifactoren te stimuleren, wat leidt tot een stralend, fris resultaat dat uw huid verjongt met een scala aan uitstekende bio-regenererende eigenschappen.
                                </p>
                            </div>

                            <div className="h-px w-full bg-white/10 my-2" />

                            <div className="space-y-4">
                                <h4 className="font-sans text-[#c2a36d] text-[10px] tracking-[0.25em] uppercase font-semibold">
                                    Belangrijkste Voordelen
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        'Stimuleert natuurlijke celvernieuwing',
                                        'Herstelt elasticiteit en huidstructuur',
                                        'Diepe antioxidant werking en bescherming',
                                        'Langdurige hydratatie en ongekende glow'
                                    ].map((benefit, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="text-[#c2a36d] mt-1 text-sm">✦</span>
                                            <span className="font-sans font-light text-white/80 text-[14px] leading-relaxed">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Right: portrait with overlay text */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
                            className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl"
                        >
                            <Image
                                src="/images/skinbooster-portrait.png"
                                alt="Resultaat skinbooster — portret met stralende huid"
                                fill
                                loading="lazy"
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* Overlay text box */}
                            <div className="absolute bottom-6 left-6 right-6 bg-[#1a1a1a]/80 backdrop-blur-sm rounded-md p-5 border border-white/10">
                                <p className="font-sans text-white/90 text-sm leading-relaxed">
                                    <strong className="text-[#c2a36d] block font-semibold text-[10px] tracking-[0.25em] uppercase mb-1">De standaard lupger</strong>
                                    Polynucleotiden verklaart: Polynucleotiden voor élke ingrijpende verbetering van de huidtextuur met de lichte Line: liftend en (vet). Het is de basis oplossing voor wratp die u van meer t Prot die u als duidelijk verlening van uw slaapkamer, met echte huid als natuurlijk, voor stralende gloed gebiedt voor hanteertuner.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* ═══════════════════════════════════════════════
          FINAL CTA — white, centered
        ═══════════════════════════════════════════════ */}
            <section className="py-28 bg-white overflow-hidden">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASE_PREMIUM }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <span className="block font-sans text-[#c2a36d] text-[10px] tracking-[0.35em] uppercase font-semibold mb-5">
                            Uw behandeling
                        </span>
                        <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.12] text-[#1a1a1a] mb-7">
                            Klaar voor een stralende huid?
                        </h2>
                        <p className="font-sans font-light text-[#1a1a1a]/60 text-base leading-relaxed mb-10">
                            Boek een gratis consult en ontdek welke skinbooster bij u past. Onze artsen stellen een behandelplan op maat voor u samen.
                        </p>
                        <ConsultTrigger className="inline-flex items-center justify-center rounded-full font-sans uppercase font-semibold px-10 py-4 text-[10px] tracking-[0.3em] bg-[#c2a36d] text-white hover:bg-[#a8894d] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                            Boek uw consult
                        </ConsultTrigger>
                    </motion.div>
                </Container>
            </section>




        </main>
    );
}
