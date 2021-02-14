import React from 'react';

import home from './homeComponents/home'

import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  Redirect,
} from 'react-router-dom';
import Navbar from './navbar/Navbar';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Router>
        <Switch>
          <Route exact path='/' component={home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
