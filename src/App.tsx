import { useState } from 'react'
import Desktop from './components/Desktop/Desktop'
import Taskbar from './components/Taskbar/Taskbar'
import WindowManager from './components/Window/WindowManager'
import BootScreen from './components/BootScreen'

function App() {
  const [booted, setBooted] = useState(false)

  return (
    <div className="os-shell">
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}

      {booted && (
        <>
          <Desktop />
          <WindowManager />
          <Taskbar />
        </>
      )}
    </div>
  )
}

export default App