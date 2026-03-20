import { useOSStore } from '../../store/osStore'
import { APP_REGISTRY } from '../../registry/appRegistry'

function Desktop() {
  const openWindow = useOSStore(state => state.openWindow)

  return (
    <div className="desktop">
      <div className="desktop-icons">
        {Object.values(APP_REGISTRY).map(app => (
          <button
            key={app.id}
            className="desktop-icon"
            onDoubleClick={() => openWindow(app.id)}
          >
            <span className="desktop-icon__emoji">{app.icon}</span>
            <span className="desktop-icon__label">{app.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Desktop