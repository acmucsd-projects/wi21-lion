import React, { useEffect, useState, useRef } from 'react'
import { Link } from "react-router-dom"
import './TopBar.css'
import { ReactComponent as ProfileSVG } from './profile.svg'
import { ReactComponent as CreateSVG } from './create.svg'

import dummyCourses from './dummyCourses.json'

/**
 * 
 * @param {*} courses 
 * @param {*} query 
 */
const querySearch = (courses, query) => {
    if (!query) {
        return []
    }
    return courses.filter((course) => {
        const courseName = course.code;
        return courseName.includes(query.toUpperCase())
    })
}


const SearchResults = (props) => {

    const { query} = props
    let {showResults} = props

    const [results, setResults] = useState([])
    const [displayResults, setDisplayResults] = useState([])
    const [hideResults, setHideResults] = useState("none");

    const [selected, setSelected] = useState()


    const resultsWrapperRef = useRef(null);
    useOutsideResultsAlerter(resultsWrapperRef);

    /**
     * Function to handle clicks outside 
     * @param {*} ref 
     */
    function useOutsideResultsAlerter(ref) {
        useEffect(() => {

            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setHideResults("none")
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }



    useEffect(() => {
        setResults(querySearch(dummyCourses, query))
        if (!query || query.length === 0) {
            setHideResults("none")
        } else {
            setHideResults("")
            showResults = true
        }
    }, [query])

    useEffect(() => {
        if (results.length === 0) {
            //TODO: find a better solution for this 
            var noResults = [{
                "department": "",
                "code": "No Results Found"
            }]
            setDisplayResults(noResults)
        } else {
            setDisplayResults(results)
            setSelected(results[0])
        }
    }, [results])


    useEffect(() => {
        
        if(showResults){
            setHideResults("")
        }

    }, [showResults])


    return (<div id="search-results-container" ref={resultsWrapperRef} >
        <ul id="search-results" style={{ display: hideResults }}>
            {displayResults.map((course) =>
                <Link style={{ textDecoration: "none" }} to={course.department + "/" + course.code}>
                    <li id="result-item">{course.code}</li>
                </Link>
            )}
        </ul>
    </div>)
}




const SearchBar = (props) => {
    const [query, setQuery] = useState("")

    const { updateQuery, showResultsFunc } = props



    /**
     * function is defined in the parent component
     * function passes data into the rulsts box
     * that function passedi nto a prop search result component
     * when you search it calls that function
     */
    const handleInput = event => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        updateQuery(query)
    }, [query])

    return (
        <div id="search-bar" className="topbar-item" onClick={showResultsFunc}>
            <input
                type="text"
                id="search-input"
                placeholder="search"
                name="search-input"
                onInput={handleInput}
            />
        </div>
    )
}

const TopBar = () => {

    const [searchQuery, setSearchQuery] = useState("")


    function updateQuery(query) {
        setSearchQuery(query)
    }



    return (
        //TODO: search bar 20% from the left and profile button on the far right
        <div>
            <div id="topbar-container">
                <SearchBar updateQuery={updateQuery} />
                <div className="topbar-buttons" style={{ marginRight: '2vw', paddingRight: '1vh', paddingLeft: '1vh' }}>
                        <div className="topbar-button topbar-item">
                            <CreateSVG className="topbar-item-svg" />
                        </div>
                        <div className="topbar-button topbar-item">
                            <ProfileSVG className="topbar-item-svg" />
                        </div>
                </div>
            </div>
            <SearchResults query={searchQuery}/>
        </div>
    )
}

export default TopBar
