import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import AppRouter from './routers/AppRouter'
import {addExpenses, removeExpenses, editExpenses} from './actions/expenses'
import {setTextFilter, SetEndDate, SetStartDate, SortByAmount, SortByDate} from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'


const store = configureStore()

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
