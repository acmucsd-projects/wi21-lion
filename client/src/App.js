import React from 'react';

import createPageOrg from './homeComponents/createPageOrg';
import createPageClass from './homeComponents/createPageClass';
import TopBar from './topBarComponents/TopBar'
import Navbar from './navbar/Navbar';
import home from './homeComponents/home'
import dummyArticles from './article/dummyArticle.json';
import Article from './article/Article';
import CourseContent from './article/CourseContent';
import SectionContent from './article/SectionContent';

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
        <div className="main-container">
        <Navbar />
        <Switch>
          <Route exact path='/' component={home} />
          <Route exact path='/createPageClass' component={createPageClass} />
          <Route exact path='/createPageOrg' component={createPageOrg} />
          {dummyArticles.map((course) => (
            <Route exact
              path={`/courses/${course.department}/${course.name}`}
              children={<Article course={course}>
                <CourseContent course={course}></CourseContent>
              </Article>}>
            </Route>
          ))}

          {dummyArticles.map((course) => (
            course.sections.map((section) => (
              <Route exact
                path={`/courses/${course.department}/${course.name}/${section.professor}`}
                children={<Article section={section} course={course} >
                  <SectionContent section={section} course={course}></SectionContent>
                </Article>}>
              </Route>
            ))
          ))}
          <Route exact path='/createPage' component={createPage} />
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
