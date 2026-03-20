function AboutApp() {
  const skills = [
    {
      category: 'Programming Languages',
      items: ['Java', 'Python', 'C', 'SQL', 'Kotlin'],
    },
    {
      category: 'Scripting',
      items: ['JavaScript', 'AWK Script', 'Shell Script'],
    },
    {
      category: 'Tools & Platforms',
      items: ['Android Studio', 'Firebase', 'Figma', 'Git & GitHub', 'Room (SQLite)', 'QGIS'],
    },
    {
      category: 'Focus Areas',
      items: ['Android Development', 'Data Science', 'UI/UX Design', 'Database Design', 'API Integration'],
    },
  ]

  const education = [
    { degree: 'MCA', status: 'Pursuing', institute: 'Goa University', period: 'Current' },
    { degree: 'BSc', status: '', institute: 'Govt. College of Arts, Science & Commerce, Sankhali', period: '2022–2025' },
    { degree: 'HSS', status: '', institute: 'Shree Bhumika Higher Secondary School, Paryem', period: '2020–2022' },
    { degree: 'HS', status: '', institute: 'Dnyanjyoti High School, Karapur', period: '2014–2020' },
  ]

  const workshops = [
    {
      title: 'Basics of Robotics',
      duration: '3 days',
      by: 'Acronix @ GCASCS',
      desc: 'Learned Arduino and sensor types. Built a fire extinguisher robot on day 3.',
    },
    {
      title: 'Introduction to Python',
      duration: '10 days',
      by: 'IBM',
      desc: 'Covered Python fundamentals and problem-solving techniques.',
    },
  ]

  const hobbies = [
    { label: 'Dancing',       icon: '💃' },
    { label: 'Reading',       icon: '📚' },
    { label: 'Online Gaming', icon: '🎮' },
    { label: 'GIS',           icon: '🗺️' },
  ]

  return (
    <div className="about-os">

      {/* ── Hero banner ── */}
      <div className="about-hero">
        <div className="about-hero-bg" />
        <div className="about-avatar-ring">
          <div className="about-avatar-lg">SK</div>
        </div>
        <div className="about-hero-text">
          <h1 className="about-hero-name">Saloni Karapurkar</h1>
          <p className="about-hero-role">MCA Student · Android & Web Developer</p>
          <p className="about-hero-loc">📍 Sankhali, Goa, India</p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="about-body">

        {/* Bio */}
        <p className="about-os-bio">
          Passionate about building mobile applications and websites while exploring
          data analytics to solve real-world problems. Loves creating innovative
          solutions and continuously learning new technologies.
        </p>

        {/* Contact chips */}
        <div className="about-chips">
          <a href="mailto:salonikarapurkar13@gmail.com" className="about-chip">
            ✉️ salonikarapurkar13@gmail.com
          </a>
          <a href="https://github.com/blackspade1901" target="_blank" rel="noreferrer" className="about-chip">
            🐙 blackspade1901
          </a>
          <a href="https://www.linkedin.com/in/saloni-karapurkar-26800935b/" target="_blank" rel="noreferrer" className="about-chip">
            🔗 LinkedIn
          </a>
          <a href="tel:+919322715149" className="about-chip">
            📞 +91 93227 15149
          </a>
        </div>

        <div className="about-os-divider" />

        {/* Skills */}
        <div className="about-os-section">
          <div className="about-os-section-header">
            <span className="about-os-section-icon">⚡</span>
            <span className="about-os-section-title">Skills</span>
          </div>
          <div className="about-skills-grid">
            {skills.map(group => (
              <div key={group.category} className="about-skill-block">
                <span className="about-skill-category">{group.category}</span>
                <div className="about-skill-tags">
                  {group.items.map(s => (
                    <span key={s} className="about-skill-pill">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-os-divider" />

        {/* Education */}
        <div className="about-os-section">
          <div className="about-os-section-header">
            <span className="about-os-section-icon">🎓</span>
            <span className="about-os-section-title">Education</span>
          </div>
          <div className="about-edu-list">
            {education.map((e, i) => (
              <div key={i} className="about-edu-item">
                <div className="about-edu-left">
                  <div className="about-edu-dot" />
                  {i < education.length - 1 && <div className="about-edu-line" />}
                </div>
                <div className="about-edu-content">
                  <div className="about-edu-top">
                    <span className="about-edu-degree">
                      {e.degree}
                      {e.status && <span className="about-edu-badge">{e.status}</span>}
                    </span>
                    <span className="about-edu-period">{e.period}</span>
                  </div>
                  <span className="about-edu-institute">{e.institute}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-os-divider" />

        {/* Workshops */}
        <div className="about-os-section">
          <div className="about-os-section-header">
            <span className="about-os-section-icon">🛠️</span>
            <span className="about-os-section-title">Workshops</span>
          </div>
          <div className="about-workshop-list">
            {workshops.map((w, i) => (
              <div key={i} className="about-workshop-card">
                <div className="about-workshop-top">
                  <span className="about-workshop-title">{w.title}</span>
                  <span className="about-workshop-duration">{w.duration}</span>
                </div>
                <span className="about-workshop-by">{w.by}</span>
                <p className="about-workshop-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-os-divider" />

        {/* Hobbies */}
        <div className="about-os-section">
          <div className="about-os-section-header">
            <span className="about-os-section-icon">✨</span>
            <span className="about-os-section-title">Hobbies</span>
          </div>
          <div className="about-hobbies">
            {hobbies.map(h => (
              <div key={h.label} className="about-hobby-chip">
                <span>{h.icon}</span>
                <span>{h.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default AboutApp