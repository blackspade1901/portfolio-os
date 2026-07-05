import type { ComponentType } from 'react'

export type AppIconId =
  | 'projects'
  | 'about'
  | 'terminal'
  | 'resume'
  | 'contact'
  | 'vscode'
  | 'profile'
  | 'weather'
  | 'github'
  | 'linkedin'
  | 'folder'
  | 'file'
  | 'sun'
  | 'moon'
  | 'logo'

export interface WindowState {
  id: string
  appId: string
  title: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  minimized: boolean
  maximized: boolean
}

export interface AppDefinition {
  id: string
  title: string
  icon: AppIconId
  description: string
  defaultSize: { width: number; height: number }
  component: ComponentType
  desktop?: boolean
}

export interface RecommendedItem {
  id: string
  title: string
  detail: string
  icon: AppIconId
  appId?: string
  href?: string
}
