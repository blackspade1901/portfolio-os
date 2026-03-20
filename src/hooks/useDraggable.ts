import { useDrag } from '@use-gesture/react'
import { useOSStore } from '../store/osStore'

export function useDraggable(id: string, initialX: number, initialY: number) {
  const moveWindow = useOSStore(state => state.moveWindow)
  const focusWindow = useOSStore(state => state.focusWindow)

  const bind = useDrag(
    ({ offset: [x, y], first }) => {
      // first === true means drag just started
      if (first) focusWindow(id)
      moveWindow(id, x, y)
    },
    {
      // This is where the drag starts from — current window position
      from: () => [initialX, initialY],
    }
  )

  return bind
}