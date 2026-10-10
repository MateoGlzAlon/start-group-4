# HSG visual identity: style reference

This is the look of the University of St.Gallen (HSG) website, written down so our guide tool can match it.

- **Source:** https://www.unisg.ch/en/, read on 09.10.2026.
- **How it was read:** from the page's HTML and its stylesheets (`vhs-assets-main.css` and the web-font file `cs2_prototypes/src/dist/styles/fonts.css`).
- **Accuracy:** hex codes, sizes and font names are copied exactly from the site's CSS. Lines marked *(observation)* describe how the page looks and are not a CSS value.

## 1. Character at a glance

- **Calm and academic.** Lots of white space, black text, and one strong accent colour: HSG green.
- **Square.** Buttons, inputs, cards and images have no rounded corners (`border-radius: 0`). The only round shapes are circular icon buttons.
- **Flat.** There are almost no drop shadows. Colour blocks, thin grey rules and photos do the work instead.
- **Two typefaces.** Headings use a light humanist sans (Gill Sans MT Pro Light). Body text uses a classic serif (Palatino).
- **A diagonal motif.** Image tiles carry a panel with a slanted top edge.
- **Tagline:** "From insight to impact."

## 2. Logo

- An inline SVG, 189 × 40 px. It has two parts: a geometric mark in HSG green `#00802F` and a black wordmark.
- On dark backgrounds or over the hero video, the whole logo turns white (`--logo: #FFFFFF`).
- In the header it sits top left with `py-6`/`py-7` padding. In the footer it is at most 160 px wide.
- Use the official logo files from HSG. Do not redraw the logo or change its colours.

## 3. Colour

### Brand

| Name | Hex | CSS token on site | Used for |
|---|---|---|---|
| **HSG Green** | `#00802F` | `--primary`, `--green`, `.bg-primary` | Links, primary buttons, focus rings, event date blocks, podcast panels, logo mark, active and hovered nav items, slider indicators |
| **Dark Green** | `#0A5E2D` | `--primary-dark`, `--teal`, `.bg-darkgreen` | Large navigation tiles ("Studying", "Research"…), small source tags |
| Green, hover | `#005A21` | none | Primary button background on hover/focus |
| Green, hover border | `#004D1C` | none | Primary button border on hover/focus |

### Neutrals

| Name | Hex | CSS token on site | Used for |
|---|---|---|---|
| White | `#FFFFFF` | `--white`, `--secondary` | Page background, header, menus |
| Black | `#000000` | none | Body text, headings, nav links, footer links |
| Near-black | `#161615` | none | Secondary button text, code |
| Light grey | `#F5F5F5` | `--light`, `.bg-light` | Event cards, soft panels, filter areas |
| Grey | `#C2C2C2` | `--gray` | Header bottom border, inactive slider bars, dividers |
| Dark grey | `#6F706F` | `--gray-dark`, `--dark`, `.bg-dark` | Input borders, heading underlines, event card hover state |
| Field grey | `#F1F6F7` | none | Disabled and read-only inputs |

### Secondary accents (use sparingly)

| Name | Hex | CSS token on site | Used for |
|---|---|---|---|
| Beige | `#E1D7C3` | `--info`, `.bg-beige` | Info panels |
| Grey-blue 1 | `#73A5AF` | `--cyan`, `.bg-greyblue1` | Accent backgrounds |
| Grey-blue 2 | `#557882` | `--blue`, `.bg-greyblue2` | Quote blocks |
| Navy | `#06375B` | `--indigo` | Defined as a token; not seen on the homepage |
| Pink | `#EB6969` | `--pink` | Defined as a token; not seen on the homepage |

### Status

| Name | Hex | CSS token on site |
|---|---|---|
| Success | `#2E8540` | `--success` |
| Danger / error | `#E31C3D` | `--danger`, `--red` |
| Warning | `#FFF04B` | `--warning`, `--yellow` |

### Colour balance

In the site's CSS, white, black and `#00802F` are by far the most used colours. Greys come next, and every other colour is rare. Keep the same balance: mostly white, black text, green for anything you can click or that should stand out.

### Contrast (WCAG 2.x)

| Pair | Ratio | Safe for |
|---|---|---|
| Green `#00802F` text on white | 5.09 : 1 | All text (AA) |
| Green `#00802F` text on `#F5F5F5` | 4.67 : 1 | All text (AA), just above the line |
| White on Dark Green `#0A5E2D` | 7.92 : 1 | All text (AAA) |
| White on hover green `#005A21` | 8.45 : 1 | All text (AAA) |
| Dark grey `#6F706F` on white | 4.97 : 1 | All text (AA) |
| White on Grey-blue 2 `#557882` | 4.78 : 1 | All text (AA) |
| Grey `#C2C2C2` on white | 1.78 : 1 | **Borders and decoration only, never text** |

## 4. Typography

### Typefaces

| Role | Font on site | Weights loaded |
|---|---|---|
| Headings, buttons, form fields, lead text, UI labels | **Gill Sans MT Pro** | 300 Light (headings), 500 Medium (buttons, h5/h6, lead) |
| Body text | **Palatino** | 400 |
| Icons | Material Icons, Material Icons Outlined, Font Awesome 5 (Solid, Brands) | none |

The site loads these through Web Font Loader from its own server. Gill Sans MT Pro and Palatino are commercial fonts, so we may not be allowed to self-host them. Use these stacks, which pick up the system copies on macOS and Windows:

```css
--font-heading: "Gill Sans MT Pro", "Gill Sans", "Gill Sans MT", Calibri, "Segoe UI", sans-serif;
--font-body: Palatino, "Palatino Linotype", "Book Antiqua", "TeX Gyre Pagella", Georgia, serif;
```

(The site's own body stack falls back from Palatino to sans-serif fonts. A serif fallback keeps the look closer.)

### Base rules

- Body: Palatino 400, `1rem` (16 px), line-height 1.5, black on white.
- All headings: Gill Sans MT Pro **300 (Light)**, line-height 1.25 (1.2 on smaller screens), `margin-bottom: 1.5rem`, `hyphens: auto`. h5 and h6 use weight 500.
- Paragraphs: `margin-bottom: 1rem`.

### Type scale (rem; 1 rem = 16 px)

Each column is the size from that screen width downwards.

| Element | ≥ 1280 px | ≤ 1279 px | ≤ 1023 px | ≤ 839 px | ≤ 599 px |
|---|---|---|---|---|---|
| Hero title (`.font-size-giant`, line-height 1) | 4 | 4 | 4 | 2 | 2 |
| h1 | 4 | 3.5 | 3 | 2.5 | 2 |
| h2 | 3 | 2.5 | 2 | 1.75 | 1.5 |
| h3 | 2 | 1.75 | 1.75 | 1.5 | 1.25 |
| h4 | 1.75 | 1.5 | 1.5 | 1.25 | 1.125 |
| h5 (weight 500) | 1.375 | 1.375 | 1.375 | 1 | 1 |
| h6 (weight 500) | 1.25 | 1.25 | 1.25 | 0.875 | 0.875 |
| Lead (Gill Sans 500) | 1.5 | 1.5 | 1.5 | 1.25 | 1.25 |
| Body | 1 | 1 | 1 | 0.875 (`.font-size-regular`) | 0.875 |
| Meta / UI small | 0.875 | 1 | 1 | 1 | 1 |

## 5. Layout and spacing

### Breakpoints

| Name | Width |
|---|---|
| xs | 375 px |
| sm | 600 px |
| md | 840 px |
| lg | 1024 px |
| xl | 1280 px (below this, the main navigation turns into a hamburger menu) |
| xxl | 1440 px |

### Width

- Content sits in a `.content-wrapper`: `max-width: 1440px`, centred.
- Full-bleed elements (hero video, footer) stretch to at most 1920 px.

### Spacing scale

The site uses Bootstrap utility classes (`p-*`, `m-*`, `px-*`, `py-*`) with its own steps:

| Step | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| rem | 0.25 | 0.5 | 1 | 1.5 | 1.75 | 2 | 2.5 | 3 | 4.5 | 6 |
| px | 4 | 8 | 16 | 24 | 28 | 32 | 40 | 48 | 72 | 96 |

### Gaps between sections and grid items

| Token | ≥ 1440 px | ≤ 1439 px | ≤ 1279 px | ≤ 839 px | ≤ 599 px |
|---|---|---|---|---|---|
| `--gap` (between sections) | 96 px | 64 px | 56 px | 48 px | 16 px |
| `--gridgap` (between cards) | 20 px | 20 px | 12 px | 12 px | 8 px |

## 6. Shape, borders, depth, motion

- **Corners:** `0` everywhere. Use `50%` only for circular icon buttons such as the social media icons.
- **Rules:**
  - Header: `1px solid #C2C2C2` along the bottom.
  - Footer: grey line along the top.
  - Section headings in the footer: underline of `1px solid #6F706F` with `1rem` padding below. It is removed below 600 px.
- **Shadows:** almost none. Only a faint inset on form fields (`inset 0 1px 1px rgb(0 0 0 / .075)`), and on mobile even that is removed.
- **Focus state:** no browser outline. Instead, a 1 px green ring: `box-shadow: 0 0 0 1px #00802F`.
- **Image scrim:** photos under text get a black layer at 20 % opacity.
- **Motion:**
  - Buttons and inputs: `.15s ease-in-out`.
  - Header slides in and changes colour: `.35s ease-in-out`.
  - Image scrim: `.25s linear`.
  - Menus fade and slide up (animate.css `fadeIn`, `fadeInUp`).

## 7. Components

### Header

- Fixed to the top, white, thin grey bottom border. It slides down when the page loads.
- Over the hero video it is **transparent with a white logo and white text**. It turns white when hovered or when the menu is open.
- **Main navigation:** Studying · Research · Executive Education · Transfer · News · University. Links are black and turn green when hovered or active.
- **Top-right meta navigation:** Contact, language switch (DE / EN), search icon.
- **Mega menu:** a white full-width panel. Columns of h4 headings, each with a list of links under it. A Material `close` icon closes it.
- Below 1280 px: a hamburger menu with drill-down levels and a back arrow.

### Hero

- Full-width background video.
- A giant white headline: "Welcome to the University of St.Gallen".
- Under it, a "Scroll down" prompt with the Material `south` (↓) icon.

### Section pattern

Each homepage section has the same structure:

1. An **h2** title ("News", "Events", "Listen to our podcasts").
2. A short intro paragraph in Palatino.
3. The content.
4. A large gap before the next section (`frame-space-after-large`).

### News cards

- Image on top. Below it, a meta line with the category, date and time: `Research - 09.10.2026 - 09:30`. Below that, an **h3** title with hyphenation.
- The first item is shown large. The rest follow in a 3-column grid (1 column on mobile).
- Video and podcast items have a small circular type icon in the top-right corner of the image.
- The "Special topic" block shows the same cards in a horizontal slider.

### Navigation tiles ("metro" tiles)

- **Solid tiles:**
  - Dark Green `#0A5E2D` background, white h3 ("Studying", "Research", "Executive Education").
  - A "Learn more" link with the Material `east` (→) icon.
  - Generous padding (`px-7 py-9`, 40 / 72 px) and a minimum height of 390 px (343 px on smaller screens).
- **Image tiles:**
  - A photo with a 20 % black scrim.
  - White text sits in a panel anchored bottom right. The panel's top edge is cut diagonally with `clip-path: polygon(0 70%, 100% 0, 100% 100%, 7px 100%)`.
  - This slanted edge is the site's signature motif.

### Event cards

- Two-column grid. Each card has a light grey `#F5F5F5` background.
- **Left:** a green `#00802F` block with white text showing the date (`Wed 21.10.`) or the venue (`Square-HSG`).
- **Right:** a category label ("Public events", "Info events"), a 2 rem h3 title, the speaker and the location.
- **Bottom-right corner:** a 48 × 48 px green square with a white `east` (→) arrow.
- **On hover:** the green parts turn dark grey `#6F706F`.

### Podcast slider

- Cover images with green (`bg-primary`) text panels in white text.

### Sliders (all)

- Swiper.js. The pagination is short **bars, not dots**: 20–40 px wide, 4–10 px tall.
- The active bar is green, inactive bars are `#C2C2C2`.

### Buttons

| Variant | Look |
|---|---|
| Base | Gill Sans MT Pro 500, square corners. ≥ 840 px: `1.25rem`, padding `15px 39px`. Below 840 px: `0.875rem`, padding `12px 24px` |
| Primary | White text on `#00802F`. Hover: `#005A21` background, `#004D1C` border |
| Secondary | `#161615` text on white |
| Outline | Green text, 1 px green border, transparent background |
| Link | Green text, no underline |

### Form fields

- Gill Sans MT Pro, `1rem`, black text on white.
- `1px solid #6F706F` border, square corners, padding `15px`.
- **Focus:** the border turns green and a 1 px green ring appears.
- **Disabled:** `#F1F6F7` background.
- **Error:** `#E31C3D` border and message.
- **Search:** a plain field with a Material `search` icon button.

### Links

- Inline links: `#00802F`, no underline.
- Footer links: black and underlined.
- "More" links pair a short label ("Learn more") with the `east` (→) arrow.

### Footer

- Grey top border, three columns, generous vertical padding (`py-9`, 72 px).
- **Column 1:** the tagline "From insight to impact." as an h4, then the search field.
- **Other columns:**
  - h4 headings with the grey underline.
  - Social media icons: white Font Awesome brand icons in black circles (LinkedIn, YouTube, Instagram, Facebook, Bluesky).
  - Service links: Info Desk, Library, Media…
  - Address: University of St.Gallen, Dufourstrasse 50, 9000 St.Gallen, Switzerland.
- **Bottom bar:** © line and legal links separated by `|`.

## 8. Icons and imagery

- **Icons:**
  - Material Icons (filled and outlined) for UI: `east` → (go / more), `south` ↓ (scroll), `search`, `close`, arrows in menus.
  - Font Awesome 5 Brands for social media icons.
  - Icons are used plainly in black, white or green, never in multiple colours.
- **Imagery** *(observation)*: real photography of the campus, students and researchers, plus aerial shots of the campus (the Open Graph image) and a hero video. Images are cropped to fixed aspect ratios with square corners.

## 9. Writing conventions seen on the site

- The city is written **"St.Gallen"**, with no space after the dot.
- Dates use `DD.MM.YYYY` (`09.10.2026`). Short dates on event cards use a weekday and day.month (`Wed 21.10.`). Times are 24-hour (`09:30`).
- The site is bilingual (DE / EN). The language switch is in the header.
- Headings are short and in sentence case. Intro paragraphs are one or two sentences.

## 10. Applying this to our guide tool

Starting tokens for our frontend:

```css
:root {
  /* brand */
  --hsg-green: #00802F;
  --hsg-green-dark: #0A5E2D;
  --hsg-green-hover: #005A21;
  --hsg-green-hover-border: #004D1C;

  /* neutrals */
  --hsg-black: #000000;
  --hsg-near-black: #161615;
  --hsg-white: #FFFFFF;
  --hsg-grey-100: #F5F5F5;  /* soft panels, cards */
  --hsg-grey-300: #C2C2C2;  /* borders, never text */
  --hsg-grey-600: #6F706F;  /* input borders, rules, secondary text */
  --hsg-field-disabled: #F1F6F7;

  /* accents and status */
  --hsg-beige: #E1D7C3;
  --hsg-greyblue: #557882;
  --hsg-success: #2E8540;
  --hsg-danger: #E31C3D;
  --hsg-warning: #FFF04B;

  /* type */
  --font-heading: "Gill Sans MT Pro", "Gill Sans", "Gill Sans MT", Calibri, "Segoe UI", sans-serif;
  --font-body: Palatino, "Palatino Linotype", "Book Antiqua", "TeX Gyre Pagella", Georgia, serif;

  /* shape and layout */
  --radius: 0;
  --focus-ring: 0 0 0 1px var(--hsg-green);
  --content-max: 1440px;
}
```

**Do**

- Keep pages mostly white, with black text and green for actions, links and progress.
- Use light (300) Gill Sans for headings and Palatino for reading text.
- Keep corners square and avoid shadows. Separate areas with `#F5F5F5` panels or thin grey rules.
- Reuse the event card pattern for guide steps: grey card, green block on the left (for example the step number or deadline), and a green arrow square for "open step".
- Use the `east` (→) arrow for "next" and "learn more" actions.

**Don't**

- Don't use rounded corners, gradients or bright new colours that are not in the palette.
- Don't put `#C2C2C2` text on white (contrast 1.78 : 1).
- Don't use the danger red or warning yellow for decoration. Keep them for real errors and deadline warnings.
- Don't present our tool as an official HSG page unless HSG has approved it. Use the colours and type to fit in, and the logo only with permission.
