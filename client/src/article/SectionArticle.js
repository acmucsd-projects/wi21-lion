import React, { useEffect, useState, useCallback } from 'react';

import './Article.css';

import banner from './icons/ded 1.jpg';
import PathItem from './PathItem';
import PathDropdownMenu from './PathDropdownMenu';

import { useParams } from 'react-router';
import SectionContent from './SectionContent';

const rootBackendURL = "http://localhost:5000"

/**
 * Called when article type is changed
 */
function updateSelectedArticleType(element) {
    if (element.type === "Orgs") {
        window.location = `/orgs`;
    } else {
        window.location = `/courses`;
    }
}


/**
 * General course article template.
 *  
 * @param {*} props 
 */
function SectionArticle() {

    const [course, setCourse] = useState({});
    const [section, setSection] = useState({});
    const params = useParams();

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDepartmentName, setSelectedDepartmentName] = useState("Select a department...");
    const [departmentList, setDepartmentList] = useState([]);

    const [selectedCourseName, setSelectedCourseName] = useState("Select a course...");
    const [courseList, setCourseList] = useState([]);

    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [selectedQuarterName, setSelectedQuarterName] = useState("Select a quarter...");
    const [quarterList, setQuarterList] = useState([]);

    const [selectedSectionName, setSelectedSectionName] = useState("Select a section...");
    const [sectionList, setSectionList] = useState([]);

    const fetchCourseData = useCallback((class_id, department) => {
        fetch(`${rootBackendURL}/class/${class_id}`)
            .then(response => response.json())
            .then(courseData => {
                if (courseData.name === params.courseName) {
                    const newCourse = {
                        "course_id": courseData._id,
                        "name": courseData.name,
                        "description": courseData.description,
                        "image": courseData.image,
                        "department": department.name,
                        "sections": courseData.sections
                    }
                    setCourse(newCourse);
                }
            })
            .catch(error => {
                console.error(error);
            })
    }, [params.courseName])

    const fetchDepartments = useCallback(() => {
        fetch(`${rootBackendURL}/department/`)
            .then(reponse => reponse.json())
            .then(data => {
                setDepartmentList(data.departments);
                data.departments.forEach(department => {
                    department.classes.forEach(element => {
                        fetchCourseData(element, department)
                    })
                })
            }).catch(error => {
                console.error(error);
            });
    }, [fetchCourseData])

    function fetchClassesOfDep(departmentName) {
        fetch(`${rootBackendURL}/department/${departmentName}`)
            .then(response => response.json())
            .then(data => {
                let courses = []
                data.classes.forEach(class_id =>
                    fetch(`${rootBackendURL}/class/${class_id}`)
                        .then(response => response.json())
                        .then(courseData => {
                            courses.push(courseData)
                        })
                );
                setCourseList(courses);
            })
        fetchCurrentSection();
    }

    const fetchSectionsFromCourse = useCallback(() => {
        course.sections.forEach((section => {
            fetch(`${rootBackendURL}/section/${section}`)
                .then(response => response.json())
                .then(data => {
                    let newSections = sectionList;
                    newSections.push(data);
                    formatSectionList();

                    const fullQuarter = {
                        "fullQuarter": `${data.quarter} ${data.year}`
                    }
                    if (!quarterList.includes(fullQuarter)) {
                        let newQuarterList = quarterList;
                        newQuarterList.push(fullQuarter);
                        let i, key, j;
                        for (i = 1; i < newQuarterList.length; i++) {
                            key = newQuarterList[i].fullQuarter;
                            j = i - 1;
                            while (j >= 0 && compareQuarters(newQuarterList[j].fullQuarter, key) === -1) {
                                newQuarterList[j + 1].fullQuarter = newQuarterList[j].fullQuarter;
                                j = j - 1;
                            }
                            newQuarterList[j + 1].fullQuarter = key;
                        }
                        setQuarterList(newQuarterList);
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        }))
    // eslint-disable-next-line
    }, [course])


    function fetchCurrentSection() {
        fetch(`${rootBackendURL}/section/${course.course_id}/${params.year}/${params.quarter}`)
            .then(response => response.json())
            .then(data => {
                data.sections.forEach(tmpSection => {
                    if (tmpSection.section_id === params.sectionLetter) {
                        setSection(tmpSection);
                        setSelectedSectionName(`${tmpSection.professor} ${tmpSection.section_id}`);
                    }
                })
                setSelectedQuarterName(`${params.quarter} ${params.year}`);
                setSectionList(getListOfSections(`${params.quarter} ${params.year}`));
            }
            )
    }


    /**
     * Called when department is changed
     */
    function updateSelectedDepartment(element) {
        setSelectedDepartment(element.name)
        setSelectedDepartmentName(element.name)
    }

    /**
     * Called when a new course is selected. Current URL is updated accordingly 
     * @param {*} element 
     */
    function updateSelectedCourse(element) {
        console.log(element);
        if (selectedDepartment) {
            window.location = `/courses/${selectedDepartment}/${element.name}`;
        } else {
            window.location = `/courses/${course}/${element.name}`;
        }
    }

    /**
     * Update the currently selected quarter 
     * @param {*} element 
     */
    function updateSelectedQuarter(element) {
        const quarter = element.fullQuarter;
        if (quarter) {
            setSelectedQuarter(quarter);
            setSelectedQuarterName(quarter);
        }
    }

    function updateSelectedSection(sectionParam) {
        window.location = `/courses/${course.department}/${course.name}/${sectionParam.quarter}/${sectionParam.year}/${sectionParam.section_id}`;
    }

    const compareQuarters = useCallback((quarter1, quarter2) => {
        const quarter1Arry = quarter1.split(" ");
        const year1 = quarter1Arry[1];
        const quarter2Arry = quarter2.split(" ");
        const year2 = quarter2Arry[1];

        if (year1 > year2) {
            return 1;
        } else if (year1 < year2) {
            return -1;
        }

        const season1 = quarter1Arry[0];
        const season2 = quarter2Arry[0];

        const season1Val = getSeasonVal(season1);
        const season2Val = getSeasonVal(season2);
        if (season1Val > season2Val) {
            return 1;
        } else {
            return -1;
        }
    }, [])

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
     * Retrives the available sections for the current course and a given quarter 
     * @param {string} quarter quarter string used to search for sections
     */
    const getListOfSections = useCallback((quarter) => {
        let sections = [];
        sectionList.forEach(element => {
            const sectionQuarter = `${element.quarter} ${element.year}`
            if (sectionQuarter === quarter) {
                sections.push(element)
            }
        });
        return sections;
    // eslint-disable-next-line
    }, []);

    /**
     * Adds a formatted section key value pair to each section object. This new value is used
     * for each entry in the section selection dropdown
     */
    const formatSectionList = useCallback(() => {
        let formattedSections = [];

        sectionList.forEach(element => {
            element.formattedVersion = `${element.professor} ${element.section_id}`;
            formattedSections.push(element);
        })
        return formattedSections;
    }, [sectionList]);


    useEffect(() => {
        if (course) {
            setSelectedDepartment(course.department);
            setSelectedDepartmentName(course.department);
        }
        if (course.sections) {
            fetchSectionsFromCourse();
        }
    // eslint-disable-next-line
    }, [course]);

    useEffect(() => {
        if (selectedDepartment) {
            fetchClassesOfDep(selectedDepartment);
        }
        if (course && selectedDepartment && selectedDepartment !== course.department) {
            setSelectedCourseName("Select a Course ...");
            setSelectedQuarter(null);
            setSelectedSectionName(null);
        } else {
            setSelectedCourseName(course.name);
        }
    // eslint-disable-next-line
    }, [selectedDepartment, course]);

    useEffect(() => {
        if (selectedQuarterName && selectedQuarter) {
            setSectionList(getListOfSections(selectedQuarterName));
        }
    // eslint-disable-next-line
    }, [selectedQuarterName]);

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);


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
                            type={"name"}
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
                    <PathItem name={selectedQuarterName}>
                        <PathDropdownMenu
                            list={quarterList}
                            type={"fullQuarter"}
                            updateSelection={updateSelectedQuarter}
                            selectedItem={selectedQuarterName} />
                    </PathItem>
                    <PathItem name={selectedSectionName}>
                        <PathDropdownMenu
                            list={sectionList}
                            type={"formattedVersion"}
                            updateSelection={updateSelectedSection}
                            selectedItem={selectedSectionName} />
                    </PathItem>
                </ul>
            </div>
            <SectionContent course={course} section={section} />
        </div>
    );
}

export default SectionArticle