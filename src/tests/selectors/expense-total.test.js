import selectExpenseTotal from '../../selectors/expense-total'
import expenses from '../dummyData/expenses'

test('should return 0 if no expense', () => {
  const result = selectExpenseTotal([])
  expect(result).toBe(0)
})
test('should correctly add up a single expense', () => {
  const result = selectExpenseTotal([expenses[0]])
  expect(result).toBe(expenses[0].amount)
})
test('should return sum of expenses', () => {
  const result = selectExpenseTotal(expenses)
  expect(result).toBe(15000)
})
