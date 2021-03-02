import React from 'react'

function CourseContent(props) {

    const { course } = props;

    return (
        <div>
            <h1 className="article-body">{course.name + ": " + course.shortDescription}</h1>
            <div className="article-body">
                <p className="long-description">
                    {course.longDescription}
                </p>
            </div>
        </div>
    )
}

export default CourseContent
