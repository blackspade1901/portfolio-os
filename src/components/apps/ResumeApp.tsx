function ResumeApp() {
  return (
    <div className="app-resume">
      <div className="resume-actions">
        
          <a href="/profile.html"
          target="_blank"
          rel="noreferrer"
          className="resume-download-btn"
        >
          ↗ Open in new tab
        </a>
      </div>

      <iframe
        src="/profile.html"
        className="resume-iframe"
        title="Resume"
      />
    </div>
  )
}

export default ResumeApp