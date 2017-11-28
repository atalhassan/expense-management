import { startAddExpense, addExpenses, editExpenses, removeExpenses } from '../../actions/expenses';
import expenses from '../dummyData/expenses'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

test('should setup remove expense action object', () => {
  const action = removeExpenses({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSES',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpenses('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSES',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should setup add expense action object with provided values', () => {

  const action = addExpenses(expenses[0]);
  expect(action).toEqual({
    type: 'ADD_EXPENSES',
    expense: expenses[0]
  });
});

test('should add expense to database and store', (done) => {
  const store =  createMockStore({})
  const expense = expenses[0]
  delete expense.id
  store.dispatch(startAddExpense(expense)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSES',
      expense: {
        id: expect.any(String),
        ...expense
      }
    })

    return database.ref(`expenses/${actions[0].expense.id}`).once('value')

  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expense)
    done()
  })

})

test('should add default value expense to database and store', () => {
  const store =  createMockStore({})
  const defaultExpense = {
    description: '',
    note :'',
    amount : 0,
    createdAt : 0
  }
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSES',
      expense: {
        id: expect.any(String),
        ...defaultExpense
      }
    })

    return database.ref(`expenses/${actions[0].expense.id}`).once('value')

  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultExpense)
    done()
  })

})

// test('should setup add expense action object with default values', () => {
//   const action = addExpenses();
//   expect(action).toEqual({
//     type: 'ADD_EXPENSES',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0
//     }
//   });
// });
