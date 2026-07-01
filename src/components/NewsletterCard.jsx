import { useState } from 'react'

export default function NewsletterCard() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    if (!email.includes('@')) return

    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="newsletterCard" id="learn">
      <p>Stay on track</p>
      <h2>Get your personal 1,040 Payday Plan.</h2>

      <span>
        Your next 12 paydays, milestone ideas, and simple ways to stay consistent.
      </span>

      <form onSubmit={handleSubmit} className="newsletterForm">
        <input
          type="email"
          value={email}
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="secondaryButton">
          Get my plan
        </button>
      </form>

      {submitted && (
        <strong className="successMessage">
          You’re on the list.
        </strong>
      )}

      <small>No spam. Just your plan.</small>
    </section>
  )
}
