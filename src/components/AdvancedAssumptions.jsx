import { getGovernmentBenefits } from "../utils/governmentBenefits";
import InfoTooltip from "./InfoTooltip";

export default function AdvancedAssumptions({
  open,
  form,
  onChange,
}) {
  if (!open) return null;

  const benefits = getGovernmentBenefits(form.currency);

  return (
    <div className="advancedSection">

      <h3>Advanced Assumptions (Optional)</h3>

      <div className="advancedGrid">

        <label>
          Inflation (%)
          <InfoTooltip label="Inflation">
            Estimated annual inflation used for planning.
          </InfoTooltip>

          <input
            type="number"
            value={form.inflation}
            onChange={(e) =>
              onChange("inflation", e.target.value)
            }
          />
        </label>

        <label>
          Contribution Increase (%)
          <InfoTooltip label="Contribution Increase">
            Increase your contribution automatically every year.
          </InfoTooltip>

          <input
            type="number"
            value={form.contributionIncrease}
            onChange={(e) =>
              onChange("contributionIncrease", e.target.value)
            }
          />
        </label>

        <label>
          Management Fees (%)
          <InfoTooltip label="Fees">
            Estimated yearly investment management fees.
          </InfoTooltip>

          <input
            type="number"
            value={form.managementFees}
            onChange={(e) =>
              onChange("managementFees", e.target.value)
            }
          />
        </label>

        <label>
          Retirement Tax Rate (%)
          <InfoTooltip label="Tax">
            Estimated average tax rate during retirement.
          </InfoTooltip>

          <input
            type="number"
            value={form.retirementTaxRate}
            onChange={(e) =>
              onChange("retirementTaxRate", e.target.value)
            }
          />
        </label>

        <label>
          Withdrawal Years
          <InfoTooltip label="Withdrawal Years">
            Number of years you want your investments to provide income.
          </InfoTooltip>

          <input
            type="number"
            value={form.withdrawalYears}
            onChange={(e) =>
              onChange("withdrawalYears", e.target.value)
            }
          />
        </label>

      </div>

      <div className="benefitsSection">

        <h4>{benefits.country} Retirement Benefits</h4>

        {benefits.benefits.map((benefit) => (
          <label key={benefit.key}>

            {benefit.label}

            <InfoTooltip label={benefit.label}>
              {benefit.description}
            </InfoTooltip>

            <input
              type="number"
              value={form[benefit.key] || ""}
              onChange={(e) =>
                onChange(benefit.key, e.target.value)
              }
              placeholder="Optional monthly estimate"
            />

          </label>
        ))}

      </div>

      <p className="advancedDisclaimer">
        Government benefit estimates are optional and are not
        calculated automatically. Enter your own monthly estimates if
        you want them included in your retirement income projection.
      </p>

    </div>
  );
}
