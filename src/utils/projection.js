import { PAY_FREQUENCIES } from './constants'
import {
  calculateFutureValue,
  calculateContributionTotal,
  calculateGrowth,
  calculateMonthlyIncome,
} from './compoundInterest'

function toNumber(value) {
  return Number(String(value).replace(/[^0-9.-]/g, '')) || 0
}

function clamp(value, min, max) {
  return Math.min(Math.max(toNumber(value), min), max)
}

export function buildProjection(form) {
  const startingBalance = Math.max(0, toNumber(form.startingBalance))
  const contribution = Math.max(0, toNumber(form.contribution))
  const currentAge = clamp(form.currentAge, 0, 100)
  const retireAge = Math.max(currentAge, clamp(form.retireAge, 0, 100))
  const expectedReturn = clamp(form.expectedReturn, -20, 30)
  const contributionIncrease = clamp(form.contributionIncrease, 0, 25)
  const retirementTaxRate = clamp(form.retirementTaxRate, 0, 60)
  const withdrawalYears = clamp(form.withdrawalYears, 1, 60)
  const governmentBenefit = Math.max(0, toNumber(form.governmentBenefit))
  const employerPension = Math.max(0, toNumber(form.employerPension))

  const frequency = form.frequency || 'Biweekly'
  const periodsPerYear = PAY_FREQUENCIES[frequency] || 26
  const years = Math.max(0, retireAge - currentAge)
  const periods = Math.round(years * periodsPerYear)

  let balance = startingBalance
  let totalFutureContributions = 0
  let currentContribution = contribution

  const points = []
  const interval = Math.max(1, Math.round(periods / 80))
  const periodicRate = Math.pow(1 + expectedReturn / 100, 1 / periodsPerYear) - 1

  for (let payday = 0; payday <= periods; payday += 1) {
    if (payday > 0) {
      const yearNumber = Math.floor(payday / periodsPerYear)

      currentContribution =
        contribution * Math.pow(1 + contributionIncrease / 100, yearNumber)

      balance = balance * (1 + periodicRate) + currentContribution
      totalFutureContributions += currentContribution
    }

    if (payday % interval === 0 || payday === periods) {
      const totalContributions = startingBalance + totalFutureContributions

      points.push({
        payday,
        year: currentAge + payday / periodsPerYear,
        balance,
        contributions: totalContributions,
        growth: Math.max(0, balance - totalContributions),
      })
    }
  }

  const totalContributions = startingBalance + totalFutureContributions
  const finalBalance = calculateFutureValue({
    startingBalance,
    contribution,
    periods,
    annualReturn: expectedReturn,
    periodsPerYear,
  })

  const adjustedFinalBalance =
    contributionIncrease > 0 ? balance : finalBalance

  const growth = calculateGrowth(adjustedFinalBalance, totalContributions)

  const monthlyBenefits = governmentBenefit + employerPension

  const estimatedMonthlyIncome = calculateMonthlyIncome({
    finalBalance: adjustedFinalBalance,
    withdrawalYears,
    retirementTaxRate,
    monthlyBenefits,
  })

  const multiplier =
    totalContributions > 0 ? adjustedFinalBalance / totalContributions : 0

  return {
    startingBalance,
    contribution,
    currentAge,
    retireAge,
    expectedReturn,
    contributionIncrease,
    retirementTaxRate,
    withdrawalYears,
    governmentBenefit,
    employerPension,
    monthlyBenefits,
    frequency,
    periodsPerYear,
    years,
    periods,
    paydaysRemaining: periods,
    totalContributions,
    finalBalance: adjustedFinalBalance,
    growth,
    estimatedMonthlyIncome,
    multiplier,
    points,
  }
}
