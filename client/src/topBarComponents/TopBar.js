import React, { useState } from 'react';
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
    const [bottomSearchPos, setBottomSearchPos] = useState(0);
    const [displayProfileDropdown, setDisplayProfileDropdown] = useState(false);


    function updateQuery(query) {
        setSearchQuery(query);
    }

    function updateShowResults(showResults) {
        setDisplayResults(showResults);
    }

    function updateBottomSearchPos(pos) {
        setBottomSearchPos(pos);
    }

    function updateClickOnInput(didClick) {
        setDisplayResults(didClick);
    }

    function toggleProfileDropdown(event) {
        console.log(event.relatedTarget)
        if (!event.relatedTarget) {
            setDisplayProfileDropdown(!displayProfileDropdown);
        }
    }

    return (
        <div>
            <div id="topbar-container">
                <SearchBar updateQuery={updateQuery} displayResults={displayResults} updateBottomSearchPos={updateBottomSearchPos} />
                <div id="topbar-buttons">
                    <div className="topbar-button topbar-item">
                        <CreateSVG className="topbar-item-svg" />
                    </div>
                    <div className="topbar-button topbar-item" onBlur={toggleProfileDropdown} onFocus={toggleProfileDropdown} tabIndex="0">
                        <ProfileSVG className="topbar-item-svg" />
                    </div>
                </div>
            </div>
            <SearchResults query={searchQuery} updateShowResults={updateShowResults} bottomSearchPos={bottomSearchPos} updateClickOnInput={updateClickOnInput} />
            {displayProfileDropdown && <ProfileDropdown></ProfileDropdown>}
        </div>
    );
}

export default TopBar