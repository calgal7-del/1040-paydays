import { useState } from 'react'
import { formatCurrency } from '../utils/formatters'

export default function PaydayJournal({ currency, journal }) {
  const [balance, setBalance] = useState('')
  const hasSnapshots = journal.snapshots.length > 0
  const latest = hasSnapshots ? journal.snapshots[0] : null

  function saveSnapshot() {
    const amount = Number(balance)
    if (!amount || amount <= 0) return

    journal.addSnapshot({
      balance: amount,
      date: new Date().toISOString(),
    })

    setBalance('')
  }

  return (
    <section className="journalCard">
      <div className="journalHeader">
        <div>
          <p>Payday Journal</p>
          <h2>Track your real progress.</h2>
        </div>
        <a href="#journal">View all</a>
      </div>

      {!hasSnapshots ? (
        <div className="emptyJournal">
          <div className="emptyIcon">▤</div>
          <strong>No snapshots saved yet.</strong>
          <span>Saving snapshots lets you compare how your investments grow over time.</span>
          <button className="secondaryButton" type="button" onClick={saveSnapshot}>
            Save first snapshot
          </button>
        </div>
      ) : (
        <div className="compactJournalState">
          <div className="latestSnapshot compactLatest">
            <span>Latest snapshot</span>
            <strong>{formatCurrency(latest.balance, currency)}</strong>
            <small>{new Date(latest.date).toLocaleDateString()}</small>
          </div>

          <div className="journalInputRow compactInputRow">
            <input
              value={balance}
              onChange={(event) => setBalance(event.target.value)}
              placeholder="Enter current balance"
              inputMode="decimal"
            />
            <button className="secondaryButton" type="button" onClick={saveSnapshot}>
              Save
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
