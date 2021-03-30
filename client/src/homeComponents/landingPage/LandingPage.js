import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { LoginDialog, SignupDialog } from '../../popups/dialogs';
import './LandingPage.css'
import { ReactComponent as HomeSVG } from './res/home.svg';

const LandingPage = () => {
    const [loginDialogShown, setShowLoginDialog] = useState(false);
    const [signupDialogShown, setShowSignupDialog] = useState(false);
    function hideLoginDialog() { setShowLoginDialog(false); }
    function hideSignupDialog() { setShowSignupDialog(false); }
    function showLoginDialog() { setShowLoginDialog(true); }
    function showSignupDialog() { setShowSignupDialog(true); }
    return (
        <div className="landing-container">
            <h1>UCSD</h1>
            <h2>Wiki</h2>
            <div className="landing-icon-container">
                <HomeSVG className="landing-svg" />
                <Link exact to="/courses" style={{ position: 'absolute', top: '20%', right: '70%' }}>Courses</Link>
                <Link exact to="/createPageClass" style={{ position: 'absolute', top: '40%', right: '72%' }}>Create Course</Link>
                <Link exact to="/orgs" style={{ position: 'absolute', top: '60%', right: '70%' }}>Orgs</Link>
                <Link onClick={showLoginDialog} style={{ position: 'absolute', top: '20%', left: '70%' }}>Login</Link>
                <Link onClick={showSignupDialog} style={{ position: 'absolute', top: '40%', left: '72%' }}>Register</Link>
                <Link exact to="/userProfile" style={{ position: 'absolute', top: '60%', left: '70%' }}>Profile</Link>
                <Link exact to="/createPageOrg" style={{ position: 'absolute', top: '80%', right: '60%' }}>Create Org</Link>
                <Link exact to="/orgs/ACM" style={{ position: 'absolute', top: '80%', left: '60%' }}>ACM</Link>
            </div>
            <div style={{ position: "absolute", top: 0 }}>
                {loginDialogShown && <LoginDialog show={showLoginDialog} hide={hideLoginDialog} />}
                {signupDialogShown && <SignupDialog show={showSignupDialog} hide={hideSignupDialog} />}
            </div>
        </div>
    )
}

export default LandingPage;