import moment from 'moment'

const expenses = [{
  id: '1',
  description: 'Test 1',
  note: 'note 1',
  amount: 1000,
  createdAt:  moment(0).add(1, 'days').valueOf()
}, {
  id: '2',
  description: 'Test 2',
  note: 'note 2',
  amount: 2000,
  createdAt: moment(0).add(2, 'days').valueOf()
}, {
  id: '3',
  description: 'Test 3',
  note: 'note 3',
  amount: 3000,
  createdAt: moment(0).add(3, 'days').valueOf()
}, {
  id: '4',
  description: 'Test 4',
  note: 'note 4',
  amount: 4000,
  createdAt: moment(0).add(4, 'days').valueOf()
}, {
  id: '5',
  description: 'test 4',
  note: 'note 5',
  amount: 5000,
  createdAt: moment(0).add(5, 'days').valueOf()
}]

export default expenses
