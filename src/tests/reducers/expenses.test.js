import expensesReducer from '../../reducers/expenses'
import moment from 'moment'
import expenses from '../dummyData/expenses'

test('should setup default state',() => {
  const state = expensesReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual([])
})

test('should setup remove expenses state',() => {
  const action = {
    type: 'REMOVE_EXPENSES',
    id: expenses[0].id
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses.filter((expense) => {
    return expense.id !== expenses[0].id
  }))
})
test('should NOT setup remove expenses state without id',() => {
  const action = {
    type: 'REMOVE_EXPENSES'
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})

test('should setup add expenses state',() => {
  const action = {
    type: 'ADD_EXPENSES',
    expense: expenses[0]
  }
  const newList = expenses.filter((expense) => {
    return expense.id !== expenses[0].id
  })
  const state = expensesReducer(newList, action)
  newList.push(expenses[0])
  expect(state).toEqual(newList)
})

test('should setup edit expenses state',() => {
  const action = {
    type: 'EDIT_EXPENSES',
    id: expenses[0].id,
    updates: {
      description: 'Test 1',
      note: 'note 1',
      amount: 10000,
      createdAt:  moment(0).add(1, 'days').valueOf()
    }
  }
  const state = expensesReducer(expenses, action)
  expenses[0].amount = 10000
  expect(state).toEqual(expenses)
})

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([expenses[1]])
})
