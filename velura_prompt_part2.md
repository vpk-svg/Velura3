# VELURA — Google AI Studio Prompt (Part 2)
> Paste this into the **main chat / User message field** in Google AI Studio.
> Pair with the System Instructions (Part 1) in the System field.
> Model: **Gemini 2.5 Pro** · Output tokens: **Maximum**

---

Bouw de volledige VELURA website — een premium medisch gewichtsverlies platform
powered by Wellis (getwellis.com). De site is standaard in het Nederlands met een
NL/EN taalschakelaar rechtsboven in de navigatie.

---

## MERKIDENTITEIT

- **Merknaam:** VELURA
- **Slogan:** "Jouw Lichaam. Getransformeerd. Medisch Verantwoord."
- **Powered by:** Wellis Pharmacy B.V. — BIG- en EU-geregistreerde apotheek
- **Doelgroep:** Nederlandstalige volwassenen 25–60 jaar die medisch begeleide gewichtsafname zoeken via GLP-1 injectie, voeding, beweging of supplementen.

---

## BESTANDSSTRUCTUUR (genereer alle bestanden volledig)

```
/
├── tailwind.config.ts
├── next.config.ts
├── middleware.ts
├── messages/
│   ├── nl.json
│   └── en.json
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── LanguageToggle.tsx
│   ├── HeroSection.tsx
│   ├── TrustPillars.tsx
│   ├── MethodsTabs.tsx
│   ├── ProductShop.tsx
│   ├── BmiCalculator.tsx
│   ├── HowItWorks.tsx
│   ├── Testimonials.tsx
│   ├── BlogPreview.tsx
│   ├── CtaBanner.tsx
│   ├── NewsletterSection.tsx
│   ├── Footer.tsx
│   └── ParticleCanvas.tsx
└── lib/
    └── i18n.ts
```

---

## COMPONENT 1 — NAVBAR (Navbar.tsx)

- Fixed, full-width, z-50
- Standaard: transparant. Na 80px scrollen: brand-teal-deep achtergrond + 1px gouden onderrand. Overgang via Framer Motion layoutEffect + scroll listener.
- Links: "VELURA" (Cinzel, goud, links)
- Navigatie midden: Methoden | Behandelingen | BMI Calculator | Over Ons | Blog — elk een smooth scroll anchor naar secties via id
- Rechts: LanguageToggle component + "Begin Jouw Reis" pill-knop (gouden rand, transparant, hover: goud gevuld)
- Mobiel: hamburger icoon (Lucide Menu/X), Framer Motion height-animatie uitklap-menu

---

## COMPONENT 2 — LANGUAGE TOGGLE (LanguageToggle.tsx)

- Pill-vormige schakelaar: "NL | EN"
- Actieve taal: brand-teal-deep achtergrond, witte tekst
- Inactieve taal: transparant, goudkleurige tekst
- Gebruikt next-intl useRouter + usePathname voor locale-wissel zonder reload
- Cinzel lettertype, 10px, letter-spacing 0.2em

---

## COMPONENT 3 — HERO SECTIE (HeroSection.tsx)

- Volledige viewport hoogte (h-screen)
- Achtergrond: gelaagde CSS radiale gradiënten:
  `radial-gradient(ellipse at 15% 60%, #0D4A47, transparent 55%),`
  `radial-gradient(ellipse at 85% 20%, #1A7A72, transparent 50%),`
  `#0A2E2E basis`
- ParticleCanvas component (canvas, 70 goudkleurige deeltjes, requestAnimationFrame)
- Gecentreerde content met Framer Motion staggered entry (elk element +0.2s vertraging):
  - Cinzel label (goud): "MEDISCH BEGELEID · KLINISCH BEWEZEN"
  - H1 regel 1 (wit): "Herwin Jouw Lichaam"
  - H1 regel 2 (goud, Cormorant italic): "Met Precisiewetenschap"
  - Subtekst (Jost 300, ivory): "GLP-1 behandelingen, voedingscoaching en bewegingsprogramma's — volledig online, volledig gepersonaliseerd, discreet thuis bezorgd."
- Twee CTA-knoppen:
  - Primair: "Bekijk Behandelingen" — brand-gold achtergrond, brand-teal-deep tekst
  - Secundair: "Bereken Mijn BMI" — ghost wit, smooth scroll naar `#bmi`
- Marquee strip (brand-teal-mid): `"GRATIS VERZENDING · BIG-GEREGISTREERDE ARTSEN · OZEMPIC · MOUNJARO · WEGOVY · SAXENDA · GEEN HUISARTSBEZOEK NODIG · DISCREET BEZORGD ·"` — Framer Motion marquee (x: 0 → -50%, repeat: Infinity, linear)

---

## COMPONENT 4 — VERTROUWENSPIJLERS (TrustPillars.tsx)

- Achtergrond: brand-ivory
- 4-koloms grid (2-col mobiel)
- Framer Motion staggerChildren fade-up bij scroll (useInView)
- Elke pijler: Lucide SVG icoon (goud) + Cinzel label + Jost beschrijving

| Icoon | Label | Beschrijving |
|-------|-------|-------------|
| 🩺 | Erkende Artsen | Alle recepten uitgeschreven door BIG- en EU-geregistreerde artsen |
| 🚚 | Discrete Bezorging | Snel, gratis en in neutrale verpakking aan huis bezorgd |
| 🔬 | Klinisch Bewezen | FDA- en EMA-goedgekeurde GLP-1 behandelingen met aantoonbaar resultaat |
| ♾ | Blijvende Begeleiding | Onbeperkt contact met medische professionals gedurende je traject |

---

## COMPONENT 5 — METHODEN TABS (MethodsTabs.tsx)

- Achtergrond: brand-teal-deep
- Header: Cormorant italic goud: "Elk Pad Naar Transformatie"
- useState voor actief tabblad, Framer Motion AnimatePresence voor content-wissel
- 5 tabbladen als pill-knoppen; actief: goud gevuld

### Tab 1 — GLP-1 Injecties (standaard actief)
**Titel:** Receptplichtige Injecties
**Tekst:** GLP-1 receptoragonisten zoals Ozempic, Mounjaro, Wegovy en Saxenda bootsen een natuurlijk darmhormoon na dat eetlust en bloedsuiker reguleert. Klinische studies tonen gemiddeld 15–22% gewichtsreductie aan over 68 weken.
**Bullets:** Significant minder eetlust · Vertraagde maaglediging · Verbeterde insulinegevoeligheid · Recept binnen 24 uur
**CTA:** "Bekijk GLP-1 Behandelingen →"

### Tab 2 — Slimme Voeding
**Titel:** Precisie Voedingsplannen
**Tekst:** Wetenschappelijk onderbouwde voedingsprotocollen — calorisch tekort, macro-balans, intermittent fasting en metabole reset-programma's, ontworpen door geregistreerde diëtisten op basis van jouw lichaamssamenstelling.
**Bullets:** Gepersonaliseerde macro-doelen · Anti-inflammatoire maaltijdplannen · Intermittent fasting protocollen · Darmgezondheid optimalisatie

### Tab 3 — Bewegingsprogramma's
**Titel:** Expert Fitnessprogramma's
**Tekst:** Gestructureerde trainingsprogramma's die krachttraining (bewezen spierbehoud tijdens calorisch tekort), HIIT voor metabole boost en low-impact cardio combineren voor duurzaam vetverlies.
**Bullets:** Progressieve krachtschemata · Zone 2 cardioplannen · HIIT vetverbrandingsprotocollen · Wekelijkse gewoontetracking

### Tab 4 — Supplementen & Pillen
**Titel:** Medisch Gecertificeerde Supplementen
**Tekst:** Klinisch onderzochte ondersteuningssupplementen waaronder metabolismeboosters, eetlustregulerende capsules en micronutriëntenstacks die je primaire behandeling aanvullen.
**Bullets:** Thermogene formules · Glucomannan & vezelcomplex · Vitamine D3 + K2 voor metabole gezondheid · Omega-3 anti-inflammatoire stack

### Tab 5 — Gedragscoaching
**Titel:** Mindset & Gedragsverandering
**Tekst:** Cognitief-gedragstherapeutische kaders om emotioneel eetpatroon te doorbreken, duurzame gewoonten op te bouwen en je relatie met voeding en beweging structureel te verbeteren.
**Bullets:** CGT-gebaseerde eetgewoonteprotocollen · Stress- & cortisolmanagement · Slaapoptimalisatie voor gewichtsverlies · Wekelijkse accountability check-ins

---

## COMPONENT 6 — PRODUCTSHOP (ProductShop.tsx)

- Achtergrond: brand-ivory
- Header: Cormorant italic brand-teal-deep: "De Behandelcollectie"
- Subheader: Cinzel goud: "AANGEDREVEN DOOR WELLIS · EU-ERKENDE APOTHEEK"
- Filterknoppenbalk: ALLES | GLP-1 INJECTIES | SUPPLEMENTEN | PROGRAMMA'S (useState, Framer Motion AnimatePresence)

### Kaartontwerp
- Wit, rounded-xl, subtiele schaduw
- Bovenste visuele zone (aspect-[3/4]): unieke CSS gradient art per product (geen `<img>` tags) + goudkleurig "Rx" of "SUPPLEMENT" badge (Cinzel, top-left)
- Productnaam: Cormorant 600, brand-teal-deep
- Type tag: Cinzel 10px, brand-teal-light
- Beschrijving: Jost 300, 14px
- Sterren: 5 gouden sterren (Lucide Star, fill goud) + aantal reviews
- Prijs: Cormorant 400, brand-gold, 24px + "/ maand" Jost 12px
- CTA: "Start Behandeling →" — volledige breedte, brand-teal-deep, wit tekst; hover: brand-gold achtergrond (Framer Motion whileHover)
- Kaart hover: y(-10px) + gouden glow box-shadow (Framer Motion whileHover)

### Producten

| Product | Type | Beschrijving | Prijs | Rating | Link |
|---------|------|-------------|-------|--------|------|
| **Ozempic** (semaglutide) | GLP-1 Wekelijkse Injectie | Éénmaal per week semaglutide-injectie. Klinisch bewezen tot 15% gewichtsreductie over 68 weken. | Vanaf €199/maand | 4.9 ★ (2.847) | https://www.getwellis.com/products/ozempic |
| **Mounjaro** (tirzepatide) | GLP-1/GIP Dubbele Agonist | De krachtigste injectie op de markt. Dubbel mechanisme targetst zowel GLP-1 als GIP receptoren. | Vanaf €299/maand | 4.8 ★ (1.203) | https://www.getwellis.com/products/mounjaro |
| **Wegovy** (semaglutide 2.4mg) | GLP-1 Wekelijkse Injectie | Hogere dosering semaglutide, specifiek goedgekeurd voor chronisch gewichtsbeheer. Gemiddeld 17,4% gewichtsverlies. | Vanaf €249/maand | 4.8 ★ (1.892) | https://www.getwellis.com/products/wegovy |
| **Saxenda** (liraglutide) | GLP-1 Dagelijkse Injectie | Dagelijkse liraglutide-injectie. Meer dan 10 jaar klinische gebruiks- en veiligheidsdata. | Vanaf €179/maand | 4.7 ★ (3.411) | https://www.getwellis.com/products/saxenda |

---

## COMPONENT 7 — BMI CALCULATOR (BmiCalculator.tsx) — id="bmi"

- Achtergrond: brand-teal-deep
- Header: Cormorant italic wit: "Ken Jouw Startpunt"
- Sub: Jost 300 ivory: "Bereken je Body Mass Index en ontdek welk behandelpad het beste bij jou past."
- React Hook Form + zod validatie voor alle velden
- Gecentreerde kaart (max-width 600px), brand-teal-mid achtergrond, gouden rand

### Eenheid Toggle
"Metrisch (kg/cm)" | "Imperiaal (lbs/ft)" — useState; juiste invoervelden tonen per modus

### Metrische Invoer
- Lengte (cm), Gewicht (kg), Leeftijd — gouden onderrand focus
- Geslacht: "Man" / "Vrouw" radio-pill knoppen

### Imperiale Invoer
- Lengte: voeten + inches (twee velden naast elkaar)
- Gewicht (lbs), Leeftijd, Geslacht: zelfde

### Bereken Knop
- Volledige breedte, goud naar goud-light gradiënt, brand-teal-deep tekst
- Cinzel label: "BEREKEN MIJN BMI"
- Framer Motion whileHover shimmer sweep

### Resultaten Paneel (Framer Motion AnimatePresence)

**Kleurgecodeerde schaalstaaf:**

| Categorie | BMI | Kleur |
|-----------|-----|-------|
| Ondergewicht | < 18.5 | Blauw |
| Gezond Gewicht | 18.5–24.9 | Groen (success) |
| Overgewicht | 25–29.9 | Amber |
| Obesitas Klasse I | 30–34.9 | Oranje |
| Obesitas Klasse II | ≥ 35 | Rood |

**Gepersonaliseerd advies (dynamisch op basis van BMI):**

- **BMI < 25:** "Je gewicht valt binnen een gezond bereik. Onze Voedings- en Bewegingsprogramma's helpen je om je lichaamssamenstelling te optimaliseren." → CTA: "Bekijk Programma's"
- **BMI 25–29.9:** "Je valt in het overgewicht bereik. Ons klinische team adviseert een combinatie van een gestructureerd voedingsplan en gerichte suppletie." → CTA: "Bekijk Supplementen"
- **BMI 30–34.9:** "Je komt in aanmerking voor GLP-1 behandeling op recept. Ozempic en Saxenda zijn klinisch bewezen effectief voor jouw BMI-klasse." → CTA: "Start Ozempic Consultatie" → https://www.getwellis.com/products/ozempic
- **BMI ≥ 35:** "Je komt in aanmerking voor onze meest geavanceerde behandelingen. Mounjaro en Wegovy tonen uitzonderlijke resultaten op jouw BMI-niveau." → CTA: "Start Mounjaro Consultatie" → https://www.getwellis.com/products/mounjaro

> *BMI is een screeningsinstrument en geen medische diagnose. Raadpleeg altijd een erkende arts voordat u met een medische behandeling begint.*

---

## COMPONENT 8 — HOE HET WERKT (HowItWorks.tsx)

- Achtergrond: brand-ivory
- Header: Cormorant italic brand-teal-deep: "Van Consultatie tot Transformatie"
- 4-stappen horizontale tijdlijn (verticaal op mobiel), goudkleurige stippellijn, Framer Motion stagger bij scroll

| Stap | Titel | Beschrijving |
|------|-------|-------------|
| 01 | Vertel Ons Over Je Gezondheid | Vul onze korte gezondheidsvragenlijst in. Duurt minder dan 5 minuten. |
| 02 | Gratis Medische Consultatie | Een BIG-geregistreerde arts beoordeelt je antwoorden en belt je terug binnen 24 uur. |
| 03 | Ontvang Je Behandeling Thuis | Je medicatie wordt uitgeschreven en discreet aan huis bezorgd via onze partnerapotheek. |
| 04 | Voortdurende Medische Ondersteuning | Onbeperkt contact met ons klinische team gedurende je volledige traject. |

**Statistieken balk:** 50.000+ patiënten behandeld | 4,8★ Trustpilot gemiddelde | 24 uur gemiddelde consultatie

---

## COMPONENT 9 — GETUIGENISSEN (Testimonials.tsx)

- Achtergrond: `linear-gradient(150deg, brand-teal-deep, brand-teal-mid)`
- Header: Cormorant italic goud: "Wat Onze Patiënten Zeggen"
- 3-koloms kaartgrid (1-col mobiel), ivory achtergrond, rounded-xl, 4px gouden linkerrand
- Framer Motion staggerChildren bij scroll

| Citaat | Naam | Behandeling |
|--------|------|------------|
| "Ik ben 18 kg afgevallen in 5 maanden met Mounjaro. Het online proces verliep vlekkeloos — geen ongemakkelijk huisartsbezoek." | Sarah K., Amsterdam | Mounjaro |
| "Ozempic gecombineerd met de voedingscoaching heeft mijn relatie met eten volledig veranderd. Mijn zelfvertrouwen is terug." | Marco T., Rotterdam | Ozempic + Voedingscoaching |
| "Ik heb 10 jaar elk dieet geprobeerd. Na 4 maanden Wegovy ben ik 14 kg afgevallen en voel ik me eindelijk weer mezelf." | Lena B., Utrecht | Wegovy |

---

## COMPONENT 10 — BLOGPREVIEW (BlogPreview.tsx)

- Achtergrond: brand-ivory
- Header: Cormorant italic brand-teal-deep: "Uit Het Kenniscentrum"
- 3-koloms artikelkaarten: teal gradient header blok + Cinzel tag + Cormorant titel + datum + Jost uittreksel + "Lees meer →" gouden link

| Artikel | Tag |
|---------|-----|
| Ozempic vs Mounjaro: Welk GLP-1 is Geschikt voor Jou? | MEDISCH ADVIES |
| De Wetenschap van Duurzaam Gewichtsverlies: Waarom Crashdiëten Altijd Mislukken | VOEDING |
| Hoe Combineer Je Beweging en GLP-1 Therapie voor Maximaal Resultaat? | FITNESS |

---

## COMPONENT 11 — CTA BANNER (CtaBanner.tsx)

- Achtergrond: brand-gold met CSS SVG noise grain overlay
- Cormorant 300 brand-teal-deep: "Jouw Transformatie Begint Vandaag"
- Knoppen: "Start Gratis Consultatie" (brand-teal-deep, wit tekst) + "Bereken Mijn BMI" (ghost teal rand)
- Framer Motion geanimeerde shimmer sweep over banner

---

## COMPONENT 12 — NIEUWSBRIEF (NewsletterSection.tsx)

- Achtergrond: brand-charcoal
- Header: Cormorant headline ivory: "Inzichten, Wetenschap & Vroege Toegang"
- Subtekst: "Sluit je aan bij 50.000+ abonnees die wekelijks gewichtsverlies-wetenschap, behandelingsupdates en exclusieve ledenvoordelen ontvangen."
- Inline e-mailinvoer (gouden onderrand only) + "AANMELDEN" knop (goud gevuld)
- Checkbox: "Ik ga akkoord met het ontvangen van marketingcommunicatie" (Jost 11px, ivory)

---

## COMPONENT 13 — FOOTER (Footer.tsx)

- Achtergrond: brand-teal-deep
- "VELURA" wordmark gecentreerd bovenaan, Cinzel, goud
- 4-koloms linkgrid:
  - **Behandelingen:** Ozempic · Mounjaro · Wegovy · Saxenda
  - **Methoden:** GLP-1 Injecties · Voedingsplannen · Beweging · Supplementen
  - **Ondersteuning:** Veelgestelde vragen · Contact · Bezorging · Privacy
  - **Bedrijf:** Over Wellis · Beoordelingen · Vacatures · Blog
- Goudkleurige scheidsregel
- Medische disclaimer (Jost 11px, opacity 0.5, italic):
  > VELURA aangedreven door Wellis Pharmacy B.V. — Geregistreerde EU-apotheek. Alle behandelingen voorgeschreven door BIG-geregistreerde artsen. Niet beschikbaar voor personen onder de 18 jaar. Raadpleeg altijd een arts voordat u met een medische behandeling begint.
- © 2025 VELURA door Wellis · Privacy · Algemene Voorwaarden · Cookies
- Betaalopties: iDEAL · PayPal · Visa · Mastercard · Bancontact

---

## VERTALINGEN

Alle UI-teksten moeten als sleutels in `messages/nl.json` en `messages/en.json` staan. Geen hardcoded strings in componenten.

```json
// Structuurvoorbeeld nl.json
{
  "nav": { "methods": "Methoden", "shop": "Behandelingen", "bmi": "BMI Calculator", "about": "Over Ons", "blog": "Blog", "cta": "Begin Jouw Reis" },
  "hero": { "label": "MEDISCH BEGELEID · KLINISCH BEWEZEN", "h1_line1": "Herwin Jouw Lichaam", "h1_line2": "Met Precisiewetenschap", "subtext": "...", "cta_primary": "Bekijk Behandelingen", "cta_secondary": "Bereken Mijn BMI" },
  "bmi": { "title": "Ken Jouw Startpunt", "unit_metric": "Metrisch (kg/cm)", "unit_imperial": "Imperiaal (lbs/ft)", "button": "BEREKEN MIJN BMI", "disclaimer": "..." },
  "products": { "ozempic_name": "Ozempic", "ozempic_desc": "...", "cta": "Start Behandeling →" }
}
```

---

## CODEKWALITEITSREGELS

- TypeScript strict mode — geen `any` types
- Framer Motion voor ALLE animaties
- useInView (Framer Motion) voor scroll-gebaseerde onthullingen
- Alle Tailwind kleuren via custom `brand-*` tokens uit `tailwind.config.ts`
- Volledige responsiviteit: `sm` / `md` / `lg` / `xl` breakpoints
- Geen `<img>` tags zonder echte src — gebruik CSS gradient art panels
- Alle externe links openen in `_blank` met `rel="noopener noreferrer"`
- Medische disclaimer in footer EN onder BMI resultaten
- Alle bestanden volledig uitgeschreven — nooit afgekapt
- **Volgorde van bestanden:**
  `tailwind.config.ts` → `next.config.ts` → `middleware.ts` → `messages/nl.json` → `messages/en.json` → `lib/i18n.ts` → `app/[locale]/layout.tsx` → `app/[locale]/page.tsx` → alle componenten
