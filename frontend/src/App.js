import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LogIn from './pages/LogIn';
import Registro from './pages/Registro';
import Home from './pages/Home'
import HomeAdmin from './pages/HomeAdmin';
import FormAdmin from './components/FormAdmin'
import EditAdmin from './components/EditAdmin'

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/registro' component={Registro}/>
          <Route path='/homeadmin' component={HomeAdmin}/>
          <Route path='/formadmin' component={FormAdmin}/>
          <Route path='editadmin' component={EditAdmin}/>
          <Redirect to='/'/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
