import { useState } from "react";
import { EditCourse } from "./EditArticle";

function CourseContent(props) {

    const { course, fetchCourseData } = props;
    const [displayEditCourse, setDisplayEditCourse] = useState(false);

    function showEditCourse() {
        setDisplayEditCourse(true);
    }

    function hideEditCourse() {
        setDisplayEditCourse(false);
    }

    function handleClickOff(event) {
        if(event.target.className === "edit-backdrop") {
            hideEditCourse();
        }
    }

    // const context = useContext(UserContext);
    // console.log(context);


    return (
        <div>
            <div className="section-content-header article-body">
            <h1>{course.name}</h1>
            <button className="edit-button" onClick={showEditCourse}>
                <span>Edit</span>
            </button>
            </div>
            <div className="article-inner-body">
                <p className="long-description">
                    {course.description}
                </p>
                <img className="course-img" src={course.image} alt={course.name}></img>
            </div>
            {displayEditCourse && <div className="edit-backdrop" onClick={handleClickOff}>
                <div className="edit-section-wrapper" >
                <EditCourse course={course} closeCourseEdit={hideEditCourse} fetchCourseData={fetchCourseData} />
            </div>
            </div>}
        </div>
    )
}

export default CourseContent
