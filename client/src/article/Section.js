import React from 'react'
import LinksPanel from './LinksPanel';

import './Article.css'

function Section(props) {
    const { section } = props;
    return (
        <div id="section-content" >
            <div>
                <h4>{`Section: ${section.letter}`}</h4>
                <h4>{`Instructor: ${section.professor}`}</h4>        
                <button className="enroll-button">
                    <span>Enroll</span>
                </button>
                <p className="section-description">
                    CSE11 UCSD Cao science computer Cao section Objectorientedlanguage Cao CSE11 Miranda Objectorientedlanguage. Cao Gary Winter Fall Cao 2021 CSE11 discussion section. Winter Miranda Cao Java Cao 2021 Gary Cao Java Miranda Cao Miranda discussion. Cao 2020 CSE11 UCSD Cao Gary UCSD. Fall 2021 2020 UCSD section computer Cao section Fall Cao CSE11 computer 2020 2021?
                </p>
            </div>
            <LinksPanel section={section}/>
        </div>
    )
}

export default Section