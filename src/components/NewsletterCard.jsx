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
          <span>Join the mailing list for tips, tools, and early access.</span>
        </div>
      </div>

      <form className="newsletterForm" onSubmit={submitForm}>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email address"
          type="email"
        />
        <button className="secondaryButton" type="submit">Join the list</button>
      </form>

      {joined ? (
        <strong className="successMessage">You’re on the list.</strong>
      ) : (
        <small>No spam. Unsubscribe anytime.</small>
      )}
    </section>
  )
}
