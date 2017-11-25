import moment from 'moment'

const getVisibleExpenses = (expenses, {text, startDate, endDate, sortBy}) => {
  return expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt)
    const startMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day'): true
    const endMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day'): true
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
    return startMatch && endMatch && textMatch
  }).sort((a,b) => { // -1 => a, 1 => b
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1
    }
  })
}

export default getVisibleExpenses;
