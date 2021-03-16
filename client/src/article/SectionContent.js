import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css'

import LinksPanel from './LinksPanel';

import './Article.css';

const localizer = momentLocalizer(moment)

let sectionEvents = [{
    start: moment("08:00 AM 2021-02-24", "hh:mm A YYYY-MM-DD").toDate(),
    end: moment("09:00 AM 2021-02-24", "hh:mm A YYYY-MM-DD").toDate(),
    title: "Lecture"
}];

/**
 * React component for each courses' sections 
 * @param {*} props 
 */
function SectionContent(props) {
    const { section, course } = props;
    return (
        <div>
            <h1 className="article-body">{course.name}: {section.professor} {section.letter}</h1>
            <div id="section-content" >
                <div>
                    <div id="section-info">
                        <h3>Section: <span>{section.letter}</span></h3>
                        <h3>Instructor: <span>{section.professor}</span></h3>
                        <h3>Lecture: <span>{`${section.lectureDays} ${section.lectureTime}`}</span></h3>
                    </div>
                    <button className="enroll-button">
                        <span>Enroll</span>
                    </button>
                    <p className="section-description">
                        CSE11 UCSD Cao science computer Cao section Objectorientedlanguage Cao CSE11 Miranda Objectorientedlanguage. Cao Gary Winter Fall Cao 2021 CSE11 discussion section. Winter Miranda Cao Java Cao 2021 Gary Cao Java Miranda Cao Miranda discussion. Cao 2020 CSE11 UCSD Cao Gary UCSD. Fall 2021 2020 UCSD section computer Cao section Fall Cao CSE11 computer 2020 2021?
                </p>
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
                <LinksPanel section={section} />
            </div>
        </div>
    );
}

export default SectionContent