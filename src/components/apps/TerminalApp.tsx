import { useEffect, useRef, useState } from 'react'
import { useOSStore } from '../../store/osStore'

type TokenKind = 'cmd' | 'arg' | 'comment' | 'text'

interface Token {
  kind: TokenKind
  text: string
}

interface HistoryEntry {
  type: 'input' | 'output' | 'error' | 'success'
  content: string
  tokens?: Token[]   // for coloured input lines
}

const COMMANDS: Record<string, (args: string[], openWindow: (id: string) => void) => string> = {
  help: () =>
`# Available commands
  help          -> show this list
  whoami        -> about me
  skills        -> my technical skills
  ls projects   -> list my main projects
  open <app>    -> open an app
  cat resume    -> print resume summary
  date          -> show current date
  echo <text>   -> print text back
  secret        -> tiny ghost
  clear         -> clear the terminal`.trim(),

  whoami: () =>
`Saloni Karapurkar
MCA Student | Android + Full-stack + Deep Learning
Sankhali, Goa, India

I build practical apps that solve real problems — local marketplaces,
Android utilities, ML classifiers, and this OS-shaped portfolio.

# Links
  github.com/blackspade1901
  linkedin.com/in/saloni-karapurkar-26800935b
  instagram.com/saloni_karapurkar`.trim(),

  skills: () =>
`# Technical Stack
Languages   -> Java  Python  JavaScript  TypeScript  C  SQL
Web         -> React  Next.js  Node.js  Tailwind CSS
Mobile      -> Android SDK  Retrofit  CameraX  ML Kit  Room
AI/ML       -> TensorFlow  Keras  librosa  NumPy  Pandas  scikit-learn
Databases   -> Firebase  Supabase  PostGIS  Redis  SQLite
Tools       -> Git  GitHub  Figma  Postman  Google Colab  Kaggle
Practices   -> REST APIs  Transfer Learning  Test Automation  Agile`.trim(),

  ls: (args) => {
    if (args[0] === 'projects') {
      return `projects/
# Main Projects
|- LocalServe/       -> local service provider platform (group project)
|- Bird-ID/          -> bird species classifier from audio (ML)
|- TrueRate/         -> smart GST barcode scanner (Android)
|- Link-Up/          -> campus communication app (group project)
'- Portfolio-OS/     -> this interactive workspace

# Type "open projects" to view full details.`.trim()
    }
    return `ls: unknown directory "${args[0] ?? ''}". Try: ls projects`
  },

  open: (args, openWindow) => {
    const validApps = ['projects', 'about', 'resume', 'contact', 'terminal', 'vscode', 'profile', 'weather']
    const appId = args[0]
    if (!appId) return 'Usage: open <app>\n# Apps: projects, about, profile, resume, contact, terminal, vscode, weather'
    if (!validApps.includes(appId)) {
      return `open: app "${appId}" not found.\n# Available: ${validApps.join(', ')}`
    }
    openWindow(appId)
    return `Opening ${appId}...`
  },

  cat: (args) => {
    if (args[0] === 'resume') {
      return `Saloni - Resume Summary

# Education
  MCA (Pursuing) - Goa Business School, Goa University · SGPA 8.10
  BSc (2022-2025) - Govt. College of Arts, Science & Commerce · CGPA 8.83

# Projects
  LocalServe, TrueRate, Bird Audio Classifier, Link-Up, Portfolio OS

# Skills
  See: skills

# Links
  GitHub    -> https://github.com/blackspade1901
  LinkedIn  -> https://www.linkedin.com/in/saloni-karapurkar-26800935b/
  Instagram -> https://www.instagram.com/saloni_karapurkar/`.trim()
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

  secret: () =>
`      .-.
     (o o)
     | O \\
      \\   \\
       '~~~'

# You found the tiny ghost.
# Now go build something great.`.trim(),

  clear: () => '__CLEAR__',
}

/** Colour-tokenise a command line for display */
function tokeniseInput(raw: string): Token[] {
  const parts = raw.trim().split(/\s+/)
  if (!parts.length) return [{ kind: 'text', text: raw }]
  const [cmd, ...rest] = parts
  const tokens: Token[] = [{ kind: 'cmd', text: cmd }]
  rest.forEach(a => tokens.push({ kind: 'arg', text: ' ' + a }))
  return tokens
}

/**
 * Render a single output line with comment highlighting.
 * Lines starting with # are rendered as comments (dimmer colour).
 */
function OutputLine({ text, type }: { text: string; type: HistoryEntry['type'] }) {
  const isComment = text.trimStart().startsWith('#')
  const cls = isComment
    ? 'term-comment'
    : type === 'input' ? 'term-input-line'
    : type === 'error' ? 'term-error-line'
    : type === 'success' ? 'term-success-line'
    : 'term-output-line'
  return <span className={cls}>{text}</span>
}

/**
 * Terminal emulator — single continuous scroll, colour-coded tokens.
 */
function TerminalApp() {
  const openWindow = useOSStore(state => state.openWindow)

  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'success', content: 'Welcome to Saloni OS Terminal v1.0' },
    { type: 'output',  content: '# Type "help" to see available commands.' },
    { type: 'output',  content: '' },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function runCommand(raw: string) {
    const trimmed = raw.trim()
    if (!trimmed) return

    setCmdHistory(prev => [trimmed, ...prev])
    setHistoryIdx(-1)
    setHistory(prev => [
      ...prev,
      { type: 'input', content: trimmed, tokens: tokeniseInput(trimmed) },
    ])

    const parts   = trimmed.split(/\s+/)
    const command = parts[0].toLowerCase()
    const args    = parts.slice(1)
    const handler = COMMANDS[command]

    if (!handler) {
      setHistory(prev => [...prev, {
        type: 'error',
        content: `command not found: ${command}. Type "help" for available commands.`,
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
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1)
      setHistoryIdx(next)
      setInput(cmdHistory[next] ?? '')
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(historyIdx - 1, -1)
      setHistoryIdx(next)
      setInput(next === -1 ? '' : cmdHistory[next])
    }
  }

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      {/* ── Single scrollable output area ── */}
      <div className="terminal-output">
        {history.map((entry, i) => {
          if (entry.type === 'input' && entry.tokens) {
            return (
              <div key={i} className="terminal-row terminal-row--input">
                <span className="term-prompt">❯</span>
                {entry.tokens.map((t, j) => (
                  <span key={j} className={`term-tok-${t.kind}`}>{t.text}</span>
                ))}
              </div>
            )
          }

          /* multi-line output: split and render each line */
          const lines = entry.content.split('\n')
          return (
            <div key={i} className="terminal-row">
              {lines.map((line, j) => (
                <div key={j} className="terminal-line-wrap">
                  <OutputLine text={line} type={entry.type} />
                </div>
              ))}
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* ── Live input row ── */}
      <div className="terminal-input-row">
        <span className="term-prompt">❯</span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          placeholder="type a command…"
        />
      </div>
    </div>
  )
}

export default TerminalApp
