import { create } from 'zustand'
import type { WindowState } from '../types'
import { APP_REGISTRY } from '../registry/appRegistry'

// This is the shape of our entire store
interface OSStore {
    windows: WindowState[]
    maxZIndex: number
    theme: 'dark' | 'light'

    openWindow: (appId: string) => void
    closeWindow: (id: string) => void
    focusWindow: (id: string) => void
    minimizeWindow: (id: string) => void
    maximizeWindow: (id: string) => void
    moveWindow: (id: string, x: number, y: number) => void
    resizeWindow: (id: string, x: number, y: number, width: number, height: number) => void
    toggleTheme: () => void
}

export const useOSStore = create<OSStore>((set, get) => ({
    windows: [],
    maxZIndex: 10,

    openWindow: (appId) => {
        const app = APP_REGISTRY[appId]
        if (!app) return

        const { maxZIndex, windows } = get()

        // If window for this app is already open and minimized, just restore it
        const existing = windows.find(w => w.appId === appId && w.minimized)
        if (existing) {
            set(state => ({
                windows: state.windows.map(w =>
                    w.id === existing.id
                        ? { ...w, minimized: false, zIndex: maxZIndex + 1 }
                        : w
                ),
                maxZIndex: maxZIndex + 1
            }))
            return
        }

        // Slight offset so stacked windows don't perfectly overlap
        const offset = windows.length * 24

        const newWindow: WindowState = {
            id: `window-${Date.now()}`,
            appId,
            title: app.title,
            position: {
                x: 100 + offset,
                y: 80 + offset,
            },
            size: {
                width: app.defaultSize.width,
                height: app.defaultSize.height,
            },
            zIndex: maxZIndex + 1,
            minimized: false,
            maximized: false,
        }

        set(state => ({
            windows: [...state.windows, newWindow],
            maxZIndex: state.maxZIndex + 1,
        }))
    },

    closeWindow: (id) => {
        set(state => ({
            windows: state.windows.filter(w => w.id !== id)
        }))
    },

    focusWindow: (id) => {
        const { maxZIndex } = get()
        set(state => ({
            windows: state.windows.map(w =>
                w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
            ),
            maxZIndex: maxZIndex + 1,
        }))
    },

    minimizeWindow: (id) => {
        set(state => ({
            windows: state.windows.map(w =>
                w.id === id ? { ...w, minimized: true } : w
            )
        }))
    },

    maximizeWindow: (id) => {
        set(state => ({
            windows: state.windows.map(w =>
                w.id === id ? { ...w, maximized: !w.maximized } : w
            )
        }))
    },

    moveWindow: (id, x, y) => {
        // Get viewport dimensions
        const maxX = window.innerWidth - 200   // keep at least 200px visible horizontally
        const maxY = window.innerHeight - 88   // keep above taskbar (48px) + some titlebar

        // Clamp position within safe bounds
        const safeX = Math.max(0, Math.min(x, maxX))
        const safeY = Math.max(0, Math.min(y, maxY))

        set(state => ({
            windows: state.windows.map(w =>
                w.id === id ? { ...w, position: { x: safeX, y: safeY } } : w
            )
        }))
    },

    resizeWindow: (id, x, y, width, height) => {
        const MIN_W = 300
        const MIN_H = 200

        set(state => ({
            windows: state.windows.map(w =>
                w.id === id
                    ? {
                        ...w,
                        position: {
                            x: Math.round(x),
                            y: Math.round(y),
                        },
                        size: {
                            width: Math.max(MIN_W, Math.round(width)),
                            height: Math.max(MIN_H, Math.round(height)),
                        },
                    }
                    : w
            ),
        }))
    },

    theme: 'dark',

    toggleTheme: () => {
        set(state => {
            const next = state.theme === 'dark' ? 'light' : 'dark'
            // Apply to the DOM immediately
            document.documentElement.setAttribute('data-theme', next)
            return { theme: next }
        })
    },
}))