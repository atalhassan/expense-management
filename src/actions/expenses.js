import uuid from 'uuid'
import database from '../firebase/firebase'

// ADD_EXPENSES
export const addExpenses = (expense) => ({
  type: 'ADD_EXPENSES',
  expense
})
// Starting the add process
export const startAddExpense = (expenseData) => {
  return (dispatch) => {
    const {
      description= '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = {description, note, amount, createdAt}
    return database.ref('expenses').push(expense).then((snapshot) => {
      dispatch(addExpenses({
        id: snapshot.key,
        ...expense
      }))
    })
  }
}

// REMOVE_EXPENSES
export const removeExpenses = ({id}) => ({
  type: 'REMOVE_EXPENSES',
  id
})

// EDIT_EXPENSES
export const editExpenses = (id, updates) => ({
  type: 'EDIT_EXPENSES',
  id,
  updates
})
