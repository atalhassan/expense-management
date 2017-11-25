import { addExpenses, editExpenses, removeExpenses } from '../../actions/expenses';

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
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'This was last months rent'
  };
  const action = addExpenses(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSES',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('should setup add expense action object with default values', () => {
  const action = addExpenses();
  expect(action).toEqual({
    type: 'ADD_EXPENSES',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  });
});
