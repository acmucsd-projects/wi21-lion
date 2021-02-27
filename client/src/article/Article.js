import React, { useEffect, useState } from 'react';

import './Article.css';

import banner from './icons/ded 1.jpg';
import PathItem from './PathItem';
import Section from './SectionContent';
import PathDropdownMenu from './SectionMenu';
import SectionMenu from './SectionMenu';

import dummyArticles from './dummyArticle.json';

/**
 * General course article template.
 *  
 * @param {*} props 
 */
function Article(props) {

    const { course } = props;
    //TODO: make the selected section stay after browser refresh
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedSectionName, setSelectedSectionName] = useState("Select a section...");

    // "Classes/CSE/CSE11/Dropdown(Gary)"

    function updateSelectedArticleType() {

    }

    function updateSelectedDepartment() {
    }

    function updateSelectedCourse(element) {
        window.location = `/courses/${element.department}/${element.name}`;
    }

    function updateSelectedSection(section) {
        // setSelectedSection(section);
        window.location = `/courses/${course.department}/${course.name}/${section.professor}`;
    }


    useEffect(() => {
        if (!selectedSection) {
            setSelectedSectionName("Select a section ...");
        } else {
            setSelectedSectionName(selectedSection.professor);
        }
    }, [selectedSection, setSelectedSectionName]);

    const sectionContent = (
        <Section section={selectedSection} />
    );

    const departmentList = ["CSE", "ECE"];

    const courseList = ["cse11", "cse12"];

    //TODO: make the banner/header its own component
    return (
        <div id="article">
            <img className="article-banner" src={banner} alt={course.name + " banner"}></img>
            <div className="article-header">
                <ul className="article-path">
                    <PathItem name="Classes">
                        <PathDropdownMenu list={[{"type": "courses"}, {"type": "orgs"}]} type={"type"} updateSelection={updateSelectedArticleType}></PathDropdownMenu>
                    </PathItem>
                    <PathItem name={course.department}>
                        <PathDropdownMenu list={dummyArticles} type={"department"} updateSelection={updateSelectedDepartment}></PathDropdownMenu>
                    </PathItem>
                    <PathItem name={course.name}>
                        <PathDropdownMenu list={dummyArticles} type={"name"} updateSelection={updateSelectedCourse}></PathDropdownMenu>
                    </PathItem>
                    <PathItem name={selectedSectionName}>
                        {/* <SectionMenu updateSelectedSection={updateSelectedSection}></SectionMenu> */}
                        <PathDropdownMenu list={course.sections} type={"professor"} updateSelection={updateSelectedSection}></PathDropdownMenu>
                    </PathItem>
                    {/* {selectedSection &&
                        <button className="reset-section-button" onClick={() => updateSelectedSection(null)}>
                            <span>Reset Section</span>
                        </button>} */}
                </ul>
            </div>
            {props.children}
            {/* <h1 className="article-body">{course.name + ": " + course.shortDescription}</h1>
            {selectedSection && sectionContent}
            <div className="article-body">
                <p className="long-description">
                    {course.longDescription}
                </p>
            </div> */}
        </div>
    );
}

export default Article
