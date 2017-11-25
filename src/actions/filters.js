
// SET_TEXT
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT',
  text: text
})

// SORTBY_AMOUNT
export const SortByAmount = () => ({
  type: 'SORTBY_AMOUNT',
  sortBy: "amount"
})
// SORTBY_DATE
export const SortByDate= () => ({
  type: 'SORTBY_DATE',
  sortBy: "date"
})
// SET_START_DATE
export const SetStartDate= (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate: startDate
})
// SET_END_DATE
export const SetEndDate= (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate: endDate
})
