import { useState } from 'react'
import Desktop from './components/Desktop/Desktop'
import Taskbar from './components/Taskbar/Taskbar'
import WindowManager from './components/Window/WindowManager'
import BootScreen from './components/BootScreen'

/**
 * Root application component.
 * Renders the boot sequence on first load, then the desktop OS shell.
 */
function App() {
  const [booted, setBooted] = useState(false)

  return (
    <div className="os-shell">
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      {booted && (
        <>
          <Desktop />
          <div className="window-layer">
            <WindowManager />
          </div>
          <Taskbar />
        </>
      )}
    </div>
  )
}

export default App
