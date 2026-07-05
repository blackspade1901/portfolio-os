import { useCallback, useEffect, useRef, type RefObject } from 'react'
import { useOSStore } from '../store/osStore'
import type { WindowState } from '../types'

export type ResizeDirection =
  | 'n' | 's' | 'e' | 'w'
  | 'ne' | 'nw' | 'se' | 'sw'

export function useResizable(
  win: WindowState | undefined,
  elementRef: RefObject<HTMLElement | null>,
) {
  const resizeWindow = useOSStore(state => state.resizeWindow)
  const focusWindow = useOSStore(state => state.focusWindow)

  const dragState = useRef<{
    direction: ResizeDirection
    startX: number
    startY: number
    startW: number
    startH: number
    startPX: number
    startPY: number
  } | null>(null)

  const rafId = useRef<number | null>(null)
  const pendingUpdate = useRef<{ x: number; y: number; w: number; h: number } | null>(null)

  const winId = win?.id

  const flushResize = useCallback(() => {
    rafId.current = null
    if (!pendingUpdate.current || !winId) return
    const { x, y, w, h } = pendingUpdate.current
    pendingUpdate.current = null
    resizeWindow(winId, x, y, w, h)
  }, [winId, resizeWindow])

  const scheduleResize = useCallback((x: number, y: number, w: number, h: number) => {
    pendingUpdate.current = { x, y, w, h }
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(flushResize)
    }
  }, [flushResize])

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.current) return

    const { direction, startX, startY, startW, startH, startPX, startPY } = dragState.current

    const dx = e.clientX - startX
    const dy = e.clientY - startY

    let newX = startPX
    let newY = startPY
    let newW = startW
    let newH = startH

    if (direction.includes('e')) newW = startW + dx
    if (direction.includes('w')) { newW = startW - dx; newX = startPX + dx }

    if (direction.includes('s')) newH = startH + dy
    if (direction.includes('n')) { newH = startH - dy; newY = startPY + dy }

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

    scheduleResize(newX, newY, newW, newH)
  }, [scheduleResize])

  const onMouseUp = useCallback(() => {
    dragState.current = null
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    elementRef.current?.classList.remove('window--resizing')
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)

    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
    if (pendingUpdate.current && winId) {
      const { x, y, w, h } = pendingUpdate.current
      pendingUpdate.current = null
      resizeWindow(winId, x, y, w, h)
    }
  }, [onMouseMove, elementRef, resizeWindow, winId])

  const startResize = useCallback((
    e: React.MouseEvent,
    direction: ResizeDirection,
  ) => {
    if (!win) return
    e.preventDefault()
    e.stopPropagation()

    focusWindow(win.id)
    elementRef.current?.classList.add('window--resizing')

    dragState.current = {
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startW: win.size.width,
      startH: win.size.height,
      startPX: win.position.x,
      startPY: win.position.y,
    }

    const cursorMap: Record<ResizeDirection, string> = {
      n: 'n-resize', s: 's-resize',
      e: 'e-resize', w: 'w-resize',
      ne: 'ne-resize', nw: 'nw-resize',
      se: 'se-resize', sw: 'sw-resize',
    }
    document.body.style.cursor = cursorMap[direction]
    document.body.style.userSelect = 'none'

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }, [win, focusWindow, onMouseMove, onMouseUp, elementRef])

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [onMouseMove, onMouseUp])

  return { startResize }
}
