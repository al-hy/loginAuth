import React from 'react';
import Base from './Base.jsx';
import HomePage from './HomePage.jsx';
import {Switch, Route} from 'react-router-dom';
import LoginPage from '../containers/LoginPage.jsx';
import Header from './Header.jsx';
import SignUpPage from '../containers/SignUpPage.jsx';
import Auth from '../modules/Auth';
import Main from './Main.jsx';


const App = () => (

<div>
  <Header/>
  <Switch>
  <Route path="/signup" component={SignUpPage} />
  <Route path="/login" component={LoginPage} />
  <Route path="/" component={Main}/>
  </Switch>
</div>

);

export default App;
