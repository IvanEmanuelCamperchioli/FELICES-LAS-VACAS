import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Home from './pages/Home'
import HomeAdmin from './pages/HomeAdmin';
import FormAdmin from './components/FormAdmin'
import EditAdmin from './components/EditAdmin'
import { connect } from 'react-redux'
import usersActions from './redux/actions/usersActions'

import './styles/app.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import Products from './pages/Products';

function App(props) {

  if(localStorage.getItem('token') && props.token === ""){
    props.forcedLogIn(localStorage.getItem('token'))
  }

  if(props.token) {
    var permitedRoutes =
      (<Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/cart' component={Cart}/>
        <Route path='/como-comprar' component={LogIn}/>
        <Route path='/products' component={Products}/>
        <Redirect to='/'/>
      </Switch>)
    
  } else if (props.role === 'admin')
    {var adminRoutes = 
      (<Switch>
        <Route path='/home-admin' component={HomeAdmin}/>
        <Route path='/form-admin' component={FormAdmin}/>
        <Route path='/edit-admin' component={EditAdmin}/>
      </Switch>)
    }
   else {
    var permitedRoutes =
      (<Switch>        
        <Route exact path='/' component={Home}/>
        <Route path='/como-comprar' component={LogIn}/>
        <Route path='/sign-up' component={SignUp}/>
        <Route path='/login' component={LogIn}/>
        <Route exact path='/cart' component={Cart}/>
        <Route path='/products' component={Products}/>
        <Redirect to='/'/>
      </Switch>)
  }
  return (
    <>
      <BrowserRouter>
        <Switch>
          {permitedRoutes}
          {props.role === 'admin' 
            ? {adminRoutes} 
            : null
          }
        </Switch>
      </BrowserRouter>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.usersRed.token,
    role: state.usersRed.role
  }
}
const mapDispatchToProps = {
  forcedLogIn: usersActions.forcedLogIn
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
