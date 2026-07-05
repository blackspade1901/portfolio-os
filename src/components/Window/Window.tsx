import React, { Suspense, memo, useRef } from 'react'
import { motion } from 'framer-motion'
import { useOSStore } from '../../store/osStore'
import { useDraggable } from '../../hooks/useDraggable'
import { useResizable, type ResizeDirection } from '../../hooks/useResizable'
import { APP_REGISTRY } from '../../registry/appRegistry'

interface WindowProps {
  id: string
}

const RESIZE_HANDLES: { direction: ResizeDirection; className: string }[] = [
  { direction: 'n',  className: 'resize-n'  },
  { direction: 's',  className: 'resize-s'  },
  { direction: 'e',  className: 'resize-e'  },
  { direction: 'w',  className: 'resize-w'  },
  { direction: 'ne', className: 'resize-ne' },
  { direction: 'nw', className: 'resize-nw' },
  { direction: 'se', className: 'resize-se' },
  { direction: 'sw', className: 'resize-sw' },
]

function Window({ id }: WindowProps) {
  const win = useOSStore(state => state.windows.find(w => w.id === id))
  const frozenWin = useRef(win)
  if (win) frozenWin.current = win

  const activeWin = win ?? frozenWin.current
  const closeWindow = useOSStore(state => state.closeWindow)
  const focusWindow = useOSStore(state => state.focusWindow)
  const minimizeWindow = useOSStore(state => state.minimizeWindow)
  const maximizeWindow = useOSStore(state => state.maximizeWindow)

  const windowRef = useRef<HTMLDivElement>(null)

  const bindDrag = useDraggable(
    id,
    activeWin?.position.x ?? 0,
    activeWin?.position.y ?? 0,
    windowRef,
  )
  const { startResize } = useResizable(activeWin, windowRef)

  if (!activeWin) return null

  const AppComponent = APP_REGISTRY[activeWin.appId]?.component

  const style: React.CSSProperties = activeWin.maximized
    ? {
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: 'calc(100vh - 48px)',
        zIndex: activeWin.zIndex,
      }
    : {
        position: 'fixed',
        top: activeWin.position.y,
        left: activeWin.position.x,
        width: activeWin.size.width,
        height: activeWin.size.height,
        zIndex: activeWin.zIndex,
      }

  return (
    <motion.div
      ref={windowRef}
      className="window"
      style={style}
      onMouseDown={() => focusWindow(activeWin.id)}
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      layout={false}
    >
      {!activeWin.maximized && RESIZE_HANDLES.map(handle => (
        <div
          key={handle.direction}
          className={`resize-handle ${handle.className}`}
          onMouseDown={e => startResize(e, handle.direction)}
        />
      ))}

      <div className="window-titlebar" {...bindDrag()}>
        <span className="window-title">{activeWin.title}</span>
        <div className="window-controls">
          <button
            className="window-btn minimize"
            onMouseDown={e => e.stopPropagation()}
            onClick={() => minimizeWindow(activeWin.id)}
            title="Minimize"
          >
            <svg width="14" height="2" viewBox="0 0 14 2">
              <line x1="0" y1="1" x2="14" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            className="window-btn maximize"
            onMouseDown={e => e.stopPropagation()}
            onClick={() => maximizeWindow(activeWin.id)}
            title="Maximize"
          >
            <svg width="13" height="13" viewBox="0 0 13 13">
              <rect x1="1" y1="1" width="11" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          <button
            className="window-btn close"
            onMouseDown={e => e.stopPropagation()}
            onClick={() => closeWindow(activeWin.id)}
            title="Close"
          >
            <svg width="13" height="13" viewBox="0 0 13 13">
              <line x1="1" y1="1" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="1" x2="1"  y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="window-body">
        <Suspense fallback={<div className="app-loading">Loading...</div>}>
          {AppComponent
            ? <AppComponent />
            : <p style={{ padding: 16, color: '#ccc' }}>App not found</p>
          }
        </Suspense>
      </div>
    </motion.div>
  )
}

export default memo(Window)
