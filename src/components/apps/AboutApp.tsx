/**
 * About application displaying profile, skills, education, workshops, and hobbies.
 */
function AboutApp() {
  const skills = [
    {
      category: 'Languages',
      items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'SQL'],
    },
    {
      category: 'Web',
      items: ['React', 'Next.js', 'Node.js', 'Tailwind CSS'],
    },
    {
      category: 'ML & AI',
      items: ['TensorFlow', 'Keras', 'librosa', 'NumPy', 'Pandas', 'scikit-learn'],
    },
    {
      category: 'Android',
      items: ['Android SDK', 'Retrofit', 'CameraX', 'ML Kit', 'Room (SQLite)'],
    },
    {
      category: 'Databases & Cloud',
      items: ['Firebase', 'Supabase', 'Redis', 'PostGIS', 'SQLite'],
    },
    {
      category: 'Tools & Practices',
      items: ['Git', 'GitHub', 'Figma', 'Postman', 'REST APIs', 'Agile', 'Test Automation'],
    },
  ]

  const softSkills = [
    'Team Collaboration',
    'Leadership',
    'Problem Solving',
    'Quick Learner',
    'Time Management',
  ]

  const education = [
    {
      degree: 'Master of Computer Applications (MCA)',
      status: 'Pursuing',
      institute: 'Goa Business School, Goa University',
      period: 'Current · SGPA 8.10',
    },
    {
      degree: 'Bachelor of Science (BSc)',
      status: '',
      institute: 'Govt. College of Arts, Science & Commerce, Sankhali · Goa University',
      period: '2022–2025 · CGPA 8.83',
    },
  ]

  const certifications = [
    {
      title: 'Introduction to Python',
      duration: '10 days · 2024',
      by: 'IBM',
      desc: 'Python fundamentals, Pandas, error handling, and introductory ML including linear regression.',
    },
    {
      title: 'Basics of Robotics',
      duration: '3 days · 2024',
      by: 'Acronix Workshop',
      desc: 'Arduino programming and sensor types (IR, ultrasonic, temperature); built a working fire-extinguisher robot.',
    },
  ]

  const highlights = [
    {
      title: 'Hackathon · Putzmeister',
      when: 'January 2024',
      desc: 'Analysed corporate travel spending and proposed a cost-reduction strategy through policy changes and vendor optimisation.',
    },
    {
      title: 'Volunteer · National Symposium on AI in Healthcare',
      when: 'January 2026',
      desc: 'Assisted with event coordination at Goa University; engaged with speakers, researchers, and attendees.',
    },
    {
      title: 'Talk Series · Semantic Web & Linked Data',
      when: 'January 2026',
      desc: '5-session series by Dr. Mariana Curado Malta (University of Porto) on structured, interoperable scientific knowledge.',
    },
  ]

  const hobbies = [
    { label: 'Online Gaming', icon: '🎮' },
    { label: 'Dancing',       icon: '💃' },
    { label: 'Reading',       icon: '📚' },
    { label: 'Painting',      icon: '🎨' },
  ]

  return (
    <div className="about-os">
      <div className="about-hero">
        <div className="about-hero-bg" />
        <div className="about-avatar-ring">
          <img src="/profile/saloni.png" alt="Saloni Karapurkar" className="about-avatar-photo" />
        </div>
        <div className="about-hero-text">
          <h1 className="about-hero-name">Saloni Karapurkar</h1>
          <p className="about-hero-role">MCA Student · Android & Full-stack Developer</p>
          <p className="about-hero-loc">📍 Sankhali, Goa, India</p>
        </div>
      </div>

      <div className="about-body">
        <p className="about-os-bio">
          MCA student at Goa University with experience in Android development, full-stack web
          development, and deep learning. I enjoy working on projects that solve real problems,
          collaborating in team settings, and picking up new technologies along the way.
        </p>

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
          <a href="https://www.instagram.com/saloni_karapurkar/" target="_blank" rel="noreferrer" className="about-chip">
            📸 Instagram
          </a>
          <a href="tel:+919322715149" className="about-chip">
            📞 +91 93227 15149
          </a>
        </div>

        <div className="about-os-divider" />

        <div className="about-os-section">
          <div className="about-os-section-header">
            <span className="about-os-section-icon">⚡</span>
            <span className="about-os-section-title">Technical Skills</span>
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

        <div className="about-os-section">
          <div className="about-os-section-header">
            <span className="about-os-section-icon">🤝</span>
            <span className="about-os-section-title">Soft Skills</span>
          </div>
          <div className="about-hobbies">
            {softSkills.map(skill => (
              <div key={skill} className="about-hobby-chip">
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-os-divider" />

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

        <div className="about-os-section">
          <div className="about-os-section-header">
            <span className="about-os-section-icon">📜</span>
            <span className="about-os-section-title">Certifications & Trainings</span>
          </div>
          <div className="about-workshop-list">
            {certifications.map((w, i) => (
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

        <div className="about-os-section">
          <div className="about-os-section-header">
            <span className="about-os-section-icon">🏆</span>
            <span className="about-os-section-title">Hackathons & Conferences</span>
          </div>
          <div className="about-workshop-list">
            {highlights.map((item, i) => (
              <div key={i} className="about-workshop-card">
                <div className="about-workshop-top">
                  <span className="about-workshop-title">{item.title}</span>
                  <span className="about-workshop-duration">{item.when}</span>
                </div>
                <p className="about-workshop-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-os-divider" />

        <div className="about-os-section">
          <div className="about-os-section-header">
            <span className="about-os-section-icon">✨</span>
            <span className="about-os-section-title">Other Interests</span>
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
