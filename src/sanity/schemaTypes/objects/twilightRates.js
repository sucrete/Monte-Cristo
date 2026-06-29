import { Twilight } from "../../components/twilight";
import rateValidation from "../../utils/rateValidation";

export default {
  title: 'Twilight Rates',
  name: 'twilightRates',
  type: 'document',
  preview: { prepare: () => ({ title: 'Twilight Rates' }) },
  // Connect the custom component
  components: {
    input: Twilight,
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
      name: 'walkPrice',
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
      name: 'ridePrice',
      type: 'string',
      validation: rateValidation,
    },
   
  ],
};
