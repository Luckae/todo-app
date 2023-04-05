 import React, { Component } from 'react';
 import {BrowserRouter, Router, HashRouter, Switch, Route, Navigate} from 'react-router-dom';
 import Login from './pages/Login';
 import Register from './pages/Register';

 class App extends Component {
   render(){
     return(
       <BrowserRouter>
       <Switch>
       <Route exact path="/" component={Login} />
       <Route path="/login" component={Login} />
       <Route path="/register" component={Register} />
       </Switch>

     </BrowserRouter>
     )
   }
 }

 export default App;
