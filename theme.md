# Design System — Project 108
## 1. Visual Theme & Atmosphere
Project 108 is a sophisticated, spiritual, and minimalist design inspired by traditional Eastern architecture. The design uses a **white body** with deep burgundy and champagne gold as the primary accent and brand colors — creating a premium, contemplative identity that remains readable and elegant. The Cinzel font handles display headings with classic Roman-inspired proportions, while Cormorant Garamond serves as the elegant serif for body text.

**Key Characteristics:**
- **White** (`#FFFFFF`): Primary page/body background — clean, readable, spacious
- **Deep Burgundy** (`#3D1022`): Primary text on white, nav background, footer, buttons, accent panels
- **Champagne Gold** (`#E9D5A1`): Text and accents on dark (burgundy) surfaces only; borders/dividers on white
- **Muted Bronze** (`#8E6D4E`): Secondary labels, icons, captions — works on both white and dark surfaces
- Asymmetrical balance with significant negative space
- High-contrast serif typography for a timeless, historical feel
- Monochromatic, thin-line iconography

## 2. Color Palette & Roles

### On White Surfaces (cards, body, content panels)
- **Primary text**: Deep Burgundy `#3D1022` (`text-burgundy`)
- **Secondary text / labels**: Muted Bronze `#8E6D4E` (`text-bronze`)
- **Borders**: `border-burgundy/15` or `border-bronze/30`
- **Subtle tint bg**: `bg-burgundy/5` or `bg-gold/10`
- **Primary button**: Solid Burgundy — `bg-burgundy text-gold`
- **Outlined button**: `border border-burgundy/30 text-burgundy`
- **Progress track**: `bg-burgundy/10 h-px`
- **Progress fill**: `bg-burgundy h-px`
- **Dividers**: `border-t border-burgundy/10`

### On Dark Surfaces (nav, hero, footer, accent panels)
- **Primary text**: Champagne Gold `#E9D5A1` (`text-gold`)
- **Secondary text**: Muted Bronze `#8E6D4E` (`text-bronze`)
- **Borders**: `border-gold/20`
- **Primary button**: Solid Gold — `bg-gold text-burgundy`
- **Outlined button**: `border border-gold/20 text-bronze hover:text-gold`
- **Progress track**: `bg-gold/10 h-px`
- **Progress fill**: `bg-gold h-px`
- **Dividers**: `border-t border-gold/10`

### Dark Surface Backgrounds
- **Deep Burgundy** (`#3D1022`, `bg-burgundy`): Navigation bar
- **Deep Wine** (`#2A0B17`, `bg-burgundy-dark`): Hero section, footer, accent panels

## 3. Typography Rules
### Font Families
- **Display**: `Cinzel` (`font-display`) — headings, labels, buttons, numbers
- **UI / Body**: `Cormorant Garamond` (`font-body`) — body copy, quotes, descriptions

### Hierarchy
| Role | Font | Size | Weight | Notes |
|------|------|------|--------|-------|
| Display Hero | Cinzel | 60–120px | 700 | Uppercase, tracking-tight |
| Section Heading | Cinzel | 36px | 700 | Uppercase, tracking-widest |
| Sub-heading | Cinzel | 24px | 400 | Uppercase, tracking-wider |
| Feature Title | Cinzel | 18–22px | 700 | Uppercase |
| Body | Cormorant Garamond | 18px | 400 | leading-relaxed |
| Button | Cinzel | 12–14px | 700 | Uppercase, tracking-widest |
| Label / Caption | Cinzel | 12px | 400 | Uppercase, tracking-widest |

## 4. Component Stylings

### Buttons

**On dark backgrounds (nav, hero, footer):**
- **Solid Gold**: `bg-gold text-burgundy font-display text-xs tracking-widest uppercase`
- **Gold Outlined**: `border border-gold/20 text-bronze font-display text-xs tracking-widest uppercase hover:border-gold/40 hover:text-gold`

**On white backgrounds (content, cards, panels):**
- **Solid Burgundy**: `bg-burgundy text-gold font-display text-xs tracking-widest uppercase`
- **Burgundy Outlined**: `border border-burgundy/30 text-burgundy font-display text-xs tracking-widest uppercase hover:border-burgundy`

**Minimum font size: `text-xs` (12px). Never go below this — `text-[10px]` and smaller are illegible.**

All buttons: **0px border radius. No shadows. No gradients.**

### Cards / Panels (on white body)
- Border: `border border-burgundy/15` or `border-bronze/30`
- Background: transparent / `bg-white`
- Heading: `text-burgundy font-display uppercase tracking-wide`
- Body: `text-bronze font-body`

### Accent Dark Panel (on white body — used sparingly for visual variety)
- Background: `bg-burgundy-dark`
- Border: `border border-gold/20`
- Text: `text-gold` / `text-bronze`

## 5. Layout Principles
- Spacing scale: 4px, 8px, 16px, 24px, 32px, 48px, 64px, 80px, 120px
- **Border Radius: 0px** — no rounded corners on UI elements
  - Exception: `rounded-t-full` for the stupa dome shape (decorative)
  - Exception: `rounded-full` for the "108" circular logo badge

## 6. Depth & Elevation
- No heavy shadows. Depth through color contrast and thin borders.
- Subtle hover: `hover:border-burgundy/40` or `hover:bg-burgundy/5`

## 7. Do's and Don'ts
### Do
- White body with burgundy/bronze text for content areas
- Burgundy backgrounds only for nav, hero, footer, accent panels, buttons
- Cinzel in all-caps with `tracking-widest` for labels and buttons
- Cormorant Garamond for all body/paragraph text
- Thin-line icons (`strokeWidth={1}` or `1.5`)

### Don't
- Don't use burgundy as the body/page background — it's too dark and gloomy for content
- Don't use gold text on white — it's illegible
- Don't use rounded corners or pill-shaped buttons
- Don't use gradients or heavy drop shadows
- Don't use `text-slate-*`, `text-amber-*`, `bg-slate-*`, `bg-white/5` etc. (use theme tokens)
- Don't use `text-[10px]` or any font size below 12px (`text-xs`) — illegible on all screens

## 8. Responsive Behavior
Breakpoints: 375px, 768px, 1024px, 1440px

## 9. Agent Prompt Guide
### Quick Reference
- Page/body bg: **White** (`bg-white`)
- Primary text on white: **Burgundy** (`text-burgundy` = `#3D1022`)
- Secondary text on white: **Bronze** (`text-bronze` = `#8E6D4E`)
- Borders on white: `border-burgundy/15`
- Nav / Hero / Footer bg: **Burgundy** / **Burgundy Dark**
- Text on dark: **Gold** (`text-gold` = `#E9D5A1`)
- Buttons on dark: `bg-gold text-burgundy`
- Buttons on white: `bg-burgundy text-gold`

### Example Prompts
- "Content card on white: `border border-burgundy/15`. Heading `text-burgundy font-display uppercase`. Body `text-bronze font-body`."
- "Hero on dark: `bg-burgundy-dark`. Large heading `text-gold font-display`. Body `text-gold/70 font-body`."
