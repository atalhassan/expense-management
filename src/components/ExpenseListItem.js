import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {connect} from 'react-redux'

export const ExpenseListItem = ({id, description, amount, createdAt}) => (
  <div>
      <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
      </Link>
      <p>${parseFloat(amount/100, 10)} - {moment(createdAt).format('MMM Do, YYYY')}</p>

  </div>
);



export default connect()(ExpenseListItem)
