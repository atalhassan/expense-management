import React from 'react'
import moment from 'moment'
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';


class ExpenseForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      description: props.expense ? props.expense.description : '',
      amount: props.expense ? (props.expense.amount /100).toString() : '',
      note: props.expense ? props.expense.note : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    }
  }
  changeByName = (e) => {
    const change = {}
    const name = e.target.name
    change[name] = e.target.value
    if (name === 'amount') {
      const amount = e.target.value
      if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
        change[name] = amount
      } else {
        change[name] = this.state.amount
      }
      this.setState(() => change)
    } else {
      this.setState(() => change)
    }
  }
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({createdAt}))
    }
  }
  onFocusChange = ({focused}) => {
    this.setState(() => ({calendarFocused: focused}))
  }
  onSubmit = (e) => {
    e.preventDefault()
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({error: 'please fill the description and amount'}))
    } else {
      this.setState(() => ({error: ''}))
      this.props.onSubmit({description: this.state.description,
        amount:parseFloat(this.state.amount, 10) * 100,
        createdAt:this.state.createdAt.valueOf(),
        note: this.state.note})
      }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type='text'
            name='description'
            placeholder='Description'
            value={this.state.description}
            onChange={this.changeByName}
            autoFocus
          />
          <input
            type='text'
            name='amount'
            placeholder='amount'
            value={this.state.amount}
            onChange={this.changeByName}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder='Add a note for your expense (optional)'
            name='note'
            value={this.state.note}
            onChange={this.changeByName}
          >
          </textarea>
          {this.state.error && <p>{this.state.error}</p>}
          <button>Add Expense</button>
        </form>
      </div>
    )
  }

}


export default ExpenseForm
