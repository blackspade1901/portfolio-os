import { useOSStore } from '../../store/osStore'
import { APP_REGISTRY } from '../../registry/appRegistry'
import { useState, useEffect } from 'react'

function Taskbar() {
  const { windows, openWindow, focusWindow, theme, toggleTheme } = useOSStore()
  const [time, setTime] = useState(new Date())

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
    <div className="taskbar">
      <span className="taskbar-brand">🖥️ PortfolioOS</span>

      <div className="taskbar-windows">
        {windows.map(win => (
          <button
            key={win.id}
            className={`taskbar-app-btn ${win.minimized ? 'minimized' : ''}`}
            onClick={() => handleTaskbarClick(win)}
          >
            <span>{APP_REGISTRY[win.appId]?.icon}</span>
            <span>{win.title}</span>
          </button>
        ))}
      </div>

      {/* Theme toggle */}
      <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <span className="taskbar-clock">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  )
}

export default Taskbar