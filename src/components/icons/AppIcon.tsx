import type { IconType } from 'react-icons'
import {
  // Lucide — consistent stroke icon pack
  LuFolderOpen,
  LuFlaskConical,
  LuUser,
  LuTerminal,
  LuFileText,
  LuMail,
  LuCode,
  LuCloud,
  LuGithub,
  LuLinkedin,
  LuFolder,
  LuFile,
  LuSun,
  LuMoon,
  LuSparkles,
} from 'react-icons/lu'
import type { AppIconId } from '../../types'

/** Icon components — all Lucide for visual consistency */
const ICON_MAP: Record<AppIconId, IconType> = {
  profile:  LuFolderOpen,
  projects: LuFlaskConical,
  about:    LuUser,
  terminal: LuTerminal,
  resume:   LuFileText,
  contact:  LuMail,
  vscode:   LuCode,
  weather:  LuCloud,
  github:   LuGithub,
  linkedin: LuLinkedin,
  folder:   LuFolder,
  file:     LuFile,
  sun:      LuSun,
  moon:     LuMoon,
  logo:     LuSparkles,
}

/**
 * Per-app colour palette — gradient + glow.
 * These are chosen to harmonise with the purple/cyan/dark glass theme.
 */
const APP_COLORS: Partial<Record<AppIconId, { gradient: string; glow: string; icon: string }>> = {
  profile:  { gradient: 'linear-gradient(135deg,#7c3aed,#4f46e5)', glow: 'rgba(124,58,237,0.45)',  icon: '#e0d9ff' },
  projects: { gradient: 'linear-gradient(135deg,#0891b2,#06b6d4)', glow: 'rgba(8,145,178,0.45)',   icon: '#bef4ff' },
  about:    { gradient: 'linear-gradient(135deg,#db2777,#ec4899)', glow: 'rgba(219,39,119,0.45)',  icon: '#ffd6ec' },
  terminal: { gradient: 'linear-gradient(135deg,#059669,#10b981)', glow: 'rgba(5,150,105,0.45)',   icon: '#bbf7d0' },
  resume:   { gradient: 'linear-gradient(135deg,#d97706,#f59e0b)', glow: 'rgba(217,119,6,0.45)',   icon: '#fef3c7' },
  contact:  { gradient: 'linear-gradient(135deg,#dc2626,#f87171)', glow: 'rgba(220,38,38,0.45)',   icon: '#ffd5d5' },
  vscode:   { gradient: 'linear-gradient(135deg,#2563eb,#3b82f6)', glow: 'rgba(37,99,235,0.45)',   icon: '#dbeafe' },
  weather:  { gradient: 'linear-gradient(135deg,#0369a1,#38bdf8)', glow: 'rgba(3,105,161,0.45)',   icon: '#bae6fd' },
}

interface AppIconProps {
  id: AppIconId
  size?: number
  className?: string
  /** When true, renders as a coloured tile (desktop icons, start menu) */
  tile?: boolean
}

function AppIcon({ id, size = 22, className = '', tile = false }: AppIconProps) {
  const Icon  = ICON_MAP[id]
  const theme = APP_COLORS[id]

  if (tile && theme) {
    return (
      <span
        className={`app-icon-tile ${className}`.trim()}
        style={{
          background:  theme.gradient,
          boxShadow:   `0 6px 22px ${theme.glow}`,
        }}
      >
        <Icon size={size} color={theme.icon} aria-hidden />
      </span>
    )
  }

  // Fallback — plain icon (used in taskbar, window titlebar, etc.)
  return <Icon size={size} className={`app-icon ${className}`.trim()} aria-hidden />
}

export default AppIcon
