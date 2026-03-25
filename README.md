# 🖥️ Portfolio OS

> A fully functional browser-based desktop OS built as a developer portfolio. Not just a website — a complete window manager, terminal, app registry, and theme system, all running in the browser.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)
![Zustand](https://img.shields.io/badge/Zustand-state-orange?style=flat)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-animations-ff69b4?style=flat)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

---

## 🌐 Live Demo

**[portfolio-os.vercel.app](https://portfolio-os.vercel.app)** ← try it here

---

## ✨ Features

### Window Manager
- Drag windows by their title bar
- Resize from any edge or corner (all 8 directions)
- Click to focus — correct z-index stacking
- Minimize, maximize (fullscreen), and close
- Windows constrained to viewport — can't drag off screen
- Smooth open/close animations via Framer Motion

### Apps
| App | Description |
|-----|-------------|
| 📁 Projects | Live project cards with GitHub links |
| 👤 About Me | Bio, skills grid, education timeline, workshops |
| 📄 Resume | ATS-friendly PDF with download button |
| ✉️ Contact | Working contact form via EmailJS |
| ⬛ Terminal | Fully functional fake shell with real commands |

### Terminal Commands
```bash
$ help          # list all commands
$ whoami        # about me
$ skills        # technical skills
$ ls projects   # list all projects
$ open <app>    # open any app by name
$ cat resume    # resume summary
$ date          # current date and time
$ echo <text>   # print text
$ clear         # clear terminal
$ secret        # 👀
```

### OS Features
- Boot screen with animated progress bar on first load
- Dark / light theme toggle with CSS custom properties
- Taskbar with live clock and open app management
- Plugin-based app registry — adding a new app = adding one data entry
- Persistent window state via Zustand

---

## 🏗️ Architecture

```
src/
├── components/
│   ├── Desktop/          # Desktop icons + right-click context
│   ├── Window/           # Window shell + WindowManager
│   ├── Taskbar/          # Taskbar + clock + theme toggle
│   ├── BootScreen/       # Boot animation
│   └── apps/             # Each app is an isolated component
│       ├── AboutApp.tsx
│       ├── ProjectsApp.tsx
│       ├── ResumeApp.tsx
│       ├── ContactApp.tsx
│       └── TerminalApp.tsx
├── store/
│   └── osStore.ts        # Zustand global state — all OS actions
├── hooks/
│   ├── useDraggable.ts   # Drag logic via @use-gesture/react
│   └── useResizable.ts   # 8-direction resize with mouse events
├── registry/
│   └── appRegistry.ts    # App plugin registry — data-driven
└── types/
    └── index.ts          # WindowState, AppDefinition interfaces
```

### Key Design Decisions

**Plugin Architecture** — `APP_REGISTRY` is a plain data object mapping app IDs to their component, icon, title, and default size. `Window.tsx` dynamically renders whatever component the registry points to. Adding a new app requires zero changes to core files.

**Immutable State** — every Zustand action returns new objects (`{ ...w, property: value }`) instead of mutating. React detects changes by reference — mutation would break re-renders silently.

**Global Mouse Events for Drag/Resize** — drag and resize listeners attach to `window` (not the element) so fast mouse movement doesn't escape the handler. Cursor is locked on `document.body` during drag to prevent flickering.

**Ref for Drag State** — drag state is stored in a `useRef` instead of `useState` because `setState` is async and batched. During rapid `mousemove` events, stale state would cause jitter. A ref always gives the latest value synchronously.

**Lazy Loading** — all app components are loaded via React's `lazy()` so the initial bundle only contains the OS shell. App code downloads on first open.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| State | Zustand |
| Drag & Drop | @use-gesture/react |
| Animations | Framer Motion |
| Styling | CSS custom properties (no UI library) |
| Email | EmailJS |
| Deploy | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/blackspade1901/portfolio-os.git
cd portfolio-os

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Environment Setup (for contact form)

The contact form uses [EmailJS](https://emailjs.com). To enable it:

1. Create a free account at emailjs.com
2. Create an email service and a "Contact Us" template with variables: `{{from_name}}`, `{{from_email}}`, `{{reply_to}}`, `{{message}}`
3. Open `src/components/apps/ContactApp.tsx` and replace:

```ts
const EMAILJS_SERVICE_ID  = 'service_xxxxxxx'
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'
const EMAILJS_PUBLIC_KEY  = 'xxxxxxxxxxxxxxxxx'
```

### Build for Production

```bash
npm run build
```

Output goes to `dist/` — deploy anywhere static hosting is available.

---

## 📦 Deployment

This project is deployed on **Vercel**. Every push to `main` auto-deploys.

To deploy your own fork:

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Vite is auto-detected — zero config needed
4. Click Deploy

---

## 🎨 Customising for Your Own Portfolio

Want to use this as your own portfolio? Here's what to change:

**1. Your info** — edit `src/components/apps/AboutApp.tsx`

**2. Your projects** — edit `src/components/apps/ProjectsApp.tsx`

**3. Your resume** — drop your PDF in `public/` and update `src/components/apps/ResumeApp.tsx`

**4. Terminal identity** — update the `whoami` command in `src/components/apps/TerminalApp.tsx`

**5. Add a new app** — create a component in `src/components/apps/`, add one entry to `src/registry/appRegistry.ts`, done.

---

## 🗺️ Roadmap

- [ ] Right-click context menu on desktop
- [ ] Window snapping to screen edges
- [ ] Mobile-friendly fallback view
- [ ] Settings app — wallpaper picker, accent color
- [ ] More terminal commands
- [ ] Persist window positions across sessions (localStorage)

---

## 👩‍💻 Author

**Saloni Karapurkar**
MCA Student · Android & Web Developer · Goa, India

- GitHub: [@blackspade1901](https://github.com/blackspade1901)
- LinkedIn: [saloni-karapurkar-26800935b](https://www.linkedin.com/in/saloni-karapurkar-26800935b/)
- Email: salonikarapurkar13@gmail.com

---

## 📄 License

MIT — free to use, modify, and distribute. If you use this as a base for your own portfolio, a credit or star would be appreciated! ⭐

---
