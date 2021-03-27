// import React, { useState } from 'react';
// import { LoginDialog, DeleteDialog, SignupDialog, PasswordDialog } from '../popups/dialogs.js';
import LandingPage from './landingPage/LandingPage.js';

const Home = () => {

    // const [loginDialogShown, setShowLoginDialog] = useState(true);
    // const [deleteDialogShown, setShowDeleteDialog] = useState(false);
    // const [signupDialogShown, setShowSignupDialog] = useState(false);
    // const [passwordDialogShown, setShowPasswordDialog] = useState(false);

    // function hideLoginDialog() { setShowLoginDialog(false); }
    // function hideDeleteDialog() { setShowDeleteDialog(false); }
    // function hideSignupDialog() { setShowSignupDialog(false); }
    // function hidePasswordDialog() { setShowPasswordDialog(false); }
    // function showLoginDialog() { setShowLoginDialog(true); }
    // function showDeleteDialog() { setShowDeleteDialog(true); }
    // function showSignupDialog() { setShowSignupDialog(true); }
    // function showPasswordDialog() { setShowPasswordDialog(true); }


 
    return (
      <div> 
        {/* // <div style={{ position: "absolute", top: 0 }}> */}
            {/* <LoginDialog show={loginDialogShown} hide={hideLoginDialog}/>
            <DeleteDialog show={deleteDialogShown} hide={hideDeleteDialog}/>
            <SignupDialog show={signupDialogShown} hide={hideSignupDialog}/>
            <PasswordDialog show={passwordDialogShown} hide={hidePasswordDialog}/>
            
            <button onClick={showLoginDialog}>login</button>
            <button onClick={showDeleteDialog} >delete</button>
            <button onClick={showSignupDialog} >signup</button>
            <button onClick={showPasswordDialog} >password</button> */}
            <LandingPage />
        </div>
    )
}

export default Home;