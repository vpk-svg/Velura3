# UX/UI & CRO Audit — Team, Afvallen, Medicatie

> **Date:** April 9, 2026
> **Scope:** Element-by-element analysis of Team (`/team`), Afvallen (`/weightloss`), and Medicatie (`/medicatie`) pages.
> **Framework:** Element & Purpose → Effectiveness Evaluation → Improvement Suggestions

---

## Table of Contents

1. [Team Page](#1-team-page)
2. [Afvallen (Weightloss) Page](#2-afvallen-weightloss-page)
3. [Medicatie Page](#3-medicatie-page)
4. [Cross-Page Issues](#4-cross-page-issues)
5. [Priority Matrix](#5-priority-matrix)

---

## 1. Team Page

**Route:** `/[locale]/team`
**Components:** `TeamSection`, `HowItWorks`, `TrustPillars`
**Page intent:** Build trust and credibility by showcasing the clinic's medical professionals.

---

### 1.1 Page-Level Metadata

| Aspect | Current State |
|---|---|
| `<title>` | "Ons Team \| Fab Clinic" |
| `<meta description>` | "Maak kennis met de BIG-geregistreerde artsen en specialisten van Fab Clinic." |

**Purpose:** SEO and SERP click-through rate.

**Effectiveness:** ⚠️ Adequate but generic. The title does not include differentiating keywords (e.g., "cosmetisch arts Amsterdam" or specific treatment areas). The description is factual but doesn't include a benefit or call-to-action that would drive clicks from search results.

**Improvement:**
- Title → `"Ons Team — BIG-Geregistreerde Cosmetische Artsen | FAB Clinic"`
- Description → `"Maak kennis met ons team van BIG-geregistreerde cosmetische artsen en specialisten. Persoonlijke begeleiding bij afvallen, botox & fillers."`
- Add structured data (`Person` schema) for each team member to enable rich snippets.

---

### 1.2 Section Header (SectionHeader component)

| Element | Value |
|---|---|
| Label | "ONS TEAM" |
| Title | "Maak kennis met *ons team*" |
| Subtitle | "Alleen BIG-geregistreerde professionals en ervaren specialisten begeleiden uw behandeling." |

**Purpose:** Frame the page, set expectations, communicate medical credibility.

**Effectiveness:** ✅ Good. The BIG-registration mention immediately establishes authority. The italic accent on "ons team" adds visual elegance consistent with brand styling.

**Improvement:**
- Add a quantitative trust signal directly in the subtitle, e.g., *"Al **X+** jaar ervaring — alleen BIG-geregistreerde artsen begeleiden uw behandeling."*
- Consider adding a secondary line with the total number of treatments performed or patient reviews to anchor social proof right at the top.

---

### 1.3 Team Member Grid (6 cards)

| Property | Current |
|---|---|
| Layout | 1 col → 2 col (sm) → 3 col (lg) |
| Card contents | Portrait photo, name, role, BIG number |
| Hover effects | Grayscale → color, scale 105%, gold shadow glow, name color change |
| Animation | Staggered fade-in (0.1s delay per card) |

**Purpose:** Introduce each team member, build personal connection and medical trust.

**Effectiveness:** ⚠️ Partially effective.

- **Strengths:** The grayscale-to-color hover effect is premium and on-brand. BIG numbers with `ShieldCheck` icon are a strong credibility signal. Portrait aspect ratio (4:5) is well-suited for professional headshots.
- **Weaknesses:**
  1. **No bio or specialization text.** Users see a name, a title, and a BIG number — but nothing about the person's expertise, years of experience, or personality. This is the primary trust-building missed opportunity on this page.
  2. **Fleur van der Kaaden has an empty BIG field** (`"member6_big": ""`). The `{member.big && ...}` conditional hides it, but the card appears visibly shorter than others — creating layout inconsistency in the 3-column grid.
  3. **No individual CTA.** Each card is purely informational. There's no "Book with this specialist" or "View profile" link. Users who feel affinity with a specific team member have no conversion path.
  4. **Hover effect is decoration-only.** The card doesn't have a clickable state, `cursor-pointer`, or any indication that interaction leads somewhere. The hover animation builds expectation of interactivity that isn't fulfilled.

**Improvements:**
1. **Add a 2–3 sentence bio** per team member below the BIG number. Example: *"Dr. Barza is gespecialiseerd in injectables en heeft meer dan 8 jaar ervaring in de cosmetische geneeskunde."*
2. **Add a micro-CTA per card:** "Boek bij [Name]" link that routes to `/consult?from=team&specialist=[name]`. This creates a direct conversion path from trust-building to action.
3. **For Fleur (no BIG number):** Replace the BIG badge area with a different trust signal, e.g., *"10+ jaar klinieksmanagement"* — keep the card height consistent.
4. **Make cards clickable:** Wrap in a `<Link>` or add expanding detail (accordion/modal) to reveal bio, specializations, and a booking CTA.
5. **Add years of experience badges:** A small `"8+ jaar"` tag on each photo overlay adds scannable credibility without cluttering.

---

### 1.4 HowItWorks Section (3-step process)

| Step | Content |
|---|---|
| 1 | FileSearch icon — Intake & Introduction |
| 2 | ClipboardCheck icon — Consultation |
| 3 | Package icon — Treatment & Aftercare |

**Purpose:** Show the user what to expect when they engage with the clinic.

**Effectiveness:** ⚠️ Functionally fine as a standalone component, but **contextually misplaced on the Team page**. Users visiting `/team` are in a trust-evaluation mindset ("Who will treat me?"), not a process-understanding mindset ("How does the clinic work?"). This section makes more sense on the homepage or a treatment-specific page.

**Improvements:**
1. **Replace with a team-specific process section**, e.g.:
   - Step 1: "Persoonlijke match" — We koppelen u aan de specialist die het beste bij uw wensen past.
   - Step 2: "Consult op maat" — Uw arts neemt uitgebreid de tijd voor uw vragen.
   - Step 3: "Doorlopende begeleiding" — Dezelfde specialist begeleidt u van begin tot eind.
2. **Alternative:** Remove `HowItWorks` from the Team page entirely and replace with a **"What Our Patients Say"** testimonial carousel that directly reinforces trust in the team members shown above.

---

### 1.5 TrustPillars Section (4 pillars)

| Pillar | Title |
|---|---|
| 1 | BIG-geregistreerde Artsen |
| 2 | Discrete Levering |
| 3 | Bewezen Effectief |
| 4 | Altijd Bereikbaar |

**Purpose:** Reinforce overall clinic trustworthiness.

**Effectiveness:** ⚠️ The "BIG-geregistreerde Artsen" pillar is redundant — the TeamSection above already emphasizes BIG registration. "Discrete Levering" and "Bewezen Effectief" relate to medication, not to the team. This generic reuse of TrustPillars dilutes relevance.

**Improvements:**
1. **Create team-specific trust pillars:**
   - "Gemiddeld 8+ jaar ervaring"
   - "Continue bijscholing & certificering"
   - "Persoonlijke 1-op-1 begeleiding"
   - "Direct bereikbaar via WhatsApp"
2. **Add a bottom CTA section** after TrustPillars: "Klaar om ons team te ontmoeten? Plan uw gratis consult." with a prominent `<ConsultTrigger>` button. Currently the Team page has **no CTA at all** — this is the biggest CRO gap on this page.

---

### 1.6 Missing Elements (Team Page)

| Missing Element | Impact | Recommendation |
|---|---|---|
| **Page-level CTA** | No conversion path beyond navigation bar | Add a prominent bottom CTA section: "Plan uw gratis consult" |
| **Social proof / reviews** | No patient testimonials or review scores | Add a testimonial section or aggregate rating |
| **Team photo (group)** | No group image showing team dynamics | Add a hero image or team photo at the top |
| **Certifications / accreditations** | Only BIG numbers shown | Display clinic-level certifications (e.g., WKKGZ, memberships) |
| **Video introduction** | No multimedia | Short 30-second team intro video would dramatically increase engagement and trust |

---

## 2. Afvallen (Weightloss) Page

**Route:** `/[locale]/weightloss`
**Components:** Custom hero, Product cards, `ProgramTimeline`, Why FAB section, Final CTA, `SurveyAutoOpen`
**Page intent:** Convert visitors interested in medical weight loss into screening/intake leads.

---

### 2.1 Hero Section

| Element | Value |
|---|---|
| Background | Secondary (dark) + parallax image + gradient overlay |
| Label | "MEDISCH AFVALLEN" |
| Title | "Afvallen met *medische begeleiding*" |
| Description | GLP-1 medication + coaching + supervision explanation |
| Social proof | "4.9/5 · 500+ patiënten · BIG-geregistreerde artsen" |
| CTA Primary | "Start Intake" → `/consult?from=weightloss` |
| CTA Secondary | "Bekijk Medicatie" → `#producten` (anchor scroll) |

**Purpose:** Capture attention, establish medical credibility, drive users toward intake/screening.

**Effectiveness:** ⚠️ Strong visual impact, but several issues:

1. **Dual CTA split attention.** "Start Intake" and "Bekijk Medicatie" compete for the same click. The primary CTA (Start Intake) loses prominence because the secondary CTA is equally styled. Users in research mode click "Bekijk Medicatie" and scroll past the intake funnel.
2. **Social proof is plain text.** The string `"4.9/5 · 500+ patiënten · BIG-geregistreerde artsen"` is rendered as a single `<p>` tag with no visual differentiation — no stars, no avatar stack, no badge styling.
3. **Description is text-heavy.** On mobile, the hero block becomes very tall with the title + description + social proof + two CTAs stacked vertically.

**Improvements:**
1. **Visually differentiate CTAs:**
   - Primary: Full gold button with shimmer → "Start Gratis Intake"
   - Secondary: Ghost/outline button or text link with arrow → "Bekijk Medicatie ↓"
   - This creates clear visual hierarchy and reduces choice paralysis.
2. **Style the social proof as a badge strip:**
   ```
   ★★★★★ 4.9/5  ·  👥 500+ patiënten  ·  🛡️ BIG-geregistreerd
   ```
   Use small icons/stars and a semi-transparent background pill (`bg-white/10 rounded-pill px-6 py-2`) to make it scannable.
3. **Shorten the hero description** to 1–2 lines max. Move the detailed GLP-1 explanation to the "How GLP-1 Works" section below. Hero copy should be punchy, not educational.
4. **Add a "bekeken door X mensen vandaag" urgency element** (if ethically appropriate) to the hero to increase conversion pressure.

---

### 2.2 Products Section (4 medication cards)

| Product | Price | Frequency |
|---|---|---|
| Mounjaro (Tirzepatide) | €299/mnd | 1x per week |
| Ozempic (Semaglutide) | €199/mnd | 1x per week |
| Wegovy (Semaglutide) | €249/mnd | 1x per week |
| Saxenda (Liraglutide) | €179/mnd | 1x per dag |

**Purpose:** Present medication options, educate users about each product, and drive toward intake.

**Effectiveness:** ⚠️ Informative but overwhelming.

1. **Each card shows full medical details inline** (how it works, side effects, storage). On desktop in a 2-column grid, this creates very tall cards. On mobile, users must scroll through 4 dense cards sequentially — expected scroll distance: 3000–4000px just for this section.
2. **No comparison mechanism.** Users interested in choosing between Ozempic and Mounjaro must mentally compare information across two separate cards. There's no side-by-side view, no comparison table, no "recommended for you" logic.
3. **All cards have the same CTA ("Start").** No differentiation for the user who's already interested in a specific product — they all route to the same consult page.
4. **Price anchoring is weak.** Prices range from €179–€299 but there's no "most popular" indicator (except Mounjaro's badge on the Medicatie page, absent here), no "best value" label, and no savings comparison.

**Improvements:**
1. **Add a compact comparison table** above the cards:
   | | Mounjaro | Ozempic | Wegovy | Saxenda |
   |---|---|---|---|---|
   | Actief ingrediënt | Tirzepatide | Semaglutide | Semaglutide | Liraglutide |
   | Frequentie | 1x/week | 1x/week | 1x/week | 1x/dag |
   | Prijs | €299/mnd | €199/mnd | €249/mnd | €179/mnd |
   | | ⭐ Meest effectief | 🏆 Meest voorgeschreven | | |

2. **Collapse medical details by default.** Show only name + short description + price + CTA. Add a "Meer info" expandable accordion for how-it-works, side effects, and storage advice. This reduces initial cognitive load dramatically.
3. **Add "Meest gekozen" badge to Ozempic** (or whichever is actually most popular) and "Meest effectief" to Mounjaro. Badges help steer undecided users.
4. **Pass product ID to consult CTA:** Change CTA to `"Start Intake voor Mounjaro"` and route to `/consult?from=weightloss&product=mounjaro`. This preserves context through the funnel.

---

### 2.3 ProgramTimeline (5-step process)

| Step | Title |
|---|---|
| 1 | Intake / Screening |
| 2 | Consult met arts |
| 3 | Medicatie op recept |
| 4 | Begeleiding & monitoring |
| 5 | Evaluatie & aanpassing |

**Purpose:** Show the user the full treatment journey from first contact to ongoing care.

**Effectiveness:** ⚠️ Well-designed component with good visual treatment (numbered circles, connecting dashed lines, staggered animation). However:

1. **Redundant with HowItWorks below it.** The page has both a 5-step ProgramTimeline AND a 3-step HowItWorks section. These serve nearly the same purpose — explaining the process. Combined, they create 8 process steps which is excessive and dilutes the takeaway.
2. **Desktop layout (horizontal)** works well. **Mobile layout (vertical)** becomes very tall — 5 steps × ~200px each = ~1000px of process content before the user reaches the Why FAB section.

**Improvements:**
1. **Remove HowItWorks from this page.** Keep only ProgramTimeline (which is more detailed and specific). Alternatively, merge both into a single 4-step process.
2. **Condense to 4 steps on mobile** by combining "Medicatie op recept" and "Begeleiding & monitoring" into one step. Show the 5th step as a "bonus" or expandable detail.
3. **Add a CTA at the end of the timeline:** "Begin bij stap 1 — Start uw gratis intake" to create a natural conversion point after the user understands the process.

---

### 2.4 Why FAB Section (USPs)

| Element | Content |
|---|---|
| Layout | Image (left) + Content (right) |
| Image | Lifestyle/clinic photo, 500px height mobile, 600px desktop |
| Label | "WAAROM FAB CLINIC" |
| Title | "Medisch verantwoord *afvallen*" |
| USPs | 4 bullet points with ShieldCheck icons |
| CTA | "Plan een Consult" |

**USPs:**
1. Voorgeschreven door BIG-geregistreerde artsen
2. Maandelijkse evaluatie en dosisaanpassing
3. Persoonlijke coaching voor voeding en leefstijl
4. Discrete levering aan huis

**Purpose:** Differentiate FAB Clinic from competitors, reinforce trust, drive toward consult.

**Effectiveness:** ⚠️ Solid structure, but:

1. **All 4 USPs use the same ShieldCheck icon.** There's no visual differentiation between them — they blur together when scanning.
2. **USP copy is feature-oriented, not benefit-oriented.** "Maandelijkse evaluatie en dosisaanpassing" describes what the clinic does, not what the patient gets. Compare: → *"Altijd de juiste dosis — maandelijks afgestemd op uw voortgang."*
3. **The CTA "Plan een Consult"** is different from the hero CTA "Start Intake" — inconsistent language creates friction.

**Improvements:**
1. **Use distinct icons per USP:**
   - USP 1: `Stethoscope` (BIG artsen)
   - USP 2: `RefreshCw` (maandelijkse evaluatie)
   - USP 3: `HeartPulse` (persoonlijke coaching)
   - USP 4: `Truck` (discrete levering)
2. **Rewrite USPs as benefits:**
   - "Altijd onder toezicht van een BIG-geregistreerde arts"
   - "Elke maand afgestemd op uw voortgang — nooit een standaarddosis"
   - "Persoonlijke coaching zodat u ook na de medicatie op gewicht blijft"
   - "Discreet en gratis thuisbezorgd — niemand hoeft het te weten"
3. **Unify CTA language** across the page: use "Start Gratis Intake" consistently.
4. **Add a number/stat per USP** where possible: "4.9★ beoordeling", "500+ patiënten", "24u responstijd", "Gratis verzending". Numbers are more scannable and persuasive than text alone.

---

### 2.5 Final CTA Section

| Element | Value |
|---|---|
| Background | Secondary (dark) |
| Label | "START VANDAAG" |
| Title | "Klaar om te beginnen?" |
| Description | Explains 24-hour response + confidentiality |
| Button | "Start Gratis Intake" |

**Purpose:** Final conversion push for users who scrolled through the entire page.

**Effectiveness:** ⚠️ Functional but under-optimized:

1. **Same dark background as the hero** — on a long page, users experience "dark section fatigue." The final CTA doesn't feel like a distinct, special moment.
2. **"Klaar om te beginnen?"** is a standard, low-impact headline. It doesn't reiterate the value proposition or address remaining objections.
3. **No urgency or incentive.** No reason to act now vs. bookmarking for later.

**Improvements:**
1. **Use a distinct background treatment.** Options:
   - Light background with gold accent border
   - Full-width lifestyle image with overlay
   - Gradient from the previous section's background to a new accent color
2. **Rewrite the headline to address the #1 objection:**
   - "Nog twijfels? De intake is gratis en geheel vrijblijvend."
   - Or reiterate the result: "Uw eerste stap naar gezond afvallen — binnen 24 uur reactie."
3. **Add a micro-commitment element:** "Binnen 5 minuten ingevuld" or "Geen betaling bij intake" to lower the perceived barrier.
4. **Add social proof repeat:** Small text below button: *"Sluit u aan bij 500+ tevreden patiënten"* with a star rating.

---

### 2.6 Missing Elements (Afvallen Page)

| Missing Element | Impact | Recommendation |
|---|---|---|
| **Before/After gallery** | No visual proof of results | Add anonymized before/after photos (with consent) — highest-impact CRO element for weight loss |
| **Testimonials** | No patient stories | Add 2–3 short testimonial quotes with name/age (or anonymized) near the products section |
| **FAQ section** | Common objections not addressed | Add 5-6 FAQ items: eligibility, side effects, timeline, costs, insurance |
| **"Niet geschikt voor" disclaimer** | Medical compliance risk | Add a small section clarifying who is/isn't eligible (BMI > 27/30, etc.) |
| **Exit-intent or sticky CTA** | Page is long, CTA only at top and bottom | Add a sticky mobile bottom bar with "Start Intake" that appears after scrolling past the hero |

---

## 3. Medicatie Page

**Route:** `/[locale]/medicatie`
**Components:** Custom hero, How GLP-1 Works (3 cards), `ProductShop`, Safety Guarantees, `TrustPillars`, `PharmacyDisclaimer`, Bottom CTA
**Page intent:** Educate users about GLP-1 medication options and convert into consult/screening leads.

---

### 3.1 Hero Section

| Element | Value |
|---|---|
| Background | Secondary + parallax image (opacity 20%) + gradient |
| Label | "GLP-1 MEDICATIE" with ShieldCheck icon |
| Title | "Afvalmedicatie *op recept*" |
| Divider | 20px gold horizontal line |
| Description | EMA-approved medication explanation |
| Rx Notice | Pulsing dot + "Uitsluitend op recept na medische screening" |
| CTA | "Bekijk de Opties" → `#shop` anchor |

**Purpose:** Establish medical authority, communicate that these are prescription medications, and guide toward product selection.

**Effectiveness:** ⚠️ Visually polished, but several functional issues:

1. **Rx Notice badge is too subtle.** `bg-white/5 border-white/10` on a dark background makes this nearly invisible. For a compliance-critical element (communicating prescription-only status), this needs more visual weight.
2. **CTA "Bekijk de Opties" scrolls to `#shop`**, but `#shop` is the `ProductShop` component ID. Between the hero and `#shop`, there are **two intermediate sections** (How GLP-1 Works + Compare section header). The user expects to jump directly to products but lands on an educational section first — creating a jarring experience.
3. **The parallax background image** at `opacity-20` is barely visible. It adds page weight (LCP impact) without meaningful visual contribution.
4. **The horizontal gold divider** (`w-20 h-px bg-primary/50`) between title and description is decorative but takes up vertical space without purpose. On mobile, every pixel of hero height matters.

**Improvements:**
1. **Make the Rx Notice more prominent:**
   - Increase to `bg-white/10 border-white/20`
   - Enlarge text slightly to `text-sm`
   - Add a `Pill` icon alongside the pulsing dot
   - Consider placing it directly below the title (before description) for higher visibility
2. **Fix the anchor scroll target:** Either:
   - Change `href="#shop"` to scroll past the educational sections, OR
   - Move the "How GLP-1 Works" section below the ProductShop, OR
   - Rename the CTA to "Ontdek hoe het werkt" to set correct expectations
3. **Remove or optimize the parallax image.** At 20% opacity it's barely visible. Options: increase to 35% opacity and add a more relevant medical image, or remove entirely and save ~200KB of page weight.
4. **Remove the horizontal divider** on mobile (hide with `hidden md:block`).

---

### 3.2 How GLP-1 Works (3 mechanism cards)

| Card | Icon | Title |
|---|---|---|
| 1 | UtensilsCrossed | Vermindert eetlust |
| 2 | Timer | Vertraagt maagontlediging |
| 3 | Activity | Stabiliseert bloedsuiker |

**Purpose:** Educate users on the GLP-1 mechanism of action to build confidence in the medication.

**Effectiveness:** ✅ Well-executed. Clean card design with subtle top accent gradient, appropriate icons, and clear copywriting. The 3-card grid is scannable and doesn't overwhelm.

**Improvements (minor):**
1. **Add a small illustration or diagram** showing GLP-1 in the body. A simple SVG visual would be more memorable than three text cards.
2. **Add "Klinisch bewezen" badge** on the section to reinforce that this is science-backed, not a supplement marketing claim.
3. **Consider re-ordering after ProductShop:** Users coming from the hero CTA want to see products first. The educational content about GLP-1 mechanisms is most relevant *after* they've seen what's available — it answers "how does it actually work?" which is a natural follow-up question.

---

### 3.3 Product Comparison Header (SectionHeader)

| Element | Value |
|---|---|
| Label | "VERGELIJKEN" |
| Title | "Welk middel *past bij u?*" |
| Subtitle | Overview explanation text |

**Purpose:** Frame the product selection section and help users understand they need to choose.

**Effectiveness:** ✅ Good framing. The question format ("Welk middel past bij u?") psychologically prepares the user for a decision.

**Improvement:**
- Add a one-line instruction below the subtitle: *"Onze arts helpt u bij de juiste keuze — bekijk eerst de opties hieronder."* This reassures users that they don't need to decide alone.

---

### 3.4 ProductShop (4 product cards)

| Product | Price | Badge |
|---|---|---|
| Ozempic (Semaglutide) | €199/mnd | Rx |
| Mounjaro (Tirzepatide) | €299/mnd | Rx + "Meest Effectief" |
| Wegovy (Semaglutide) | €249/mnd | Rx |
| Saxenda (Liraglutide) | €179/mnd | Rx |

**Card structure:**
- Dark gradient visual area with product pen image
- Rx badge (top-left) + optional "Meest Effectief" badge (top-right)
- Type label (active ingredient)
- Product name (italic, hover → primary color)
- Description
- Medical detail card (how it works, side effects, storage)
- Price + "per maand"
- CTA: "Plan een Consult"

**Purpose:** Allow users to compare medications and choose one to proceed with.

**Effectiveness:** ⚠️ Visually impressive but functionally problematic for conversion:

1. **Cards are extremely tall.** Each card contains: image area (aspect 4:5) + type label + name + description + medical detail box (3 sub-items) + price + CTA. On mobile, a single card is approximately 800–900px tall. Four cards = ~3500px of scrolling. This is **scroll fatigue territory**.
2. **Side effects section with AlertTriangle icon creates anxiety.** Showing "Misselijkheid, diarree en hoofdpijn" with an amber warning icon mid-card can make users second-guess their interest. This is medically necessary information, but the presentation should be contextualized.
3. **All CTAs say "Plan een Consult"** — identical across all 4 products. After viewing four products, the user doesn't know if clicking different CTAs will lead to different outcomes. No product context is passed through the funnel.
4. **No clear "recommended" pathway.** Only Mounjaro has a "Meest Effectief" badge. Other products lack any guidance — the user with no prior knowledge is left to decide between 4 similar-seeming options.
5. **Price anchoring is absent.** €179–€299 range is presented without context. No "from €179/mnd", no comparison with competitor clinics, no monthly vs. total cost frame.

**Improvements:**
1. **Collapse medical details by default.** Show a compact card (image + name + short description + price + CTA) with a "Meer details" toggle that reveals the full medical info. This cuts card height by ~40%.
2. **Contextualize side effects positively:**
   - Change icon from `AlertTriangle` (amber/warning) to a neutral `Info` icon (blue/gray)
   - Add framing text: *"Milde bijwerkingen die meestal na 1–2 weken afnemen:"*
   - Position this in the expandable detail section, not the main card view
3. **Add product-specific CTA text:** "Plan Consult voor Mounjaro", "Plan Consult voor Ozempic", etc. Pass the product ID as a query parameter.
4. **Add recommendation badges to more products:**
   - Mounjaro: "Meest Effectief" (keep)
   - Ozempic: "Meest Voorgeschreven" or "Populairste Keuze"
   - Wegovy: "Speciaal voor Gewichtsverlies"
   - Saxenda: "Meest Betaalbaar"
5. **Add a "Hulp bij kiezen?" prompt** between the compare header and the product grid: A small card that says *"Niet zeker welke medicatie bij u past? Start de gratis screening en onze arts adviseert u persoonlijk."* with a ConsultTrigger CTA.
6. **Add a price anchor frame:** Below each price, add context: *"Inclusief: medicatie + arts + coaching + thuisbezorging"* to justify the monthly cost.

---

### 3.5 Safety Guarantees Section (4-column grid)

| Item | Icon | Text |
|---|---|---|
| 1 | Pill | Alleen op recept na medische screening |
| 2 | Truck | Geleverd via erkende apotheek in Nederland |
| 3 | Stethoscope | Regelmatige controle en doseeraanpassing |
| 4 | Phone | Directe communicatie met uw behandelend arts |

**Purpose:** Address safety concerns, especially important for prescription medication.

**Effectiveness:** ✅ Strong section. Dark background creates visual contrast. Icons are relevant and descriptive. Copy is clear and addresses the top safety questions.

**Improvements (minor):**
1. **Add numbers where possible:**
   - "Geleverd via erkende Nederlandse apotheek" → "Geleverd via 1 van de 2000+ erkende apotheken in Nederland"
   - "Regelmatige controle" → "Maandelijkse controle en doseeraanpassing"
2. **Consider adding a 5th item:** "100% discreet — neutrale verpakking zonder productnaam" — privacy is a major concern for weight loss medication buyers.

---

### 3.6 TrustPillars Section (shared component)

**Purpose:** Reinforce overall clinic trust.

**Effectiveness:** ⚠️ On the Medicatie page, this section appears **directly after the Safety Guarantees section** — both serve the same purpose (building trust through safety claims). The result is two consecutive trust-signal sections that feel redundant.

**Improvements:**
1. **Remove TrustPillars from the Medicatie page** since Safety Guarantees already covers the same ground with medication-specific messaging.
2. **OR merge the two sections:** Combine the 4 safety items and 4 trust pillars into a single 8-item or 6-item section with a unified design.

---

### 3.7 PharmacyDisclaimer Section

| Element | Value |
|---|---|
| Background | Secondary-deep (dark) |
| Label | "ONZE PARTNERAPOTHEEK" |
| Title | "Veilig Verstrekt" |
| Description | Explains prescription process through partner pharmacy |
| Pharmacy info | Apotheek Lemelerveld, Vilstersestraat 33, 8152 AA Lemelerveld |
| Disclaimer | "Alle medicatie is uitsluitend verkrijgbaar op recept..." |

**Purpose:** Legal compliance and trust — demonstrate that medications are dispensed through a licensed pharmacy.

**Effectiveness:** ⚠️ Important for compliance and trust, but placement is problematic:

1. **Too deep in the page.** Users who need this information for trust (before making a decision) must scroll through the entire product catalog and two trust sections to find it.
2. **Third consecutive dark section.** Safety Guarantees → TrustPillars (light bg, but then) → PharmacyDisclaimer all on dark backgrounds creates visual monotony.
3. **Address is rendered as plain text** without a Google Maps link or visual map — reduces verifiability.

**Improvements:**
1. **Move a condensed pharmacy trust signal higher.** Add a small banner or pill badge near the product cards: *"Alle medicatie wordt verstrekt via erkende Nederlandse apotheek"* — users see this before deciding.
2. **Add a Google Maps link** to the pharmacy address for verifiability.
3. **Change background to light** to break the dark-dark-dark pattern: use `bg-background-light` with a subtle border-top.
4. **Add the pharmacy's own registration number/license** (if available) to strengthen the compliance signal.

---

### 3.8 Bottom CTA Section

| Element | Value |
|---|---|
| Background | Light background with top border |
| Label | "KLAAR OM TE STARTEN?" |
| Title | "Ontdek welke medicatie bij u past" |
| Description | Free screening, 24-hour response |
| Button | "Start de Gratis Screening" → `/consult?from=medicatie` |

**Purpose:** Final conversion push.

**Effectiveness:** ⚠️ Good copy but inconsistent with the rest of the site:

1. **CTA button text "Start de Gratis Screening"** differs from weightloss page ("Start Gratis Intake") and the product cards above ("Plan een Consult"). Three different labels for essentially the same action = confusion.
2. **Title is strong** — "Ontdek welke medicatie bij u past" rightly focuses on personalized recommendation rather than a hard sell.
3. **No urgency or social proof** in this section.

**Improvements:**
1. **Unify CTA language site-wide.** Choose ONE primary CTA label: recommend *"Start Gratis Intake"* everywhere it routes to `/consult`.
2. **Add urgency/scarcity (if ethical):** "Beperkt aantal plekken beschikbaar deze maand" or "Vandaag nog starten? Gemiddeld 24 uur tot uw eerste consult."
3. **Add a testimonial quote** adjacent to the CTA: *"Binnen 2 weken had ik al mijn eerste resultaten. De artsen zijn echt betrokken." — Linda, 42*
4. **Add "Geen betaling bij intake"** reassurance text below the button in small print.

---

### 3.9 Missing Elements (Medicatie Page)

| Missing Element | Impact | Recommendation |
|---|---|---|
| **Sticky/floating CTA** | Long page with CTA only at top and bottom | Add sticky bottom bar on mobile: "Plan een Consult" visible while scrolling products |
| **Product comparison table** | Users can't easily compare 4 medications side-by-side | Add a responsive comparison table above or below the card grid |
| **FAQ section** | Common questions unanswered (insurance, eligibility, interactions) | Add 5–6 FAQ items addressing: "Wordt het vergoed?", "Kan ik dit combineren met andere medicatie?", "Wat als ik bijwerkingen krijg?" |
| **Dosage escalation info** | Users don't understand that dosage increases over time | Add a note per product explaining the titration schedule |
| **"Niet voor iedereen" section** | Eligibility criteria unclear | Add clear eligibility criteria (BMI requirements, contraindications) to set expectations before consult |

---

## 4. Cross-Page Issues

### 4.1 CTA Label Inconsistency

| Page | CTA Label | Destination |
|---|---|---|
| Team | *(none)* | — |
| Afvallen Hero | "Start Intake" | `/consult?from=weightloss` |
| Afvallen Products | "Start" | `/consult?from=weightloss` |
| Afvallen Why FAB | "Plan een Consult" | `/consult?from=weightloss` |
| Afvallen Final | "Start Gratis Intake" | `/consult?from=weightloss` |
| Medicatie Products | "Plan een Consult" | `/consult?from=medicatie` |
| Medicatie Final | "Start de Gratis Screening" | `/consult?from=medicatie` |

**Problem:** 5 different CTA labels for essentially the same action. This creates cognitive friction and reduces recognition as users navigate between pages.

**Recommendation:** Standardize to a maximum of 2 CTA variants:
- **Primary:** "Start Gratis Intake" (for all consult routes)
- **Secondary:** "Bekijk Medicatie" or "Bekijk Opties" (for scroll/navigation actions)

---

### 4.2 Shared Component Overuse

`TrustPillars` and `HowItWorks` appear on multiple pages with identical content. While code reuse is good engineering, CRO-wise each page's supporting content should be **context-specific**.

**Recommendation:** Create page-specific variants:
- Team page: team-focused trust pillars (experience, certifications, personal care)
- Medicatie page: remove TrustPillars (Safety Guarantees suffices)
- Afvallen page: remove HowItWorks (ProgramTimeline suffices)

---

### 4.3 Missing Sticky Mobile CTA

All three pages are long-scroll pages (3000–6000px) but none have a sticky mobile CTA bar. On mobile, the primary CTA disappears after 1–2 screens of scrolling and doesn't reappear until the bottom of the page.

**Recommendation:** Implement a `StickyMobileActions` component (already exists in the codebase at `components/StickyMobileActions.tsx`) that shows a condensed CTA bar on scroll. Trigger visibility after the user scrolls past the hero section.

---

### 4.4 No Exit-Intent Strategy

None of the three pages implement exit-intent detection. Users who are about to leave (cursor moves toward browser chrome / back button) could be shown a lightweight modal offering the free intake.

**Recommendation:** Implement a non-intrusive exit-intent popup specifically for the Afvallen and Medicatie pages: *"Wacht — de intake is gratis en vrijblijvend. Wilt u het toch proberen?"* with a single CTA button.

---

## 5. Priority Matrix

### High Impact / Low Effort

| # | Recommendation | Page | Expected Impact |
|---|---|---|---|
| 1 | Unify CTA labels site-wide ("Start Gratis Intake") | All | Reduce decision friction, improve funnel consistency |
| 2 | Add a bottom CTA section to Team page | Team | Create missing conversion path (currently 0 CTAs) |
| 3 | Collapse product medical details behind "Meer info" toggle | Medicatie, Afvallen | Reduce scroll fatigue, improve card scanability |
| 4 | Replace HowItWorks on Team page with team-specific content | Team | Improve page relevance |
| 5 | Add recommendation badges to all 4 products | Medicatie, Afvallen | Reduce choice paralysis |
| 6 | Style social proof as a visual badge strip (stars + icons) | Afvallen | Increase hero credibility perception |

### High Impact / Medium Effort

| # | Recommendation | Page | Expected Impact |
|---|---|---|---|
| 7 | Add 2–3 sentence bio per team member | Team | Dramatically improve trust signals |
| 8 | Add product comparison table | Medicatie, Afvallen | Simplify decision-making |
| 9 | Remove ProgramTimeline OR HowItWorks redundancy | Afvallen | Reduce page length by ~1000px |
| 10 | Add sticky mobile CTA bar | All | Capture mobile users who scroll past hero |
| 11 | Move pharmacy trust signal higher (near products) | Medicatie | Earlier trust building |
| 12 | Add FAQ section | Afvallen, Medicatie | Address objections before they become exit reasons |

### Medium Impact / Low Effort

| # | Recommendation | Page | Expected Impact |
|---|---|---|---|
| 13 | Fix Fleur's empty BIG field (add alternative credential) | Team | Fix layout inconsistency |
| 14 | Make Rx notice badge more prominent | Medicatie | Improved compliance visibility |
| 15 | Add product ID to consult CTA query params | Medicatie, Afvallen | Preserve funnel context |
| 16 | Benefit-oriented USP copy rewrite | Afvallen | Stronger persuasion in Why FAB section |
| 17 | Distinct icons per USP (instead of 4× ShieldCheck) | Afvallen | Better scanability |
| 18 | Contextualize side effects with framing text | Medicatie | Reduce anxiety, improve conversion |

### Medium Impact / High Effort

| # | Recommendation | Page | Expected Impact |
|---|---|---|---|
| 19 | Add before/after gallery (weight loss) | Afvallen | Strongest visual proof — requires patient content |
| 20 | Add patient testimonial section | Team, Afvallen, Medicatie | Social proof across funnel |
| 21 | Team member profile pages with booking | Team | Direct conversion from trust to action |
| 22 | Video introductions per team member | Team | Highest engagement lift — requires production |
| 23 | Exit-intent popup for Afvallen/Medicatie | Afvallen, Medicatie | Recover abandoning visitors |

---

*End of audit. All recommendations are prioritized by expected conversion impact and implementation effort.*
