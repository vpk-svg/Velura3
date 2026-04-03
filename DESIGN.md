# Design System Documentation

## 1. Overview & Creative North Star: "The Editorial Sanctuary"

This design system is built to transform a clinical medical environment into an immersive, boutique hospitality experience. Our Creative North Star is **The Editorial Sanctuary**. We are moving away from the "utility-first" look of standard medical portals and toward the "experience-first" world of high-end editorial magazines and luxury spa aesthetics.

The system breaks the traditional rigid grid through **intentional asymmetry and tonal depth**. By utilizing expansive white space (cream), deep chocolate immersion, and golden focal points, we create a sense of calm authority. Layouts should feel curated rather than generated—using overlapping elements, staggered image placements, and high-contrast typography scales to guide the eye through a narrative rather than a list of features.

---

## 2. Colors

The color strategy uses a triad of luxury: the warmth of **Off-White (#FCF9F2)**, the depth of **Deep Chocolate (#3D2B26)**, and the prestige of **Warm Gold (#C5A367)**.

*   **Primary (#755A25) & Primary Container (#C5A367):** These are your "jewelry" colors. Use them for primary CTAs, active states, and critical brand moments.
*   **Surface Hierarchy (Neutral Tones):** Use the `surface-container` tiers to create a sense of physical architecture. 
*   **The "No-Line" Rule:** To maintain a premium feel, **1px solid borders are prohibited** for sectioning. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit against a `surface` background to define its start and end.
*   **The "Glass & Gradient" Rule:** To achieve the "subtle glow" requested, floating elements (like navigation bars or hovering cards) should use a semi-transparent `surface` color with a `backdrop-filter: blur(20px)`. 
*   **Signature Textures:** For high-impact areas (Hero sections), utilize a subtle radial gradient transitioning from `secondary` (Chocolate) to a slightly lighter variant to provide "visual soul" and depth that prevents the dark sections from feeling flat or heavy.

---

## 3. Typography

The typography is a dialogue between tradition and modernity.

*   **Serif (Newsreader):** Used for all `display` and `headline` roles. This font carries the "Editorial" weight. It should be used to convey prestige and medical expertise. Leverage italic styles for emphasis to mimic high-end fashion layouts.
*   **Sans-Serif (Manrope):** Used for `title`, `body`, and `label` roles. This provides clinical clarity and modern efficiency.
*   **The Hierarchy Strategy:** We use a high-contrast scale. A `display-lg` headline should feel significantly more "important" than the `body-lg` text below it. This gap creates the luxury "breathing room" essential to the brand identity.

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than structural lines or heavy shadows.

*   **The Layering Principle:** Depth is achieved by stacking surface tiers. Place a `surface-container-lowest` card (Pure White) on a `surface-container-low` section (Cream) to create a soft, natural lift.
*   **Ambient Shadows:** For floating elements, use extra-diffused shadows.
    *   *Shadow Color:* Use a 6% opacity tint of `primary` or `on-surface` (never pure black).
    *   *Blur:* Use high values (20px–40px) to mimic natural, ambient light.
*   **The "Ghost Border" Fallback:** If a boundary is required for accessibility, use the `outline-variant` token at **10% opacity**. It should be felt, not seen.
*   **Glassmorphism:** Use `surface_bright` at 80% opacity with a background blur on mobile menus or overlays to create a "frosted glass" effect, allowing the gold and chocolate tones to bleed through softly.

---

## 5. Components

### Buttons
*   **Primary:** Pill-shaped (`rounded-full`). Background: `primary`. Text: `on-primary`. Add a subtle outer glow using a 10px blur of the `primary` color at 30% opacity.
*   **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
*   **Tertiary:** Text-only in `primary`, using `label-md` for a clean, editorial look.

### Status Indicators (Course Availability)
To maintain the palette's luxury, status indicators must be sophisticated:
*   **Available (Green):** Use a desaturated mint/sage, not neon.
*   **Limited (Orange):** Use a burnt sienna or warm terracotta.
*   **Full (Red):** Use the `error` token (#BA1A1A).
*   **Styling:** Indicators should be small, circular "pips" with a subtle outer glow in their respective color.

### Input Fields
*   **Style:** Minimalist. No bottom line or box. Use a slightly darker surface (`surface-container-high`) with `rounded-md` corners.
*   **Labels:** Always use `label-md` in `on-surface-variant` (all caps, 0.05em letter spacing).

### Cards
*   **Rule:** Forbid divider lines. Use vertical white space (`spacing-8`) to separate content within the card.
*   **Interactive Cards:** On hover, a card should shift from `surface-container-low` to `surface-container-lowest` and gain an ambient shadow.

---

## 6. Do's and Don'ts

### Do's
*   **Do** use asymmetrical margins. If the left margin is `spacing-12`, the right can be `spacing-24` for hero content.
*   **Do** use the `primary_container` (#C5A367) for decorative elements like thin accent lines or icon backgrounds.
*   **Do** allow images to "break the container" and overlap with text blocks to create a layered, editorial feel.

### Don'ts
*   **Don't** use 100% opaque, high-contrast borders. It breaks the "Sanctuary" feel.
*   **Don't** use standard "Blue" for links. All interactive elements must stay within the Chocolate and Gold spectrum.
*   **Don't** crowd the layout. If in doubt, add more `spacing-16` or `spacing-20` between sections.
*   **Don't** use harsh drop shadows. If a shadow looks like a shadow, it’s too dark; it should look like a "glow" or "soft lift."