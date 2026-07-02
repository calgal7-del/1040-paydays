import { useState } from 'react'
import { PAY_FREQUENCIES } from '../utils/constants'
import {
  sanitizeAgeInput,
  sanitizeMoneyInput,
  sanitizePercentInput,
} from '../utils/validators'
import AdvancedAssumptions from './AdvancedAssumptions'
import InfoTooltip from './InfoTooltip'

export default function CalculatorCard({
  form,
  onChange,
  onReveal,
  hasRevealed,
}) {
  const [advancedOpen, setAdvancedOpen] = useState(false)

  return (
    <section className="calculatorCard" id="calculator">
      <div className="cardHeader">
        <p>Plan your paydays</p>
        <h2>
          Let’s map your <span>1,040</span> paydays
        </h2>
      </div>

      <div className="calculatorGrid">
        <label>
          Starting balance
          <InfoTooltip label="Starting balance">
            The amount you already have invested today.
          </InfoTooltip>
          <input
            value={form.startingBalance}
            onChange={(e) =>
              onChange('startingBalance', sanitizeMoneyInput(e.target.value))
            }
            inputMode="decimal"
          />
        </label>

        <label>
          Contribution each payday
          <InfoTooltip label="Contribution each payday">
            The amount you plan to invest every payday.
          </InfoTooltip>
          <input
            value={form.contribution}
            onChange={(e) =>
              onChange('contribution', sanitizeMoneyInput(e.target.value))
            }
            inputMode="decimal"
          />
        </label>

        <label>
          Pay frequency
          <InfoTooltip label="Pay frequency">
            This changes the number of contributions and the graph timeline.
          </InfoTooltip>
          <select
            value={form.frequency}
            onChange={(e) => onChange('frequency', e.target.value)}
          >
            {Object.keys(PAY_FREQUENCIES).map((frequency) => (
              <option key={frequency} value={frequency}>
                {frequency}
              </option>
            ))}
          </select>
        </label>

        <label>
          Current age
          <InfoTooltip label="Current age">
            Your age today.
          </InfoTooltip>
          <input
            value={form.currentAge}
            onChange={(e) =>
              onChange('currentAge', sanitizeAgeInput(e.target.value))
            }
            inputMode="numeric"
          />
        </label>

        <label>
          Retire at age
          <InfoTooltip label="Retirement age">
            The age when you plan to stop regular contributions.
          </InfoTooltip>
          <input
            value={form.retireAge}
            onChange={(e) =>
              onChange('retireAge', sanitizeAgeInput(e.target.value))
            }
            inputMode="numeric"
          />
        </label>

        <label>
          Expected return
          <InfoTooltip label="Expected return">
            Your estimated average annual investment return.
          </InfoTooltip>
          <input
            value={form.expectedReturn}
            onChange={(e) =>
              onChange('expectedReturn', sanitizePercentInput(e.target.value))
            }
            inputMode="decimal"
          />
        </label>
      </div>

      <button
        className="advancedToggle"
        type="button"
        onClick={() => setAdvancedOpen((open) => !open)}
      >
        {advancedOpen ? '− Hide advanced assumptions' : '+ Advanced assumptions'}
      </button>

      <AdvancedAssumptions
        open={advancedOpen}
        form={form}
        onChange={onChange}
      />

      <button className="primaryButton" type="button" onClick={onReveal}>
        {hasRevealed ? '↻ Update projection' : '✨ Reveal my future'}
      </button>

      <div className="calculatorTrust">
        <span>🔒 No account needed</span>
        <span>•</span>
        <span>Saved on your device</span>
        <span>•</span>
        <span>Privacy settings</span>
      </div>
    </section>
  )
}
