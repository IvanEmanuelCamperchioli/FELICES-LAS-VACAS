import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LogIn from './pages/LogIn';
import Registro from './pages/Registro';
import Home from './pages/Home'
import usersActions from './redux/actions/usersActions'

import { prependOnceListener } from '../../backend/models/Usuario';

function App() {

  if(localStorage.getItem('token')) {
    
  }


  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/registro' component={Registro}/>
          <Redirect to='/'/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

const mapStateToProps = (store) => {
  return {
    token: store.usersReducer.token
  }
}

const mapDispatchToProps = {
  forceLogIn: usersActions.forceLogIn
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
