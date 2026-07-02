import { useState } from 'react'

export default function NewsletterCard() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  function submitForm(event) {
    event.preventDefault()
    if (!email.trim()) return
    setJoined(true)
  }

  return (
    <section className="newsletterCard">
      <div className="newsletterHeader">
        <span className="newsletterIcon">✉</span>

        <div>
          <p>Stay on track</p>
          <h2>Get your personal 1,040 Payday Plan.</h2>
          <span>
            Your next 12 paydays, milestone ideas, and simple ways to stay consistent.
          </span>
        </div>
      </div>

      <form className="newsletterForm" onSubmit={submitForm}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          type="email"
        />

        <button className="secondaryButton" type="submit">
          Get my plan
        </button>
      </form>

      {joined ? (
        <strong className="successMessage">You’re on the list.</strong>
      ) : (
        <small>No spam. Just your plan.</small>
      )}
    </section>
  )
}
