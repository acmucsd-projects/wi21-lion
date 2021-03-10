import React, { useEffect, useState, useCallback } from 'react';

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
function CourseArticle(props) {

    const { section, course } = props;
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [quarterList, setQuarterList] = useState([]);
    const [selectedQuarterName, setSelectedQuarterName] = useState("Select a quarter...");
    const [selectedSectionName, setSelectedSectionName] = useState("Select a section...");
    const [sectionList, setSectionList] = useState([]);



    /**
     * Called when article type is changed
     */
    function updateSelectedArticleType() {

    }

    /**
     * Called when department is changed
     */
    function updateSelectedDepartment() {
    }

    /**
     * Called when a new course is selected. Current URL is updated accordingly 
     * @param {*} element 
     */
    function updateSelectedCourse(element) {
        window.location = `/courses/${element.department}/${element.name}`;
    }

    /**
     * Update the currently selected quarter 
     * @param {*} element 
     */
    function updateSelectedQuarter(element) {
        const quarter = element.quarter
        if(quarter) {
            setSelectedQuarter(quarter);
            setSelectedQuarterName(quarter)
        }
    }

    function updateSelectedSection(sectionParam) {
        window.location = `/courses/${course.department}/${course.name}/${sectionParam.season}${sectionParam.year}/${sectionParam.letter}`;
    }

    function compareQuarters(quarter1, quarter2) {
        const quarter1Arry = quarter1.split(" ");
        const year1 = quarter1Arry[1];
        const quarter2Arry = quarter2.split(" ");
        const year2 = quarter2Arry[1];

        if(year1 > year2) {
            return 1;
        } else if(year1 < year2) {
            return -1;
        } 

        const season1 = quarter1Arry[0];
        const season2 = quarter2Arry[0];

        const season1Val = getSeasonVal(season1);
        const season2Val = getSeasonVal(season2);
        if(season1Val > season2Val) {
            return 1;
        } else {
            return -1;
        }

    }

    function getSeasonVal(season) {
        switch (season) {
            case "Winter":
                return 1;
       
            case "Spring":
                return 2;

            case "Fall":
                return 3;

            default:
                return 0
        }
    }

    /**
     * Retrieves an array of quarters available for the current course
     */
    const getListOfQuarters = useCallback(() => {
        let quarters = [];
        let quarterObjs = [];
        for (let index = 0; index < course.sections.length; index++) {
            const tmpSection = course.sections[index];
            if (Object.hasOwnProperty.call(tmpSection, "season") && Object.hasOwnProperty.call(tmpSection, "year")) {
                const season = tmpSection["season"];
                const year = tmpSection["year"];
                const quarter = `${season} ${year}`
                if (!quarters.includes(quarter)) {
                    quarters.push(quarter)
                }
            }
        }
        for (let index = 0; index < quarters.length; index++) {
            const element = quarters[index];
            quarterObjs.push({ "quarter": element });
        }
        let i, key, j;
        for(i = 1; i < quarterObjs.length; i++) {
            key = quarterObjs[i].quarter;
            j = i -1;

            while(j>=0 && compareQuarters(quarterObjs[j].quarter, key)) {
                quarterObjs[j + 1].quarter = quarterObjs[j].quarter;
                j = j -1;
            }
            quarterObjs[j + 1].quarter = key;
        }

        return quarterObjs;
    }, [course.sections]);

    /**
     * Retrives the available sections for the current course and a given quarter 
     * @param {string} quarter quarter string used to search for sections
     */
    const getListOfSections = useCallback((quarter) => {
        let sections = [];


        course.sections.forEach(element => {
            const sectionQuarter = `${element.season} ${element.year}`
            if (sectionQuarter === quarter) {
                sections.push(element)
            }
        });
        return sections;
    }, [course.sections]);

    /**
     * Adds a formatted section key value pair to each section object. This new value is used
     * for each entry in the section selection dropdown
     */
    const formatSectionList = useCallback(() => {
        let formattedSections = [];

        sectionList.forEach(element => {
            element.formattedVersion = `${element.professor} ${element.letter}`;
            formattedSections.push(element);
        })
        return formattedSections;
    }, [sectionList])


    useEffect(() => {
        setQuarterList(getListOfQuarters());
    }, [course, getListOfQuarters]);

    useEffect(() => {
        // if(!selectedQuarter) {
        //     setSelectedQuarter("Select a quarter");
        // } else {
        //     setSelectedQuarterName()
        // }
        if (selectedQuarter) {
            setSectionList(getListOfSections(selectedQuarter));
            updateSelectedQuarter(selectedQuarter);
        }
    }, [selectedQuarter, getListOfSections]);

    useEffect(() => {
        if (!section) {
            setSelectedSectionName("Select a section ...");
        } else {
            setSelectedSectionName(section.professor);
            setSelectedQuarter(`${section.season} ${section.year}`);
            setSelectedQuarterName(`${section.season} ${section.year}`);
            setQuarterList(getListOfQuarters());
            // setSectionList(getListOfSections(selectedQuarter));
        }
    }, [section, getListOfQuarters, getListOfSections]);

    useEffect(() => {
        formatSectionList();
    }, [sectionList, formatSectionList]);

    // useEffect(() => {
    //     formatQuarterList();
    // }, [quarterList, formatQuarterList]);

    // setSelectedSectionName, getListOfQuarters, getListOfSections
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
                            selectedItem={selectedQuarterName} />
                    </PathItem>
                    {selectedQuarter &&
                        <PathItem name={selectedSectionName}>
                            <PathDropdownMenu
                                list={sectionList}
                                type={"formattedVersion"}
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

export default CourseArticle 
