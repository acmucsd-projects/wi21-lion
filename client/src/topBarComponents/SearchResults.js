import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import './TopBar.css';



import dummyCourses from './dummyCourses.json';

/**
 * 
 * @param {*} courses 
 * @param {*} query 
 */
const querySearch = (courses, query) => {
    if (!query) {
        return [];
    }
    return courses.filter((course) => {
        const courseName = course.code;
        return courseName.includes(query.toUpperCase());
    })
}


const SearchResults = (props) => {

    const { query, updateShowResults } = props;



    const [results, setResults] = useState([]);
    const [displayResults, setDisplayResults] = useState([]);
    const [hideResults, setHideResults] = useState("none");

    const [selected, setSelected] = useState();


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
                    setHideResults("none");
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
            setHideResults("none");
            updateShowResults(false);
        } else {
            setHideResults("");
            updateShowResults(true);
        }
    }, [query]);

    useEffect(() => {
        if (results.length === 0) {
            //TODO: find a better solution for this 
            var noResults = [{
                "department": "",
                "code": "No Results Found"
            }];
            setDisplayResults(noResults);
        } else {
            setDisplayResults(results);
            setSelected(results[0]);
        }
    }, [results]);


    useEffect(() => {
        updateShowResults(!hideResults);
    }, [hideResults]);




    return (
        <div id="search-results-container" ref={resultsWrapperRef} >
            <ul id="search-results" style={{display: hideResults}}>
                {displayResults.map((course) =>
                    <Link id="result-item-link" to={course.department + "/" + course.code}>
                        <li id="result-item">{course.code}</li>
                    </Link>
                )}
            </ul>
        </div>
    );
}

export default SearchResults