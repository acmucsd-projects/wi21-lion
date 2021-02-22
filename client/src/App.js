import React from 'react';
import createPage from './homeComponents/createPage';
import TopBar from './topBarComponents/TopBar'
import Navbar from './navbar/Navbar';
import home from './homeComponents/home'
import dummyArticles from './article/dummyArticle.json';
import Article from './article/Article';
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
          {dummyArticles.map((course) => (
            <Route exact
              path={`/${course.department}/${course.name}`}
              children={<Article course={course}></Article>}>
            </Route>
          ))}
          <Route exact path='/createPage' component={createPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
