import React, { useEffect, useState } from 'react';

import LinksPanel from './LinksPanel';

import './Article.css';


function getLectureDays(lecture_times) {
    const days = lecture_times.split(" ")[0];
    let lectureTimeData = {
        "monday": false,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false
    };
    if (days.includes("M")) {
        lectureTimeData.monday = true;
    }
    if (days.includes("Tu")) {
        lectureTimeData.tuesday = true;
    }
    if (days.includes("W")) {
        lectureTimeData.wednesday = true;
    }
    if (days.includes("Th")) {
        lectureTimeData.thursday = true;
    }
    if (days.includes("F")) {
        lectureTimeData.friday = true;
    }
    return lectureTimeData;
}

function getLectureTimes(lecture_times) {
    const times = lecture_times.split(" ")[1];
    const firstTime = times.split("-")[0];
    const isPM = firstTime.includes("PM");
    const secondTime = times.split("-")[1];
    const firstHour = firstTime.split(":")[0];
    const firstMin = firstTime.split(":")[1].substring(0, 2);
    const secondHour = secondTime.split(":")[0];
    const secondMin = secondTime.split(":")[1].substring(0, 2);

    let startPos = (firstHour * 50) + (firstMin * 55 / 60);
    const endPos = (secondHour * 50) + (secondMin * 55 / 60);

    if (isPM) {
        startPos += 50 * 13;
    }
    if (firstHour === "12") {
        startPos = 0;
    }

    return {
        top: startPos,
        height: (endPos - startPos)
    }
}


const SectionSchedule = ({ course }) => {

    const [days, setDays] = useState({
        "monday": false,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false
    });
    const [eventPos, setEventPos] = useState({
        top: "0px",
        height: "0px"
    });

    const lecture_times = "MWF 10:00AM-11:45AM";
    useEffect(() => {
        setDays(getLectureDays(lecture_times));
        setEventPos(getLectureTimes(lecture_times));
    }, [])


    return (
        <div className="schedule-container section-schedule">
            <TimeSchedule />
            <SectionScheduleDay showEvent={days.monday} pos={eventPos} course={course}>Monday</SectionScheduleDay>
            <SectionScheduleDay showEvent={days.tuesday} pos={eventPos} course={course}>Tuesday</SectionScheduleDay>
            <SectionScheduleDay showEvent={days.wednesday} pos={eventPos} course={course}>Wednesday</SectionScheduleDay>
            <SectionScheduleDay showEvent={days.thursday} pos={eventPos} course={course}>Thursday</SectionScheduleDay>
            <SectionScheduleDay showEvent={days.friday} pos={eventPos} course={course}>Friday</SectionScheduleDay>
        </div>
    );
}

const SectionScheduleDay = (props) => {

    const { showEvent, pos, course } = props

    const today = new Date().getDay();
    let day = 0;
    switch (props.children) {
        case "Monday":
            day = 1;
            break;
        case "Tuesday":
            day = 2;
            break;
        case "Wednesday":
            day = 3;
            break;
        case "Thursday":
            day = 4;
            break;
        case "Friday":
            day = 5;
            break;
        default:
            break;
    }
    return (
        <div style={{ textAlign: 'center' }}>
            {props.children}
            <div style={{ backgroundColor: today === day ? '#ade6e6' : 'white' }} className="schedule-wrapper">
                {showEvent && <div style={{ top: pos.top, height: pos.height }} className="schedule-event">{course.name} Lecture</div>}
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

const TimeSchedule = () => {

    return (
        <div style={{ textAlign: 'center' }}>
            Hour
            <div className="schedule-wrapper">
                <div>12:00 AM</div>
                <div>1:00 AM</div>
                <div>2:00 AM</div>
                <div>3:00 AM</div>
                <div>4:00 AM</div>
                <div>5:00 AM</div>
                <div>6:00 AM</div>
                <div>7:00 AM</div>
                <div>8:00 AM</div>
                <div>9:00 AM</div>
                <div>10:00 AM</div>
                <div>11:00 AM</div>
                <div>12:00 PM</div>
                <div>1:00 PM</div>
                <div>2:00 PM</div>
                <div>3:00 PM</div>
                <div>4:00 PM</div>
                <div>5:00 PM</div>
                <div>6:00 PM</div>
                <div>7:00 PM</div>
                <div>8:00 PM</div>
                <div>9:00 PM</div>
                <div>10:00 PM</div>
                <div>11:00 PM</div>
            </div>
        </div>
    );
}

/**
 * React component for each courses' sections 
 * @param {*} props 
 */
function SectionContent(props) {
    const { section, course } = props;
    return (
        <div>
            <h1 className="article-body">{course.name}: {section.professor} {section.letter}</h1>
            <div id="section-content">
                <div id="top-section-content">
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
                    </div>
                    <LinksPanel section={section} />
                </div>
                <h2 className="section-schedule">Schedule:</h2>
                <SectionSchedule course={course} />
            </div>
        </div>
    );
}

export default SectionContent