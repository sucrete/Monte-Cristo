import { Weekdays } from "../../components/weekdays";
import rateValidation from "../../utils/rateValidation";


export default {
  title: 'Weekday Rates',
  name: 'weekdayRates',
  type: 'document',
  preview: { prepare: () => ({ title: 'Weekday Rates' }) },
  // Connect the custom component
  components: {
    input: Weekdays,
  },
  fields: [
    {
      name: 'ratesHeading',
      type: 'string',
      validation: (rule) => rule.required().max(35),
    },
    {
      name: 'ratesDescription',
      type: 'text',
      validation: (rule) => rule.max(300),
    },
    //* ROW 1 
    {
      name: 'walkTitle',
      type: 'string',
      validation: (rule) => rule.required().max(35),
    },
    {
      name: 'walkTitleDef',
      type: 'string',
      validation: (rule) => rule.max(35),
    },
    {
      name: 'walk9',
      type: 'string',
      validation: rateValidation,
    },
    {
      name: 'walk18',
      type: 'string',
      validation: rateValidation,
    },
    //* ROW 2
    {
      name: 'rideTitle',
      type: 'string',
      validation: (rule) => rule.required().max(35),
    },
    {
      name: 'rideTitleDef',
      type: 'string',
      validation: (rule) => rule.max(35),
    },
    {
      name: 'ride9',
      type: 'string',
      validation: rateValidation,
    },
    {
      name: 'ride18',
      type: 'string',
      validation: rateValidation,
    },
    //* ROW 3
    {
      name: 'jrTitle',
      type: 'string',
      validation: (rule) => rule.required().max(35),
    },
    {
      name: 'jrTitleDef',
      type: 'string',
      validation: (rule) => rule.max(35),
    },
    {
      name: 'jr9',
      type: 'string',
      validation: rateValidation,
    },
    {
      name: 'jr18',
      type: 'string',
      validation: rateValidation,
    },
    //* ROW 4
    {
      name: 'cartTitle',
      type: 'string',
      validation: (rule) => rule.required().max(35),
    },
    {
      name: 'cartTitleDef',
      type: 'string',
      validation: (rule) => rule.max(35),
    },
    {
      name: 'cart9',
      type: 'string',
      validation: rateValidation,
    },
    {
      name: 'cart18',
      type: 'string',
      validation: rateValidation,
    },
  ],
};
