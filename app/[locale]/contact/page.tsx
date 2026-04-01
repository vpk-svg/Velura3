'use client';

import { useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import NewsletterSection from '@/components/NewsletterSection';
import {
  getClinicContactInfo,
  getPractitionerPlaceholders,
  type Locale,
} from '@/lib/clinic-data';

export default function ContactPage() {
  const locale = useLocale() as Locale;
  const contact = getClinicContactInfo(locale);
  const practitioners = getPractitionerPlaceholders(locale);

  return (
    <>
      <div className="pt-32" />

      <section className="py-section-y bg-background-light">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="rounded-md border border-primary/15 bg-white p-8 shadow-soft-sm">
              <h2 className="font-display text-3xl italic text-secondary mb-6">{contact.clinicName}</h2>
              <dl className="space-y-4 font-sans text-secondary/75">
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-primary mb-1">{locale === 'nl' ? 'Adres' : 'Address'}</dt>
                  <dd>{contact.address}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-primary mb-1">Email</dt>
                  <dd>
                    <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
                      {contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-primary mb-1">{locale === 'nl' ? 'Telefoon' : 'Phone'}</dt>
                  <dd>{contact.phone}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-primary mb-1">{locale === 'nl' ? 'Openingstijd' : 'Opening hours'}</dt>
                  <dd>{contact.openingHours}</dd>
                </div>
              </dl>

              <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 p-5">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-primary mb-2">
                  {locale === 'nl' ? 'Premium callout' : 'Premium callout'}
                </p>
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

            <div className="rounded-md border border-primary/15 overflow-hidden bg-white shadow-soft-sm min-h-[420px]">
              <iframe
                title="FabClinic EDE map"
                src={contact.mapsEmbedUrl}
                className="w-full h-full min-h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <form className="rounded-md border border-primary/15 bg-white p-8 shadow-soft-sm space-y-4">
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

            <div className="rounded-md border border-primary/15 bg-white p-8 shadow-soft-sm">
              <h3 className="font-display text-3xl italic text-secondary mb-5">
                {locale === 'nl' ? 'Behandelaren' : 'Practitioners'}
              </h3>
              <div className="space-y-4">
                {practitioners.map((person, index) => (
                  <article key={person.title} className="rounded-2xl border border-primary/10 p-4 flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center font-display text-xl text-primary">
                      {`P${index + 1}`}
                    </div>
                    <div>
                      <h4 className="font-display text-xl italic text-secondary">{person.title}</h4>
                      <p className="font-sans text-sm text-secondary/75">{person.subtitle}</p>
                      <p className="font-sans text-xs text-primary mt-1">{person.todoLabel}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <NewsletterSection />
    </>
  );
}
