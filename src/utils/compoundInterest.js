export function calculatePeriodicRate(annualRate, periodsPerYear) {
  const rate = Number(annualRate) || 0
  const periods = Number(periodsPerYear) || 1

  return Math.pow(1 + rate / 100, 1 / periods) - 1
}

export function calculateFutureValue({
  startingBalance = 0,
  contribution = 0,
  periods = 0,
  annualReturn = 0,
  periodsPerYear = 26,
}) {
  const periodicRate = calculatePeriodicRate(annualReturn, periodsPerYear)

  let balance = Number(startingBalance) || 0

  for (let i = 1; i <= periods; i += 1) {
    balance = balance * (1 + periodicRate) + Number(contribution || 0)
  }

  return balance
}

export function calculateContributionTotal({
  startingBalance = 0,
  contribution = 0,
  periods = 0,
}) {
  return Number(startingBalance || 0) + Number(contribution || 0) * Number(periods || 0)
}

export function calculateGrowth(finalBalance, totalContributions) {
  return Math.max(0, Number(finalBalance || 0) - Number(totalContributions || 0))
}

export function calculateMonthlyIncome({
  finalBalance = 0,
  withdrawalYears = 20,
  retirementTaxRate = 0,
  monthlyBenefits = 0,
}) {
  const years = Math.max(1, Number(withdrawalYears) || 20)
  const taxRate = Math.max(0, Math.min(Number(retirementTaxRate) || 0, 100)) / 100

  const grossMonthly = Number(finalBalance || 0) / (years * 12)
  const afterTaxMonthly = grossMonthly * (1 - taxRate)

  return afterTaxMonthly + Number(monthlyBenefits || 0)
}
