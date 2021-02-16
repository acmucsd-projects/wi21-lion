
//course name and short description
//course long description
//class times
//gradescope canvas links?
//discord
//other links with name: and link:
//resources section
//google calendar thing

import React from 'react';

import './Article.css';

import banner from './ded 1.jpg';

function Article(props) {

    const { course }= props;

    const testPath = "Classes/CSE/CSE11/Dropdown(Gary)"

    return (
        <div>
            <div>
                <img className="article-banner" src={banner} alt={course.name+" banner"}></img>
                <div className="article-header">
                    {/* <div className="article-path"> */}
                        <ul className="article-path">
                            <li className="path-item">Classes</li>
                            <li className="path-item">CSE</li>
                            <li className="path-item">CSE11</li>
                        </ul>
                        
                    {/* </div> */}
                </div>
            </div>
            <div className="article-body">
                <h1>{course.name+": "+course.shortDescription}</h1>
                <p className="long-description">
                    {course.longDescription}
                </p>
            </div>
        </div>
    )
}

export default Article
