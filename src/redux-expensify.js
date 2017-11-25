import {createStore, combineReducers} from 'redux'
import uuid from 'uuid'


// ADD_EXPENSES
const addExpenses = (
  {
    description= '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSES',
  expenses: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

// REMOVE_EXPENSES
const removeExpenses = ({id}) => ({
  type: 'REMOVE_EXPENSES',
  id
})

// EDIT_EXPENSES
const editExpenses = (id, updates) => ({
  type: 'EDIT_EXPENSES',
  id,
  updates
})

// SET_TEXT
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT',
  text: text
})

// SORTBY_AMOUNT
const SortByAmount = () => ({
  type: 'SORTBY_AMOUNT',
  sortBy: "amount"
})
// SORTBY_DATE
const SortByDate= () => ({
  type: 'SORTBY_DATE',
  sortBy: "date"
})
// SET_START_DATE
const SetStartDate= (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate: startDate
})
// SET_END_DATE
const SetEndDate= (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate: endDate
})

// expenses reducer

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSES':
      return [...state, action.expenses]
    case 'REMOVE_EXPENSES':
      return state.filter(({id}) => id !== action.id)
    case 'EDIT_EXPENSES':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense
        }
      })
    default:
      return state
  }
}

// filters reducer

const filterReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const filtersReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text
      }
    case 'SORTBY_AMOUNT':
      return {
        ...state,
        sortBy: action.sortBy
      }
    case 'SORTBY_DATE':
      return {
        ...state,
        sortBy: action.sortBy
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state
  }
}


const getVisibleExpenses = (expenses, {text, startDate, endDate, sortBy}) => {
  return expenses.filter((expense) => {
    const startMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
    const endMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
    return startMatch && endMatch && textMatch
  }).sort((a,b) => { // -1 => a, 1 => b
    switch (sortBy) {
      case 'date':
        return a.createdAt < b.createdAt ? 1 : -1
        break;
      case 'amount':
        return a.amount < b.amount ? 1 : -1
        break;
      default:

    }
  })
}

// Create store

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState()
  const visibleExp = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExp);
})

const e1 = store.dispatch(addExpenses({description: 'rent', amount: 1000, createdAt: -11000}))
const e2 = store.dispatch(addExpenses({description: 'coffee', amount: 400, createdAt: -1000}))
// const  e3 = store.dispatch(editExpenses(e2.expenses.id, {amount: 600}))
// const e4 = store.dispatch(setTextFilter("ffee"))
store.dispatch(SortByAmount())
// store.dispatch(SetStartDate(50))
// store.dispatch(SetEndDate(-1000))


const demoState = {
  expenses : [{
    id: 'asdfs',
    description: 'Rent',
    amount: 54500,
    createdAt: 0,
  }],
  filters: {
    text: 'rent',
    sortBy: 'date', //or 'amount',
    startDate: undefined,
    endDate: undefined
  }
}
