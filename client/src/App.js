import React from 'react';

import home from './homeComponents/home'
import dummyArticles from './article/dummyArticle.json';
import Article from './article/Article';
import CourseContent from './article/CourseContent';
import SectionContent from './article/SectionContent';
import createPage from './homeComponents/createPage';
import TopBar from './topBarComponents/TopBar';
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
        <Switch>
          <Route exact path='/' component={home} />
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
