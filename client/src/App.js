import React from 'react';
import createPage from './homeComponents/createPage';

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
          <Route exact path='/createPage' component={createPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
