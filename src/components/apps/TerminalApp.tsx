import { useState, useEffect, useRef } from 'react'
import { useOSStore } from '../../store/osStore'

// ── Types ────────────────────────────────────────────────────────────────────

interface HistoryEntry {
  type: 'input' | 'output' | 'error' | 'success'
  content: string
}

// ── Command definitions ───────────────────────────────────────────────────────

const COMMANDS: Record<string, (args: string[], openWindow: (id: string) => void) => string> = {

  help: () => `
Available commands:
  help          → show this list
  whoami        → about me
  skills        → my technical skills
  ls projects   → list my projects
  open <app>    → open an app (projects, about, resume, contact)
  cat resume    → print resume summary
  theme         → (coming soon) change theme
  clear         → clear terminal
  date          → show current date
  echo <text>   → print text back
  secret        → 👀
`.trim(),

whoami: () => `
┌─────────────────────────────────────────┐
│  Saloni Karapurkar                      │
│  MCA Student · Android Developer        │
│  📍 Sankhali, Goa, India               |
│                                         │
│  Passionate about mobile apps, web,     │
│  and data analytics. Loves building     │
│  innovative solutions with Java,        │
│  Python, and JavaScript.                │
│                                         │
│  github.com/blackspade1901              │
└─────────────────────────────────────────┘
`.trim(),

  skills: () => `
Languages   →  Java  Python  JavaScript  TypeScript
Frontend    →  React  HTML  CSS  Tailwind
Backend     →  Spring Boot  Node.js  FastAPI
Databases   →  MySQL  PostgreSQL  MongoDB  Redis
Tools       →  Git  VS Code  Postman  Figma   Docker (learning)
`.trim(),

  ls: (args) => {
    if (args[0] === 'projects') {
      return `
📁 projects/
├── TrueRate/         → Smart GST barcode scanner (Android + Firebase)
├── Link-Up/          → Campus communication app (Android + Firebase)
├── PacMan/           → HTML5 Canvas browser game with leaderboard
└── Portfolio-OS/     → This portfolio (React + Zustand + TypeScript)

Type "open projects" to view full details.
    `.trim()
    }
    return `ls: unknown directory "${args[0] ?? ''}". Try: ls projects`
  },

  open: (args, openWindow) => {
    const validApps = ['projects', 'about', 'resume', 'contact']
    const appId = args[0]
    if (!appId) return 'Usage: open <app>\nApps: projects, about, resume, contact'
    if (!validApps.includes(appId)) {
      return `open: app "${appId}" not found.\nAvailable: ${validApps.join(', ')}`
    }
    openWindow(appId)
    return `Opening ${appId}...`
  },

  cat: (args) => {
    if (args[0] === 'resume') {
      return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Saloni — Resume Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EDUCATION
  MCA — Goa University (2025–2027)
  BSc in Computer Science — Government College of Arts, Science and Commerce, Sankhali (20XX–20XX)

EXPERIENCE
  Personal Projects (see ls projects)

SKILLS
  See: skills

LINKS
  GitHub   → https://github.com/blackspade1901
  LinkedIn → https://www.linkedin.com/in/saloni-karapurkar-26800935b/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim()
    }
    return `cat: "${args[0] ?? ''}": file not found`
  },

  date: () => new Date().toLocaleString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }),

  echo: (args) => args.join(' ') || '',

  secret: () => `
⠀⠀⠀⠀⠀⢀⣀⣤⣤⣤⣀⡀⠀⠀
⠀⠀⠀⢀⣾⡟⠉⠀⠀⠀⠈⠙⣷⡀
⠀⠀⢠⣿⠋⠀⠀⠀⠀⠀⠀⠀⠘⣿⡄
⠀⢠⣿⠃⠀⠀⣶⠀⠀⣶⠀⠀⠀⠘⣿⡄
⠀⣾⡏⠀⠀⠀⠿⠀⠀⠿⠀⠀⠀⠀⢹⣷
⠀⣿⡇⠀⠀⠀⠀⣠⣤⡀⠀⠀⠀⠀⢸⣿
⠀⢿⣇⠀⠀⠀⢰⣿⣿⡇⠀⠀⠀⠀⣸⡿
⠀⠘⣿⡄⠀⠀⠀⠙⠛⠁⠀⠀⠀⢠⣿⠃
⠀⠀⠘⣿⣄⠀⠀⠀⠀⠀⠀⠀⣠⣿⠃
⠀⠀⠀⠈⠻⢿⣶⣤⣤⣤⣴⡿⠟⠁

you found the secret! 🎉
now go build something great.
`.trim(),

  clear: () => '__CLEAR__',   // special signal handled in component
}

// ── Component ─────────────────────────────────────────────────────────────────

function TerminalApp() {
  const openWindow = useOSStore(state => state.openWindow)

  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'success', content: 'Welcome to PortfolioOS Terminal v1.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'output', content: '' },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  // Focus input when terminal mounts
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function runCommand(raw: string) {
    const trimmed = raw.trim()
    if (!trimmed) return

    // Add to command history (for arrow key navigation)
    setCmdHistory(prev => [trimmed, ...prev])
    setHistoryIdx(-1)

    // Echo the input line
    setHistory(prev => [...prev, { type: 'input', content: `$ ${trimmed}` }])

    // Parse: first word is command, rest are args
    const parts = trimmed.split(/\s+/)
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    const handler = COMMANDS[command]

    if (!handler) {
      setHistory(prev => [...prev, {
        type: 'error',
        content: `command not found: ${command}. Type "help" for available commands.`
      }])
      return
    }

    const result = handler(args, openWindow)

    if (result === '__CLEAR__') {
      setHistory([])
      return
    }

    setHistory(prev => [...prev, { type: 'output', content: result }])
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
      return
    }

    // Arrow up → go back in command history
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1)
      setHistoryIdx(nextIdx)
      setInput(cmdHistory[nextIdx] ?? '')
      return
    }

    // Arrow down → go forward in command history
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIdx = Math.max(historyIdx - 1, -1)
      setHistoryIdx(nextIdx)
      setInput(nextIdx === -1 ? '' : cmdHistory[nextIdx])
      return
    }
  }

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>

      {/* Output area */}
      <div className="terminal-output">
        {history.map((entry, i) => (
          <pre key={i} className={`terminal-line terminal-${entry.type}`}>
            {entry.content}
          </pre>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input line */}
      <div className="terminal-input-row">
        <span className="terminal-prompt">$</span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
        />
      </div>

    </div>
  )
}

export default TerminalApp