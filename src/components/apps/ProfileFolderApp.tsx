import { useState } from 'react'
import { HiOutlineChevronRight, HiOutlineArrowLeft } from 'react-icons/hi2'
import AppIcon from '../icons/AppIcon'
import { PROFILE_FOLDER, type ProfileEntry } from '../../data/profileFolder'
import { useOSStore } from '../../store/osStore'

function ProfileFolderApp() {
  const openWindow = useOSStore(state => state.openWindow)
  const [path, setPath] = useState<ProfileEntry[]>([PROFILE_FOLDER])
  const [selected, setSelected] = useState<ProfileEntry | null>(null)

  const current = path[path.length - 1]
  const entries = current.children ?? []

  function openEntry(entry: ProfileEntry) {
    if (entry.type === 'folder') {
      setPath(prev => [...prev, entry])
      setSelected(null)
      return
    }

    if (entry.appId) {
      openWindow(entry.appId)
      return
    }

    if (entry.href) {
      window.open(entry.href, '_blank', 'noreferrer')
    }
  }

  function goBack() {
    if (path.length <= 1) return
    setPath(prev => prev.slice(0, -1))
    setSelected(null)
  }

  return (
    <div className="profile-folder-app">
      <div className="profile-folder-toolbar">
        <button type="button" className="profile-folder-back" onClick={goBack} disabled={path.length <= 1}>
          <HiOutlineArrowLeft size={16} />
          Back
        </button>
        <div className="profile-folder-path">
          {path.map((crumb, i) => (
            <span key={crumb.id} className="profile-folder-crumb">
              {i > 0 && <HiOutlineChevronRight size={12} />}
              {crumb.name}
            </span>
          ))}
        </div>
      </div>

      <div className="profile-folder-layout">
        <div className="profile-folder-grid">
          {entries.map(entry => (
            <button
              key={entry.id}
              type="button"
              className={`profile-folder-item ${selected?.id === entry.id ? 'selected' : ''}`}
              onClick={() => {
                setSelected(entry)
                openEntry(entry)
              }}
            >
              <AppIcon id={entry.icon} size={28} className="profile-folder-item-icon" tile />
              <span>{entry.name}</span>
            </button>
          ))}
        </div>

        <aside className="profile-folder-preview">
          {selected ? (
            <>
              <AppIcon id={selected.icon} size={42} />
              <h3>{selected.name}</h3>
              <p>{selected.description ?? `${selected.type} item`}</p>
              {(selected.appId || selected.href || selected.type === 'folder') && (
                <button type="button" className="profile-folder-open" onClick={() => openEntry(selected)}>
                  Open
                </button>
              )}
            </>
          ) : (
            <p className="profile-folder-hint">Select a file or double-click to open.</p>
          )}
        </aside>
      </div>
    </div>
  )
}

export default ProfileFolderApp
