import { useEffect, useState } from 'react'
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2'

interface TodoItem {
  id: string
  text: string
  done: boolean
}

const STORAGE_KEY = 'saloni-os-todos'

function loadTodos(): TodoItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) as TodoItem[] : [
      { id: '1', text: 'Explore Project Museum', done: false },
      { id: '2', text: 'Run help in Terminal', done: false },
    ]
  } catch {
    return []
  }
}

function TodoWidget() {
  const [todos, setTodos] = useState<TodoItem[]>(loadTodos)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo() {
    const text = draft.trim()
    if (!text) return
    setTodos(prev => [...prev, { id: String(Date.now()), text, done: false }])
    setDraft('')
  }

  function toggleTodo(id: string) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function removeTodo(id: string) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="desktop-widget todo-widget">
      <span className="desktop-widget-label">My Day</span>
      <ul className="todo-list">
        {todos.slice(0, 4).map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <label>
              <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
              <span>{todo.text}</span>
            </label>
            <button type="button" className="todo-remove" onClick={() => removeTodo(todo.id)} aria-label="Remove">
              <HiOutlineTrash size={14} />
            </button>
          </li>
        ))}
      </ul>
      <div className="todo-add">
        <input
          type="text"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Add a task…"
        />
        <button type="button" onClick={addTodo} aria-label="Add task">
          <HiOutlinePlus size={16} />
        </button>
      </div>
    </div>
  )
}

export default TodoWidget
