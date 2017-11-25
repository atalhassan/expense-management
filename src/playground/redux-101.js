import {createStore} from 'redux';



const incrementCount = ({incrementBy = 1} = {}) => ({
  type: 'INCREMENT',
  incrementBy
})

const decrementCount = ({decrementBy = 1} = {}) => ({
  type: 'DECREMENT ',
  decrementBy
})

const store = createStore((state = {count : 0}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      }
      break;
    case 'DECREMENT':
      return {
        count: state.count - action.deccrementBy
      }
      break;
    case 'RESET':
      return {
        count: 0
      }
      break;
    default:
      return state
  }
})

store.subscribe(() => {
console.log(store.getState());
})


store.dispatch(incrementCount());
store.dispatch(incrementCount({incrementBy: 5}));
store.dispatch(incrementCount());
store.dispatch(decrementCount({decrementBy: 5}));
