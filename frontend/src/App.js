import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LogIn from './pages/LogIn';
import Registro from './pages/Registro';
import Carrito from './pages/Carrito';
import Home from './pages/Home'

import './styles/generalStyles.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import Productos from './pages/Productos';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/registro' component={Registro}/>
          <Route path='/como-comprar' component={LogIn}/>
          <Route path='/productos' component={Productos}/>
          <Route exact path='/carrito' component={Carrito}/>
          <Redirect to='/'/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
