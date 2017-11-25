import React from 'react'
import {shallow} from 'enzyme'
import {EditExpensePage} from '../../components/EditExpensePage'
import expenses from '../dummyData/expenses'

let editExpenses, history, wrapper, removeExpenses;

beforeEach(() => {
  editExpenses = jest.fn()
  removeExpenses = jest.fn()
  history = {push: jest.fn()}
  wrapper = shallow(<EditExpensePage
                      editExpenses={editExpenses}
                      history={history}
                      removeExpenses={removeExpenses}
                      expense={expenses[0]}
                    />)
})

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})


test('should handle onSubmit for edit expense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
    expect(history.push).toHaveBeenCalledWith('/')
    expect(editExpenses).toHaveBeenLastCalledWith(expenses[0].id,expenses[0])

})
test('should handle onClick for remove expense', () => {
    wrapper.find('button').prop('onClick')({id: expenses[0].id})
    expect(history.push).toHaveBeenCalledWith('/')
    expect(removeExpenses).toHaveBeenLastCalledWith({id: expenses[0].id} )

})
