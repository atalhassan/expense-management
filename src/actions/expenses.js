import uuid from 'uuid'

// ADD_EXPENSES
export const addExpenses = (
  {
    description= '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSES',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

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
