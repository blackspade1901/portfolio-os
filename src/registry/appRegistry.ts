import { lazy } from 'react'
import type { AppDefinition } from '../types'

const ProjectsApp = lazy(() => import('../components/apps/ProjectsApp'))
const AboutApp = lazy(() => import('../components/apps/AboutApp'))
const TerminalApp = lazy(() => import('../components/apps/TerminalApp'))
const ResumeApp = lazy(() => import('../components/apps/ResumeApp'))
const ContactApp = lazy(() => import('../components/apps/ContactApp'))
const VSCodeApp = lazy(() => import('../components/apps/VSCodeApp'))
const ProfileFolderApp = lazy(() => import('../components/apps/ProfileFolderApp'))
const WeatherApp = lazy(() => import('../components/apps/WeatherApp'))

const defaultVsCodeSize = {
  width: Math.round(typeof window !== 'undefined' ? window.innerWidth * 0.82 : 1100),
  height: Math.round(typeof window !== 'undefined' ? window.innerHeight * 0.72 : 720),
}

export const APP_REGISTRY: Record<string, AppDefinition> = {
  profile: {
    id: 'profile',
    title: 'Saloni Karapurkar',
    icon: 'profile',
    description: 'Profile folder with links to apps, resume, and projects.',
    defaultSize: { width: 720, height: 520 },
    component: ProfileFolderApp,
  },
  projects: {
    id: 'projects',
    title: 'Project Museum',
    icon: 'projects',
    description: 'Interactive case studies with screenshots and tech stacks.',
    defaultSize: { width: 980, height: 680 },
    component: ProjectsApp,
  },
  about: {
    id: 'about',
    title: 'About Me',
    icon: 'about',
    description: 'Bio, skills, education, certifications, and interests.',
    defaultSize: { width: 560, height: 560 },
    component: AboutApp,
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    icon: 'terminal',
    description: 'Command-line interface to explore the portfolio.',
    defaultSize: { width: 620, height: 420 },
    component: TerminalApp,
  },
  resume: {
    id: 'resume',
    title: 'Resume',
    icon: 'resume',
    description: 'Preview and download Saloni Karapurkar CV.',
    defaultSize: { width: 600, height: 700 },
    component: ResumeApp,
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    icon: 'contact',
    description: 'Send a message via the contact form.',
    defaultSize: { width: 450, height: 400 },
    component: ContactApp,
  },
  vscode: {
    id: 'vscode',
    title: 'VS Code',
    icon: 'vscode',
    description: 'Browse portfolio-os source files in a built-in editor.',
    defaultSize: defaultVsCodeSize,
    component: VSCodeApp,
  },
  weather: {
    id: 'weather',
    title: 'Weather',
    icon: 'weather',
    description: 'Live weather forecast for Sankhali, Goa.',
    defaultSize: { width: 380, height: 340 },
    component: WeatherApp,
    desktop: false,
  },
}

export const DESKTOP_APP_ORDER = [
  'profile',
  'projects',
  'about',
  'terminal',
  'resume',
  'contact',
  'vscode',
]
