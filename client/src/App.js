import React from 'react';

import home from './homeComponents/home'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Article from './article/Article';
import dummyArticles from './article/dummyArticle.json';
import Section from './article/SectionContent';
import CourseContent from './article/CourseContent';
import SectionContent from './article/SectionContent';

function App() {
    return (
        <div>
            {/* <Navbar></Navbar> */}
            <Router>
                <Switch>
                    <Route exact path='/' component={home} />
                    {dummyArticles.map((course) => (
                        <Route exact
                            path={`/courses/${course.department}/${course.name}`}
                            children={<Article course={course}>
                                <CourseContent course={course}></CourseContent>
                            </Article>}>
                        </Route>
                    ))}

                    {dummyArticles.map((course) => (
                        course.sections.map((section) => (
                            <Route exact
                                path={`/courses/${course.department}/${course.name}/${section.professor}`}
                                children={<Article course={course}>
                                    <SectionContent section={section} course={course}></SectionContent>
                                </Article>}>
                            </Route>
                        ))
                    ))}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
