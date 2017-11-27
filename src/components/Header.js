import React from 'react';
import {NavLink} from 'react-router-dom'

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to='/' activeClassName='is-action' exact>Dashboard </NavLink>
    <NavLink to='/create' activeClassName='is-action' >Create </NavLink>

  </header>
)

export default Header;
