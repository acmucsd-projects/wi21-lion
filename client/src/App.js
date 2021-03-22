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

import './App.css';
import UserProfile from './userProfile/UserProfile';

function App() {

  return (
    <div>
      <Router>
        <TopBar />
        <div className="main-container">
          <Navbar />
          <div className="page-container">
            <Switch>
              <Route exact path='/' component={home} />
              <Route exact path='/createPageClass' component={createPageClass} />
              <Route exact path='/createPageOrg' component={createPageOrg} />
              <Route exact patch='/userProfile' component={UserProfile} />
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
        </Switch>
        </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
