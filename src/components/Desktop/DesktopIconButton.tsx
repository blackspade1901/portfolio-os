import { useState } from 'react'
import { motion } from 'framer-motion'
import AppIcon from '../icons/AppIcon'
import { APP_REGISTRY } from '../../registry/appRegistry'
import { useOSStore } from '../../store/osStore'
import DesktopContextMenu from './DesktopContextMenu'

interface DesktopIconButtonProps {
  appId: string
}

function DesktopIconButton({ appId }: DesktopIconButtonProps) {
  const openWindow = useOSStore(state => state.openWindow)
  const app = APP_REGISTRY[appId]
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null)

  if (!app || app.desktop === false) return null

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault()
    setMenu({ x: e.clientX, y: e.clientY })
  }

  return (
    <>
      <motion.button
        type="button"
        className="desktop-icon"
        onClick={() => openWindow(appId)}
        onContextMenu={handleContextMenu}
        whileHover={{ scale: 1.08, rotateY: 12 }}
        whileTap={{ scale: 0.94 }}
        layout={false}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <span className="desktop-icon__graphic">
          <AppIcon id={app.icon} size={26} tile />
        </span>
        <span className="desktop-icon__label">{app.title}</span>
      </motion.button>

      {menu && (
        <DesktopContextMenu
          appId={appId}
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
        />
      )}
    </>
  )
}

export default DesktopIconButton

export function getDesktopAppIds(): string[] {
  return Object.values(APP_REGISTRY)
    .filter(app => app.desktop !== false)
    .map(app => app.id)
}
