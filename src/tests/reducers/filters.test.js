import filtersReducer from '../../reducers/filters'
import moment from 'moment'

test('should setup default filter values',() => {
  const state = filtersReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual( {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
})
test('should setup sortBy to amount',() => {
  const state =  {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  }
  const action = filtersReducer(state, {type: 'SORTBY_AMOUNT', sortBy: 'amount'})
  expect(action).toEqual(  {
    ...state,
    sortBy: 'amount'
  })
})
test('should setup sortBy to date',() => {
  const state =  {
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  }
  const action = filtersReducer(state, {type: 'SORTBY_DATE', sortBy: 'date'})
  expect(action).toEqual(  {
    ...state,
    sortBy: 'date'
  })
})
test('should setup text filter',() => {
  const state =  {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  }
  const action = filtersReducer(state, {type: 'SET_TEXT', text: 'hello'})
  expect(action).toEqual(  {
    ...state,
    text: 'hello'
  })
})
test('should setup start date filter',() => {
  const state =  {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const action = filtersReducer(state, {type: 'SET_START_DATE', startDate: moment(0).valueOf()})
  expect(action).toEqual(  {
    ...state,
    startDate: moment(0).valueOf()
  })
})
test('should setup end date filter',() => {
  const state =  {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const action = filtersReducer(state, {type: 'SET_END_DATE', endDate: moment(0).valueOf()})
  expect(action).toEqual(  {
    ...state,
    endDate: moment(0).valueOf()
  })
})
