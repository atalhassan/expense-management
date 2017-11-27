import React from 'react'
import numeral from 'numeral'
import {connect} from 'react-redux'
import getVisibleExpenses from '../selectors/expenses'
import getVisibleExpensesTotal from '../selectors/expense-total'

export const ExpensesSummary = ({expenseCount, expenseTotal}) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
  const formattedExpenseTotal = numeral(expenseTotal/100).format('$0,0.00')
  return (
    <div>
      <h1>Viewing {expenseCount} {expenseWord} totalling {formattedExpenseTotal}</h1>
    </div>
  )
}

const mapStateToProps = (state) => {
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  return {
    expenseCount: visibleExpenses.length,
    expenseTotal: getVisibleExpensesTotal(visibleExpenses)
  }
}

export default connect(mapStateToProps)(ExpensesSummary)
