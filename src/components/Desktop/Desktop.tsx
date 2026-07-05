import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useOSStore } from '../../store/osStore'
import { DESKTOP_APP_ORDER } from '../../registry/appRegistry'
import DesktopIconButton from './DesktopIconButton'
import TodoWidget from './TodoWidget'
import WeatherWidget from './WeatherWidget'

function Desktop() {
  const openWindow = useOSStore(state => state.openWindow)
  const desktopRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent) {
    if (!desktopRef.current) return
    const rect = desktopRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    desktopRef.current.style.setProperty('--mouse-x', `${x}px`)
    desktopRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div 
      className="desktop"
      ref={desktopRef}
      onMouseMove={handleMouseMove}
    >
      <div className="desktop-bg-pattern" />
      <div className="mouse-glow" />
      
      <div className="aurora-field">
        <span className="aurora aurora-one" />
        <span className="aurora aurora-two" />
        <span className="aurora aurora-three" />
      </div>

      <motion.section
        className="desktop-hero-panel"
        initial={{ opacity: 0, y: 26, rotateX: -12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        layout={false}
      >
        <div className="hero-panel-inner">
          <div className="hero-panel-photo">
            <img src="/me.jpeg" alt="Saloni Karapurkar" />
          </div>
          <div className="hero-panel-content">
            <p className="eyebrow">Saloni OS</p>
            <h1>Welcome to my interactive workspace.</h1>
            <p>
              Open windows, inspect projects, run terminal commands, and wander through
              the small universe behind my code.
            </p>
            <div className="desktop-hero-actions">
              <button type="button" onClick={() => openWindow('projects')}>Explore Projects</button>
              <button type="button" onClick={() => openWindow('profile')}>Open Profile</button>
              <button type="button" onClick={() => openWindow('vscode')}>View Source Code</button>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="desktop-widgets">
        <motion.div
          className="desktop-widget hologram-card"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          layout={false}
        >
          <span className="desktop-widget-label">Current Quest</span>
          <strong>Building useful things with personality.</strong>
        </motion.div>
        <motion.div
          className="desktop-widget pulse-card"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          layout={false}
        >
          <span className="desktop-widget-label">Featured Stack</span>
          <strong>React · Next.js · Android · TensorFlow</strong>
        </motion.div>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          layout={false}
        >
          <WeatherWidget />
        </motion.div>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
          layout={false}
        >
          <TodoWidget />
        </motion.div>
      </div>

      <div className="desktop-icons">
        {DESKTOP_APP_ORDER.map(appId => (
          <DesktopIconButton key={appId} appId={appId} />
        ))}
      </div>
    </div>
  )
}

export default Desktop
