import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppIcon from '../icons/AppIcon'
import { APP_REGISTRY, DESKTOP_APP_ORDER } from '../../registry/appRegistry'
import { RECOMMENDED_ITEMS } from '../../data/recommended'
import { useOSStore } from '../../store/osStore'

interface StartMenuProps {
  open: boolean
  onClose: () => void
}

function StartMenu({ open, onClose }: StartMenuProps) {
  const openWindow = useOSStore(state => state.openWindow)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

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
  }, [open, onClose])

  function launch(appId: string) {
    openWindow(appId)
    onClose()
  }

  function openRecommended(item: typeof RECOMMENDED_ITEMS[number]) {
    if (item.appId) {
      launch(item.appId)
      return
    }
    if (item.href) {
      window.open(item.href, '_blank', 'noreferrer')
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          className="start-menu"
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <div className="start-menu-header">
            <img src="/me.jpeg" alt="" className="start-menu-avatar" />
            <div>
              <span className="start-menu-greeting">Saloni Karapurkar</span>
              <span className="start-menu-sub">MCA · Android & Full-stack Developer</span>
            </div>
          </div>

          <div className="start-menu-section">
            <span className="start-menu-section-title">Pinned</span>
            <div className="start-menu-grid">
              {DESKTOP_APP_ORDER.map(appId => {
                const app = APP_REGISTRY[appId]
                if (!app) return null
                return (
                  <button
                    key={app.id}
                    type="button"
                    className="start-menu-app"
                    onClick={() => launch(app.id)}
                  >
                    <span className="start-menu-app-icon">
                      <AppIcon id={app.icon} size={24} tile />
                    </span>
                    <span className="start-menu-app-label">{app.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="start-menu-section">
            <span className="start-menu-section-title">Recommended</span>
            <div className="start-menu-recommended">
              {RECOMMENDED_ITEMS.map(item => (
                <button
                  key={item.id}
                  type="button"
                  className="start-menu-recommended-item"
                  onClick={() => openRecommended(item)}
                >
                  <span className="start-menu-recommended-icon">
                    <AppIcon id={item.icon} size={20} tile />
                  </span>
                  <span className="start-menu-recommended-text">
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="start-menu-footer">
            <button type="button" className="start-menu-power" onClick={onClose}>
              Close menu
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default StartMenu
