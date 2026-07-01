export const GOVERNMENT_BENEFITS_BY_CURRENCY = {
  CAD: {
    country: 'Canada',
    benefits: [
      {
        key: 'cppQpp',
        label: 'CPP / QPP estimate',
        description:
          'Optional monthly estimate for Canada Pension Plan or Quebec Pension Plan income.',
      },
      {
        key: 'oas',
        label: 'Old Age Security estimate',
        description:
          'Optional monthly estimate for Canadian Old Age Security income.',
      },
      {
        key: 'employerPension',
        label: 'Employer pension',
        description:
          'Optional monthly estimate from a workplace pension or annuity.',
      },
    ],
  },

  USD: {
    country: 'United States',
    benefits: [
      {
        key: 'socialSecurity',
        label: 'Social Security estimate',
        description:
          'Optional monthly estimate for US Social Security retirement income.',
      },
      {
        key: 'employerPension',
        label: 'Employer pension',
        description:
          'Optional monthly estimate from a workplace pension or annuity.',
      },
    ],
  },

  GBP: {
    country: 'United Kingdom',
    benefits: [
      {
        key: 'statePension',
        label: 'State Pension estimate',
        description:
          'Optional monthly estimate for UK State Pension income.',
      },
      {
        key: 'workplacePension',
        label: 'Workplace pension',
        description:
          'Optional monthly estimate from a workplace or private pension.',
      },
    ],
  },

  AUD: {
    country: 'Australia',
    benefits: [
      {
        key: 'agePension',
        label: 'Age Pension estimate',
        description:
          'Optional monthly estimate for Australian Age Pension income.',
      },
      {
        key: 'superannuationIncome',
        label: 'Superannuation income',
        description:
          'Optional monthly estimate from superannuation withdrawals or income streams.',
      },
    ],
  },

  BRL: {
    country: 'Brazil',
    benefits: [
      {
        key: 'inss',
        label: 'INSS benefit estimate',
        description:
          'Optional monthly estimate for Brazilian INSS retirement income.',
      },
      {
        key: 'privatePension',
        label: 'Private pension',
        description:
          'Optional monthly estimate from a private pension plan.',
      },
    ],
  },

  INR: {
    country: 'India',
    benefits: [
      {
        key: 'epfEps',
        label: 'EPF / EPS pension estimate',
        description:
          'Optional monthly estimate for Indian EPF or EPS pension income.',
      },
      {
        key: 'npsIncome',
        label: 'NPS income',
        description:
          'Optional monthly estimate from National Pension System income.',
      },
    ],
  },

  CNY: {
    country: 'China',
    benefits: [
      {
        key: 'basicPension',
        label: 'Basic pension estimate',
        description:
          'Optional monthly estimate for China basic pension income.',
      },
      {
        key: 'enterpriseAnnuity',
        label: 'Enterprise annuity',
        description:
          'Optional monthly estimate from an enterprise annuity or employer plan.',
      },
    ],
  },

  JPY: {
    country: 'Japan',
    benefits: [
      {
        key: 'nationalPension',
        label: 'National Pension estimate',
        description:
          'Optional monthly estimate for Japanese National Pension income.',
      },
      {
        key: 'employeesPension',
        label: "Employees' Pension Insurance",
        description:
          "Optional monthly estimate for Japan Employees' Pension Insurance income.",
      },
    ],
  },

  EUR: {
    country: 'Eurozone',
    benefits: [
      {
        key: 'publicPension',
        label: 'Public pension estimate',
        description:
          'Optional monthly estimate for public pension income in your country.',
      },
      {
        key: 'employerPension',
        label: 'Employer pension',
        description:
          'Optional monthly estimate from a workplace or private pension.',
      },
    ],
  },

  MXN: {
    country: 'Mexico',
    benefits: [
      {
        key: 'publicPension',
        label: 'Public pension estimate',
        description:
          'Optional monthly estimate for Mexican public pension income.',
      },
      {
        key: 'privatePension',
        label: 'Private pension',
        description:
          'Optional monthly estimate from a private retirement plan.',
      },
    ],
  },

  SGD: {
    country: 'Singapore',
    benefits: [
      {
        key: 'cpfLife',
        label: 'CPF LIFE estimate',
        description:
          'Optional monthly estimate from Singapore CPF LIFE or retirement income.',
      },
      {
        key: 'privatePension',
        label: 'Private retirement income',
        description:
          'Optional monthly estimate from private savings or retirement plans.',
      },
    ],
  },

  NZD: {
    country: 'New Zealand',
    benefits: [
      {
        key: 'nzSuper',
        label: 'NZ Super estimate',
        description:
          'Optional monthly estimate for New Zealand Superannuation income.',
      },
      {
        key: 'kiwiSaver',
        label: 'KiwiSaver income',
        description:
          'Optional monthly estimate from KiwiSaver withdrawals or income.',
      },
    ],
  },

  ZAR: {
    country: 'South Africa',
    benefits: [
      {
        key: 'olderPersonsGrant',
        label: "Older person's grant estimate",
        description:
          "Optional monthly estimate for South Africa's older person's grant.",
      },
      {
        key: 'retirementAnnuity',
        label: 'Retirement annuity',
        description:
          'Optional monthly estimate from a retirement annuity or private plan.',
      },
    ],
  },
}

export function getGovernmentBenefits(currencyCode) {
  return (
    GOVERNMENT_BENEFITS_BY_CURRENCY[currencyCode] ||
    GOVERNMENT_BENEFITS_BY_CURRENCY.USD
  )
}

export const GOVERNMENT_BENEFITS_DISCLAIMER =
  'Government benefits are optional estimates only. 1040 Paydays does not calculate official public pension benefits. Enter your own monthly estimate if you want it included.'
