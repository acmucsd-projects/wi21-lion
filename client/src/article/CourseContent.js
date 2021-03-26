
function CourseContent(props) {

    const { course } = props;

    return (
        <div>
            <h1 className="article-body">{course.name}</h1>
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
