import { useState } from 'react'
import { formatCurrency } from '../utils/formatters'

export default function PaydayJournal({ currency, journal }) {
  const [balance, setBalance] = useState('')

  function saveSnapshot() {
    if (!balance || Number(balance) <= 0) return

    journal.addSnapshot({
      balance: Number(balance),
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

      {journal.snapshots.length === 0 ? (
        <div className="emptyJournal">
          <div className="emptyIcon">▤</div>
          <strong>No snapshots saved yet.</strong>
          <span>
            Saving snapshots lets you compare how your investments grow over time.
          </span>

          <button className="secondaryButton" type="button" onClick={saveSnapshot}>
            Save first snapshot
          </button>
        </div>
      ) : (
        <>
          <div className="latestSnapshot">
            <span>Latest snapshot</span>
            <strong>
              {formatCurrency(journal.snapshots[0].balance, currency)}
            </strong>
            <small>
              {new Date(journal.snapshots[0].date).toLocaleDateString()}
            </small>
          </div>

          <div className="journalInputRow">
            <input
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Enter current balance"
              inputMode="decimal"
            />
            <button className="secondaryButton" type="button" onClick={saveSnapshot}>
              Save snapshot
            </button>
          </div>

          <div className="snapshotList">
            {journal.snapshots.slice(0, 3).map((snapshot) => (
              <div className="snapshotItem" key={snapshot.id}>
                <span>{new Date(snapshot.date).toLocaleDateString()}</span>
                <strong>{formatCurrency(snapshot.balance, currency)}</strong>
                <button type="button" onClick={() => journal.removeSnapshot(snapshot.id)}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
