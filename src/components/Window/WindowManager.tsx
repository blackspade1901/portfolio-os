import { AnimatePresence } from 'framer-motion'
import { useOSStore } from '../../store/osStore'
import Window from './Window'

function WindowManager() {
  const windows = useOSStore(state => state.windows)

  return (
    // AnimatePresence watches for components being added/removed
    // and plays their enter/exit animations
    <AnimatePresence>
      {windows
        .filter(w => !w.minimized)
        .map(win => (
          <Window key={win.id} window={win} />
        ))
      }
    </AnimatePresence>
  )
}

export default WindowManager