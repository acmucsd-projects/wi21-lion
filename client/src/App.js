import React from 'react';
import createPage from './homeComponents/createPage';
import TopBar from './topBarComponents/TopBar'
import Navbar from './navbar/Navbar';
import home from './homeComponents/home'
import dummyArticles from './article/dummyArticle.json';
import dummyOrgs from './article/dummyOrgs.json';
import CourseArticle from './article/CourseArticle';
import CourseContent from './article/CourseContent';
import SectionContent from './article/SectionContent';
import OrgArticle from './article/OrgArticle';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // Redirect,
} from 'react-router-dom';
import OrgContent from './article/OrgContent';

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
              path={`/courses/${course.department}/${course.name}`}
              children={<CourseArticle course={course}>
                <CourseContent course={course} />
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
          {dummyOrgs.map((org) => (
            <Route exact 
              path={`/orgs/${org.name}`}
              children={<OrgArticle org={org}>
                <OrgContent org={org} />
              </OrgArticle>}>
              </Route>
          ))}
          <Route exact path='/createPage' component={createPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
