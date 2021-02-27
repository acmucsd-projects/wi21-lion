import React, { useEffect, useState } from 'react';

import './Article.css';

import banner from './icons/ded 1.jpg';
import PathItem from './PathItem';
import PathDropdownMenu from './PathDropdownMenu';

import dummyArticles from './dummyArticle.json';

/**
 * General course article template.
 *  
 * @param {*} props 
 */
function Article(props) {

    const { section, course } = props;
    //TODO: make the selected section stay after browser refresh
    const [selectedSectionName, setSelectedSectionName] = useState("Select a section...");

    // "Classes/CSE/CSE11/Dropdown(Gary)"

    function updateSelectedArticleType() {

    }

    function updateSelectedDepartment() {
    }

    function updateSelectedCourse(element) {
        window.location = `/courses/${element.department}/${element.name}`;
    }

    function updateSelectedSection(sectionParam) {
        window.location = `/courses/${course.department}/${course.name}/${sectionParam.professor}`;
    }


    useEffect(() => {
        if (!section) {
            setSelectedSectionName("Select a section ...");
        } else {
            setSelectedSectionName(section.professor);
        }
    }, [section, setSelectedSectionName]);

    //TODO: make the banner/header its own component
    return (
        <div id="article">
            <img className="article-banner" src={banner} alt={course.name + " banner"}></img>
            <div className="article-header">
                <ul className="article-path">
                    <PathItem name="Classes">
                        <PathDropdownMenu
                            list={[{ "type": "courses" }, { "type": "orgs" }]}
                            type={"type"}
                            updateSelection={updateSelectedArticleType}
                            selectedItem={"courses"} />
                    </PathItem>
                    <PathItem name={course.department}>
                        <PathDropdownMenu
                            list={dummyArticles}
                            type={"department"}
                            updateSelection={updateSelectedDepartment}
                            selectedItem={course.department} />
                    </PathItem>
                    <PathItem name={course.name}>
                        <PathDropdownMenu
                            list={dummyArticles}
                            type={"name"}
                            updateSelection={updateSelectedCourse}
                            selectedItem={course.name} />
                    </PathItem>
                    <PathItem name={selectedSectionName}>
                        <PathDropdownMenu
                            list={course.sections}
                            type={"professor"}
                            updateSelection={updateSelectedSection}
                            selectedItem={selectedSectionName} />
                    </PathItem>
                </ul>
            </div>
            {props.children}
        </div>
    );
}

export default Article
