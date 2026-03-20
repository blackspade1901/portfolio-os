const projects = [
  {
    id: 1,
    name: 'TrueRate — Smart GST Scanner',
    desc: 'Offline-first Android app that scans product barcodes and calculates exact GST breakdowns. Uses a parallel "race logic" — simultaneously queries Firestore, OpenFoodFacts, OpenBeautyFacts, and UPCItemDB, with the fastest response winning. Crowdsourced product database grows with every scan. 100+ unit tests with 100% pass rate.',
    tags: ['Java', 'Android', 'Firebase', 'Room (SQLite)', 'Retrofit', 'ML Kit', 'CameraX', 'MVC'],
    link: 'https://github.com/blackspade1901/Tax_calculator',
    color: '#059669',
  },
  {
    id: 2,
    name: 'Link-Up — Campus Communication App',
    desc: 'Android app built for college campuses that lets students file complaints, give feedback, and contact faculty across departments. Staff can push real-time notices directly to students. Solves the broken communication loop between students and administration.',
    tags: ['Java', 'Android', 'Firebase', 'Real-time DB'],
    link: 'https://github.com/blackspade1901/linkup2',
    color: '#7c3aed',
  },
  {
    id: 3,
    name: 'PacMan — Browser Game',
    desc: 'Feature-rich HTML5 Canvas PacMan remake extended from a base tutorial. Added full audio system (7 SFX + background music), animated intro screen, top-5 leaderboard with localStorage persistence, heart-icon lives display, and a dedicated game over screen. Game loop runs at 60 FPS via requestAnimationFrame.',
    tags: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Web Audio API', 'localStorage'],
    link: 'https://github.com/blackspade1901/PacMan',
    color: '#d97706',
  },
  {
    id: 4,
    name: 'Portfolio OS',
    desc: 'This portfolio itself — a browser-based desktop OS built from scratch. Features a full window manager with drag, focus stacking, minimize/maximize, a plugin-based app registry, a working terminal with command history, dark/light theme system, and Framer Motion animations.',
    tags: ['React', 'TypeScript', 'Zustand', 'Framer Motion', 'Vite'],
    link: '#',
    color: '#0891b2',
  },
]

function ProjectsApp() {
  return (
    <div className="app-projects">
      <p className="projects-subtitle">
        {projects.length} projects · sorted by complexity
      </p>
      <div className="projects-grid">
        {projects.map(p => (
          <div key={p.id} className="project-card">
            <div className="project-card-bar" style={{ background: p.color }} />
            <div className="project-card-body">
              <h3 className="project-name">{p.name}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map(t => (
                  <span key={t} className="project-tag">{t}</span>
                ))}
              </div>
              {p.link !== '#' && (
                <a
                  href={p.link}
                  className="project-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsApp