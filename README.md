# Syed Akhter Hussain — Portfolio (Next.js 14)

> GitHub-themed, Three.js animated, fully responsive portfolio.

---

## ⚡ Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production
```bash
npm run build
npm start
```

---

## 🚀 Deploy to Vercel (recommended)

```bash
npm install -g vercel
vercel
```
Or push to GitHub and connect the repo on [vercel.com](https://vercel.com).

---

## 📁 File Structure

```
portfolio/
├── app/
│   ├── layout.tsx              ← Root layout + SEO metadata + JSON-LD schema
│   ├── page.tsx                ← Main page (assembles all sections)
│   ├── globals.css             ← Global styles + CSS variables
│   ├── sitemap.ts              ← Auto-generated sitemap.xml
│   ├── robots.ts               ← robots.txt
│   │
│   ├── components/
│   │   ├── Loader.tsx          ← Animated percentage loader
│   │   ├── Cursor.tsx          ← Custom magnetic cursor
│   │   ├── Navbar.tsx          ← Sticky nav with mobile menu
│   │   ├── Footer.tsx          ← Footer with links
│   │   └── AiChat.tsx          ← Floating AI chat assistant
│   │
│   └── sections/
│       ├── HeroSection.tsx     ← Hero with particle canvas + 3D avatar
│       ├── StorySection.tsx    ← Horizontal parallax scroll panels
│       ├── GlobeSection.tsx    ← 3D interactive globe
│       ├── AboutSection.tsx    ← Long-form about + info grid
│       ├── SkillsSection.tsx   ← Skill bars + certifications + contrib graph
│       ├── EducationSection.tsx← Education timeline
│       ├── CareerSection.tsx   ← Career timeline
│       ├── ProjectsSection.tsx ← Projects grid + GitHub repos
│       ├── ServicesSection.tsx ← Services via 8BitBannar
│       ├── ContactSection.tsx  ← Contact form + links
│       └── three/
│           ├── AvatarCanvas.tsx ← Three.js 3D avatar
│           └── GlobeCanvas.tsx  ← Three.js 3D globe
│
├── lib/
│   └── data.ts                 ← ⭐ ALL your content lives here — edit this!
│
├── public/
│   └── assets/                 ← Put your profile photo, CV here
│
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```

---

## ✏️ How to Customize

**All your personal info is in one file:** `lib/data.ts`

Edit these exports:
- `personal` — name, bio, email, phone, links, stats
- `story` — 4 parallax story panels
- `skillCategories` — skills with percentages
- `certifications` — your 8 certs
- `education` — education timeline
- `career` — work experience
- `projects` — your projects
- `services` — your services
- `chatKB` — AI chat knowledge base

---

## 🔌 Contact Form Setup

The contact form in `ContactSection.tsx` has a placeholder. To make it work, choose one:

### Option A — Formspree (easiest, free)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form, get your endpoint
3. Replace the `handleSubmit` function:
```tsx
const res = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
```

### Option B — Next.js API Route
Create `app/api/contact/route.ts` and use `nodemailer`.

---

## 📦 Key Dependencies

| Package | Use |
|---|---|
| `next 14` | Framework |
| `three` | 3D avatar + globe |
| `framer-motion` | Animations (optional upgrade) |
| `react-intersection-observer` | Scroll-triggered animations |
| `react-type-animation` | Typing effect (optional) |
| `react-icons` | Icons (optional) |
| `tailwindcss` | Utility CSS |

---

## 🌐 SEO Included

- Full `<metadata>` in `layout.tsx`
- JSON-LD Person schema
- Auto `sitemap.xml` via `sitemap.ts`
- Auto `robots.txt` via `robots.ts`
- OpenGraph + Twitter cards
- Canonical URL

---

Built by **Syed Akhter Hussain** · [8BitBannar.in](https://8bitbannar.in)