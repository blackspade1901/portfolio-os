import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { useOSStore } from '../../store/osStore'
import type { WindowState } from '../../types'
import { useDraggable } from '../../hooks/useDraggable'
import { useResizable, type ResizeDirection } from '../../hooks/useResizable'
import { APP_REGISTRY } from '../../registry/appRegistry'

interface WindowProps {
  window: WindowState
}

// All 8 handles with their directions and cursor styles
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

function Window({ window: win }: WindowProps) {
  const { closeWindow, focusWindow, minimizeWindow, maximizeWindow } = useOSStore()
  const bindDrag    = useDraggable(win.id, win.position.x, win.position.y)
  const { startResize } = useResizable(win)

  const AppComponent = APP_REGISTRY[win.appId]?.component

  const style: React.CSSProperties = win.maximized
    ? {
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: 'calc(100vh - 48px)',
        zIndex: win.zIndex,
      }
    : {
        position: 'fixed',
        top:    win.position.y,
        left:   win.position.x,
        width:  win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
      }

  return (
    <motion.div
      className="window"
      style={style}
      onMouseDown={() => focusWindow(win.id)}
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1,    y: 0 }}
      exit={{    opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      {/* Resize handles — hidden when maximized */}
      {!win.maximized && RESIZE_HANDLES.map(handle => (
        <div
          key={handle.direction}
          className={`resize-handle ${handle.className}`}
          onMouseDown={e => startResize(e, handle.direction)}
        />
      ))}

      {/* Title bar */}
      <div className="window-titlebar" {...bindDrag()}>
        <span className="window-title">{win.title}</span>
        <div className="window-controls">
          <button
            className="window-btn minimize"
            onMouseDown={e => e.stopPropagation()}
            onClick={() => minimizeWindow(win.id)}
            title="Minimize"
          >
            <svg width="14" height="2" viewBox="0 0 14 2">
              <line x1="0" y1="1" x2="14" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            className="window-btn maximize"
            onMouseDown={e => e.stopPropagation()}
            onClick={() => maximizeWindow(win.id)}
            title="Maximize"
          >
            <svg width="13" height="13" viewBox="0 0 13 13">
              <rect x="1" y="1" width="11" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          <button
            className="window-btn close"
            onMouseDown={e => e.stopPropagation()}
            onClick={() => closeWindow(win.id)}
            title="Close"
          >
            <svg width="13" height="13" viewBox="0 0 13 13">
              <line x1="1" y1="1" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="1" x2="1"  y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* App content */}
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

export default Window