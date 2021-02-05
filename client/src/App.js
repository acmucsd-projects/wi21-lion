import React from 'react';

import home from './homeComponents/home'

import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  Redirect,
} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
