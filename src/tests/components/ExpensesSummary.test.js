import React from 'react'
import {shallow} from 'enzyme'
import {ExpensesSummary} from '../../components/ExpensesSummary'

test('should render ExpensesSummary correctly for 1 expense',() => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expenseTotal={2345}/>)
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesSummary correctly for multiple expenses',() => {
  const wrapper = shallow(<ExpensesSummary expenseCount={23} expenseTotal={223456345}/>)
  expect(wrapper).toMatchSnapshot()
})
