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
import Article from './article/Article';
import dummyArticles from './article/dummyArticle.json';

function App() {
  return (
    <div>
      {/* <Navbar></Navbar> */}
      <Router>
        <Switch>
          <Route exact path='/' component={home} />
          {dummyArticles.map((course) => (
            <Route exact
              path={`/${course.department}/${course.name}`}
              children={<Article course={course}></Article>}>
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
