import { useMemo, useState } from 'react'
import { VscChevronDown, VscChevronRight, VscClose, VscFiles } from 'react-icons/vsc'
import { SOURCE_FILES, SOURCE_TREE, getSourceFile, type SourceTreeNode } from '../../data/sourceFiles'

function TreeNode({
  node,
  depth,
  activePath,
  onSelect,
}: {
  node: SourceTreeNode
  depth: number
  activePath: string
  onSelect: (path: string) => void
}) {
  const [open, setOpen] = useState(depth < 2)

  if (node.path) {
    const isActive = node.path === activePath
    return (
      <button
        type="button"
        className={`vscode-tree-file ${isActive ? 'active' : ''}`}
        style={{ paddingLeft: `${12 + depth * 14}px` }}
        onClick={() => onSelect(node.path!)}
      >
        <VscFiles size={15} />
        <span>{node.name}</span>
      </button>
    )
  }

  return (
    <div className="vscode-tree-folder">
      <button
        type="button"
        className="vscode-tree-folder-btn"
        style={{ paddingLeft: `${12 + depth * 14}px` }}
        onClick={() => setOpen(prev => !prev)}
      >
        {open ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
        <span>{node.name}</span>
      </button>
      {open && node.children?.map(child => (
        <TreeNode
          key={child.name + (child.path ?? '')}
          node={child}
          depth={depth + 1}
          activePath={activePath}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

function highlightCode(code: string, language: string): string {
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  if (language === 'json') {
    return escaped.replace(
      /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|\b-?\d+(?:\.\d+)?\b/g,
      match => {
        if (match.endsWith(':')) return `<span class="tok-key">${match}</span>`
        if (match.startsWith('"')) return `<span class="tok-string">${match}</span>`
        if (/^\d/.test(match)) return `<span class="tok-number">${match}</span>`
        return `<span class="tok-keyword">${match}</span>`
      },
    )
  }

  return escaped
    .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="tok-comment">$1</span>')
    .replace(/\b(import|export|from|const|let|function|return|if|else|interface|type|default|async|await)\b/g, '<span class="tok-keyword">$1</span>')
    .replace(/('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)/g, '<span class="tok-string">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="tok-number">$1</span>')
}

function VSCodeApp() {
  const [activePath, setActivePath] = useState(SOURCE_FILES[2]?.path ?? 'src/App.tsx')
  const [openTabs, setOpenTabs] = useState<string[]>([SOURCE_FILES[2]?.path ?? 'src/App.tsx'])

  const activeFile = useMemo(() => getSourceFile(activePath), [activePath])

  function openFile(path: string) {
    setActivePath(path)
    setOpenTabs(prev => (prev.includes(path) ? prev : [...prev, path]))
  }

  function closeTab(path: string, e: React.MouseEvent) {
    e.stopPropagation()
    setOpenTabs(prev => {
      const next = prev.filter(tab => tab !== path)
      if (path === activePath && next.length > 0) {
        setActivePath(next[next.length - 1])
      } else if (next.length === 0) {
        setActivePath(SOURCE_FILES[0].path)
        return [SOURCE_FILES[0].path]
      }
      return next
    })
  }

  const lines = activeFile?.content.split('\n') ?? []

  return (
    <div className="vscode-app">
      <div className="vscode-titlebar">
        <span className="vscode-titlebar-dot red" />
        <span className="vscode-titlebar-dot yellow" />
        <span className="vscode-titlebar-dot green" />
        <span className="vscode-titlebar-name">portfolio-os — Visual Studio Code</span>
      </div>

      <div className="vscode-body">
        <aside className="vscode-sidebar">
          <div className="vscode-sidebar-header">EXPLORER</div>
          <div className="vscode-tree">
            <TreeNode
              node={SOURCE_TREE}
              depth={0}
              activePath={activePath}
              onSelect={openFile}
            />
          </div>
        </aside>

        <div className="vscode-editor-pane">
          <div className="vscode-tabs">
            {openTabs.map(tab => {
              const file = getSourceFile(tab)
              return (
                <button
                  key={tab}
                  type="button"
                  className={`vscode-tab ${tab === activePath ? 'active' : ''}`}
                  onClick={() => setActivePath(tab)}
                >
                  <span>{file?.path.split('/').pop()}</span>
                  <span
                    className="vscode-tab-close"
                    onClick={e => closeTab(tab, e)}
                    role="presentation"
                  >
                    <VscClose size={14} />
                  </span>
                </button>
              )
            })}
          </div>

          <div className="vscode-breadcrumb">{activeFile?.path}</div>

          <div className="vscode-editor">
            <div className="vscode-gutter">
              {lines.map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <pre className="vscode-code">
              <code
                dangerouslySetInnerHTML={{
                  __html: highlightCode(activeFile?.content ?? '', activeFile?.language ?? 'typescript'),
                }}
              />
            </pre>
          </div>
        </div>
      </div>

      <div className="vscode-statusbar">
        <span>{activeFile?.language ?? 'plaintext'}</span>
        <span>UTF-8</span>
        <span>portfolio-os</span>
      </div>
    </div>
  )
}

export default VSCodeApp
