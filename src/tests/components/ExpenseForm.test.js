import React from 'react'
import {shallow} from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../dummyData/expenses'
import moment from 'moment'

test('should render ExpenseForm correctly with NO data', () => {
  const wrapper = shallow(<ExpenseForm/>)
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm correctly with data', () => {

  const wrapper = shallow(<ExpenseForm expense={{...expenses[0]}}/>)
  expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(wrapper.state('error').length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})
test('should set input on change', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
  wrapper.find('input').at(0).simulate('change', {
    target: {
      name: 'description',
      value: 'Rent'
    }
  })
  expect(wrapper.state('description')).toBe('Rent')
  expect(wrapper).toMatchSnapshot()
  wrapper.find('input').at(1).simulate('change', {
    target: {
      name: 'amount',
      value: '12.34'
    }
  })
  expect(wrapper.state('amount')).toBe('12.34')
  expect(wrapper).toMatchSnapshot()
  wrapper.find('input').at(1).simulate('change', {
    target: {
      name: 'amount',
      value: ''
    }
  })
  wrapper.find('input').at(1).simulate('change', {
    target: {
      name: 'amount',
      value: '12..34'
    }
  })
  expect(wrapper.state('amount')).toBe('')
  expect(wrapper).toMatchSnapshot()
  wrapper.find('textarea').simulate('change', {
    target: {
      name: 'note',
      value: 'My Note'
    }
  })
  expect(wrapper.state('note')).toBe('My Note')
  expect(wrapper).toMatchSnapshot()
})

test('should perform a valid form submission', () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(<ExpenseForm expense={{...expenses[0]}} onSubmit={onSubmitSpy}/>)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(wrapper.state('error')).toBe('')
  expect(onSubmitSpy).toHaveBeenLastCalledWith( {
    description: expenses[0].description,
    note: expenses[0].note,
    amount: expenses[0].amount,
    createdAt: expenses[0].createdAt,
  })
})

test('should set date createdAt change', () => {
  const wrapper = shallow(<ExpenseForm />)
  const now = moment()
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)
  expect(wrapper.state('createdAt')).toEqual(now)
})
test('should set date focused change', () => {
  const wrapper = shallow(<ExpenseForm />)
  const now = moment()
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused: true})
  expect(wrapper.state('calendarFocused')).toEqual(true)
})
