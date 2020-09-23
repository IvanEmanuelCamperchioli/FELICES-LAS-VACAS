import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LogIn from './pages/LogIn';
import SignUp from './pages/signUp';
import Home from './pages/Home';
import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Productos from './pages/Productos';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/productos' component={Productos}/>
          <Redirect to='/'/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
