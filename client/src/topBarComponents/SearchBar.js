import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './TopBar.css';

const SearchBar = (props) => {
    const targetRef = useRef();
    const [query, setQuery] = useState("");
    const { updateQuery, displayResults, updateBottomSearchPos, updateClickOnInput } = props;


    const handleInput = event => {
        setQuery(event.target.value);
    }

    const handleClick = event => {
        if(event.current){
            updateClickOnInput(true)

        }
    }

    useEffect(() => {
        updateQuery(query);
    }, [query]);

    useLayoutEffect(() => {
        if (targetRef.current) {
            updateBottomSearchPos(targetRef.current.bottom)
        }
      }, []);

    return (
        <div id="search-bar" className="topbar-item">
            <input
                type="text"
                id="search-input"
                className={displayResults ? "search-input-top-borders" : "search-input-all-borders"}
                ref={targetRef}
                placeholder="search"
                name="search-input"
                onInput={handleInput}
                onClick={handleClick}
            />
        </div>
    );
}

export default SearchBar