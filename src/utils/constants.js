export const DEFAULT_FORM = {
  startingBalance: '1000',
  contribution: '100',
  frequency: 'Biweekly',
  currency: 'CAD',
  currentAge: '35',
  retireAge: '65',
  expectedReturn: '7.0',
  inflation: '2.0',
  contributionIncrease: '0',
  managementFees: '0.5',
  retirementTaxRate: '20',
  governmentBenefit: '0',
  employerPension: '0',
  withdrawalYears: '20',
}

export const PAY_FREQUENCIES = {
  Daily: 365,
  Weekly: 52,
  Biweekly: 26,
  'Semi-monthly': 24,
  Monthly: 12,
  Quarterly: 4,
  Yearly: 1,
}

export const STORAGE_KEYS = {
  journal: 'paydays.journal.v2',
  currency: 'paydays.currency.v2',
  form: 'paydays.form.v2',
}
