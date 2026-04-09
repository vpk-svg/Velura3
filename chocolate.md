# UX / CRO Element-by-Element Audit — Botox, Fillers, BBL & Cursus

> **Auditor:** UX/UI & Conversion Rate Optimization Expert  
> **Pages analysed:** `/botox`, `/fillers`, `/shape` (BBL), `/cursus`  
> **Date:** 9 April 2026

---

## Table of Contents

1. [Botox Page](#1-botox-page)
2. [Fillers Page](#2-fillers-page)
3. [BBL / Shape Page](#3-bbl--shape-page)
4. [Cursus Page](#4-cursus-page)
5. [Cross-Page Observations](#5-cross-page-observations)

---

## 1. Botox Page

### 1.1 Hero Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Full-width dark hero with background image, pre-heading label, H1 ("Botox voor een *natuurlijk resultaat*"), description, and a single CTA ("Plan Gratis Consult"). Intended to immediately communicate the treatment proposition and drive consult booking. |
| **Effectiveness** | The headline is clear and addresses the #1 fear (unnatural results). The dark overlay keeps text legible. However, the hero relies on a single CTA with no secondary action and no social proof near the fold. Users who aren't ready to book have no lower-commitment next step. |
| **Improvements** | **①** Add a secondary ghost/outline CTA (e.g., "Bekijk Zones & Prijzen") that anchors to the zone selector, giving hesitant visitors a next step. **②** Add 1-2 micro trust signals below the CTA row (e.g., "★ 4.9 Google — 120+ reviews" or "BIG-geregistreerd"). **③** Add a price anchor in the hero ("Vanaf €90 per zone") so visitors immediately understand cost. |

### 1.2 BotoxFaceMap (Interactive Face Map)

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | An interactive clickable face illustration that lets users tap zones and add them to their cart. Placed directly after the hero. Purpose: engage users and make zone selection feel personalised. |
| **Effectiveness** | Strong engagement element — interactive tools increase time on page and reduce bounce. Placement right after the hero is good. |
| **Improvements** | **①** Add a brief explainer micro-copy above the map ("Klik op een zone om meer te lezen & toe te voegen"). First-time visitors may not realise the face is clickable. **②** Show a quick tooltip on hover with zone name + price preview to reduce clicks-to-info. |

### 1.3 Trust Indicators + Quick Info Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | 4 quick-info badges (duration, effect timeline, recovery, check-up) + 4 trust pillars (certified, natural, follow-up, safe). Purpose: reduce anxiety and set practical expectations. |
| **Effectiveness** | Information is relevant but the two blocks (badges and pillars) compete visually. Quick info badges mix filled/unfilled styles with no clear hierarchy. All 4 trust pillars use identical visual treatment, reducing scannability. |
| **Improvements** | **①** Consolidate the quick-info badges into a single horizontal "Treatment Facts" strip with consistent styling for faster scanning. **②** Differentiate one trust pillar visually — e.g., make "BIG-geregistreerd artsen" more prominent with a different background to anchor credibility. **③** Link the "Gratis controle" trust pillar to a CTA or FAQ answer for users who want detail. |

### 1.4 How It Works (Process Steps)

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Three-step process (Consult → Treatment → Follow-up) with numbered badges, icon areas, and description cards connected by a dashed line. Purpose: demystify the journey and reduce uncertainty. |
| **Effectiveness** | Clear visual metaphor. The dashed connector line on desktop communicates progression well. Cards are well-structured. However icon areas use large placeholder areas (aspect-video divs with just an icon) that feel empty. |
| **Improvements** | **①** Replace the icon-only "aspect-video" area with a short contextual image or subtle illustration to add warmth. **②** Add a micro-CTA after step 3 ("Start bij stap 1 → Plan uw consult") to create a clear conversion path after reading the steps. |

### 1.5 Zone Selector + Cart

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Interactive zone picker (checkboxes/cards) on the left 2/3, sticky cart summary on the right 1/3. A "Proceed" button appears when items are selected. Purpose: enable self-service zone selection and drive checkout. |
| **Effectiveness** | Strong e-commerce pattern. The sticky cart is good UX on desktop. The "Proceed" button only appears after selection — this is correct but the button could be more visible. |
| **Improvements** | **①** Show an empty-state message in the cart area when nothing is selected (e.g., "Selecteer een zone om te beginnen"), otherwise the blank cart area looks broken. **②** Display running total prominently in the cart header. **③** Add a "Meest gekozen" or "Popular" badge on the most-booked zones to guide undecided visitors (social proof + anchoring). |

### 1.6 Date Selection Step

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | BookingSlotSelector appears after clicking "Proceed", allowing Saturday date selection. Purpose: lock in a specific appointment. |
| **Effectiveness** | Good progressive disclosure — only shown after zone selection. However, the section heading says "Kies uw zaterdag", which assumes all slots are Saturdays. If other days become available, the copy is broken. |
| **Improvements** | **①** Use generic date language ("Kies uw gewenste datum") unless Saturday-only is permanent. **②** Show scarcity signals on nearly-full dates ("Nog 2 plekken"). **③** Allow users to go back to the zone selector without losing state. Currently no visible "back" button. |

### 1.7 Details Form

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Customer details form (name, email, phone, etc.) inside a glassy card. Submits to Stripe checkout. Purpose: capture booking details and create payment intent. |
| **Effectiveness** | Clean presentation. The glass card provides visual separation. |
| **Improvements** | **①** Add a progress indicator (Step 1: Zones ✓ → Step 2: Datum ✓ → Step 3: Gegevens) so users know where they are in the funnel. **②** Show a mini order summary/total at the top of the form for reassurance. **③** Add a "100% veilig — Stripe beveiligd" badge near the submit button. |

### 1.8 Testimonials Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Shared `<Testimonials />` component. Purpose: social proof. |
| **Effectiveness** | Present and placed after the conversion section, which is correct for reassurance. |
| **Improvements** | **①** Consider also placing 1-2 testimonial quotes inside or near the hero to front-load social proof for users who never scroll to the testimonials section. **②** Ensure reviews are Botox-specific, not generic clinic reviews. |

### 1.9 FAQ Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | 4-item accordion with common Botox questions. Purpose: reduce friction by answering objections. |
| **Effectiveness** | Only 4 questions may feel thin. The accordion pattern is familiar and works well. |
| **Improvements** | **①** Expand to 6-8 questions; add "Doet Botox pijn?", "Wat zijn de risico's?", and "Kan ik na de behandeling direct doorwerken?" — these are the top search queries for Botox. **②** Add FAQ structured data (`FAQPage` schema) for rich snippets — currently only `MedicalProcedure` schema is present. **③** Add a "Vraag niet beantwoord? Neem contact op" link below the FAQ. |

### 1.10 Availability Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Simple text block with a calendar icon indicating availability info. Purpose: inform about scheduling. |
| **Effectiveness** | Very passive — no CTA, no link, no action. Just informational text in a card. |
| **Improvements** | **①** Turn this into an actionable section with a "Bekijk beschikbare data" or "Plan direct" button. **②** Consider merging this info into the hero or the date-selection step to reduce page length. |

### 1.11 Bottom CTA

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Shared `<BottomCta />` component. Final conversion prompt. |
| **Effectiveness** | Good to have a closing CTA, typical best practice. |
| **Improvements** | **①** Use Botox-specific copy rather than generic clinic copy. Repeat the key value prop ("Gratis consult — geen verplichtingen"). |

### 1.12 Floating Cart

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Sticky/floating bottom bar showing selected zones and a "Proceed" button. Purpose: persistent access to cart on mobile. |
| **Effectiveness** | Excellent mobile UX pattern. Keeps the conversion action always visible. |
| **Improvements** | **①** Display the total price in the floating cart bar for immediate price visibility. **②** Consider adding a subtle pulse animation when a new zone is added to draw attention. |

---

## 2. Fillers Page

### 2.1 Hero Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Full-viewport (min-h-[85vh]) hero with background image, H1 ("Fillers *bij FAB Clinic*"), description, dual CTAs (Consult + "Direct Boeken"), and a scroll indicator animation. Purpose: communicate filler proposition and drive either consult or direct booking. |
| **Effectiveness** | The dual CTA is a major improvement over the Botox hero — it serves both warm and hot leads. The scroll indicator is a nice touch for engagement. However, the H1 accent "bij FAB Clinic" is brand-focused, not benefit-focused. |
| **Improvements** | **①** Change H1 accent from "bij FAB Clinic" to something benefit-driven like "voor natuurlijk volume" or "met zachte precisie". Brand name is already in the navbar/logo. **②** Add a price anchor ("Vanaf €XX") in the hero. **③** Add a micro social-proof element (rating + review count). |

### 2.2 Treatment Map Grid (TreatmentMapGrid)

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Clickable zone-based treatment map with popup detail + "Add to Cart". Listed directly after hero. Purpose: help users explore filler zones visually. |
| **Effectiveness** | Excellent interactive element for discovery. Combined with the popup, it provides progressive disclosure. |
| **Improvements** | **①** Display "starting from" pricing on each zone card to reduce the need for clicking. **②** Highlight the most popular zones with a visual badge. |

### 2.3 Treatment Zones Section (Face Zones Grid)

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | 5 face-zone cards (lips, jawline, cheeks, chin, tear trough) + 1 highlighted "Liquid BBL" card. Purpose: educate about available zones with icons and descriptions. |
| **Effectiveness** | Well-structured grid. The BBL highlight card stands out with its dark background — good visual hierarchy. However, this section partially duplicates the Treatment Map Grid above — visitors see zone info twice. |
| **Improvements** | **①** Remove or merge the zones grid with the TreatmentMapGrid to eliminate duplicate content. Two separate zone-browsing sections create confusion about which one leads to booking. **②** If kept, add "Voeg toe" (Add) buttons to the face-zone cards to make them actionable rather than purely informational. |

### 2.4 "What Are Fillers" Editorial Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Split layout with a large image on the left and explanatory text on the right. Purpose: educate visitors unfamiliar with fillers. |
| **Effectiveness** | Good for SEO and for colder visitors. The image adds credibility. |
| **Improvements** | **①** Add a "Veelgestelde vragen over fillers" anchor link from this section to the FAQ / or a mini-CTA. Currently it's purely informational with no exit path. **②** Keep the section concise — visitors who clicked from the treatment map already know what fillers are. Consider making this section collapsible or moving it below the booking section. |

### 2.5 Natural Results Philosophy

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | 3-item philosophy grid (hyaluronic, natural look, feather-light). Purpose: address the "overdone" fear. |
| **Effectiveness** | Addresses the #1 filler objection. Centered text with icons is clean. |
| **Improvements** | **①** Use before/after imagery or an illustration to make the "natural results" claim tangible rather than just textual. **②** This section and the "What Are Fillers" section both have no CTA — add a subtle call-to-action between these educational sections ("Benieuwd naar uw mogelijkheden? → Gratis consult"). |

### 2.6 Safety & Quality Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Reversed split layout with product image and safety checklist (4 items). Purpose: build trust around product quality. |
| **Effectiveness** | Strong trust builder. ShieldCheck icons reinforce safety visually. |
| **Improvements** | **①** Name the specific brands/products used (e.g., "Juvederm", "Restylane") — brand recognition builds trust. **②** Add a small certification logo or badge image if available. |

### 2.7 Process Steps

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | 3-step timeline (identical pattern to Botox). Purpose: demystify the filler journey. |
| **Effectiveness** | Consistent with Botox page. Clear and functional. |
| **Improvements** | Same as Botox: **①** Add contextual imagery instead of icon-only areas. **②** Add a micro-CTA after the steps. |

### 2.8 Aftercare Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | 2×2 card grid with aftercare tips. Purpose: set recovery expectations and build trust through transparency. |
| **Effectiveness** | Good proactive information. Placed after process steps is logical. |
| **Improvements** | **①** Consider opening with "Wat u kunt verwachten" as a subheading to set expectations rather than just listing instructions. **②** Minor: 4 items in a 2×2 grid may look sparse — consider inline list or add 1-2 more tips. |

### 2.9 Zone Selector + Cart

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Same pattern as Botox with ZoneSelector + TreatmentCart. Anchor id="book". Purpose: conversion mechanism. |
| **Effectiveness** | The `scroll-mt-24` ensures the section title is visible when linked from the hero. |
| **Improvements** | **①** Same as Botox: empty-state message, running total, "Meest gekozen" badge. **②** Critical: the cart column is NOT sticky (`space-y-6` but no `lg:sticky`). This means on desktop the cart scrolls out of view. **Add `lg:sticky lg:top-28 self-start`** to match the Botox implementation. |

### 2.10 Treatment Catalog

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | `<TreatmentCatalog>` component showing full filler menu with localized data. Purpose: complete pricing transparency. |
| **Effectiveness** | Good for comparison shoppers and SEO. Placement after the booking section means motivated users have already converted; only browsers reach this. |
| **Improvements** | **①** Move this section ABOVE the zone selector + cart. Visitors need to see pricing BEFORE committing to add zones. Current placement means the user selects zones without knowing full prices. **②** Add direct "Toevoegen" (Add to cart) buttons per treatment in the catalog. |

### 2.11 Bottom CTA

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Dark section with ConsultTrigger. Fillers-specific copy. Purpose: final conversion push. |
| **Effectiveness** | Good — uses fillers-specific copy unlike the shared BottomCta on Botox. |
| **Improvements** | **①** Add urgency or scarcity ("Beperkte beschikbaarheid deze maand"). **②** Repeat social proof ("500+ behandelingen uitgevoerd"). |

### 2.12 Floating Cart

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Same FloatingCart as Botox. |
| **Effectiveness** | Good mobile UX. |
| **Improvements** | Same as Botox — show total price. |

---

## 3. BBL / Shape Page

### 3.1 Hero Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Full-viewport (min-h-[90vh]) hero with dual CTAs ("Gratis Consult Inplannen" + "Bekijk Prijzen"), trust badges (BIG, safe, specialist), and a detailed description. Purpose: introduce the non-surgical BBL and immediately differentiate from surgical alternatives. |
| **Effectiveness** | This is the strongest hero of all four pages. Trust badges in the hero address the safety concern immediately. Dual CTAs serve different intent levels. The distinction "veilig alternatief" in the label is on-point for keyword and objection handling. |
| **Improvements** | **①** The hero background image filename suggests a generic stock photo. Use a curated, clinic-specific image if available for authenticity. **②** Add a price anchor ("Vanaf €X.XXX") since BBL is an expensive treatment and price transparency reduces bounce. **③** Consider adding a "Vergelijk met chirurgische BBL" link that jumps to the safety comparison section. |

### 3.2 Treatment Pricing Cards

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Per-treatment cards with variant names, prices (€ X.XXX), and "Book" CTA (ConsultTrigger). Looped for each SHAPE_TREATMENT. Purpose: transparent pricing and conversion. |
| **Effectiveness** | Clear, scannable pricing. Each card has a CTA. Placed immediately after the hero — good for price-conscious visitors. |
| **Improvements** | **①** Add a "Populair" or "Meest gekozen" badge on the most-booked variant. **②** Show payment plan option on higher-priced variants (e.g., "of €XX/maand") to reduce price shock. **③** Add brief 1-liner per variant card describing what's included. |

### 3.3 TreatmentMapGrid (Interactive Selector)

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Interactive card grid with popup detail and add-to-cart, similar to the Fillers page. Purpose: visual discovery and cart building. |
| **Effectiveness** | Consistent UX pattern across treatment pages. |
| **Improvements** | **①** Due to the preceding static pricing cards, users may wonder why they are seeing pricing info twice. Either remove the static cards and rely solely on the interactive map, or make the static cards link to the interactive selector. |

### 3.4 Safety Comparison Section (Surgical vs. Filler BBL)

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Side-by-side comparison of surgical BBL (high risk) vs. FAB Clinic filler BBL (low risk), inside a dark card. Purpose: address safety fears — the #1 BBL objection. |
| **Effectiveness** | Excellent conversion driver. The visual contrast (muted surgical card vs. vibrant gold filler card) clearly communicates the safer option. The terracotta-coloured risk label for surgical is a smart negative visual cue. |
| **Improvements** | **①** Move this section HIGHER — ideally just after the hero and before pricing. Safety is the #1 objection; address it before asking for money. **②** Add specific statistics (e.g., "Chirurgische BBL: 1 op 3.000 mortaliteitsrisico" vs. "Filler BBL: 0 meldingen van ernstige complicaties bij FAB Clinic") for concreteness. **③** Add a CTA at the bottom of this section ("Overtuigd? Plan uw consult"). |

### 3.5 Credentials Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | 4 credential cards (BIG, facility certification, protocol, screening). Purpose: institutional trust building. |
| **Effectiveness** | Important for a higher-risk treatment like BBL. Communicates medical seriousness. |
| **Improvements** | **①** Show actual BIG registration number or link to the BIG register for verifiability. **②** Add a photo of the clinic/treatment room to make the "facility" credential tangible. |

### 3.6 The Method (3 Staggered Cards)

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | 3 image-overlay cards with step numbers showing the treatment method. Staggered vertical offset on desktop. Purpose: explain the procedure. |
| **Effectiveness** | Visually striking design. The large step-number watermarks add character. However, all three cards use the same background image (the generic BBL stock photo), which looks repetitive. |
| **Improvements** | **①** Use 3 different images — one per step (e.g., consultation photo, marking photo, injection photo). **②** The staggered offset (`md:mt-12`, `md:mt-24`) may confuse users into thinking order reads diagonally. Test with a standard horizontal layout if analytics show drop-off. |

### 3.7 Benefits Grid

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | 6 benefits with icons (no downtime, less pain, safe, minimal, duration, time). Purpose: highlight treatment advantages. |
| **Effectiveness** | Comprehensive and well-labelled. Icon-title-description pattern is clear. |
| **Improvements** | **①** "Duration" and "Time" sound similar — ensure the copy clearly differentiates them (e.g., treatment duration vs. how long results last). **②** Quantify benefits where possible ("Terug naar werk dezelfde dag" instead of "Geen downtime"). |

### 3.8 Candidate Section + BMI Calculator

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Checklist of candidacy criteria (BMI, age, health, expectations, non-smoker) + embedded BMI calculator. Purpose: pre-qualify visitors and filter unsuitable candidates. |
| **Effectiveness** | Excellent UX — the BMI calculator is an engagement tool that also serves a medical purpose. Interactive tools increase time on page. Checklist reducing consultation no-shows. |
| **Improvements** | **①** Add an outcome message to the BMI calculator (e.g., "Uw BMI = 24.5 — U komt in aanmerking!") with a direct CTA. **②** Turn the checklist into an interactive self-assessment with checkboxes the user can tick, ending with "U voldoet aan X/5 criteria → Plan uw consult". |

### 3.9 Recovery Timeline

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Vertical timeline (Day 1 → Week 1 → Week 2 → Month 1 → Month 3) with milestone descriptions. Purpose: set realistic expectations and reduce post-purchase anxiety. |
| **Effectiveness** | Transparent and thorough. The vertical timeline with dots is visually clean. Five milestones is the right amount of detail. |
| **Improvements** | **①** Add small icons per milestone to break up the text-heavy format. **②** Consider visual progress indicators (e.g., swelling % decreasing) for a more compelling presentation. |

### 3.10 Aftercare Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Two-column layout with numbered aftercare steps on the left and an image with overlay quote on the right. Purpose: build trust through care transparency. |
| **Effectiveness** | The quote overlay adds personality. The numbered steps are scannable. |
| **Improvements** | **①** On mobile, the quote block (`md:absolute md:-bottom-10 md:-right-10`) renders as a full-width block that may overlap or create unexpected spacing. Verify mobile rendering. **②** Include a downloadable aftercare PDF for users to reference post-treatment — this also captures emails. |

### 3.11 FAQ Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Accordion FAQ filtered to `category === 'shape'`. Purpose: SEO and objection handling. |
| **Effectiveness** | Filters from shared FAQ data — good for maintainability. |
| **Improvements** | **①** Add FAQ structured data schema for rich snippets. **②** Add the direct question "Is een BBL met fillers veilig?" as the first FAQ item — it's the top search query. **③** Add "Nog vragen?" CTA below the FAQ. |

### 3.12 Final CTA

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Large rounded dark card with H2, description, and dual CTAs (primary + secondary). Purpose: final conversion push. |
| **Effectiveness** | Visually impactful with the rounded-[3rem] card. Dual CTAs are good. |
| **Improvements** | **①** The secondary CTA ("Meer informatie") links to ConsultTrigger — same action as the primary. Give it a different destination (e.g., FAQ or WhatsApp). **②** Add a trust reinforcer ("Gratis en vrijblijvend — geen betalingsverplichtingen"). |

---

## 4. Cursus Page

### 4.1 Hero Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Split hero with text on the left (badge pill, H1 "Injectables cursus voor *BIG-geregistreerde artsen*", description, 5-star social proof, dual CTAs) and a hero image on the right. This is the only page with a two-column hero. Purpose: sell the course to medical professionals. |
| **Effectiveness** | The 2-column layout with the image is the best hero design of the four pages — it's more engaging than text-only. The pill badge, star rating, and dual CTAs are strong. The B2B audience (doctors) is clearly identified in the H1. |
| **Improvements** | **①** Add a price anchor in the hero ("Vanaf €X.XXX — inclusief certificaat"). Professionals evaluate ROI immediately. **②** Add the number of remaining seats if applicable ("Nog 4 plaatsen — 12 maart"). **③** The social proof text ("4.9 / 5 — 50+ deelnemers") should include the actual rating source. |

### 4.2 Highlights Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | 4 cards with icons (Shield, BookOpen, Users, Award) explaining course benefits. In a 2×2 grid. Purpose: quick overview of what makes this course unique. |
| **Effectiveness** | Clean visual summary. Cards are hoverable with slight translate effect. |
| **Improvements** | **①** 4 highlights is borderline thin for a premium course. Add 2 more (e.g., "Kleine groepen — max 6 deelnemers" and "Materialen en lunch inbegrepen"). **②** Make the icons more specific — "Shield" for a course benefit is ambiguous. |

### 4.3 Target Audience + Prerequisites

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | 2-column layout. Left: "Voor wie?" checklist with green checkmarks. Right: "Vereisten" with shield icons. Purpose: qualify visitors and set expectations. |
| **Effectiveness** | Excellent filtering section. Prevents unqualified sign-ups and saves admin time. Green vs. gold icon distinction is subtle but effective. |
| **Improvements** | **①** If someone doesn't meet prerequisites, there's no guidance on what to do (e.g., "Nog geen BIG-registratie? Bekijk onze andere opleidingen"). Add an alternative path. **②** The "Vereisten" title is hardcoded (`locale === 'nl' ? 'Vereisten' : 'Requirements'`) rather than translated — move to translation file for consistency. |

### 4.4 Learning Outcomes

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Numbered grid of outcomes in a 2-column layout. Each outcome in a small card with numbered circle. Purpose: tangible learning promise. |
| **Effectiveness** | Numbered circles are scannable and communicate progression. The explicit learning outcomes build confidence in course value. |
| **Improvements** | **①** Group outcomes into categories (e.g., "Anatomie & Veiligheid", "Techniek", "Praktijk") for easier scanning if there are >6 items. **②** Add "Na deze cursus kunt u..." as a lead-in to frame outcomes as capabilities. |

### 4.5 Curriculum Accordion

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Accordion with time slots, module titles, colour-coded tags (Theory/Demo/Break/Hands-on/Certificate), and descriptions. Purpose: give a detailed view of the course schedule. |
| **Effectiveness** | Excellent implementation. Time slots, tags, and accordion are the gold standard for course schedule presentation. Mobile-friendly tag display. Focus-visible states are properly implemented. |
| **Improvements** | **①** Show the first module expanded by default to give visitors a taste of the content without clicking. **②** Add total course duration in the section header ("Dagprogramma — 8 uur inclusief pauzes"). |

### 4.6 Instructor Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Left: instructor portrait image. Right: name, credential badges, bio, and 3 stat cards. Purpose: build trust through instructor authority. |
| **Effectiveness** | Strong trust builder. Credential badges (pills) clearly communicate qualifications. Stat cards with hover glow add interactivity. The image with gold hover shadow is on-brand. |
| **Improvements** | **①** Add a pull-quote from the instructor to humanise the section (e.g., a short statement about their teaching philosophy). **②** If the instructor has publications or media appearances, add a small "Bekijk in de media" link. **③** The stats should include what they measure (e.g., "500+ cursisten opgeleid" vs. just "500+"). Ensure `stat.labelKey` translations are descriptive. |

### 4.7 Testimonials (Course-Specific)

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | 3-column testimonial cards with quote icon, names, and roles. Uses `COURSE_TESTIMONIALS` data — course-specific, not shared. Purpose: peer social proof from other medical professionals. |
| **Effectiveness** | Course-specific testimonials are far more effective than generic clinic reviews. The role/title of the reviewer adds B2B credibility. |
| **Improvements** | **①** Add a photo or avatar per testimonial for authenticity. **②** If >3 testimonials are available, add a carousel or "Load more" to surface additional proof. **③** Add the reviewer's clinic or city for geographic relevance. |

### 4.8 Course Dates Section

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | 3-column date selection cards with `CourseDateCard` component. `role="listbox"` for accessibility. A "seats total" note below. Purpose: drive date selection which pre-fills the registration form. |
| **Effectiveness** | Strong UX — clicking a date scrolls to the form and pre-selects it. The listbox role is good for a11y. |
| **Improvements** | **①** Add remaining seat count per date card (e.g., "Nog 3 plaatsen" vs. "Vol"). This creates urgency and prevents users from selecting sold-out dates. **②** Add a "Nieuwe datum op aanvraag" option for when all dates are full. **③** Visually distinguish sold-out dates (greyed out + "Vol" badge). |

### 4.9 Course FAQ

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | Accordion FAQ using `COURSE_FAQ` data. Purpose: answer pre-purchase questions. |
| **Effectiveness** | Well-structured with proper aria attributes. |
| **Improvements** | **①** Add questions about cancellation policy, group size, and what to bring — common pre-purchase questions for professional courses. **②** Add FAQ schema for SEO. |

### 4.10 Sign-up Form + Pricing Card

| Aspect | Analysis |
|---|---|
| **Element & Purpose** | 2-column layout. Left: registration form with fields (name, email, phone, BIG, education, date, terms). Right: pricing card (gradient dark) with price, early-bird badge, inclusions list, and CTA. Below the pricing card: a course environment photo. Purpose: conversion point. |
| **Effectiveness** | The pricing card design is premium and compelling. The early-bird badge creates urgency. Inclusions list builds perceived value. The adjacent form placement reduces cognitive load. Honeypot spam protection is implemented correctly. BIG number validation is strict (9-11 digits) — appropriate for the audience. |
| **Improvements** | **①** The pricing card CTA ("Schrijf je in") scrolls to the form — but they're already side-by-side on desktop. Change the CTA to auto-focus the first form field instead. **②** Show the early-bird deadline date to increase urgency ("Early bird geldig t/m [datum]"). **③** Add a reassurance line near the submit button ("Uw gegevens worden beveiligd verwerkt. Annulering mogelijk tot 14 dagen voor aanvang."). **④** The form's Terms link and Privacy link both point to `/terms` — the Privacy link should point to `/privacy`. **⑤** Add a "Facturatie op bedrijfsnaam?" checkbox since the B2B audience may need invoicing. |

---

## 5. Cross-Page Observations

### 5.1 Page Section Order & Information Architecture

| Issue | Details |
|---|---|
| **Education before conversion** | On the Fillers page, the "What Are Fillers" and "Safety" educational sections appear AFTER the cart/checkout section. Users who scroll past the cart without converting encounter education too late. **Move educational/trust content ABOVE the cart section.** |
| **BBL Safety Comparison position** | The Safety Comparison (surgical vs. filler) is buried in the middle of the BBL page. This is the single most important section for conversions. **Move it to position #2 (right after the hero).** |
| **Consistent section ordering** | Each page has a slightly different section flow. Standardise to: Hero → Trust/Info → Education → Pricing → Selector/Cart → FAQ → CTA. |

### 5.2 Missing Elements Across Pages

| Missing Element | Impact | Pages Affected |
|---|---|---|
| **Before/After Gallery** | Component `BeforeAfterGallery` exists but is not used on any of these 4 pages. Before/after photos are the #1 conversion driver for aesthetic treatments. | Botox, Fillers, BBL |
| **Social proof in heroes** | Only Cursus has star ratings in the hero. The treatment pages lack social proof above the fold. | Botox, Fillers, BBL |
| **Price anchoring in hero** | None of the treatment pages show a "starting from" price in the hero section. Price is the #2 search query for all treatments. | Botox, Fillers, BBL |
| **WhatsApp / Quick Contact** | No visible WhatsApp or live-chat prompt on the treatment pages. For high-AOV treatments (BBL), a WhatsApp button can significantly increase conversions. | All 4 |
| **Exit-intent or scroll-depth trigger** | No mechanism to capture visitors who are about to leave without converting. Consider a gentle ConsultTrigger on scroll-depth (50%). | Botox, Fillers, BBL |
| **Video content** | No video integration on any page. A 30-second "What to Expect" video increases trust significantly for medical treatments. | All 4 |

### 5.3 Mobile-Specific Issues

| Issue | Details |
|---|---|
| **Fillers cart not sticky** | The Fillers ZoneSelector cart column lacks `lg:sticky lg:top-28 self-start`, unlike Botox. On desktop, the cart scrolls out of view. **Bug fix needed.** |
| **BBL quote overlap** | The aftercare quote uses `md:absolute md:-bottom-10 md:-right-10`, which may overflow its container on tablets. Test at 768-1024px breakpoints. |
| **Hero heights** | Heroes use different min-heights (Botox: `pt-40 pb-section-y`, Fillers: `min-h-[85vh]`, BBL: `min-h-[90vh]`). This inconsistency affects perceived loading speed and CLS on slower devices. Standardise to one approach. |

### 5.4 SEO & Schema

| Issue | Details |
|---|---|
| **FAQ schema missing** | Only the Botox page has `MedicalProcedure` JSON-LD. None of the pages have FAQ-page schema, which is a missed opportunity for rich snippets. Add `FAQPage` schema to all 4 pages. |
| **Fillers & Shape lack JSON-LD** | Only `BotoxPage` has structured data. Add `MedicalProcedure` JSON-LD for Fillers and `Course` JSON-LD for Cursus. |
| **Cursus lacks Course schema** | Add `Course` schema with `provider`, `offers`, `hasCourseInstance` for each date. This enables Google's course carousels. |

### 5.5 Top 5 Quick Wins (Highest Impact, Lowest Effort)

| # | Action | Expected Impact |
|---|---|---|
| 1 | **Add BeforeAfterGallery to Botox, Fillers & BBL pages** | +15-25% conversion uplift. Component already exists. |
| 2 | **Add social proof + price anchor to all heroes** | +10-15% reduction in bounce rate. Copy-only change. |
| 3 | **Move Safety Comparison section to just after BBL hero** | +10-20% consult form starts on BBL page. |
| 4 | **Fix Fillers cart stickiness** (add `lg:sticky lg:top-28 self-start`) | Bug fix. Prevents cart abandonment on desktop. |
| 5 | **Add FAQ schema to all 4 pages** | SEO quick win. 30 min development for rich snippet eligibility. |
