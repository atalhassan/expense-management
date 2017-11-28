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

// Starting the remove process
export const startRemoveExpense = ({id}) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).remove().then(() => {
      dispatch(removeExpenses({id}))
    })
  }
}

// EDIT_EXPENSES
export const editExpenses = (id, updates) => ({
  type: 'EDIT_EXPENSES',
  id,
  updates
})

// Starting the edit process
export const startEditExpense = (id, updates) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).update(updates).then(() => {
      dispatch(editExpenses(id, updates))
    })
  }
}

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
})

export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses')
      .once('value')
      .then((snapshot) => {
        const expenses = []
        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
        })
        dispatch(setExpenses(expenses))
      })
  }
}
