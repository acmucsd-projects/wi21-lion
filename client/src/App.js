import createPageOrg from './homeComponents/createPageOrg';
import createPageClass from './homeComponents/createPageClass';
import createPageSection from './homeComponents/createPageSection';
import successPage from './homeComponents/successPage';
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
import { UserContext } from './contexts/UserContext';
import { useContext, useEffect } from 'react';

const server = "http://localhost:5000"
const getProfileUrl = `${server}/users/profile`;

function App() {

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    async function loginUser() {
      let currentSession = JSON.parse(localStorage.getItem('currentSession'));
      console.log(currentSession)
      if (currentSession) {
        fetch(`${getProfileUrl}`, {
          method: 'GET',
          headers: {
            'auth_token': currentSession.token 
          }
        })
        .then(() => (
          setUser(currentSession)
        ))
        .catch(error => {
          console.log(error)
        })
      } 
    }
    loginUser();
  }, [setUser])

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
              <Route exact path='/createPageSection' component={createPageSection} />
              <Route exact path='/createPageOrg' component={createPageOrg} />
              <Route exact path='/successPage' component={successPage} />
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
    </div>
  );
}

export default App;