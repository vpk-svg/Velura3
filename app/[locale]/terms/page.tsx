'use client';

import { motion } from 'motion/react';
import Container from '@/components/ui/Container';
import { EASE_PREMIUM } from '@/lib/motion';

const articles = [
  {
    number: 1,
    title: 'Begrippen',
    items: [
      '**Golden Palm Europe B.V. / FAB Clinic**: Golden Palm Europe B.V., handelend onder de naam FAB Clinic. Hieronder vallen tevens de werkzame gecertificeerde medici en ingehuurde derden.',
      '**Opdrachtgever**: De natuurlijke persoon die niet handelt in de uitoefening van beroep of bedrijf.',
      '**Cliënt**: de Opdrachtgever die een behandelingsovereenkomst aangaat.',
      '**Dienstverlener**: Golden Palm Europe B.V. / FAB Clinic.',
      '**Aanbod**: ieder schriftelijk aanbod tot het verrichten van behandelingen.',
      '**Behandelingen**: filler-, botox- en huidverbeteringsbehandelingen.',
      '**Opdracht**: de uitvoering van de behandelovereenkomst.',
      '**Overeenkomst**: de overeenkomst tot behandeling.',
      '**Website**: https://www.fabclinic.eu',
    ],
  },
  {
    number: 2,
    title: 'Toepasselijkheid',
    items: [
      'Deze algemene voorwaarden zijn van toepassing op elk aanbod, overeenkomst en dienstverlening.',
      'Afwijkingen zijn uitsluitend geldig indien schriftelijk overeengekomen.',
    ],
  },
  {
    number: 3,
    title: 'Het aanbod',
    items: [
      'Alle aanbiedingen zijn vrijblijvend tenzij anders vermeld.',
      'Kennelijke fouten binden FAB Clinic niet.',
    ],
  },
  {
    number: 4,
    title: 'Totstandkoming overeenkomst',
    items: [
      'De overeenkomst komt tot stand bij opdracht tot behandeling.',
      'Cliënt moet 18 jaar of ouder zijn, volledig geïnformeerd zijn en formulieren naar waarheid invullen.',
    ],
  },
  {
    number: 5,
    title: 'Uitvoering',
    items: [
      'FAB Clinic voert de overeenkomst zorgvuldig uit.',
      'Er is sprake van een inspanningsverplichting.',
    ],
  },
  {
    number: 6,
    title: 'Wijzigingen',
    items: [
      'Meerwerk wordt doorberekend indien van toepassing.',
    ],
  },
  {
    number: 7,
    title: 'Nakoming',
    items: [
      'FAB Clinic kan de behandeling opschorten bij niet-betaling of onvoldoende medewerking van de cliënt.',
    ],
  },
  {
    number: 8,
    title: 'Annulering',
    items: [
      'Annulering binnen 48 uur voor de afspraak wordt in rekening gebracht.',
    ],
  },
  {
    number: 9,
    title: 'Verplichtingen FAB Clinic',
    items: [
      'FAB Clinic handelt conform medische standaarden.',
    ],
  },
  {
    number: 10,
    title: 'Verplichtingen cliënt',
    items: [
      'Cliënt is verplicht juiste en volledige informatie te verstrekken.',
    ],
  },
  {
    number: 11,
    title: 'Prijzen en betaling',
    items: [
      'Betaling geschiedt direct per pin tenzij anders overeengekomen.',
    ],
  },
  {
    number: 12,
    title: 'Incasso',
    items: [
      'Bij niet-betaling worden wettelijke rente en incassokosten in rekening gebracht.',
    ],
  },
  {
    number: 13,
    title: 'Privacy',
    items: [
      'Persoonsgegevens worden verwerkt conform de geldende privacywetgeving (AVG/GDPR).',
    ],
  },
  {
    number: 14,
    title: 'Aansprakelijkheid',
    items: [
      'Aansprakelijkheid van FAB Clinic is beperkt tot het factuurbedrag van de betreffende behandeling.',
    ],
  },
  {
    number: 15,
    title: 'Overmacht',
    items: [
      'FAB Clinic is niet aansprakelijk bij overmacht. In geval van overmacht worden verplichtingen opgeschort.',
    ],
  },
  {
    number: 16,
    title: 'Klachten',
    items: [
      'Klachten dienen binnen 2 weken na de behandeling schriftelijk gemeld te worden via service@fabclinic.eu.',
    ],
  },
  {
    number: 17,
    title: 'Toepasselijk recht',
    items: [
      'Op alle overeenkomsten is Nederlands recht van toepassing.',
      'Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement van de vestigingsplaats van FAB Clinic.',
    ],
  },
];

function renderText(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold text-background-light">{part}</strong> : part
  );
}

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full pt-40 pb-section-y overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/80" />
        <Container>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-6 block font-semibold"
            >
              JURIDISCH · FAB CLINIC
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease: EASE_PREMIUM }}
              className="font-display text-display-xl text-background-light mb-6"
            >
              Algemene <span className="italic font-light text-primary">Voorwaarden</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
              className="font-sans font-light text-background-light/70 text-lg leading-relaxed"
            >
              Golden Palm Europe B.V., handelend onder de naam FAB Clinic — KvK 70926468 — Achterdoelen 63, Ede
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-section-y bg-page-faq">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              className="mb-16 p-8 rounded-2xl border border-primary/10 bg-secondary/40"
            >
              <p className="font-sans font-light text-background-light/70 text-sm leading-relaxed mb-3">
                <span className="text-primary font-semibold">Contactgegevens</span>
              </p>
              <p className="font-sans font-light text-background-light/60 text-sm leading-loose">
                Golden Palm Europe B.V. · FAB Clinic<br />
                Achterdoelen 63, Ede<br />
                KvK: 70926468<br />
                Website:{' '}
                <a href="https://www.fabclinic.eu" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  www.fabclinic.eu
                </a><br />
                E-mail: <a href="mailto:leads@fabclinic.eu" className="text-primary hover:underline">leads@fabclinic.eu</a>{' '}
                · <a href="mailto:service@fabclinic.eu" className="text-primary hover:underline">service@fabclinic.eu</a>
              </p>
            </motion.div>

            {/* Articles */}
            <div className="space-y-10">
              {articles.map((article, idx) => (
                <motion.div
                  key={article.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.02, ease: EASE_PREMIUM }}
                >
                  <div className="flex items-start gap-5">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-sans text-primary text-xs font-bold tracking-wider">
                      {article.number}
                    </span>
                    <div className="flex-1 pt-2">
                      <h2 className="font-display text-xl text-background-light mb-3 font-semibold">
                        Artikel {article.number} — {article.title}
                      </h2>
                      <ul className="space-y-2">
                        {article.items.map((item, i) => (
                          <li key={i} className="font-sans font-light text-background-light/65 text-sm leading-relaxed flex gap-3">
                            <span className="text-primary/40 mt-1 flex-shrink-0">—</span>
                            <span>{renderText(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {idx < articles.length - 1 && (
                    <div className="mt-10 h-px bg-primary/8 ml-15" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Footer note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              className="mt-16 text-center font-sans text-xs text-background-light/30 uppercase tracking-[0.25em] font-semibold"
            >
              Einde algemene voorwaarden — FAB Clinic © {new Date().getFullYear()}
            </motion.p>
          </div>
        </Container>
      </section>
    </>
  );
}
