import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Carrito from './pages/Carrito';
import Home from './pages/Home'
import HomeAdmin from './pages/HomeAdmin';
import FormAdmin from './components/FormAdmin'
import EditAdmin from './components/EditAdmin'

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
          <Route path='/como-comprar' component={LogIn}/>
          <Route path='/productos' component={Productos}/>
          <Route exact path='/carrito' component={Carrito}/>
          <Route path='/home-admin' component={HomeAdmin}/>
          <Route path='/form-admin' component={FormAdmin}/>
          <Route path='/edit-admin' component={EditAdmin}/>
          <Redirect to='/'/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
