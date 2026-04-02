'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Instagram, Facebook, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import NewsletterSection from '@/components/NewsletterSection';
import {
  getClinicContactInfo,
  type Locale,
} from '@/lib/clinic-data';

const TEAM_MEMBERS = [
  { nameKey: 'member1_name', roleKey: 'member1_role', bigKey: 'member1_big', img: '/images/Newteam/Athina Barza.jpg' },
  { nameKey: 'member2_name', roleKey: 'member2_role', bigKey: 'member2_big', img: '/images/Newteam/Ava.jpg' },
  { nameKey: 'member3_name', roleKey: 'member3_role', bigKey: 'member3_big', img: '/images/Newteam/Elissa.jpg' },
  { nameKey: 'member4_name', roleKey: 'member4_role', bigKey: 'member4_big', img: '/images/Newteam/Ryan.jpg' },
  { nameKey: 'member5_name', roleKey: 'member5_role', bigKey: 'member5_big', img: '/images/Newteam/Mevlut.jpg' },
  { nameKey: 'member6_name', roleKey: 'member6_role', bigKey: 'member6_big', img: '/images/Newteam/Fleur.jpg' },
];

export default function ContactPage() {
  const locale = useLocale() as Locale;
  const contact = getClinicContactInfo(locale);
  const t = useTranslations('team');

  return (
    <>
      <div className="pt-32" />

      {/* ═══════ TOP: Intake Form + Practitioners side-by-side ═══════ */}
      <section className="py-section-y bg-page-contact">
        <Container>
          <SectionHeader
            label={locale === 'nl' ? 'CONTACT FABCLINIC EDE' : 'CONTACT FABCLINIC EDE'}
            title={locale === 'nl' ? 'Premium intake en direct contact' : 'Premium intake and direct contact'}
            subtitle={
              locale === 'nl'
                ? 'Plan uw behandeling of intake op zaterdag in onze EDE-locatie.'
                : 'Plan your treatment or intake on Saturdays at our EDE location.'
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Intake Form */}
            <form className="rounded-2xl border border-primary/15 bg-white p-8 shadow-soft-sm space-y-4">
              <h3 className="font-display text-3xl italic text-secondary mb-2">
                {locale === 'nl' ? 'Intakeformulier' : 'Intake form'}
              </h3>

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Behandeling' : 'Treatment'}
              </label>
              <select className="w-full rounded-2xl border border-secondary/20 px-4 py-3 text-sm outline-none focus:border-primary">
                <option value="fillers">Fillers</option>
                <option value="botox">Botox</option>
                <option value="bbl">BBL</option>
                <option value="anders">Anders</option>
              </select>

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Naam' : 'Name'}
              </label>
              <input
                className="w-full rounded-2xl border border-secondary/20 px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder={locale === 'nl' ? 'Naam' : 'Name'}
              />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">E-mail</label>
              <input
                type="email"
                className="w-full rounded-2xl border border-secondary/20 px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder="E-mail"
              />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Geboortedatum' : 'Date of birth'}
              </label>
              <input
                type="date"
                className="w-full rounded-2xl border border-secondary/20 px-4 py-3 text-sm outline-none focus:border-primary"
              />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Telefoon' : 'Phone'}
              </label>
              <input
                className="w-full rounded-2xl border border-secondary/20 px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder={locale === 'nl' ? 'Telefoon' : 'Phone'}
              />

              <label className="block font-sans text-xs uppercase tracking-[0.2em] text-primary">
                {locale === 'nl' ? 'Omschrijving' : 'Description'}
              </label>
              <textarea
                className="w-full min-h-28 rounded-2xl border border-secondary/20 px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder={locale === 'nl' ? 'Omschrijving' : 'Description'}
              />

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-8 py-4 text-xs tracking-[0.2em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300"
              >
                {locale === 'nl' ? 'Verstuur intake' : 'Submit intake'}
              </button>
            </form>

            {/* Practitioners - real team members */}
            <div className="rounded-2xl border border-primary/15 bg-white p-8 shadow-soft-sm overflow-y-auto max-h-[680px]">
              <h3 className="font-display text-3xl italic text-secondary mb-5">
                {locale === 'nl' ? 'Ons team' : 'Our team'}
              </h3>
              <div className="space-y-4">
                {TEAM_MEMBERS.map((member) => {
                  const name = t(member.nameKey as Parameters<typeof t>[0]);
                  const role = t(member.roleKey as Parameters<typeof t>[0]);
                  const big = t(member.bigKey as Parameters<typeof t>[0]);
                  return (
                    <article key={member.nameKey} className="rounded-2xl border border-primary/10 p-4 flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={member.img}
                          alt={name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <h4 className="font-display text-lg italic text-secondary leading-snug">{name}</h4>
                        <p className="font-sans text-sm text-secondary/70">{role}</p>
                        {big && <p className="font-sans text-xs text-primary/70 mt-0.5">{big}</p>}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════ BOTTOM: FabClinic EDE – Clinic Info + Map ═══════ */}
      <section className="py-section-y bg-white">
        <Container>
          <SectionHeader
            label="FABCLINIC EDE"
            title={locale === 'nl' ? 'Bezoek onze kliniek' : 'Visit our clinic'}
            subtitle={
              locale === 'nl'
                ? 'Centraal gelegen in Ede, op loopafstand van het station.'
                : 'Centrally located in Ede, walking distance from the train station.'
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-primary/15 bg-background-light p-8 shadow-soft-sm">
              <h2 className="font-display text-3xl italic text-secondary mb-6">{contact.clinicName}</h2>
              <dl className="space-y-5 font-sans text-secondary/75">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-primary mb-1">{locale === 'nl' ? 'Adres' : 'Address'}</dt>
                    <dd>{contact.address}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-primary mb-1">Email</dt>
                    <dd>
                      <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-primary mb-1">{locale === 'nl' ? 'Telefoon' : 'Phone'}</dt>
                    <dd>{contact.phone}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-primary mb-1">{locale === 'nl' ? 'Openingstijd' : 'Opening hours'}</dt>
                    <dd>{contact.openingHours}</dd>
                  </div>
                </div>
              </dl>

              {/* Social media icons */}
              <div className="flex gap-3 mt-6">
                <a href="https://www.instagram.com/fabclinic.nl" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-secondary/50 hover:text-primary hover:border-primary transition-all duration-300">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/fabclinic" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-secondary/50 hover:text-primary hover:border-primary transition-all duration-300">
                  <Facebook size={18} />
                </a>
              </div>

              <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 p-5">
                <p className="font-display italic text-2xl text-secondary mb-2">
                  {locale === 'nl'
                    ? 'Snelle intake, artsgericht behandelplan, 14 dagen controle inbegrepen.'
                    : 'Fast intake, physician-led treatment plan, 14-day follow-up included.'}
                </p>
                <p className="font-sans text-secondary/70 text-sm">
                  {locale === 'nl'
                    ? 'Voor injectables en medisch gewichtsverlies werken wij uitsluitend met afspraak op zaterdag tussen 10:00 en 18:00.'
                    : 'For injectables and medical weight loss, appointments are available Saturdays between 10:00 and 18:00 only.'}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/15 overflow-hidden bg-white shadow-soft-sm min-h-[480px]">
              <iframe
                title="FabClinic EDE map"
                src={contact.mapsEmbedUrl}
                className="w-full h-full min-h-[480px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </section>

      <NewsletterSection />
    </>
  );
}
