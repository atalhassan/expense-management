import React from 'react'
import {shallow} from 'enzyme'
import {EditExpensePage} from '../../components/EditExpensePage'
import expenses from '../dummyData/expenses'

let startEditExpense, history, wrapper, startRemoveExpense;

beforeEach(() => {
  startEditExpense = jest.fn()
  startRemoveExpense = jest.fn()
  history = {push: jest.fn()}
  wrapper = shallow(<EditExpensePage
                      startEditExpense={startEditExpense}
                      history={history}
                      startRemoveExpense={startRemoveExpense}
                      expense={expenses[0]}
                    />)
})

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})


test('should handle onSubmit for edit expense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
    expect(history.push).toHaveBeenCalledWith('/')
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id,expenses[0])

})
test('should handle onClick for remove expense', () => {
    wrapper.find('button').prop('onClick')({id: expenses[0].id})
    expect(history.push).toHaveBeenCalledWith('/')
    expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenses[0].id} )

})
