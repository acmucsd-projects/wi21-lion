import React from 'react';
import createPageOrg from './homeComponents/createPageOrg';
import createPageClass from './homeComponents/createPageClass';
import TopBar from './topBarComponents/TopBar'
import Navbar from './navbar/Navbar';
import home from './homeComponents/home'
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  // Link,
  // Redirect,
} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
          <TopBar />
          <Navbar />
        <Switch>
          <Route exact path='/' component={home} />
          <Route exact path='/createPageClass' component={createPageClass} />
          <Route exact path='/createPageOrg' component={createPageOrg} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
