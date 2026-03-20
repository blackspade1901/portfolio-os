import { useCallback, useEffect, useRef } from 'react'
import { useOSStore } from '../store/osStore'
import type { WindowState } from '../types'

// All 8 possible resize directions
export type ResizeDirection =
  | 'n' | 's' | 'e' | 'w'
  | 'ne' | 'nw' | 'se' | 'sw'

export function useResizable(win: WindowState) {
  const resizeWindow = useOSStore(state => state.resizeWindow)
  const focusWindow  = useOSStore(state => state.focusWindow)

  // We store drag state in a ref so event listeners
  // always see the latest values without re-registering
  const dragState = useRef<{
    direction: ResizeDirection
    startX: number
    startY: number
    startW: number
    startH: number
    startPX: number
    startPY: number
  } | null>(null)

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.current) return

    const { direction, startX, startY, startW, startH, startPX, startPY } = dragState.current

    const dx = e.clientX - startX
    const dy = e.clientY - startY

    let newX = startPX
    let newY = startPY
    let newW = startW
    let newH = startH

    // East / West affect width and maybe x
    if (direction.includes('e')) newW = startW + dx
    if (direction.includes('w')) { newW = startW - dx; newX = startPX + dx }

    // South / North affect height and maybe y
    if (direction.includes('s')) newH = startH + dy
    if (direction.includes('n')) { newH = startH - dy; newY = startPY + dy }

    // Enforce minimums — if we'd go below min, clamp
    const MIN_W = 300
    const MIN_H = 200

    if (newW < MIN_W) {
      if (direction.includes('w')) newX = startPX + startW - MIN_W
      newW = MIN_W
    }
    if (newH < MIN_H) {
      if (direction.includes('n')) newY = startPY + startH - MIN_H
      newH = MIN_H
    }

    resizeWindow(win.id, newX, newY, newW, newH)
  }, [win.id, resizeWindow])

  const onMouseUp = useCallback(() => {
    dragState.current = null
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }, [onMouseMove])

  const startResize = useCallback((
    e: React.MouseEvent,
    direction: ResizeDirection
  ) => {
    e.preventDefault()
    e.stopPropagation()

    focusWindow(win.id)

    dragState.current = {
      direction,
      startX:  e.clientX,
      startY:  e.clientY,
      startW:  win.size.width,
      startH:  win.size.height,
      startPX: win.position.x,
      startPY: win.position.y,
    }

    // Lock cursor during resize so it doesn't flicker
    const cursorMap: Record<ResizeDirection, string> = {
      n: 'n-resize', s: 's-resize',
      e: 'e-resize', w: 'w-resize',
      ne: 'ne-resize', nw: 'nw-resize',
      se: 'se-resize', sw: 'sw-resize',
    }
    document.body.style.cursor    = cursorMap[direction]
    document.body.style.userSelect = 'none'

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onMouseUp)
  }, [win, focusWindow, onMouseMove, onMouseUp])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onMouseUp)
    }
  }, [onMouseMove, onMouseUp])

  return { startResize }
}