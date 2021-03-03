import React, { useEffect, useMemo, useState } from 'react';

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
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [quarterList, setQuarterList] = useState([]);
    const [selectedQuarterName, setSelectedQuarterName] = useState("Select a quarter...");
    const [selectedSectionName, setSelectedSectionName] = useState("Select a section...");
    const [sectionList, setSectionList] = useState([]);

    // let departmentList = [];
    // const quarterList = useMemo(() => getListOfQuarters(), []);



    function updateSelectedArticleType() {

    }

    function updateSelectedDepartment() {
    }

    function updateSelectedCourse(element) {
        window.location = `/courses/${element.department}/${element.name}`;
    }

    function updateSelectedQuarter(element) {
        setSelectedQuarter(element.quarter)
        let quarterSeason = element.quarter.substring(0, 2);
        let quarterYear = element.quarter.substring(2, element.quarter.length);
        switch (quarterSeason) {
            case "fa":
                setSelectedQuarterName(`Fall 20${quarterYear}`)
                break;
            case "wi":
                setSelectedQuarterName(`Winter 20${quarterYear}`)
                break;
            case "sp":
                setSelectedQuarterName(`Spring 20${quarterYear}`)
                break;

            default:
                break;
        }
    }

    function updateSelectedSection(sectionParam) {
        window.location = `/courses/${course.department}/${course.name}/${sectionParam.quarter}/${sectionParam.professor}`;
    }


    function getListOfQuarters() {
        let quarters = [];
        let quarterObjs = [];
        for (let index = 0; index < course.sections.length; index++) {
            const tmpSection = course.sections[index];
            if (Object.hasOwnProperty.call(tmpSection, "quarter")) {
                const quarter = tmpSection["quarter"];
                if (!quarters.includes(quarter)) {
                    quarters.push(quarter);
                }
            }
        }
        for (let index = 0; index < quarters.length; index++) {
            const element = quarters[index];
            quarterObjs.push({ "quarter": element });
        }

        return quarterObjs;
    }

    function getListOfSections(quarter) {
        let sections = [];


        course.sections.forEach(element => {
            if (element.quarter == quarter) {
                sections.push(element)
            }
        });
        return sections;
    }

    // useEffect(() => {
    //update departments when the page is loaded and there is a new course 
    // }, []);

    useEffect(() => {
        // if(!selectedQuarter) {
        //     setSelectedQuarter("Select a quarter");
        // } else {
        //     setSelectedQuarterName()
        // }
        setSectionList(getListOfSections(selectedQuarter));
    }, [selectedQuarter, getListOfSections]);

    useEffect(() => {
        if (!section) {
            setSelectedSectionName("Select a section ...");
        } else {
            setSelectedSectionName(section.professor);
            setSelectedQuarter(section.quarter);
            setSelectedQuarterName(section.quarter);
        }
        // getListOfQuarters();
        setQuarterList(getListOfQuarters())
    }, [section, setSelectedSectionName, getListOfQuarters, getListOfSections]);

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
                    <PathItem name={selectedQuarterName}>
                        <PathDropdownMenu
                            list={quarterList}
                            type={"quarter"}
                            updateSelection={updateSelectedQuarter}
                            selectedItem={selectedQuarterName}
                        />
                    </PathItem>
                    {selectedQuarter &&
                        <PathItem name={selectedSectionName}>
                            <PathDropdownMenu
                                list={sectionList}
                                type={"professor"}
                                updateSelection={updateSelectedSection}
                                selectedItem={selectedSectionName} />
                        </PathItem>
                    }
                </ul>
            </div>
            {props.children}
        </div>
    );
}

export default Article
