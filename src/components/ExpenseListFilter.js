import React from 'react'
import {connect} from 'react-redux'
import {setTextFilter, SetEndDate, SetStartDate, SortByAmount, SortByDate} from '../actions/filters'

// import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';

export class ExpenseListFilter extends React.Component {
  state = {
    calendarFocused: null
  }
  onDatesChange = ({startDate, endDate}) => {
    this.props.setStartDate(startDate)
    this.props.setEndDate(endDate)
  }
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({calendarFocused}))
  }
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value)
  }
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.SortByDate()
    } else if (e.target.value === 'amount') {
      this.props.SortByAmount()
    }
  }
  render() {
    return (
      <div className='content-container'>
        <div className='input_group'>
          <div className='input_group__item'>
            <input
              type='text'
              className='text-input'
              value={this.props.filters.text}
              placeholder='Search expenses'
              onChange={this.onTextChange}
            />

          </div>
          <div className='input_group__item'>
            <select
              className='select'
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
              >
                <option value='date'>Date</option>
                <option value='amount'>Amount</option>
              </select>
            </div>
            <div className='input_group__item'>
              <DateRangePicker
                startDate={this.props.filters.startDate}
                endDate={this.props.filters.endDate}
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                showClearDates={true}
                numberOfMonths={1}
                isOutsideRange={() => false}
              />
            </div>
          </div>
        </div>
      )
    }
  }


  const mapStateToProps = (state) => {
    return {
      filters: state.filters
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      setTextFilter : (text) => dispatch(setTextFilter(text)),
      SortByDate : () => dispatch(SortByDate()),
      SortByAmount: () => dispatch(SortByAmount()),
      setStartDate: (startDate) => dispatch(SetStartDate(startDate)),
      setEndDate: (endDate) => dispatch(SetEndDate(endDate))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter);
