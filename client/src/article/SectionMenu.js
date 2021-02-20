import React, { useState } from 'react'
import './SectionMenu.css'

import dummyCourses from './dummyArticle.json'

function SectionItem(props){
    const { sectionID, updateSelectedID } = props;
    return (
        <div className="section-item" onClick={() => updateSelectedID(sectionID)} >
            {props.children} 
        </div>
    );
}

function SectionMenu(props) {

    const { updateSelectedSection } = props;


    function updateSelectedID(sectionID) {
        for (let index = 0; index < dummyCourses[0].sections.length; index++) {
            const element = dummyCourses[0].sections[index];
            if (element.class === sectionID){
                updateSelectedSection(element);
                break;
            }
        }
    }

    return (
        <div className="section-dropdown">
            {dummyCourses[0].sections.map((section) => (
                <SectionItem sectionID={section.class} updateSelectedID={updateSelectedID}>
                    {`${section.professor}  ${section.letter}`}
                </SectionItem>
            ))}
        </div>
    )
}

export default SectionMenu
