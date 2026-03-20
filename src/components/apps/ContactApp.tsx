import { useState } from 'react'
import emailjs from '@emailjs/browser'

// 🔴 Replace these three values with yours from EmailJS dashboard
const EMAILJS_SERVICE_ID  = 'service_va6933d'
const EMAILJS_TEMPLATE_ID = 'template_v6x542n'
const EMAILJS_PUBLIC_KEY  = 'dh3Nkum01cuZJ8Hul'

type FormState = {
  from_name:  string
  from_email: string
  reply_to:   string
  message:    string
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

function ContactApp() {

  const [form, setForm] = useState<FormState>({
    from_name:  '',
    from_email: '',
    reply_to:   '',
    message:    '',
  })

  const [status, setStatus] = useState<Status>('idle')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit() {
    // Basic validation
    if (!form.from_name.trim() || !form.from_email.trim() || !form.message.trim()) {
      return
    }

    setStatus('sending')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.from_name,
          from_email: form.from_email,
          reply_to:   form.reply_to,
          message:    form.message,
        },
        EMAILJS_PUBLIC_KEY
      )

      setStatus('sent')
      setForm({ from_name: '', from_email: '', reply_to: '', message: '' })

    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  // ── Sent state ──
  if (status === 'sent') {
    return (
      <div className="contact-sent">
        <div className="contact-sent-inner">
          <div className="contact-sent-icon">✓</div>
          <h3 className="contact-sent-title">Message sent!</h3>
          <p className="contact-sent-sub">I'll get back to you as soon as possible.</p>
          <button
            className="contact-reset-btn"
            onClick={() => setStatus('idle')}
          >
            Send another message
          </button>
        </div>
      </div>
    )
  }

  // ── Form state ──
  return (
    <div className="app-contact">

      <div className="contact-form">

        <div className="contact-form-row">
          <div className="form-field">
            <label>Name <span className="form-required">*</span></label>
            <input
              name="from_name"
              value={form.from_name}
              onChange={handleChange}
              placeholder="Your name"
              disabled={status === 'sending'}
            />
          </div>

          <div className="form-field">
            <label>Email <span className="form-required">*</span></label>
            <input
              name="from_email"
              type="email"
              value={form.from_email}
              onChange={handleChange}
              placeholder="your@email.com"
              disabled={status === 'sending'}
            />
          </div>
        </div>

        <div className="form-field">
          <label>Phone <span className="form-optional">(optional)</span></label>
          <input
            name="reply_to"
            value={form.reply_to}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            disabled={status === 'sending'}
          />
        </div>

        <div className="form-field">
          <label>Message <span className="form-required">*</span></label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What's on your mind?"
            rows={5}
            disabled={status === 'sending'}
          />
        </div>

        {/* Error banner */}
        {status === 'error' && (
          <div className="contact-error">
            ⚠️ Something went wrong. Please try again or email directly at{' '}
            <a href="mailto:salonikarapurkar13@gmail.com">
              salonikarapurkar13@gmail.com
            </a>
          </div>
        )}

        <button
          className={`contact-submit ${status === 'sending' ? 'sending' : ''}`}
          onClick={handleSubmit}
          disabled={
            status === 'sending' ||
            !form.from_name.trim() ||
            !form.from_email.trim() ||
            !form.message.trim()
          }
        >
          {status === 'sending' ? (
            <span className="contact-spinner-row">
              <span className="contact-spinner" />
              Sending...
            </span>
          ) : (
            'Send message →'
          )}
        </button>

      </div>
    </div>
  )
}

export default ContactApp