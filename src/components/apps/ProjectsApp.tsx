import type React from 'react'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { miniProjects, projects } from '../../data/projects'

/**
 * Interactive project museum with case-study cards, screenshots, and role details.
 */
function ProjectsApp() {
  const [activeId, setActiveId] = useState(projects[0].id)
  const [imageIndex, setImageIndex] = useState(0)

  const activeProject = useMemo(
    () => projects.find(project => project.id === activeId) ?? projects[0],
    [activeId],
  )

  const activeImage = activeProject.images[imageIndex] ?? activeProject.images[0]

  function selectProject(projectId: string) {
    setActiveId(projectId)
    setImageIndex(0)
  }

  return (
    <div className="project-studio">
      <section className="project-studio-hero">
        <div>
          <p className="eyebrow">Project Museum</p>
          <h1>Things I built, debugged, trained, and learned from.</h1>
          <p>
            Each card opens like a case file: the problem, the idea, the tech,
            screenshots, and the part I personally owned.
          </p>
        </div>
        <div className="project-orb" />
      </section>

      <div className="project-layout">
        <aside className="project-rail">
          {projects.map(project => (
            <motion.button
              key={project.id}
              className={`project-dock-card ${activeProject.id === project.id ? 'active' : ''}`}
              onClick={() => selectProject(project.id)}
              style={{ '--project-color': project.color } as React.CSSProperties}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <span className="project-dock-status">{project.status}</span>
              <strong>{project.shortName}</strong>
              <small>{project.tagline}</small>
            </motion.button>
          ))}
        </aside>

        <main className="project-case">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeProject.id}
              className="project-case-card"
              style={{ '--project-color': activeProject.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              layout={false}
            >
              <div className="project-case-top">
                <div>
                  <p className="eyebrow">{activeProject.status} Case Study</p>
                  <h2>{activeProject.name}</h2>
                  <p className="project-role">{activeProject.role}</p>
                </div>
                {activeProject.repo && (
                  <a href={activeProject.repo} target="_blank" rel="noreferrer" className="project-repo-link">
                    View on GitHub
                  </a>
                )}
              </div>

              <p className="project-tagline">{activeProject.tagline}</p>

              <div className="project-showcase">
                <div className="project-screen">
                  {activeImage ? (
                    <img src={activeImage.src} alt={activeImage.alt} />
                  ) : (
                    <div className="project-placeholder">
                      <span>Portfolio OS visuals will land here after this build grows up.</span>
                    </div>
                  )}
                </div>

                {activeProject.images.length > 1 && (
                  <div className="project-filmstrip">
                    {activeProject.images.map((image, index) => (
                      <button
                        key={image.src}
                        className={index === imageIndex ? 'active' : ''}
                        onClick={() => setImageIndex(index)}
                      >
                        <img src={image.src} alt={image.alt} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="project-story-grid">
                <div>
                  <h3>Problem</h3>
                  <p>{activeProject.problem}</p>
                </div>
                <div>
                  <h3>Idea</h3>
                  <p>{activeProject.idea}</p>
                </div>
                <div>
                  <h3>Impact</h3>
                  <p>{activeProject.impact}</p>
                </div>
              </div>

              <div className="project-columns">
                <section>
                  <h3>Core Features</h3>
                  <ul>
                    {activeProject.highlights.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </section>
                <section>
                  <h3>My Work</h3>
                  <ul>
                    {activeProject.myWork.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              </div>

              <div className="project-tags">
                {activeProject.tech.map(tech => <span key={tech}>{tech}</span>)}
              </div>
            </motion.article>
          </AnimatePresence>
        </main>
      </div>

      <section className="mini-projects">
        <div>
          <p className="eyebrow">Side Quests</p>
          <h2>Mini projects and older builds</h2>
        </div>
        <div className="mini-project-grid">
          {miniProjects.map(project => (
            <a key={project.name} href={project.repo} target="_blank" rel="noreferrer" className="mini-project-card">
              <h3>{project.name}</h3>
              <p>{project.desc}</p>
              <div>
                {project.tech.map(tech => <span key={tech}>{tech}</span>)}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProjectsApp
