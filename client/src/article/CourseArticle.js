import React, { useEffect, useState, useCallback } from 'react';

import './Article.css';

import banner from './icons/ded 1.jpg';
import PathItem from './PathItem';
import PathDropdownMenu from './PathDropdownMenu';

import { useParams } from 'react-router';
import CourseContent from './CourseContent';

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

function compareCourses(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

/**
 * General course article template.
 *  
 * @param {*} props 
 */
function CourseArticle() {

    const [course, setCourse] = useState({});
    const params = useParams();

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDepartmentName, setSelectedDepartmentName] = useState("Select a department...");
    const [departmentList, setDepartmentList] = useState([]);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedCourseName, setSelectedCourseName] = useState("Select a course...");
    const [courseList, setCourseList] = useState([]);

    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [selectedQuarterName, setSelectedQuarterName] = useState("Select a quarter...");
    const [quarterList, setQuarterList] = useState([]);

    const [selectedSectionName, setSelectedSectionName] = useState("Select a section...");
    const [sectionList, setSectionList] = useState([]);
    const [totalSectionList, setTotalSectionList] = useState([]);

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
    }

    const fetchSectionsFromCourse = useCallback(() => {
        let sections = [];
        course.sections.forEach((section => {
            fetch(`${rootBackendURL}/section/${section}`)
                .then(response => response.json())
                .then(data => {
                    let newSections = sectionList;
                    newSections.push(data);
                    sections.push(data);
                    setSectionList(newSections);
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
        setTotalSectionList(sections);
        // eslint-disable-next-line
    }, [course])


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
        console.log(totalSectionList);
        totalSectionList.forEach(element => {
            const sectionQuarter = `${element.quarter} ${element.year}`
            if (sectionQuarter === quarter) {
                sections.push(element)
            }
        });
        return sections;
    }, [totalSectionList]);



    useEffect(() => {
        if (course) {
            setSelectedDepartment(course.department);
            setSelectedDepartmentName(course.department);
            setSelectedCourse(course);
            setSelectedCourseName(course.name);
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
        console.log(selectedQuarterName);
        console.log(selectedQuarter);
        if (selectedQuarterName && selectedQuarter) {
            setSectionList(getListOfSections(selectedQuarterName));
        }
        // eslint-disable-next-line
    }, [selectedQuarterName]);

    useEffect(() => {
        if(courseList) {
            courseList.sort(compareCourses);
        }
    }, [courseList])

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
                    {selectedCourse && <PathItem name={selectedQuarterName}>
                        <PathDropdownMenu
                            list={quarterList}
                            type={"fullQuarter"}
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
            <CourseContent course={course} fetchCourseData={() => fetchDepartments()}/>
        </div>
    );
}

export default CourseArticle


export function BlankCourse() {

    const [departmentList, setDepartmentList] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState()
    const [selectedDepartmentName, setSelectedDepartmentName] = useState("Select a department...")
    const [courseList, setCourseList] = useState([]);

    function fetchDepartments() {
        fetch(`${rootBackendURL}/department/`)
            .then(reponse => reponse.json())
            .then(data => {
                setDepartmentList(data.departments);
            }).catch(error => {
                console.error(error);
            });
    }

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
                let j;
                for (let i = 0; i < courses.length; i++) {
                    const element = courses[i].name;

                    while (j >= 0 && courses[j].name > element) {
                        courses[j + 1] = courses[j];
                        j = j - 1;
                    }
                    courses[j + 1] = element;
                }
                setCourseList(courses);
            })
    }

    /**
     * Called when department is changed
     */
    function updateSelectedDepartment(element) {
        setSelectedDepartment(element.name);
        setSelectedDepartmentName(element.name);
    }

    /**
     * Called when a new course is selected. Current URL is updated accordingly 
     * @param {*} element 
     */
    function updateSelectedCourse(element) {
        window.location = `/courses/${element.department}/${element.name}`;
    }
    useEffect(() => {
        fetchDepartments();
    }, []);

    useEffect(() => {
        if (selectedDepartment) {
            fetchClassesOfDep(selectedDepartment);
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
                            type={"name"}
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
