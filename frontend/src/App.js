import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Home from './pages/Home'
import HomeAdmin from './pages/HomeAdmin';
import FormAdmin from './components/FormAdmin'
import EditAdmin from './components/EditAdmin'

import './styles/app.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import Products from './pages/Products';
import Items from './pages/Items';
import Item from './components/Item';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/sign-up' component={SignUp}/>
          <Route path='/como-comprar' component={LogIn}/>
          <Route path='/products' component={Products}/>
          <Route exact path='/cart' component={Cart}/>
          <Route path='/home-admin' component={HomeAdmin}/>
          <Route path='/form-admin' component={FormAdmin}/>
          <Route path='/edit-admin' component={EditAdmin}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/productos' component={Items}/>
          <Route path='/item' component={Item}/>
          <Redirect to='/'/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
