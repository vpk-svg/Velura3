'use client';

import { useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import CourseDateCard from '@/components/course/CourseDateCard';
import { getCourseDates, type Locale } from '@/lib/clinic-data';

export default function CursusPage() {
  const locale = useLocale() as Locale;
  const dates = getCourseDates(locale);

  return (
    <>
      <section className="relative w-full pt-40 pb-section-y bg-secondary overflow-hidden">
        <Container>
          <p className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-6 block font-semibold">
            {locale === 'nl' ? 'Cursus' : 'Course'}
          </p>
          <h1 className="font-display text-display-xl text-background-light mb-8">
            {locale === 'nl' ? 'Injectables cursus voor ' : 'Injectables course for '}
            <span className="italic font-light text-primary">{locale === 'nl' ? 'BIG-geregistreerde artsen' : 'licensed doctors'}</span>
          </h1>
          <p className="font-sans font-light text-background-light/70 text-lg max-w-3xl">
            {locale === 'nl'
              ? 'Hands-on traject met anatomie, veiligheid, complicatiemanagement en premium injectietechniek in kleine groepen.'
              : 'Hands-on track with anatomy, safety, complication management, and premium injection technique in small groups.'}
          </p>
        </Container>
      </section>

      <section className="py-section-y bg-background-light">
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

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {(locale === 'nl'
              ? [
                  'BIG-focus: alleen voor artsen en artsen in opleiding',
                  'Gezichtsanatomie + veiligheidszones + noodprotocol',
                  'Live demonstraties + supervised hands-on oefening',
                  'Direct inzetbaar behandelplan voor praktijkgroei',
                ]
              : [
                  'Doctor-first focus: physicians and physician trainees only',
                  'Facial anatomy + safety zones + emergency protocol',
                  'Live demonstrations + supervised hands-on practice',
                  'Immediately applicable treatment framework for clinic growth',
                ]
            ).map((point) => (
              <li key={point} className="rounded-2xl border border-primary/10 bg-white p-4 font-sans text-secondary/80">
                {point}
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {dates.map((item) => (
              <CourseDateCard key={item.id} locale={locale} item={item} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <form className="rounded-md border border-primary/15 bg-white p-8 shadow-soft-sm space-y-4">
              <h3 className="font-display text-3xl italic text-secondary">
                {locale === 'nl' ? 'Aanmelden' : 'Register'}
              </h3>

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Volledige naam' : 'Full name'}
              </label>
              <input className="w-full rounded-2xl border border-secondary/20 px-4 py-3 text-sm" placeholder={locale === 'nl' ? 'Volledige naam' : 'Full name'} />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Leeftijd' : 'Age'}
              </label>
              <input className="w-full rounded-2xl border border-secondary/20 px-4 py-3 text-sm" placeholder={locale === 'nl' ? 'Leeftijd' : 'Age'} />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Opleiding' : 'Education'}
              </label>
              <input className="w-full rounded-2xl border border-secondary/20 px-4 py-3 text-sm" placeholder={locale === 'nl' ? 'Opleiding' : 'Education'} />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Diploma' : 'Diploma'}
              </label>
              <input className="w-full rounded-2xl border border-secondary/20 px-4 py-3 text-sm" placeholder={locale === 'nl' ? 'Diploma' : 'Diploma'} />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Adres' : 'Address'}
              </label>
              <input className="w-full rounded-2xl border border-secondary/20 px-4 py-3 text-sm" placeholder={locale === 'nl' ? 'Adres' : 'Address'} />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Telefoon' : 'Phone'}
              </label>
              <input className="w-full rounded-2xl border border-secondary/20 px-4 py-3 text-sm" placeholder={locale === 'nl' ? 'Telefoon' : 'Phone'} />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">E-mail</label>
              <input type="email" className="w-full rounded-2xl border border-secondary/20 px-4 py-3 text-sm" placeholder="E-mail" />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Kies een datum' : 'Choose a date'}
              </label>
              <select className="w-full rounded-2xl border border-secondary/20 px-4 py-3 text-sm">
                <option value="">{locale === 'nl' ? 'Kies een datum' : 'Choose a date'}</option>
                {dates.map((item) => (
                  <option key={item.id} value={item.id}>{item.dateLabel}</option>
                ))}
              </select>

              <label className="flex items-start gap-3 text-sm text-secondary/75">
                <input type="checkbox" className="mt-1" />
                <span>
                  {locale === 'nl'
                    ? 'Ik ga akkoord met de algemene voorwaarden.'
                    : 'I agree with the terms and conditions.'}
                </span>
              </label>
            </form>

            <div className="rounded-md border border-primary/20 bg-primary/10 p-8 flex flex-col justify-between">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-primary mb-2">
                  {locale === 'nl' ? 'Investering' : 'Investment'}
                </p>
                <p className="font-display text-5xl text-secondary mb-3">€2500</p>
                <p className="font-sans text-secondary/70 mb-6">{locale === 'nl' ? 'incl. btw' : 'incl. VAT'}</p>
                <p className="font-sans text-secondary/80 leading-relaxed">
                  {locale === 'nl'
                    ? 'Inclusief cursusdag, certificaat, lunch, materialen en 14 dagen online nazorg voor casusvragen.'
                    : 'Includes training day, certificate, lunch, materials, and 14 days of online post-course case support.'}
                </p>
              </div>

              <button className="mt-8 inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-10 py-4 text-xs tracking-[0.25em] bg-primary text-white shadow-gold-glow">
                {locale === 'nl' ? 'Reserveer cursusplek' : 'Reserve your seat'}
              </button>
            </div>
          </div>
         </Container>
       </section>
     </>
   );
 }
