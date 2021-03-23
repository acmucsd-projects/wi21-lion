import React, { useEffect, useState, useCallback } from 'react';

import './Article.css';

import banner from './icons/ded 1.jpg';
import PathItem from './PathItem';
import PathDropdownMenu from './PathDropdownMenu';

import dummyArticles from './dummyArticle.json';

/**
 * Called when article type is changed
 */
function updateSelectedArticleType(element) {
    if(element.type === "Orgs"){
        window.location = `/orgs`;
    } else {
        window.location = `/courses`;
    }
}

    /**
     * Called when a new course is selected. Current URL is updated accordingly 
     * @param {*} element 
     */
    function updateSelectedCourse(element) {
        window.location = `/courses/${element.department}/${element.name}`;
    }
/**
 * General course article template.
 *  
 * @param {*} props 
 */
function CourseArticle(props) {

    const { section, course } = props;
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDepartmentName, setSelectedDepartmentName] = useState("Select a department...");
    const [departmentList, setDepartmentList] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedCourseName, setSelectedCourseName] = useState("Select a course...");
    const [courseList, setCourseList] = useState([]);
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [quarterList, setQuarterList] = useState([]);
    const [selectedQuarterName, setSelectedQuarterName] = useState("Select a quarter...");
    const [selectedSectionName, setSelectedSectionName] = useState("Select a section...");
    const [sectionList, setSectionList] = useState([]);






    /**
     * Called when department is changed
     */
    function updateSelectedDepartment(element) {
        setSelectedDepartment(element.department)
        setSelectedDepartmentName(element.department)
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

    const compareQuarters = useCallback((quarter1, quarter2) => {
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
    },[])

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
    }, [course.sections, compareQuarters]);

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
        if(selectedDepartment) {
            setCourseList(dummyArticles.filter(course => course.department===selectedDepartment));
        }
        if(course && selectedDepartment !== course.department) {
            setSelectedCourse(null);
            setSelectedCourseName("Select a Course ...");
            setSelectedQuarter(null);
            setSelectedSectionName(null);
        } else {
            setSelectedCourse(course);
            setSelectedCourseName(course.name);
        }
    }, [selectedDepartment, course]);

    useEffect(() => {
        if (selectedQuarter) {
            setSectionList(getListOfSections(selectedQuarter));
            updateSelectedQuarter(selectedQuarter);
            if(section && selectedQuarter !== `${section.season} ${section.year}`) {
                setSelectedSectionName("Select a Section ...");
            }
        }
    }, [selectedQuarter, section, getListOfSections]);

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

    useEffect(() => {
        if(course) {
            setSelectedDepartment(course.department);
            setSelectedDepartmentName(course.department);
            setSelectedCourse(course);
            setSelectedCourseName(course.name);
        }
    }, [course])

    useEffect(() => {
        let departments = [];
        dummyArticles.forEach(element => {
            const department = element["department"];
            if(!departments.includes(department)) {
                departments.push(department);
            }
        });
        let departmentsObjs = [];
        departments.forEach(element => {
            const obj = {"department": element};
            departmentsObjs.push(obj);
        })
        setDepartmentList(departmentsObjs);
    }, []);


    // if(!course) {
    //     return (
    //     <div id="article">
    //         <img className="article-banner" src={banner} alt={course.name + " banner"}></img>
    //         <div className="article-header">
    //             <ul className="article-path">
    //                 <PathItem name="Courses">
    //                     <PathDropdownMenu
    //                         list={[{ "type": "Courses" }, { "type": "Orgs" }]}
    //                         type={"type"}
    //                         updateSelection={updateSelectedArticleType}
    //                         selectedItem={"Courses"} />
    //                 </PathItem>
    //                 <PathItem name={"Select a department ..."}>
    //                     <PathDropdownMenu
    //                         list={departmentList}
    //                         type={"department"}
    //                         updateSelection={updateSelectedDepartment}
    //                         selectedItem={""} />
    //                 </PathItem>
    //             </ul>
    //         </div>
    //         <h3 className="article-body">Select a Course from the dropdown, search bar or navbar.</h3>
    //     </div>
    //     )
    // }

    //TODO: make the banner/header its own component
    return (
        <div id="article">
            <img className="article-banner" src={banner} alt={course.name + " banner"}></img>
            <div className="article-header">
                <ul className="article-path">
                    <PathItem name="Courses">
                        <PathDropdownMenu
                            list={[{ "type": "Courses" }, { "type": "Orgs" }]}
                            type={"type"}
                            updateSelection={updateSelectedArticleType}
                            selectedItem={"Courses"} />
                    </PathItem>
                    <PathItem name={selectedDepartmentName}>
                        <PathDropdownMenu
                            list={departmentList}
                            type={"department"}
                            updateSelection={updateSelectedDepartment}
                            selectedItem={selectedDepartmentName} />
                    </PathItem>
                    <PathItem name={selectedCourseName}>
                        <PathDropdownMenu
                            list={courseList}
                            type={"name"}
                            updateSelection={updateSelectedCourse}
                            selectedItem={selectedCourseName} />
                    </PathItem>
                    {selectedCourse && <PathItem name={selectedQuarterName}>
                        <PathDropdownMenu
                            list={quarterList}
                            type={"quarter"}
                            updateSelection={updateSelectedQuarter}
                            selectedItem={selectedQuarterName} />
                    </PathItem>}
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


export function BlankCourse() {

    const [departmentList, setDepartmentList] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState()
    const [selectedDepartmentName, setSelectedDepartmentName] = useState("Select a department...")
    const [courseList, setCourseList] = useState([]);
    // /**
    //  * Called when article type is changed
    //  */
    // function updateSelectedArticleType(element) {
    //     if(element.type === "Orgs"){
    //         window.location = `/orgs`
    //     }
    // }

    /**
     * Called when department is changed
     */
    function updateSelectedDepartment(element) {
        setSelectedDepartment(element.department)
        setSelectedDepartmentName(element.department)
    }

    useEffect(() => {
        let departments = [];
        dummyArticles.forEach(element => {
            const department = element["department"];
            if(!departments.includes(department)) {
                departments.push(department);
            }
        });
        let departmentsObjs = [];
        departments.forEach(element => {
            const obj = {"department": element};
            departmentsObjs.push(obj);
        })
        setDepartmentList(departmentsObjs);
    }, []);

    useEffect(() => {
        if(selectedDepartment) {
            setCourseList(dummyArticles.filter(course => course.department===selectedDepartment));
        }
    }, [selectedDepartment]);

    return (
        <div id="article">
            <img className="article-banner" src={banner} alt={"banner"}></img>
            <div className="article-header">
                <ul className="article-path">
                    <PathItem name="Courses">
                        <PathDropdownMenu
                            list={[{ "type": "Courses" }, { "type": "Orgs" }]}
                            type={"type"}
                            updateSelection={updateSelectedArticleType}
                            selectedItem={"Courses"} />
                    </PathItem>
                    <PathItem name={selectedDepartmentName}>
                        <PathDropdownMenu
                            list={departmentList}
                            type={"department"}
                            updateSelection={updateSelectedDepartment}
                            selectedItem={selectedDepartment} />
                    </PathItem>
                    {selectedDepartment && <PathItem name={"Select a course ..."}>
                        <PathDropdownMenu
                            list={courseList}
                            type={"name"}
                            updateSelection={updateSelectedCourse}
                            selectedItem={""} />
                    </PathItem>}
                </ul>
            </div>
            <h3 className="article-body">Select a department and a course from the dropdown, search bar or navbar.</h3>
        </div>
    );
}
