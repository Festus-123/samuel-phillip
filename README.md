# Samuel Phillip — CAD Designer Portfolio

A single-page portfolio for Samuel Phillip, a CAD designer with 5 years of experience. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, GSAP and lucide-react.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Project structure

```
app/                 Root layout (fonts, metadata), page, and globals.css (design tokens)
components/
  layout/            Navbar, Footer
  sections/          Hero, About, Works, Skills, Contact
  svg/               Blueprint grid, corner marks, isometric scene, social icons
  ui/                Button, SectionHeading
data/                Site content (site.ts) and projects (projects.ts)
hooks/useReveal.ts   Scroll-triggered fade-up used by every section
lib/gsap/gsap.ts    Single place GSAP and ScrollTrigger are registered
public/              Project images
```

## Design tokens

All colors, fonts and spacing are defined once in `app/globals.css` under `@theme` and used as Tailwind classes. Nothing is hardcoded in components.

| Token | Value | Classes |
| --- | --- | --- |
| Bordo | `#6C151E` | `bg-bordo`, `text-bordo`, `border-bordo` |
| Forest | `#0F3D3A` | `bg-forest`, `text-forest`, ... |
| Cream | `#F5DABF` | `bg-cream`, `text-cream`, ... |
| Section spacing | `6rem` | `py-section`, `.section` |
| Gutter | `1.5rem` | `px-gutter` |
| Nav height | `4.5rem` | `h-nav`, `pt-nav` |
| Page width | `72rem` | `max-w-page`, `.container-page` |

Reusable utilities: `.section`, `.container-page`, `.eyebrow`, `.glass-dark`, `.glass-light`.

## Updating content

- **Socials and WhatsApp number:** `data/site.ts`. The social URLs are placeholders (`TODO`) until the real profiles are provided.
- **Projects:** add an entry to `data/projects.ts` and drop the image in `public/`.
- **Skills and tools:** `data/site.ts`.

## Animation

Scroll animations are driven by GSAP ScrollTrigger. Add `data-reveal` to any element inside a section that calls `useReveal(ref)` and it fades up on entry. Animations are disabled for visitors who prefer reduced motion.
