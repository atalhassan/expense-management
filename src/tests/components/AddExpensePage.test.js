import React from 'react'
import {shallow} from 'enzyme'
import {AddExpensePage} from '../../components/AddExpensePage'
import expenses from '../dummyData/expenses'

let addExpenses, history, wrapper;

beforeEach(() => {
  addExpenses = jest.fn()
  history = {push: jest.fn()}
  wrapper = shallow(<AddExpensePage addExpenses={addExpenses} history={history}/>)

})

test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
    expect(history.push).toHaveBeenCalledWith('/')
    expect(addExpenses).toHaveBeenLastCalledWith(expenses[0])

})
