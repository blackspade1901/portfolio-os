import { useEffect, useState } from 'react'
import AppIcon from '../icons/AppIcon'
import { APP_REGISTRY } from '../../registry/appRegistry'
import { useOSStore } from '../../store/osStore'
import StartMenu from '../StartMenu/StartMenu'

function Taskbar() {
  const { windows, openWindow, focusWindow, theme, toggleTheme } = useOSStore()
  const [time, setTime] = useState(new Date())
  const [startOpen, setStartOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  function handleTaskbarClick(win: { id: string; minimized: boolean; appId: string }) {
    if (win.minimized) {
      openWindow(win.appId)
    } else {
      focusWindow(win.id)
    }
  }

  return (
    <>
      <StartMenu open={startOpen} onClose={() => setStartOpen(false)} />

      <div className="taskbar">
        <button
          type="button"
          className={`taskbar-brand taskbar-start ${startOpen ? 'active' : ''}`}
          onClick={() => setStartOpen(prev => !prev)}
        >
          <AppIcon id="logo" size={16} className="taskbar-logo-icon" />
          Saloni OS
        </button>

        <div className="taskbar-windows">
          {windows.map(win => {
            const app = APP_REGISTRY[win.appId]
            return (
              <button
                key={win.id}
                type="button"
                className={`taskbar-app-btn ${win.minimized ? 'minimized' : ''}`}
                onClick={() => handleTaskbarClick(win)}
              >
                {app && <AppIcon id={app.icon} size={14} />}
                <span>{win.title}</span>
              </button>
            )
          })}
        </div>

        <button type="button" className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          <AppIcon id={theme === 'dark' ? 'sun' : 'moon'} size={16} />
        </button>

        <span className="taskbar-clock">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </>
  )
}

export default Taskbar
