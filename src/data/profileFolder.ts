import type { AppIconId } from '../types'

export interface ProfileEntry {
  id: string
  name: string
  type: 'folder' | 'file' | 'link'
  icon: AppIconId
  appId?: string
  href?: string
  description?: string
  children?: ProfileEntry[]
}

export const PROFILE_FOLDER: ProfileEntry = {
  id: 'root',
  name: 'Saloni Karapurkar',
  type: 'folder',
  icon: 'profile',
  children: [
    {
      id: 'about',
      name: 'About Me.txt',
      type: 'file',
      icon: 'about',
      appId: 'about',
      description: 'Bio, skills, education, certifications',
    },
    {
      id: 'resume',
      name: 'Resume.pdf',
      type: 'file',
      icon: 'resume',
      appId: 'resume',
      description: 'Downloadable CV',
    },
    {
      id: 'contact',
      name: 'Contact.vcf',
      type: 'file',
      icon: 'contact',
      appId: 'contact',
      description: 'Send a message',
    },
    {
      id: 'projects-folder',
      name: 'Projects',
      type: 'folder',
      icon: 'folder',
      children: [
        {
          id: 'projects',
          name: 'Project Museum',
          type: 'file',
          icon: 'projects',
          appId: 'projects',
          description: 'Full project case studies',
        },
        {
          id: 'vscode',
          name: 'portfolio-os',
          type: 'folder',
          icon: 'vscode',
          appId: 'vscode',
          description: 'This website source code',
        },
      ],
    },
    {
      id: 'links',
      name: 'Links',
      type: 'folder',
      icon: 'folder',
      children: [
        {
          id: 'github',
          name: 'GitHub',
          type: 'link',
          icon: 'github',
          href: 'https://github.com/blackspade1901',
        },
        {
          id: 'linkedin',
          name: 'LinkedIn',
          type: 'link',
          icon: 'linkedin',
          href: 'https://www.linkedin.com/in/saloni-karapurkar-26800935b/',
        },
      ],
    },
    {
      id: 'terminal',
      name: 'Terminal.sh',
      type: 'file',
      icon: 'terminal',
      appId: 'terminal',
      description: 'Run shell commands',
    },
  ],
}
