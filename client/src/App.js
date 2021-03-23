import React from 'react';

import createPageOrg from './homeComponents/createPageOrg';
import createPageClass from './homeComponents/createPageClass';
import TopBar from './topBarComponents/TopBar'
import Navbar from './navbar/Navbar';
import home from './homeComponents/home'
import dummyArticles from './article/dummyArticle.json';
import dummyOrgs from './article/dummyOrgs.json';
import CourseArticle from './article/CourseArticle';
import CourseContent from './article/CourseContent';
import SectionContent from './article/SectionContent';
import OrgArticle from './article/OrgArticle';
import OrgContent from './article/OrgContent';
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
              <Route exact path='/userProfile' component={UserProfile} />
              {dummyArticles.map((course) => (
                <Route exact
                  path={`/courses/${course.department}/${course.name}`}
                  children={<CourseArticle course={course}>
                    <CourseContent course={course}></CourseContent>
                  </CourseArticle>}>
                </Route>
              ))}
          {dummyArticles.map((course) => (
            course.sections.map((section) => (
              <Route exact
                path={`/courses/${course.department}/${course.name}/${section.season}${section.year}/${section.letter}`}
                children={<CourseArticle section={section} course={course} >
                  <SectionContent section={section} course={course} />
                </CourseArticle>}>
              </Route>
            ))
          ))}
          <Route exact path={`/orgs`} children={<OrgArticle></OrgArticle>}></Route>
          {dummyOrgs.map((org) => (
            <Route exact 
              path={`/orgs/${org.name}`}
              children={<OrgArticle org={org}>
                <OrgContent org={org} />
              </OrgArticle>}>
              </Route>
          ))}
          {/* <Route exact path='/createPage' component={createPage} /> */}
        </Switch>
        </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
