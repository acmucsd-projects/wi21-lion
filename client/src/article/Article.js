import React, { useEffect, useState } from 'react';

import './Article.css';

import banner from './icons/ded 1.jpg';
import PathItem from './PathItem';
import Section from './Section';
import SectionMenu from './SectionMenu';

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

    function updateSelectedSection(section) {
        setSelectedSection(section);
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

    //TODO: make the banner/header its own component
    return (
        <div id="article">
            <img className="article-banner" src={banner} alt={course.name + " banner"}></img>
            <div className="article-header">
                <ul className="article-path">
                    <PathItem name="Classes"></PathItem>
                    <PathItem name="CSE"></PathItem>
                    <PathItem name="CSE11"></PathItem>
                    <PathItem name={selectedSectionName}>
                        <SectionMenu updateSelectedSection={updateSelectedSection}></SectionMenu>
                    </PathItem>
                    {selectedSection &&
                        <button className="reset-section-button" onClick={() => updateSelectedSection(null)}>
                            <span>Reset Section</span>
                        </button>}
                </ul>
            </div>
            <h1 className="article-body">{course.name + ": " + course.shortDescription}</h1>
            {selectedSection && sectionContent}
            <div className="article-body">
                <p className="long-description">
                    {course.longDescription}
                </p>
            </div>
        </div>
    );
}

export default Article
