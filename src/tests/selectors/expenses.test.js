import getVisibleExpenses from '../../selectors/expenses'
import expenses from '../dummyData/expenses'
import moment from 'moment'

test('should filter by text value', () => {
  const filter = {
    text: 't 4',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const a = getVisibleExpenses(expenses, filter)

  expect(a).toEqual([expenses[4], expenses[3]])
})
test('should filter by start date', () => {
  const filter = {
    text: '',
    sortBy: 'date',
    startDate:  moment(0).add(4, 'days'),
    endDate:  undefined
  }
  const a = getVisibleExpenses(expenses, filter)

  expect(a).toEqual([expenses[4], expenses[3]])
})
test('should filter by end date', () => {
  const filter = {
    text: '',
    sortBy: 'date',
    startDate:  undefined,
    endDate:  moment(0).add(2, 'days')
  }
  const a = getVisibleExpenses(expenses, filter)

  expect(a).toEqual([expenses[1], expenses[0]])
})
test('should sort by date', () => {
  const filter = {
    text: '',
    sortBy: 'date',
    startDate:  undefined,
    endDate: undefined
  }
  const a = getVisibleExpenses(expenses, filter)

  expect(a).toEqual([...expenses.reverse()])
})
test('should sort by amount', () => {
  const filter = {
    text: '',
    sortBy: 'date',
    startDate:  undefined,
    endDate: undefined
  }
  const a = getVisibleExpenses(expenses, filter)

  expect(a).toEqual([...expenses])
})
