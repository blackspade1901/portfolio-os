import { useEffect, useRef } from 'react'
import AppIcon from '../icons/AppIcon'
import { APP_REGISTRY } from '../../registry/appRegistry'
import { useOSStore } from '../../store/osStore'

interface DesktopContextMenuProps {
  appId: string
  x: number
  y: number
  onClose: () => void
}

function DesktopContextMenu({ appId, x, y, onClose }: DesktopContextMenuProps) {
  const openWindow = useOSStore(state => state.openWindow)
  const menuRef = useRef<HTMLDivElement>(null)
  const app = APP_REGISTRY[appId]

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [onClose])

  if (!app) return null

  return (
    <div
      ref={menuRef}
      className="desktop-context-menu"
      style={{ top: y, left: x }}
    >
      <div className="desktop-context-menu-header">
        <AppIcon id={app.icon} size={18} />
        <span>{app.title}</span>
      </div>
      <button type="button" onClick={() => { openWindow(appId); onClose() }}>
        Open
      </button>
      <button type="button" onClick={() => { openWindow(appId); onClose() }}>
        Open as window
      </button>
      <div className="desktop-context-menu-divider" />
      <div className="desktop-context-menu-props">
        <span>Type</span>
        <strong>Application</strong>
        <span>Description</span>
        <strong>{app.description}</strong>
      </div>
    </div>
  )
}

export default DesktopContextMenu
