import React, { useEffect, useState } from 'react'
import './TopBar.css'
import {ReactComponent as ProfileSVG} from './profile.svg'

import dummyCourses from './dummyCourses.json'

const querySearch = (courses, query) => {
    if(!query){
        return []
    }
    return courses.filter((course) => {
        const courseName = course.code;
        return courseName.includes(query.toUpperCase())
    })
}




const SearchResults = (props) => {

    const {query} = props

    const [results, setResults] = useState([])
    const [displayResults, setDisplayResults] = useState([])
    const [hideResults, setHideResults] = useState("none");

    useEffect(() => {
        setResults(querySearch(dummyCourses, query))
        if(!query || query.length === 0){
            setHideResults("none")
        } else {
            setHideResults("")
        }
    }, [query])

    useEffect(() => {
        if(results.length === 0){
            //add no results found text when query length is not 0 but no results are found
            // setHideResults("none")
            var noResults = [{
                "department":"",
                "code": "No Results Found"
            }]
            setDisplayResults(noResults)
        } else {
            // setHideResults("")
            setDisplayResults(results)
        }
    }, [results])

    return (
        <div id="search-results-container">
            <ul id="search-results" style={{display:hideResults}}>
                {displayResults.map((course) =>
                <li id="result-item">{course.code}</li>
                )}
            </ul>
        </div>
    ) 
}

const SearchBar = (props) => {
    const [query, setQuery] = useState("")

    const {updateQuery} = props



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
        <div id="search-bar" className="topbar-item">
            <input
                type="text"
                id="search-input"
                placeholder="search"
                name="search-input" 
                onInput={handleInput}
            />
            {/* <ul id="search-results" style={{display:hideResults}}>
                {results.map((course) => 
                <li id="result-item">{course.code}</li>
                )}
            </ul> */}
        </div>
    )
}

const TopBar = () => {

    const [searchQuery, setSearchQuery] = useState("")

    function updateQuery(query) {
        console.log("Hello there")
        setSearchQuery(query)
    }

    const topbarButtonClasses = 'topbar-item topbar-button'


    return (
        //TODO: search bar 20% from the left and profile button on the far right
        <div>
        <div id="topbar-container">
            <div>
                <SearchBar updateQuery={updateQuery}/>
            </div>
            <div className={topbarButtonClasses} style={{marginRight:'2vw', paddingRight:'1vh', paddingLeft:'1vh'}}>
                <ProfileSVG/>
            </div>
        </div>
            <SearchResults query={searchQuery}/>
        </div>
    )
}

export default TopBar
