# UX/UI + CRO Audit

## Scope
Pages audited:
- Botox
- Fillers
- BBL (Shape)
- Cursus

Method used for every page element:
1. Element and purpose
2. Effectiveness evaluation
3. Improvement suggestions

---

## Botox Page Audit

### Page-level CRO Read
The Botox page already uses a strong guided funnel (select zone -> choose date -> fill details -> checkout). Conversion intent is clear, but several high-impact trust and confidence opportunities are still underused (before/after proof, stronger pricing rationale, richer objection handling).

| Element | Element and Purpose | Effectiveness Evaluation | Improvement Suggestions |
|---|---|---|---|
| Hero section (label, headline, subcopy, primary CTA) | Purpose: establish service value fast, reduce uncertainty, and push users into consult/booking flow. | Strong clarity and clean hierarchy. The promise "natural result" and "microdosering" aligns with user intent (fear of overdone outcome). Minor friction: CTA competes with downstream booking flow and does not set expectation for next step. | Add a micro-commitment under CTA: "Free consult, 2 min request, no obligation". Add secondary CTA that scrolls directly to zone selector for high-intent users. Test CTA copy: "Start met zones kiezen" vs "Plan Gratis Consult". |
| Hero background image | Purpose: emotional framing and treatment relevance. | Visually supportive but low informational value. Does not prove clinical quality or outcomes. | Replace or alternate with real in-clinic treatment context image. A/B test with "doctor + patient consult" image for trust uplift. |
| Trust pillars (BIG, natural result, free follow-up, safe/transparent) | Purpose: reduce perceived medical risk and build credibility. | Good content and icon legibility. The section is trustworthy but generic; lacks quantifiable proof. | Add verifiable proof lines per pillar (example: "BIG-nummer zichtbaar", "X+ behandelingen", "controle binnen 14 dagen gegarandeerd"). Link to team credentials from the pillar row. |
| Quick info badges (time, duration, downtime, follow-up) | Purpose: answer practical objections quickly and reduce cognitive load. | Efficient summary, easy scan. "3-6 months" and "no downtime" strongly support decision-making. | Add one badge for "Result visible in X days" and one for "Vanaf EUR90 per zone" to anchor both timing and price expectation in first screen depth. |
| 3-step process block | Purpose: explain journey and reduce process anxiety. | Very effective for first-time users. Sequence is logical and friendly. | Add estimated total timeline (request to treatment window). Add "what happens if I am not suitable" microcopy to increase perceived honesty. |
| Interactive Botox face map | Purpose: make selection intuitive, educate users by face zone, increase engagement. | High engagement potential and strong UX differentiation. Possible friction on mobile if users do not understand click behavior immediately. | Add helper text on first interaction: "Tap a zone to see details". Add subtle pulse animation to first recommended zone. Include "most chosen" chips for social proof. |
| Zone selector grid | Purpose: convert exploration into concrete intent via selectable treatments. | Good clarity and feedback states. Price visibility is useful. Potential friction: many zones have similar prices, reducing differentiation and perceived rationale. | Add short "best for" snippet per zone in collapsed state. Add sort/filter toggles (most popular, upper face, lower face). Add zone bundles (2-zone and 3-zone packages) for higher AOV and simpler choice. |
| Treatment cart (inline/sticky) | Purpose: maintain progress visibility, show value, and move user to next step. | Strong conversion mechanic. Persistent total helps commitment. | Add estimated session duration based on selected zones. Add reassurance line near CTA: "Aanpassen kan nog bij consult". Add trust microcopy under total: "No payment yet" if applicable. |
| Floating cart badge | Purpose: keep booking progress available while scrolling. | Good mobile utility. Can feel noisy if always present at high visual weight. | Reduce visual prominence until at least one zone selected. Add small "n" badge animation only on state change, not persistent pulse. |
| Date selector step | Purpose: force concrete commitment and establish scarcity. | Strong intent qualifier. Capacity logic is good for urgency. Friction risk: date appears only after other steps, so users cannot quickly check availability first. | Add "Bekijk eerst beschikbare tijden" text link earlier in flow. Show "Most selected slots" or "Almost full" labels to create ethical urgency. |
| Details form | Purpose: collect lead/order data for checkout. | Validation is robust. Friction: date of birth can feel sensitive and can reduce completion for cosmetic users unless explained. | Add reason microcopy under DOB: "Required for medical safety screening". Enable progressive validation with friendlier error language. Add checkbox for WhatsApp updates to improve recontact conversion. |
| Testimonials section | Purpose: reduce risk perception through social proof. | Helpful but placement is late. If users bounce early, they never see it. | Surface 1-2 testimonial snippets above zone selector. Add treatment-specific testimonials (forehead, crow's feet, etc.). Add timestamped review recency where possible. |
| FAQ accordion | Purpose: resolve objections and unblock indecisive users. | Good baseline but too short for a high-consideration medical service. | Expand to 8-12 questions including side effects, contraindications, aftercare mistakes, botox/fillers difference, pricing expectations, and emergency contact path. |
| Availability section | Purpose: operational clarity and scheduling expectation. | Useful but passive. Does not push action strongly enough. | Add direct CTA next to availability text: "Kies uw zaterdag-slot". Include expected response SLA (example: "we respond within 2 hours on business days"). |
| Bottom CTA | Purpose: recover users who scrolled without converting. | Good fallback but generic. Could be stronger with personalized relevance. | Add dynamic summary if zones selected (example: "You selected 2 zones - continue"). If no selection, present two options: "Start selectie" and "Plan consult". |

### Botox Priority Experiments
1. Add before/after gallery above FAQ.
2. Add bundle pricing cards in zone selector.
3. Move one testimonial block higher (above booking module).
4. Add DOB explanation microcopy in form.
5. Add availability preview earlier in flow.

---

## Fillers Page Audit

### Page-level CRO Read
The page is visually rich and premium, with strong educational storytelling and a robust booking path. The main gap is conversion focus: content quality is high, but decision acceleration can improve through stronger proof, clearer package logic, and strategic CTA hierarchy.

| Element | Element and Purpose | Effectiveness Evaluation | Improvement Suggestions |
|---|---|---|---|
| Hero section with dual CTA | Purpose: frame offer and split visitors between consult path and direct booking path. | Strong first impression and clear value proposition. Two CTAs are useful, but hierarchy can confuse uncertain users. | Make primary CTA context-aware: if user came from ad with booking intent, show "Book Fillers Now" first. Keep consult as secondary for colder traffic. |
| Hero copy (natural, micro-dosing) | Purpose: address top fear (overfilled look) and emphasize subtle outcomes. | Excellent positioning and aligned with aesthetic intent. | Add one measurable trust line: "X+ filler treatments per year". Include short clinician quote for authority. |
| Treatment map grid (9 zones with prices) | Purpose: simplify discovery and show treatment breadth. | Very useful and scannable. Pricing transparency is strong. Friction: equal card weight may overwhelm first-time users. | Add "Recommended for first session" grouping. Pre-highlight top 3 requested zones. Add "compare zones" quick interaction. |
| Facial zones overview cards | Purpose: teach indications and help users self-identify concerns. | Good educational clarity, especially for non-expert users. | Add mini before/after thumbnails per zone to bridge information -> confidence. |
| Liquid BBL highlight card | Purpose: cross-sell adjacent service and increase average order value. | Good business intent, but can distract from primary fillers conversion if introduced too early. | Move Liquid BBL teaser lower, after user engages with filler selection. Keep as secondary card with "Not sure?" framing. |
| Zone selector + cart booking module | Purpose: convert interest into concrete treatment selection and checkout progression. | Strong structure and interaction quality. | Add "starter package" option (example: lips + smile lines). Include real-time estimated appointment length and immediate visual savings if bundle selected. |
| What-are-fillers editorial section | Purpose: explain mechanism and reduce fear around product safety. | Clear and valuable, but somewhat long for action-focused users. | Add concise bullet summary at top: "What it is / how long / reversibility / downtime" before paragraph text. |
| Philosophy section (natural results) | Purpose: brand differentiation and expectation setting. | Strong brand tone, but not directly conversion-driving without evidence. | Add outcome examples: "Subtle lip hydration, not volume-heavy". Link to relevant case examples. |
| Safety and quality section | Purpose: handle safety objections and prove medical standards. | Well written and reassuring. Good checklist format. | Add product brands used and why selected. Add emergency protocol statement and post-treatment contact process. |
| Process timeline | Purpose: reduce procedural uncertainty and explain next steps. | Good clarity and pacing. | Add expected duration per step and "decision points" where users can pause or decline. This increases trust by showing no pressure. |
| Aftercare section | Purpose: set realistic recovery expectations and prevent post-treatment regret. | Helpful and practical. | Add downloadable aftercare PDF and "common normal reactions by day" visual card. |
| Treatment catalog section | Purpose: SEO depth and user self-navigation to specific services. | Useful for long-tail search and exploration. Could dilute booking focus if too broad. | Add sticky side CTA while browsing catalog. Add "book this treatment" CTA on each catalog item, not only at section level. |
| Bottom CTA section | Purpose: capture late-stage intent and recover non-converters. | Good copy and no-obligation framing. | Add urgency + certainty pair: "Free consult this week" + "no treatment commitment". Add trust badge row beneath button. |
| Floating cart | Purpose: persistent progression for multi-zone selection behavior. | Strong utility, especially mobile. | Add tiny summary in collapsed state: "2 zones | EUR750" to remind value and reduce drop-off. |

### Fillers Priority Experiments
1. Introduce beginner bundles with visible savings.
2. Add treatment-specific before/after strips in zone cards.
3. Reorder Liquid BBL teaser lower in page.
4. Add clinician authority snippets near hero.
5. Add per-item "book now" in catalog.

---

## BBL (Shape) Page Audit

### Page-level CRO Read
The page is persuasive and safety-led, which is crucial for this category. It does an excellent job reframing non-surgical BBL as safer than surgery. Biggest opportunity: tighten focus because the page currently mixes multiple treatments (BBL, eyelid correction, double chin), which can dilute intent and reduce decision momentum.

| Element | Element and Purpose | Effectiveness Evaluation | Improvement Suggestions |
|---|---|---|---|
| Hero section with safety framing | Purpose: establish differentiated position (safe alternative to surgery). | Very strong message-market fit and clear emotional hook. | Add one quantified safety signal (example: complication rate disclosure policy or protocol adherence statement). |
| Hero trust badges (BIG, medical certification, specialists) | Purpose: immediate authority and risk reduction. | Effective and relevant for high-risk perceived treatment. | Add click-through to clinician profiles and clinic certifications for verification depth. |
| Hero CTA pair (book consult, view prices) | Purpose: serve both exploratory and high-intent users. | Strong dual-path structure. | Add sticky top mini-CTA after scroll: "Book consult" and "See candidacy" for faster movement to key decisions. |
| Pricing section (multiple treatments/variants) | Purpose: transparency and upsell/cross-sell. | Transparent pricing is good; however, mixed categories create cognitive branching and can weaken BBL-specific conversion. | Split into tabs: "BBL", "Eyelid", "Double Chin" with BBL default. Keep non-BBL as optional "related procedures" lower on page. |
| Interactive treatment selector | Purpose: convert exploration to selection and cart action. | Useful for intent capture. | Add "Best for your goal" wizard (3 questions) to recommend one variant. Reduces analysis paralysis. |
| Booking flow (date -> details -> payment) | Purpose: structured conversion with clear commitments. | Solid technical flow. Friction: users may want to know candidacy before choosing date. | Add pre-check gate: quick eligibility quiz before slot selection. If not eligible, redirect to consult instead of payment path. |
| Introduction section (science/beauty narrative) | Purpose: educate and emotionally prime users. | Strong brand storytelling but long-form copy may delay action for hot traffic. | Add summary card "In 30 seconds" with key facts: method, downtime, duration, longevity, reversibility. |
| Safety comparison (surgical vs filler BBL) | Purpose: overcome fear through direct contrast and risk reframing. | One of the strongest CRO assets on page. Clear contrast and high persuasive value. | Add citation-style sources for claims and include "who should NOT do this" for credibility and ethical trust. |
| Credentials section | Purpose: reinforce professional legitimacy and medical standards. | Strong trust reinforcement. | Add real names/photos of practitioners and direct links to registration details for proof depth. |
| Method section (3 visual steps) | Purpose: procedural transparency and confidence-building. | Clear flow and visually engaging. | Add exact time estimates and discomfort scale per step. This reduces uncertainty and helps self-qualification. |
| Benefits grid (6 cards) | Purpose: articulate practical value and differentiation. | Good breadth of benefits. Risk: some claims can feel promotional without context. | Pair each benefit with a short qualifier (example: "results vary by anatomy"). Improves credibility and reduces expectation mismatch. |
| Candidate section + BMI calculator | Purpose: self-qualification and lead quality improvement. | Excellent conversion filter and trust builder. One of the page's highest-quality components. | Add clear pass/fail guidance after calculator result with next best action (book, consult, or alternative treatment). |
| Recovery timeline | Purpose: set realistic expectations and reduce post-purchase anxiety. | Strong and concrete. Supports informed consent behavior. | Add compact visual "what is normal" vs "contact clinic" warning signs to reduce aftercare confusion. |
| Aftercare section | Purpose: post-treatment readiness and compliance. | Useful and clear. | Add printable/downloadable aftercare checklist and WhatsApp support option. |
| FAQ section | Purpose: close final objections. | Underdeveloped for a high-consideration service (too few questions). | Expand to at least 10 questions: pain, contraindications, longevity by product, migration risk, touch-up policy, and refund/revision policy. |
| Final CTA section | Purpose: final conversion push at end of long page. | Visually strong and motivating. | Add social proof strip above CTA: "recent consult bookings" or verified review average to strengthen final intent. |
| Floating cart | Purpose: persistent booking context across long page scroll. | Strong functional support for long-form page. | Add summary + primary next action text in collapsed state (example: "1 treatment selected - choose date"). |

### BBL Priority Experiments
1. Separate BBL pricing from non-BBL procedures via tabs.
2. Add candidacy mini-quiz before booking slot selection.
3. Expand FAQ significantly for risk/eligibility objections.
4. Add evidence references to safety comparison claims.
5. Add practitioner-level credential links.

---

## Cursus Page Audit

### Page-level CRO Read
The Cursus page is structurally strong and already close to a high-converting education sales page. It has excellent audience targeting (BIG doctors), robust curriculum detail, and operational clarity. Main opportunities are urgency mechanics, stronger proof of outcomes, and reducing registration friction.

| Element | Element and Purpose | Effectiveness Evaluation | Improvement Suggestions |
|---|---|---|---|
| Hero section (headline, social proof, dual CTA) | Purpose: position offer for doctors only and drive immediate registration/program view. | Strong relevance and clean value proposition. Good authority framing. | Add one outcome KPI in hero (example: "X% started treating within 30 days"). This ties training to career/practice impact. |
| Hero social proof (150+ doctors, stars) | Purpose: quick trust and popularity signal. | Good at first glance but still generic without source context. | Add short proof basis: "based on alumni records" or "post-course survey". Include link to alumni testimonials anchor. |
| Highlights cards (4) | Purpose: rapid value communication for scanners. | Effective scan section with clear educational promise. | Add one card focused on business outcome (pricing strategy, patient communication, retention impact). |
| Audience + requirements section | Purpose: pre-qualify leads and avoid unqualified applications. | Clear and useful, especially in regulated setting. | Add explicit "not eligible" line to reduce wasted submissions and increase seriousness. |
| Learning outcomes (8 numbered cards) | Purpose: show concrete skills participants gain. | Excellent specificity; high trust for medical education audience. | Add "assessment method" microcopy (how competence is evaluated). Include one mini clinical case example. |
| Curriculum accordion (6 modules with time slots) | Purpose: provide schedule transparency and prove depth. | Very strong and likely conversion-positive for professionals. | Add estimated hands-on ratio (example: "40% practice") and model count details. Include downloadable PDF program. |
| Instructor profile + credentials | Purpose: transfer authority and reassure course quality. | Strong section with relevant credentials and metrics. | Add short video intro from instructor for authenticity and stronger personal trust. |
| Testimonials (3 doctors) | Purpose: social proof from peers with similar background. | Good quality and role relevance. Could be broader by specialty diversity. | Add 3-5 more testimonials segmented by specialty (GP, dermatologist, cosmetic physician). Include treatment volume outcomes post-course. |
| Available dates cards with capacity bars | Purpose: create urgency and guide seat selection. | Strong urgency mechanic and clear status visuals. | Add exact seats left (example: "2/8 seats left") and countdown for early-bird expiry. |
| Registration form (fields, validation, honeypot, terms) | Purpose: capture qualified leads/applications reliably. | Validation quality is high. Friction points: many required fields before trust is fully established for some users. | Convert to 2-step form: step 1 contact basics, step 2 professional details. Keep selected date sticky at top during form completion. |
| Pricing card (EUR2500, early bird, inclusions) | Purpose: anchor value and justify price with deliverables. | Strong value stack and clear offer composition. | Add payment plan calculator (example: 2 installments) and compare "market benchmark" to justify premium. |
| Course FAQ (6 items) | Purpose: resolve operational concerns before submission. | Good baseline coverage. | Add FAQ on legal scope, insurance implications, and post-course supervision limits. |

### Cursus Priority Experiments
1. Add exact seats-left counters and deadline countdown.
2. Switch to 2-step registration flow.
3. Add measurable alumni outcomes section.
4. Add downloadable curriculum PDF near module list.
5. Add instructor video snippet above registration block.

---

## Cross-Page CRO Opportunities (High Impact)

| Opportunity | Why it matters | Where to implement first |
|---|---|---|
| Expanded objection-handling FAQs | Reduces hesitation and support load | BBL and Botox pages first |
| Package/bundle offers | Increases AOV and simplifies choices | Botox and Fillers booking modules |
| Early visibility of availability | Helps high-intent users decide faster | Botox and BBL pages |
| Stronger proof-backed trust claims | Improves credibility and lowers skepticism | All four pages |
| Dynamic CTA based on user state | Improves conversion from repeat scrollers | Botox/Fillers/BBL bottom CTAs |
| Lead capture fallback for non-bookers | Saves abandoning users | All pages via exit-intent or sticky mini-form |

---

## Suggested A/B Test Backlog (Ordered)

1. Add treatment bundles with visible savings (Botox, Fillers).
2. Add exact seats-left + countdown (Cursus).
3. Split mixed pricing categories into tabs (BBL page).
4. Add expanded FAQ with contraindications and risk responses (Botox, BBL).
5. Add 2-step form flow vs current single form (Cursus).

---

## Implementation Notes

- Prioritize mobile-first CTA clarity and sticky progression controls.
- Keep medical compliance language explicit where data is requested (DOB, health criteria).
- Track funnel events per step:
  - Hero CTA click
  - Zone/treatment selected
  - Date slot viewed
  - Date slot selected
  - Form start
  - Form submit
  - Checkout redirect success

This event schema is needed to validate which recommendations create measurable uplift.
