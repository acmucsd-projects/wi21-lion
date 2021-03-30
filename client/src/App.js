import createPageOrg from './homeComponents/createPageOrg';
import createPageClass from './homeComponents/createPageClass';
import TopBar from './topBarComponents/TopBar'
import Navbar from './navbar/Navbar';
import home from './homeComponents/home'
import CourseArticle, { BlankCourse } from './article/CourseArticle';
import OrgArticle, { BlankOrg } from './article/OrgArticle';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.css';
import UserProfile from './userProfile/UserProfile';
// import { LoginDialog } from './popups/dialogs';
import SectionArticle from './article/SectionArticle';
import { UserContextProvider } from './contexts/UserContext';


function App() {


  return (
    <div>
      <UserContextProvider>
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
                <Route exact path='/courses' component={BlankCourse} />
                <Route exact
                  path={`/courses/:dep/:courseName`}
                  component={CourseArticle}>
                </Route>
                <Route exact
                  path={`/courses/:dep/:courseName/:quarter/:year/:sectionLetter`}
                  component={SectionArticle}>
                </Route>
                <Route exact path={`/orgs`} component={BlankOrg} />
                <Route exact
                  path={`/orgs/:orgName`}
                  component={OrgArticle}>
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;