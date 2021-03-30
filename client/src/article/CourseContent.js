
function CourseContent(props) {

    const { course } = props;

    return (
        <div>
            <div className="section-content-header article-body">
            <h1>{course.name}</h1>
            <button className="edit-button">
                <span>Edit</span>
            </button>
            </div>
            <div className="article-inner-body">
                <p className="long-description">
                    {course.description}
                </p>
                <img className="course-img" src={course.image} alt={course.name}></img>
            </div>
        </div>
    )
}

export default CourseContent
