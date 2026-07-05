import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface BootScreenProps {
  onComplete: () => void
}

/**
 * Initial boot sequence animation displayed before the desktop loads.
 */
function BootScreen({ onComplete }: BootScreenProps) {
  const [stage, setStage] = useState<'loading' | 'done'>('loading')
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Warming up tiny galaxies...')

  const bootMessages = [
    'Warming up tiny galaxies...',
    'Loading project memories...',
    'Mounting screenshot vault...',
    'Starting window manager...',
    'Teaching pixels to behave...',
    'Welcome to Saloni OS.',
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
        setTimeout(() => {
          setStage('done')
          setTimeout(onComplete, 600)
        }, 400)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {stage === 'loading' && (
        <motion.div
          className="boot-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="boot-content">
            <motion.div
              className="boot-logo"
              animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦
            </motion.div>
            <h1 className="boot-title">Saloni OS</h1>
            <p className="boot-version">creative developer workspace</p>

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
