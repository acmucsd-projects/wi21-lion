import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './TopBar.css';



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
        const courseName = course.name.toUpperCase();
        return courseName.includes(query.toUpperCase());
    })
}


const SearchResults = (props) => {

    const { query, updateShowResults, updateSearchValue } = props;

    const [contentList, setContentList] = useState([]);
    const [results, setResults] = useState([]);
    const [displayResults, setDisplayResults] = useState([]);

    function onCourseClick(courseName) {
        console.log(courseName);
        updateSearchValue(courseName);
        updateShowResults(false);
    }

    function onOrgClick (orgName) {
        updateSearchValue(orgName);
        updateShowResults(false);
    }


    function fetchContentList() {
        let entries = [];
        fetch(`http://localhost:5000/department`)
            .then(response => response.json())
            .then(data => {
                data.departments.forEach(department => {
                    department.classes.forEach(course => {
                        fetch(`http://localhost:5000/class/${course}`)
                            .then(response => response.json())
                            .then(data => {
                                data.department = department.name;
                                entries.push(data);
                            })
                    })
                });
            })
            .catch(error => {
                console.error(error);
            })
        fetch(`http://localhost:5000/organization`)
            .then(response => response.json())
            .then(data => {
                data.organizations.forEach(element => {
                    entries.push(element);
                });
            })
        setContentList(entries);
    }


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
        if (contentList) {
            setResults(querySearch(contentList, query));
            if (!query || query.length === 0) {
                updateShowResults(false);
            } else {
                updateShowResults(true);
            }
        }
    }, [query, updateShowResults, contentList]);

    useEffect(() => {
        if (!contentList || contentList.length === 0) {
            fetchContentList();
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div id="search-results-container" >
                <ul id="search-results">
                    {displayResults.map((element) => {
                        return element.department ?
                            <Link id="result-item-link" to={`/courses/${element.department}/${element.name}`} onClick={() => onCourseClick(element.name)} >
                                <li id="result-item">{element.name}</li>
                            </Link>
                            :
                            <Link id="result-item-link" to={`/orgs/${element.name}`} onClick={() => onOrgClick(element.name)} >
                                <li id="result-item">{element.name}</li>
                            </Link>
                    }
                    )}
                </ul>
        </div>
    );
}

export default SearchResults