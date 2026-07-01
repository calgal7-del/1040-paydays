import { STORAGE_KEYS } from '../utils/constants'
import { useLocalStorage } from './useLocalStorage'

export function usePaydayJournal() {
  const [snapshots, setSnapshots] = useLocalStorage(STORAGE_KEYS.journal, [])

  function saveSnapshot({ balance, currency, projection }) {
    const numericBalance = Number(String(balance).replace(/[^0-9.]/g, '')) || 0

    if (numericBalance <= 0) return

    const previous = snapshots[0]
    const change = previous ? numericBalance - previous.balance : 0

    const snapshot = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      balance: numericBalance,
      currency,
      change,
      payday: projection?.paydaysRemaining || 0,
    }

    setSnapshots([snapshot, ...snapshots].slice(0, 50))
  }

  function deleteSnapshot(id) {
    setSnapshots(snapshots.filter((snapshot) => snapshot.id !== id))
  }

  function resetJournal() {
    setSnapshots([])
  }

  const latestSnapshot = snapshots[0] || null

  return {
    snapshots,
    latestSnapshot,
    hasSnapshots: snapshots.length > 0,
    saveSnapshot,
    deleteSnapshot,
    resetJournal,
  }
}
