import { startAddExpense,
         addExpenses,
         editExpenses,
         removeExpenses ,
         setExpenses,
         startSetExpenses,
         startRemoveExpense,
         startEditExpense} from '../../actions/expenses';
import expenses from '../dummyData/expenses'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'

const uid = 'myTestUid'
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
  const expenseData = {}
  expenses.forEach(({id, description, note, amount, createdAt}) => {
    expenseData[id] = {description, note, amount, createdAt}
  })
  database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done())
});

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
  const store =  createMockStore({
    auth: {uid}
  })
  const expense = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };
  store.dispatch(startAddExpense(expense)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSES',
      expense: {
        id: expect.any(String),
        ...expense
      }
    })

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')

  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expense);
    done()
  }).catch((error) => {
    console.log(error);
    done()
  })
})

test('should add default value expense to database and store', (done) => {
  const store =  createMockStore({
    auth: {uid}
  })
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

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')

  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultExpense)
    done()
  }).catch((error) => {
    console.log(error);
    done()
  })

})

test('should start edit expense on firebase', (done) => {
  const store =  createMockStore({
    auth: {uid}
  })
  const expense = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };
  store.dispatch(startEditExpense('1', expense)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSES',
      id: '1',
      updates: expense
    })

    return database.ref(`users/${uid}/expenses/1`).once('value')

  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expense)
    done()
  }).catch((error) => {
    console.log(error);
    done()
  })
})

test('should call set expenses correctly', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
})

test('should fetch expenses from firebase', (done) => {
  const store =  createMockStore({
    auth: {uid}
  })

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    })
    done()
  })

})

test('should remove expense from firebase', (done) => {
  const store =  createMockStore({
    auth: {uid}
  })
  const id = expenses[4].id
  store.dispatch(startRemoveExpense({id})).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSES',
      id
    })

    return database.ref(`users/${uid}/expenses/${id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy()
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
