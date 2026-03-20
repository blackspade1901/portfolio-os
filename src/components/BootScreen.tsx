import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface BootScreenProps {
  onComplete: () => void
}

function BootScreen({ onComplete }: BootScreenProps) {
  const [stage, setStage] = useState<'loading' | 'done'>('loading')
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Initializing...')

  const bootMessages = [
    'Initializing kernel...',
    'Loading components...',
    'Mounting file system...',
    'Starting window manager...',
    'Loading portfolio data...',
    'Welcome.',
  ]

  useEffect(() => {
    let step = 0

    const interval = setInterval(() => {
      step++
      const pct = Math.min(step * 18, 100)
      setProgress(pct)
      setStatusText(bootMessages[Math.min(step - 1, bootMessages.length - 1)])

      if (pct >= 100) {
        clearInterval(interval)
        // Short pause at 100% then transition
        setTimeout(() => {
          setStage('done')
          setTimeout(onComplete, 600)  // wait for fade out
        }, 400)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {stage === 'loading' && (
        <motion.div
          className="boot-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="boot-content">
            <div className="boot-logo">🖥️</div>
            <h1 className="boot-title">PortfolioOS</h1>
            <p className="boot-version">v1.0 — by Saloni Karapurkar</p>

            <div className="boot-progress-bar">
              <motion.div
                className="boot-progress-fill"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25 }}
              />
            </div>

            <p className="boot-status">{statusText}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BootScreen