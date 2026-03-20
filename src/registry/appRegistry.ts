import type { AppDefinition } from '../types'
import { lazy } from 'react'

// lazy() means the component JS is only loaded when the app is first opened
// This keeps initial page load fast — you don't download all app code upfront
const ProjectsApp = lazy(() => import('../components/apps/ProjectsApp'))
const AboutApp    = lazy(() => import('../components/apps/AboutApp'))
const TerminalApp = lazy(() => import('../components/apps/TerminalApp'))
const ResumeApp   = lazy(() => import('../components/apps/ResumeApp'))
const ContactApp  = lazy(() => import('../components/apps/ContactApp'))

export const APP_REGISTRY: Record<string, AppDefinition> = {
  projects: {
    id: 'projects',
    title: 'Projects',
    icon: '📁',
    defaultSize: { width: 750, height: 520 },
    component: ProjectsApp,
  },
  about: {
    id: 'about',
    title: 'About Me',
    icon: '👤',
    defaultSize: { width: 500, height: 420 },
    component: AboutApp,
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    icon: '⬛',
    defaultSize: { width: 600, height: 400 },
    component: TerminalApp,
  },
  resume: {
    id: 'resume',
    title: 'Resume',
    icon: '📄',
    defaultSize: { width: 600, height: 700 },
    component: ResumeApp,
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    icon: '✉️',
    defaultSize: { width: 450, height: 400 },
    component: ContactApp,
  },
}