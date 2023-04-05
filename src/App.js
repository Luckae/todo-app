 import React, { Component } from 'react';
 import {BrowserRouter, Router, HashRouter, Switch, Route, Navigate} from 'react-router-dom';
 import Login from './pages/Login';
 import Register from './pages/Register';
 import Todo from './pages/Todos';

 class App extends Component {
   render(){
     return(
       <BrowserRouter>
       <Switch>
       <Route exact path="/" component={Login} />
       <Route path="/login" component={Login} />
       <Route path="/register" component={Register} />
       <Route path="/todo" component={Todo} />
       </Switch>

     </BrowserRouter>
     )
   }
 }

 export default App;
