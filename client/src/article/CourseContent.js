import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { LoginDialog } from "../popups/dialogs";
import { EditCourse } from "./EditArticle";

function CourseContent(props) {

    const { course, fetchCourseData } = props;
    const [displayEditCourse, setDisplayEditCourse] = useState(false);
    const [displayLoginPrompt, setDisplayLoginPrompt] = useState(false);

    const { user } = useContext(UserContext);

    function showLogin() {
        setDisplayLoginPrompt(true);
    }

    function hideLogin() {
        setDisplayLoginPrompt(false);
    }

    function showEditCourse() {
        setDisplayEditCourse(true);
    }

    function hideEditCourse() {
        setDisplayEditCourse(false);
    }

    function handleClickOff(event) {
        if (event.target.className === "edit-backdrop") {
            hideEditCourse();
        }
    }


    return (
        <div>
            <div className="section-content-header article-body">
                <h1>{course.name}</h1>
                {user && user.token && <button className="edit-button" onClick={showEditCourse}>
                    <span>Edit</span>
                </button>}
                {(!user || !user.token) && <button onClick={showLogin} className="edit-button">Login to Edit</button>}
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
            <div className="login-wrapper">
                {displayLoginPrompt && <LoginDialog show={showLogin} hide={hideLogin} />}
            </div>
        </div>
    )
}

export default CourseContent