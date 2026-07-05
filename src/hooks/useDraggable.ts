import { useDrag } from '@use-gesture/react'
import { useRef, type RefObject } from 'react'
import { useOSStore } from '../store/osStore'

/**
 * Hook to enable drag functionality for windows.
 * Applies movement via GPU transform during drag to avoid store churn,
 * then commits the final position on release.
 */
export function useDraggable(
  id: string,
  initialX: number,
  initialY: number,
  elementRef: RefObject<HTMLElement | null>,
) {
  const moveWindow = useOSStore(state => state.moveWindow)
  const focusWindow = useOSStore(state => state.focusWindow)
  const origin = useRef({ x: initialX, y: initialY })

  origin.current = { x: initialX, y: initialY }

  const bind = useDrag(
    ({ offset: [x, y], first, last }) => {
      const el = elementRef.current
      if (!el) return

      if (first) {
        focusWindow(id)
        el.classList.add('window--dragging')
      }

      const dx = x - origin.current.x
      const dy = y - origin.current.y
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`

      if (last) {
        el.style.transform = ''
        el.classList.remove('window--dragging')
        moveWindow(id, x, y)
      }
    },
    {
      from: () => [origin.current.x, origin.current.y],
    },
  )

  return bind
}
