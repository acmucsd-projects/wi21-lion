import React from 'react';
import LinksPanel from './LinksPanel';

import './Article.css';

/**
 * React component for each courses' sections 
 * @param {*} props 
 */
function Section(props) {
    const { section } = props;
    return (
        <div id="section-content" >
            <div>
                <div id="section-info">
                    <h3> Section: <span>{section.letter}</span></h3>
                    <h3>Instructor: <span>{section.professor}</span></h3>
                    <h3>Lecture: <span>{`${section.lectureDays} ${section.lectureTime}`}</span></h3>
                </div>
                <button className="enroll-button">
                    <span>Enroll</span>
                </button>
                <p className="section-description">
                    CSE11 UCSD Cao science computer Cao section Objectorientedlanguage Cao CSE11 Miranda Objectorientedlanguage. Cao Gary Winter Fall Cao 2021 CSE11 discussion section. Winter Miranda Cao Java Cao 2021 Gary Cao Java Miranda Cao Miranda discussion. Cao 2020 CSE11 UCSD Cao Gary UCSD. Fall 2021 2020 UCSD section computer Cao section Fall Cao CSE11 computer 2020 2021?
                </p>
            </div>
            <LinksPanel section={section} />
        </div>
    );
}

export default Section