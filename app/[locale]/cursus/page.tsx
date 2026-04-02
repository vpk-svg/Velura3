'use client';

import { motion } from 'motion/react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Check, Award, Users, BookOpen, Shield } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import CourseDateCard from '@/components/course/CourseDateCard';
import { getCourseDates, type Locale } from '@/lib/clinic-data';
import { EASE_PREMIUM } from '@/lib/motion';

export default function CursusPage() {
  const locale = useLocale() as Locale;
  const dates = getCourseDates(locale);

  const highlights = locale === 'nl'
    ? [
        { icon: Shield, text: 'BIG-focus: alleen voor artsen en artsen in opleiding' },
        { icon: BookOpen, text: 'Gezichtsanatomie + veiligheidszones + noodprotocol' },
        { icon: Users, text: 'Live demonstraties + supervised hands-on oefening' },
        { icon: Award, text: 'Direct inzetbaar behandelplan voor praktijkgroei' },
      ]
    : [
        { icon: Shield, text: 'Doctor-first focus: physicians and physician trainees only' },
        { icon: BookOpen, text: 'Facial anatomy + safety zones + emergency protocol' },
        { icon: Users, text: 'Live demonstrations + supervised hands-on practice' },
        { icon: Award, text: 'Immediately applicable treatment framework for clinic growth' },
      ];

  return (
    <>
      {/* ═══════ VIBRANT HERO ═══════ */}
      <section className="relative w-full pt-40 pb-24 bg-gradient-to-br from-secondary via-secondary to-burgundy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/treatments/botox-hero.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            aria-hidden="true"
          />
        </div>
        <Container>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_PREMIUM }}
                className="inline-block rounded-pill bg-primary/20 text-primary font-sans text-xs tracking-[0.3em] uppercase px-4 py-2 mb-6 font-semibold"
              >
                {locale === 'nl' ? 'Cursus Injectables' : 'Injectables Course'}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05, ease: EASE_PREMIUM }}
                className="font-display text-display-xl text-background-light mb-6"
              >
                {locale === 'nl' ? 'Injectables cursus voor ' : 'Injectables course for '}
                <span className="italic font-light text-primary">{locale === 'nl' ? 'BIG-geregistreerde artsen' : 'licensed doctors'}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
                className="font-sans font-light text-background-light/70 text-lg max-w-xl mb-8"
              >
                {locale === 'nl'
                  ? 'Hands-on traject met anatomie, veiligheid, complicatiemanagement en premium injectietechniek in kleine groepen.'
                  : 'Hands-on track with anatomy, safety, complication management, and premium injection technique in small groups.'}
              </motion.p>
              <motion.a
                href="#aanmelden"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
                className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-10 py-4 text-xs tracking-[0.2em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300"
              >
                {locale === 'nl' ? 'Direct aanmelden' : 'Register now'}
              </motion.a>
            </div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_PREMIUM }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft-xl hidden lg:block"
            >
              <Image
                src="/images/treatments/fillers-hero.jpg"
                alt={locale === 'nl' ? 'Cursus injectables bij FabClinic' : 'Injectables course at FabClinic'}
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ═══════ HIGHLIGHTS ═══════ */}
      <section className="py-section-y bg-page-cursus">
        <Container>
          <SectionHeader
            label={locale === 'nl' ? 'Overzicht' : 'Overview'}
            title={locale === 'nl' ? 'Waarom deze cursus?' : 'Why this course?'}
            subtitle={
              locale === 'nl'
                ? 'Sterke focus op artsen die veilig en esthetisch verfijnd willen werken met evidence-based protocollen.'
                : 'Strong focus on doctors who want to work safely and aesthetically with evidence-based protocols.'
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-16">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, ease: EASE_PREMIUM }}
                  className="rounded-2xl border border-primary/10 bg-white p-5 flex items-start gap-4 shadow-soft-sm"
                >
                  <span className="w-10 h-10 rounded-full bg-champagne flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary" />
                  </span>
                  <p className="font-sans text-secondary/80 leading-relaxed">{item.text}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Course Dates */}
          <SectionHeader
            label={locale === 'nl' ? 'DATA' : 'DATES'}
            title={locale === 'nl' ? 'Beschikbare data' : 'Available dates'}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {dates.map((item) => (
              <CourseDateCard key={item.id} locale={locale} item={item} />
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════ SIGNUP + PRICING ═══════ */}
      <section id="aanmelden" className="py-section-y bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Registration Form */}
            <form className="rounded-2xl border border-primary/15 bg-background-light p-8 shadow-soft-sm space-y-4">
              <h3 className="font-display text-3xl italic text-secondary mb-2">
                {locale === 'nl' ? 'Aanmelden' : 'Register'}
              </h3>
              <p className="font-sans text-secondary/60 text-sm mb-4">
                {locale === 'nl' ? 'Vul onderstaand formulier in om uw plek te reserveren.' : 'Fill in the form below to reserve your spot.'}
              </p>

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Volledige naam' : 'Full name'}
              </label>
              <input className="w-full rounded-2xl border border-secondary/20 bg-white px-4 py-3 text-sm outline-none focus:border-primary" placeholder={locale === 'nl' ? 'Volledige naam' : 'Full name'} />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Leeftijd' : 'Age'}
              </label>
              <input className="w-full rounded-2xl border border-secondary/20 bg-white px-4 py-3 text-sm outline-none focus:border-primary" placeholder={locale === 'nl' ? 'Leeftijd' : 'Age'} />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Opleiding' : 'Education'}
              </label>
              <input className="w-full rounded-2xl border border-secondary/20 bg-white px-4 py-3 text-sm outline-none focus:border-primary" placeholder={locale === 'nl' ? 'Opleiding' : 'Education'} />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Diploma' : 'Diploma'}
              </label>
              <input className="w-full rounded-2xl border border-secondary/20 bg-white px-4 py-3 text-sm outline-none focus:border-primary" placeholder={locale === 'nl' ? 'Diploma' : 'Diploma'} />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Adres' : 'Address'}
              </label>
              <input className="w-full rounded-2xl border border-secondary/20 bg-white px-4 py-3 text-sm outline-none focus:border-primary" placeholder={locale === 'nl' ? 'Adres' : 'Address'} />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Telefoon' : 'Phone'}
              </label>
              <input className="w-full rounded-2xl border border-secondary/20 bg-white px-4 py-3 text-sm outline-none focus:border-primary" placeholder={locale === 'nl' ? 'Telefoon' : 'Phone'} />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">E-mail</label>
              <input type="email" className="w-full rounded-2xl border border-secondary/20 bg-white px-4 py-3 text-sm outline-none focus:border-primary" placeholder="E-mail" />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Kies een datum' : 'Choose a date'}
              </label>
              <select className="w-full rounded-2xl border border-secondary/20 bg-white px-4 py-3 text-sm outline-none focus:border-primary">
                <option value="">{locale === 'nl' ? 'Kies een datum' : 'Choose a date'}</option>
                {dates.map((item) => (
                  <option key={item.id} value={item.id}>{item.dateLabel}</option>
                ))}
              </select>

              <label className="flex items-start gap-3 text-sm text-secondary/75">
                <input type="checkbox" className="mt-1 w-5 h-5 accent-primary" />
                <span>
                  {locale === 'nl'
                    ? 'Ik ga akkoord met de algemene voorwaarden.'
                    : 'I agree with the terms and conditions.'}
                </span>
              </label>

              <button
                type="button"
                className="w-full inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-10 py-4 text-xs tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300"
              >
                {locale === 'nl' ? 'Reserveer cursusplek' : 'Reserve your seat'}
              </button>
            </form>

            {/* Pricing Card */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl bg-gradient-to-br from-secondary to-burgundy p-8 text-background-light shadow-soft-xl flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-sans text-xs uppercase tracking-[0.25em] text-primary mb-2 block">
                    {locale === 'nl' ? 'Investering' : 'Investment'}
                  </span>
                  <p className="font-display text-6xl text-background-light mb-3">€2500</p>
                  <p className="font-sans text-background-light/60 mb-8">{locale === 'nl' ? 'incl. btw' : 'incl. VAT'}</p>

                  <div className="space-y-3">
                    {(locale === 'nl'
                      ? ['Volledige cursusdag', 'Officieel certificaat', 'Lunch & materialen', '14 dagen online nazorg']
                      : ['Full training day', 'Official certificate', 'Lunch & materials', '14 days online post-course support']
                    ).map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <Check size={16} className="text-primary shrink-0" />
                        <span className="font-sans text-background-light/80 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Course photo */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-soft-lg">
                <Image
                  src="/images/treatments/botox-hero.jpg"
                  alt={locale === 'nl' ? 'Cursusomgeving' : 'Course environment'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
