export default {
  title: 'Greens Fees',
  name: 'rates',
  type: 'document',
  groups: [
    { name: 'weekdayRates', title: 'Weekdays' },
    { name: 'weekendRates', title: 'Weekends' },
    { name: 'twilightRates', title: 'Twilight' },
    { name: 'nonStandardRates', title: 'Non-Standard' },
  ],
  preview: {
    prepare() {
      return {
        title: 'Greens Fees',
      };
    },
  },
  fields: [
    
    {
      title: 'Weekdays',
      name: 'weekday',
      type: 'weekdayRates',
      group: 'weekdayRates',
    },
    {
      title: 'Weekends',
      name: 'weekend',
      type: 'weekendRates',
      group: 'weekendRates',
    },
    {
      title: 'Twilight',
      name: 'twilight',
      type: 'twilightRates',
      group: 'twilightRates',
    },
    {
      title: 'Non-Standard',
      name: 'nonStandard',
      type: 'nonStandardRates',
      group: 'nonStandardRates',
    },
  ],
};
