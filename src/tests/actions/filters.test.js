import {setTextFilter, SetEndDate, SetStartDate, SortByAmount, SortByDate} from '../../actions/filters'
import moment from 'moment'

test('should setup SetStartDate action object',() => {
  const startDate = moment()
  const action = SetStartDate(startDate)

  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: startDate
  })
})
test('should setup SetEndDate action object',() => {
  const endDate = moment()
  const action = SetEndDate(endDate)

  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: endDate
  })
})
test('should setup setTextFilter action object',() => {
  const action = setTextFilter('Test')

  expect(action).toEqual({
    type: 'SET_TEXT',
    text: 'Test'
  })
})
test('should setup SortByAmount action object',() => {
  const action = SortByAmount()

  expect(action).toEqual({
    type: 'SORTBY_AMOUNT',
    sortBy: "amount"
  })
})
test('should setup SortByDate action object',() => {
  const action = SortByDate()

  expect(action).toEqual({
    type: 'SORTBY_DATE',
    sortBy: "date"
  })
})
