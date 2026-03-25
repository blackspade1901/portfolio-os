function ResumeApp() {
  return (
    <div className="app-resume">
      <div className="resume-actions">

        <a href="/Saloni_Karapurkar_Resume.pdf" download className="resume-download-btn">
          ⬇ Download Resume
        </a>
      </div>

      <iframe
        src="/Saloni_Karapurkar_Resume.pdf"
        className="resume-iframe"
        title="Resume"
      />
    </div>
  )
}

export default ResumeApp