import React, { useState, useEffect } from 'react';
import './TopBar.css';
import { ReactComponent as HomeSVG } from './res/home.svg';
import { ReactComponent as ProfileSVG } from './res/profile.svg';
import { ReactComponent as CreateSVG } from './res/create.svg';

import SearchResults from './SearchResults';
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom';
import { LoginDialog, SignupDialog } from '../popups/dialogs';

const ProfileDropdown = (props) => {
    const { hideProfileDropdown, showLogin, showRegister } = props;
    return (
        <ul className="profile-dropdown" onClick={() => hideProfileDropdown()}>
            <Link exact to='/userProfile' className="profile-item" >
                Profile
            </Link>
            <Link className="profile-item" onClick={() => showLogin()}>
                Login
            </Link>
            <Link className="profile-item" onClick={() => showRegister()}>
                Register
            </Link>
            <Link className="profile-item" onClick={() => alert("signed out")}>
                Sign Out
            </Link>
        </ul>
    );
}

const CreatePageDropdown = (props) => {
    const { hideCreatePageDropdown } = props;
    return (
        <ul className="create-page-dropdown" onClick={() => hideCreatePageDropdown()}>
            <Link exact to='/createPageClass' className="create-page-item">
                New Class Page
            </Link>
            <Link exact to='/createPageOrg' className="create-page-item">
                New Org Page
            </Link>
        </ul>
    );
}

const TopBar = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [displayResults, setDisplayResults] = useState(false);
    const [displayCreatePageDropdown, setCreatePageDropdown] = useState(false);
    const [displayProfileDropdown, setDisplayProfileDropdown] = useState(false);
    const [displayLoginPrompt, setDisplayLoginPrompt] = useState(false);
    const [displayRegisterPrompt, setDisplayRegisterPrompt] = useState(false);
    const [currentSearchValue, setCurrentSearchValue] = useState("");


    function hideProfileDropdown() {
        setDisplayProfileDropdown(false);
    }

    function hideCreatePageDropdown() {
        setCreatePageDropdown(false);
    }

    function showLogin() {
        setDisplayLoginPrompt(true);
    }

    function hideLogin() {
        setDisplayLoginPrompt(false);
    }

    function showRegister() {
        setDisplayRegisterPrompt(true);
    }

    function hideRegister() {
        setDisplayRegisterPrompt(false);
    }

    function updateQuery(query) {
        setSearchQuery(query);
    }

    function updateShowResults(showResults) {
        setDisplayResults(showResults);
    }

    function updateSearchValue(value) {
        setCurrentSearchValue(value);
    }

    function showResults(){
        setDisplayResults(true);
    }

    function toggleProfileDropdown(event) {
        if (!event.relatedTarget ) {
            setDisplayProfileDropdown(!displayProfileDropdown);
            // if(displayProfileDropdown)
            return;
        }
        console.log(event);
        if(event.relatedTarget.className !== "profile-item") {
            setDisplayProfileDropdown(!displayProfileDropdown);
        }
    }

    function toggleCreatePageDropdown(event) {
        if (!event.relatedTarget ) {
            setCreatePageDropdown(!displayCreatePageDropdown);
            return;
        }
        if(event.relatedTarget.className !== "create-page-item") {
            setCreatePageDropdown(!displayCreatePageDropdown);
        }
    }

    function toggleResultsDropdown(event) {
        if (!event.relatedTarget) {
            setDisplayResults(!displayResults);
        }
    }

    useEffect(() => {
        if (searchQuery && searchQuery !== "") {
            setDisplayResults(true);
        }
    }, [searchQuery])

    return (
        <div>
            <div className="topbar-container">
                    <Link className="home-button topbar-item" exact to='' >
                        <HomeSVG className="topbar-home-svg" />
                    </Link>
                <div className="topbar-item" onBlur={toggleResultsDropdown} onFocus={showResults} tabIndex="2">
                    <SearchBar updateQuery={updateQuery} displayResults={displayResults} updateClickOnInput={showResults} currentSearchValue={currentSearchValue}/>
                </div>
                <div id="topbar-buttons" >
                    <div className="topbar-button topbar-item" onBlur={toggleCreatePageDropdown} onFocus={toggleCreatePageDropdown} tabIndex="1">
                        <CreateSVG className="topbar-item-svg" />
                    </div>
                    <div className="topbar-button topbar-item" onBlur={toggleProfileDropdown} onFocus={toggleProfileDropdown} tabIndex="0">
                        <ProfileSVG className="topbar-item-svg" />
                    </div>
                </div>
            </div>
            {displayResults &&
                <SearchResults query={searchQuery} updateShowResults={updateShowResults} updateSearchValue={updateSearchValue} />
            }
            {displayCreatePageDropdown && <CreatePageDropdown hideCreatePageDropdown={hideCreatePageDropdown}/>}
            {displayProfileDropdown && <ProfileDropdown hideProfileDropdown={hideProfileDropdown} showLogin={showLogin} showRegister={showRegister}/>}
            <div className="login-wrapper">
                {displayLoginPrompt && <LoginDialog show={showLogin} hide={hideLogin} />}
            </div>
            <div className="login-wrapper">
                {displayRegisterPrompt && <SignupDialog show={showRegister} hide={hideRegister}/>}
            </div>
        </div>
    );
}

export default TopBar