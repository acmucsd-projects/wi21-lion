import React, { useState } from 'react';
import { LoginDialog, DeleteDialog } from '../popups/dialogs.js';
import LandingPage from './landingPage/LandingPage.js';

const Home = () => {

    const [loginDialogShown, setShowLoginDialog] = useState(true);
    const [deleteDialogShown, setShowDeleteDialog] = useState(false);

    function hideLoginDialog() { setShowLoginDialog(false); }
    function hideDeleteDialog() { setShowDeleteDialog(false); }
    function showLoginDialog() { setShowLoginDialog(true); }
    function showDeleteDialog() { setShowDeleteDialog(true); }

 
    return (
       
        <div style={{ position: "absolute", top: 0 }}>
            <LoginDialog show={loginDialogShown} hide={hideLoginDialog}/>
            <DeleteDialog show={deleteDialogShown} hide={hideDeleteDialog}/>
            
            <button onClick={showLoginDialog}>login</button>
            <button onClick={showDeleteDialog} >delete</button>
            <LandingPage></LandingPage>
        </div>
    )
}

export default Home;