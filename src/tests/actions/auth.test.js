import { login, logout} from '../../actions/auth';


test('should save user id when login', () => {
  const action = login('123abc');
  expect(action).toEqual({
    type: 'LOGIN',
    uid: '123abc'
  });
});

test('should remove user id when logout', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
