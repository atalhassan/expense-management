import authReducer from '../../reducers/auth'

test('should setup default state',() => {
  const state = authReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual({})
})

test('should setup login state',() => {
  const action = {
    type: 'LOGIN',
    uid: '123abd'
  }
  const state = authReducer({}, action)
  expect(state).toEqual({
    uid: '123abd'
  })
})

test('should setup logout state',() => {
  const action = {
    type: 'LOGOUT'
  }
  const state = authReducer({uid: '123abd'}, action)
  expect(state).toEqual({})
})
