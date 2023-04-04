 import React, { PureComponent } from 'react';
 import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
 import Login from './pages/Login';
 
 class App extends PureComponent {
   render(){
     return(
       <Router>
       <div>
       <Switch>
       <Route path="/" exact component={Login} />
       </Switch>
       </div>
     </Router>
     )
   }
 }

 export default App;
