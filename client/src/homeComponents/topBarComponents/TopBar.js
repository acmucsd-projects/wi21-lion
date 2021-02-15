import React, { useState } from 'react';
import './TopBar.css';
import { ReactComponent as ProfileSVG } from './profile.svg';
import { ReactComponent as CreateSVG } from './create.svg';

import SearchResults from './SearchResults';
import SearchBar from './SearchBar'


const TopBar = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [displayResults, setDisplayResults] = useState(false);
    const [bottomSearchPos, setBottomSearchPos] = useState(0);

    function updateQuery(query) {
        setSearchQuery(query);
    }

    function updateShowResults(showResults){
        setDisplayResults(showResults);
    }

    function updateBottomSearchPos(pos) {
        setBottomSearchPos(pos);
    }

    function updateClickOnInput(didClick) {
        setDisplayResults(didClick);
    }

    return (
        <div>
            <div id="topbar-container">
                <SearchBar updateQuery={updateQuery} displayResults={displayResults} updateBottomSearchPos={updateBottomSearchPos}/>
                <div id="topbar-buttons">
                    <div className="topbar-button topbar-item">
                        <CreateSVG className="topbar-item-svg"/>
                    </div>
                    <div className="topbar-button topbar-item">
                        <ProfileSVG className="topbar-item-svg"/>
                    </div>
                </div>
            </div>
            <SearchResults query={searchQuery} updateShowResults={updateShowResults} bottomSearchPos={bottomSearchPos} updateClickOnInput={updateClickOnInput}/>
        </div>
    );
}

export default TopBar


//TODO: dropdown for profile button
//Fix gap between bar and results
