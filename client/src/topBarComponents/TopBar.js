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
            <Link exact to='/profile' className="profile-item">
                Profile
                </Link>
            <Link exact to='/settings' className="profile-item">
                Settings
            </Link>
            <Link className="profile-item" onClick={() => alert("signed out")}>
                Sign Out
            </Link>
        </ul>
    );
}

const TopBar = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [displayResults, setDisplayResults] = useState(false);
    const [displayProfileDropdown, setDisplayProfileDropdown] = useState(false);


    function updateQuery(query) {
        setSearchQuery(query);
    }

    function updateShowResults(showResults) {
        setDisplayResults(showResults);
    }

    function toggleProfileDropdown(event) {
        if (!event.relatedTarget) {
            setDisplayProfileDropdown(!displayProfileDropdown);
        }
    }

    function toggleResultsDropdown(event) {
        // if(event.relatedTarget && event.relatedTarget.id === "result-item-link") {
        //     // setDisplayResults(false);
        //     return;
        // }
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
                <div className="topbar-container" onBlur={toggleResultsDropdown} onFocus={toggleResultsDropdown} tabIndex="0">
                    <SearchBar updateQuery={updateQuery} displayResults={displayResults} />
                </div>
                <div id="topbar-buttons">
                    <Link to="/createPage" className="topbar-button topbar-item">
                        <CreateSVG className="topbar-item-svg" />
                    </Link>
                    <div className="topbar-button topbar-item" onBlur={toggleProfileDropdown} onFocus={toggleProfileDropdown} tabIndex="0">
                        <ProfileSVG className="topbar-item-svg" />
                    </div>
                </div>
            </div>
            {displayResults &&
                <SearchResults query={searchQuery} updateShowResults={updateShowResults} />
            }
            {displayProfileDropdown && <ProfileDropdown></ProfileDropdown>}
        </div>
    );
}

export default TopBar