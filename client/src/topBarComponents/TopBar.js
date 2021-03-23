import React, { useState, useEffect } from 'react';
import './TopBar.css';
import { ReactComponent as ProfileSVG } from './profile.svg';
import { ReactComponent as CreateSVG } from './create.svg';

import SearchResults from './SearchResults';
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom';

const ProfileDropdown = () => {
    return (
        <ul className="profile-dropdown">
            <Link exact to='/userProfile' className="profile-item">
                Profile
            </Link>
            <Link exact to='/login' className="profile-item">
                Login
            </Link>
            <Link className="profile-item" onClick={() => alert("signed out")}>
                Sign Out
            </Link>
        </ul>
    );
}

const CreatePageDropdown = () => {
    return (
        <ul className="create-page-dropdown">
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


    function updateQuery(query) {
        setSearchQuery(query);
    }

    function updateShowResults(showResults) {
        setDisplayResults(showResults);
    }

    function toggleProfileDropdown(event) {
        if (!event.relatedTarget ) {
            setDisplayProfileDropdown(!displayProfileDropdown);
            return;
        }
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
                <div className="searchbar-container" onBlur={toggleResultsDropdown} onFocus={toggleResultsDropdown} tabIndex="2">
                    <SearchBar updateQuery={updateQuery} displayResults={displayResults} />
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
                <SearchResults query={searchQuery} updateShowResults={updateShowResults} />
            }
            {displayCreatePageDropdown && <CreatePageDropdown />}
            {displayProfileDropdown && <ProfileDropdown />}
        </div>
    );
}

export default TopBar