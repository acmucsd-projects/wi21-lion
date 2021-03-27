import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css'

import LinksPanel from './LinksPanel';

import './Article.css';
import { EnrollDialog } from '../popups/dialogs';

const localizer = momentLocalizer(moment)


/**
 * React component for each courses' sections 
 * @param {*} props 
 */
function SectionContent(props) {
    const { section, course } = props;
    const [displayEnrollDialog, setDisplayEnrollDialog] = useState(false);
    const [user, setUser] = useState(
        localStorage.getItem('currentSession')
    )
    let sectionEvents = [];
    let initWeek = 2;
    for (let index = initWeek; index < initWeek + 10; index++) {
        sectionEvents.push({
            start: moment(`08:00 AM Mon ${index}`, "hh:mm A ddd w").toDate(),
            end: moment(`09:00 AM Mon ${index}`, "hh:mm A ddd w").toDate(),
            title: "Lecture"
        })
    }

    function showEnrollDialog() {
        setDisplayEnrollDialog(true);
    }

    function hideEnrollDialog() {
        setDisplayEnrollDialog(false);
    }

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('currentSession'));
        if (user) {
            // let JWTtoken = user.token;
            // console.log(JWTtoken);
            setUser(user);
        }
    }, [])

    return (
        <div>
            <div className="section-content-header article-body">
                <h1>{course.name}: {section.professor}</h1>
                <button className="edit-button">
                    <span>Edit</span>
                </button>
            </div>
            <div id="section-content">
                <div>
                    <div id="section-info">
                        <h3>Section: <span>{section.section_id}</span></h3>
                        <h3>Instructor: <span>{section.professor}</span></h3>
                        <h3>Lecture: <span>{section.lecture_times}</span></h3>
                    </div>
                    <p className="section-description">
                        {section.description}
                    </p>
                    <h3 className="section-schedule">Schedule:</h3>
                    <div className="section-calendar">
                        <Calendar
                            localizer={localizer}
                            events={sectionEvents}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            view="week"
                            defaultView="week"
                            views={['week']}
                        />
                    </div>
                </div>
                <div>
                    {user && <button className="enroll-button" onClick={showEnrollDialog}>
                        <span>Enroll</span>
                    </button>}
                    <LinksPanel section={section} />
                </div>
            </div>
            <div className="enroll-dialog-wrapper">
                {displayEnrollDialog && <EnrollDialog show={showEnrollDialog} hide={hideEnrollDialog} section={section} />}
            </div>
        </div>
    );
}

export default SectionContent