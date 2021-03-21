import React, { useEffect, useState } from 'react';
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
        }
    }, [results, updateShowResults]);



    useEffect(() => {
        setResults(querySearch(dummyCourses, query))
        if (!query || query.length === 0) {
            updateShowResults(false);
        } else {
            updateShowResults(true);
        }
    }, [query, updateShowResults]);

    return (
        <div id="search-results-container"  >
            <ul id="search-results">
                {displayResults.map((course) =>
                    <Link id="result-item-link" to={`/courses/${course.department}/${course.code}`} onClick={(() => updateShowResults(false))} >
                        <li id="result-item">{course.code}</li>
                    </Link>
                )}
            </ul>
        </div>
    );
}

export default SearchResults