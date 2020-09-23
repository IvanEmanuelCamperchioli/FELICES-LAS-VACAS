import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LogIn from './pages/LogIn';
import SignUp from './pages/signUp';
import Home from './pages/Home';
import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/registro' component={SignUp}/>
          <Redirect to='/'/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
