import { useState } from 'react'
import {
  formatCurrency,
  formatJournalDate,
} from '../utils/formatters'

export default function PaydayJournal({
  currency,
  projection,
  journal,
}) {
  const [balance, setBalance] = useState('')

  function handleSave() {
    journal.saveSnapshot({
      balance,
      currency,
      projection,
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

        {journal.hasSnapshots && (
          <button
            className="ghostButton dangerText"
            type="button"
            onClick={journal.resetJournal}
          >
            Reset journal
          </button>
        )}
      </div>

      {!journal.hasSnapshots ? (
        <div className="emptyJournal">
          <strong>No snapshots saved yet.</strong>
          <p>
            Save your balance on payday and watch your real progress
            build over time.
          </p>
        </div>
      ) : (
        <div className="latestSnapshot">
          <span>Latest snapshot</span>
          <strong>
            {formatCurrency(journal.latestSnapshot.balance, currency)}
          </strong>
          <p>
            {formatJournalDate(journal.latestSnapshot.date)}
          </p>

          {journal.latestSnapshot.change !== 0 && (
            <em
              className={
                journal.latestSnapshot.change > 0
                  ? 'positiveChange'
                  : 'negativeChange'
              }
            >
              {journal.latestSnapshot.change > 0 ? '+' : ''}
              {formatCurrency(journal.latestSnapshot.change, currency)} since last snapshot
            </em>
          )}
        </div>
      )}

      <div className="journalInputRow">
        <input
          value={balance}
          onChange={(e) =>
            setBalance(e.target.value.replace(/[^0-9.]/g, ''))
          }
          placeholder="Enter current balance"
          inputMode="decimal"
        />

        <button
          className="secondaryButton"
          type="button"
          onClick={handleSave}
        >
          Save snapshot
        </button>
      </div>

      {journal.hasSnapshots && (
        <div className="snapshotList">
          {journal.snapshots.slice(0, 4).map((snapshot) => (
            <div className="snapshotItem" key={snapshot.id}>
              <span>{formatJournalDate(snapshot.date)}</span>
              <strong>
                {formatCurrency(snapshot.balance, currency)}
              </strong>
              <button
                type="button"
                onClick={() => journal.deleteSnapshot(snapshot.id)}
                aria-label="Delete snapshot"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
