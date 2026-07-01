export function sanitizeMoneyInput(value) {
  return String(value).replace(/[^0-9.]/g, '')
}

export function sanitizePercentInput(value) {
  return String(value).replace(/[^0-9.-]/g, '')
}

export function sanitizeAgeInput(value) {
  return String(value).replace(/[^0-9]/g, '')
}

export function validateProjectionForm(form) {
  const errors = {}

  const currentAge = Number(form.currentAge)
  const retireAge = Number(form.retireAge)
  const contribution = Number(String(form.contribution).replace(/[^0-9.]/g, ''))
  const startingBalance = Number(String(form.startingBalance).replace(/[^0-9.]/g, ''))

  if (!Number.isFinite(startingBalance) || startingBalance < 0) {
    errors.startingBalance = 'Starting balance must be zero or more.'
  }

  if (!Number.isFinite(contribution) || contribution < 0) {
    errors.contribution = 'Contribution must be zero or more.'
  }

  if (!Number.isFinite(currentAge) || currentAge < 0 || currentAge > 100) {
    errors.currentAge = 'Enter an age between 0 and 100.'
  }

  if (!Number.isFinite(retireAge) || retireAge < currentAge || retireAge > 100) {
    errors.retireAge = 'Retirement age must be after your current age.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
