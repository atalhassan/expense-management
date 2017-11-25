import React from 'react'
import {shallow} from 'enzyme'
import {ExpenseListFilter} from '../../components/ExpenseListFilter'
import {filter, altFilter} from '../dummyData/filters'
import moment from 'moment'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilter
      filters={filter}
      setTextFilter={setTextFilter}
      SortByDate={sortByDate}
      SortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot()
})
test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({filters:{altFilter}})
  expect(wrapper).toMatchSnapshot()
})
test('should handle text change', () => {
  wrapper.setProps({filters:altFilter})
  wrapper.find('input').simulate('change', {
    target: {value :'New Change'}
  })
  expect(setTextFilter).toHaveBeenLastCalledWith("New Change")
})
test('should handle sort by date', () => {
  wrapper.setProps({filters:altFilter})
  wrapper.find('select').simulate('change', {
    target: {value: 'date'}
  })
  expect(sortByDate).toHaveBeenCalled()
})
test('should handle sort by amount', () => {
  wrapper.find('select').simulate('change', {
    target: {value: 'amount'}
  })
  expect(sortByAmount).toHaveBeenCalled()
})
test('should handle date change', () => {
  const startDate = moment(0).add(4, 'years')
  const endDate = moment(0).add(8, 'years')
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate})
  expect(setStartDate).toHaveBeenLastCalledWith(startDate)
  expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})
test('should handle date focused change', () => {
  const calendarFocused = 'endDate'
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')( calendarFocused)
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})
