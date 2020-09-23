import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Home from './pages/Home'
import usersActions from './redux/actions/usersActions'

/* import { prependOnceListener } from '../../backend/models/User'; */

import './styles/generalStyles.css'

import 'bootstrap/dist/css/bootstrap.min.css'

function App(props) {

  if(localStorage.getItem('token') && props.token === ""){
    props.forcedLogIn(localStorage.getItem('token'))
  }


  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/registro' component={Register}/>
          <Redirect to='/'/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

const mapStateToProps = state => {
  return {
    token: state.usersRed.token
  }
}

const mapDispatchToProps = {
  forcedLogIn: usersActions.forcedLogIn
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
