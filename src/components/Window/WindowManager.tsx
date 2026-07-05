import { AnimatePresence } from 'framer-motion'
import { useShallow } from 'zustand/react/shallow'
import { useOSStore } from '../../store/osStore'
import Window from './Window'

/**
 * Manages open windows with enter/exit animations via AnimatePresence.
 * Only renders non-minimized windows.
 */
function WindowManager() {
  const visibleIds = useOSStore(
    useShallow(state => state.windows.filter(w => !w.minimized).map(w => w.id)),
  )

  return (
    <AnimatePresence>
      {visibleIds.map(id => (
        <Window key={id} id={id} />
      ))}
    </AnimatePresence>
  )
}

export default WindowManager
