const rateValidation = (Rule) => [
  Rule.regex(/^[0-9$.,]+$/).error('Only numbers, dollar signs ($), periods (.), and commas (,) are allowed.'),
  Rule.max(10).error('Character limit reached.'),
]
export default rateValidation;