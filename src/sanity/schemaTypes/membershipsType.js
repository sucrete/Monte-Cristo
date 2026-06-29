import { Memberships } from './../components/memberships';
import rateValidation from '../utils/rateValidation';

export default {
  title: 'Memberships',
  name: 'memberships',
  type: 'document',
  components: {
    input: Memberships,
  },
  preview: {
    prepare() {
      return {
        title: 'Memberships',
      };
    },
  },
  fields: [
    {
      name: 'membershipsHeading',
      type: 'string',
      validation: (rule) => rule.required().max(55),
    },
    {
      name: 'membershipsDescription',
      type: 'text',
      validation: (rule) => rule.max(1000),
    },
    //* ROW 1
    {
      name: 'juniorTitle',
      type: 'string',
      validation: (rule) => rule.required().max(35),
    },
    {
      name: 'juniorTitleDef',
      type: 'string',
      validation: (rule) => rule.max(35),
    },
    {
      name: 'juniorMonthly',
      type: 'string',
      validation: rateValidation,
    },
    {
      name: 'juniorYearly',
      type: 'string',
      validation: rateValidation,
    },
    //* ROW 2
    {
      name: 'individualTitle',
      type: 'string',
      validation: (rule) => rule.required().max(35),
    },
    {
      name: 'individualTitleDef',
      type: 'string',
      validation: (rule) => rule.max(35),
    },
    {
      name: 'individualMonthly',
      type: 'string',
      validation: rateValidation,
    },
    {
      name: 'individualYearly',
      type: 'string',
      validation: rateValidation,
    },
    //* ROW 3
    {
      name: 'premiumIndividualTitle',
      type: 'string',
      validation: (rule) => rule.required().max(35),
    },
    {
      name: 'premiumIndividualTitleDef',
      type: 'string',
      validation: (rule) => rule.max(35),
    },
    {
      name: 'premiumIndividualMonthly',
      type: 'string',
      validation: rateValidation,
    },
    {
      name: 'premiumIndividualYearly',
      type: 'string',
      validation: rateValidation,
    },
    //* ROW 4
    {
      name: 'seniorTitle',
      type: 'string',
      validation: (rule) => rule.required().max(35),
    },
    {
      name: 'seniorTitleDef',
      type: 'string',
      validation: (rule) => rule.max(35),
    },
    {
      name: 'seniorMonthly',
      type: 'string',
      validation: rateValidation,
    },
    {
      name: 'seniorYearly',
      type: 'string',
      validation: rateValidation,
    },
    //* ROW 5
    {
      name: 'premiumSeniorTitle',
      type: 'string',
      validation: (rule) => rule.required().max(35),
    },
    {
      name: 'premiumSeniorTitleDef',
      type: 'string',
      validation: (rule) => rule.max(35),
    },
    {
      name: 'premiumSeniorMonthly',
      type: 'string',
      validation: rateValidation,
    },
    {
      name: 'premiumSeniorYearly',
      type: 'string',
      validation: rateValidation,
    },
    //* ROW 6
    {
      name: 'familyTitle',
      type: 'string',
      validation: (rule) => rule.required().max(35),
    },
    {
      name: 'familyTitleDef',
      type: 'string',
      validation: (rule) => rule.max(35),
    },
    {
      name: 'familyMonthly',
      type: 'string',
      validation: rateValidation,
    },
    {
      name: 'familyYearly',
      type: 'string',
      validation: rateValidation,
    },
    //* ROW 7
    {
      name: 'premiumFamilyTitle',
      type: 'string',
      validation: (rule) => rule.required().max(35),
    },
    {
      name: 'premiumFamilyTitleDef',
      type: 'string',
      validation: (rule) => rule.max(35),
    },
    {
      name: 'premiumFamilyMonthly',
      type: 'string',
      validation: rateValidation,
    },
    {
      name: 'premiumFamilyYearly',
      type: 'string',
      validation: rateValidation,
    },
    //* ROW 8
    {
      name: 'corporateTitle',
      type: 'string',
      validation: (rule) => rule.required().max(35),
    },
    {
      name: 'corporateTitleDef',
      type: 'string',
      validation: (rule) => rule.max(35),
    },
    {
      name: 'corporateMonthly',
      type: 'string',
      validation: rateValidation,
    },
    {
      name: 'corporateYearly',
      type: 'string',
      validation: rateValidation,
    },
  ],
};
