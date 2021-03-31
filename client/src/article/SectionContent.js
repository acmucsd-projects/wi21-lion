import React, { useCallback, useContext, useEffect, useState } from 'react';
import * as Add2Calendar from "add2calendar"
import 'add2calendar/css/add2calendar.css'

import LinksPanel from './LinksPanel';

import './Article.css';
import { EnrollDialog, LoginDialog } from '../popups/dialogs';
import { EditSection } from './EditArticle';
import { UserContext } from '../contexts/UserContext';


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


const SectionSchedule = ({ course, section }) => {

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

    // const lecture_times = "MWF 10:00AM-11:45AM";

    useEffect(() => {
        if (section && section.lecture_times) {
            setDays(getLectureDays(section.lecture_times));
            setEventPos(getLectureTimes(section.lecture_times));
        }
    }, [section, section.lecture_times])

    return (
        <div className="schedule-container section-schedule">
            <TimeSchedule />
            <SectionScheduleDay showEvent={days.monday} pos={eventPos} course={course} section={section}>Monday</SectionScheduleDay>
            <SectionScheduleDay showEvent={days.tuesday} pos={eventPos} course={course} section={section}>Tuesday</SectionScheduleDay>
            <SectionScheduleDay showEvent={days.wednesday} pos={eventPos} course={course} section={section}>Wednesday</SectionScheduleDay>
            <SectionScheduleDay showEvent={days.thursday} pos={eventPos} course={course} section={section}>Thursday</SectionScheduleDay>
            <SectionScheduleDay showEvent={days.friday} pos={eventPos} course={course} section={section}>Friday</SectionScheduleDay>
        </div>
    );
}

const AddToCalendarDialog = ({ pos, course, section, day }) => {
    // get next day of the week
    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + (day + 7 - nextDate.getDay()) % 7);
    var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const startTime = section.lecture_times.split(" ")[1].split("-")[0];
    const endTime = section.lecture_times.split(" ")[1].split("-")[1];
    let startTimeString = "";
    if (startTime.length === 7) {
        startTimeString = `${months[nextDate.getMonth()]} ${nextDate.getDate()}, ${nextDate.getFullYear()} ${startTime.substring(0, 5)} ${startTime.substring(5, 8)}`;
    } else {
        startTimeString = `${months[nextDate.getMonth()]} ${nextDate.getDate()}, ${nextDate.getFullYear()} ${startTime.substring(0, 4)} ${startTime.substring(4, 7)}`;
    }
    let endTimeString = "";
    if (endTime.length === 7) {
        endTimeString = `${months[nextDate.getMonth()]} ${nextDate.getDate()}, ${nextDate.getFullYear()} ${endTime.substring(0, 5)} ${endTime.substring(5, 8)}`;
    } else {
        endTimeString = `${months[nextDate.getMonth()]} ${nextDate.getDate()}, ${nextDate.getFullYear()} ${endTime.substring(0, 4)} ${endTime.substring(4, 7)}`;
    }
    var singleEventArgs = {
        title: `${course.name} Lecture`,
        start: startTimeString,
        end: endTimeString,
        location: 'UCSD',
        description: `${course.name} - ${section.quarter} ${section.year} - ${section.professor}`,
        isAllDay: false,
    };

    var singleEvent = new Add2Calendar(singleEventArgs);

    const googleUrl = singleEvent.getGoogleUrl();
    const iCalUrl = singleEvent.getICalUrl();
    // const outlookUrl = singleEvent.getOutlookUrl(); 
    // const yahooUrl = singleEvent.getYahooUrl(); 

    return (
        <div className="add-to-calendar-dialog" style={{ top: pos }}>
            Add To:
            <a href={googleUrl}>Google Calendar</a>
            <a href={iCalUrl}>Apple Calendar</a>
        </div>
    )
}

const SectionScheduleDay = (props) => {

    const { showEvent, pos, course, section } = props
    const [displayAddToCalendar, setDisplayAddToCalendar] = useState(false);

    function toggleAddToCalendar() {
        setDisplayAddToCalendar(!displayAddToCalendar);
    }


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
        <div style={{ textAlign: 'center', position: 'relative' }}>
            {props.children}
            <div style={{ backgroundColor: today === day ? '#ade6e6' : 'white' }} className="schedule-wrapper">
                {showEvent && <div style={{ top: pos.top, height: pos.height }} className="schedule-event" onClick={toggleAddToCalendar}>{course.name} Lecture</div>}
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
            <div onClick={toggleAddToCalendar}>
                {displayAddToCalendar && <AddToCalendarDialog pos={pos.top} course={course} section={section} day={day} />}
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
    const { section, course, fetchSectionData } = props;
    const [displayEnrollDialog, setDisplayEnrollDialog] = useState(false);
    const [displayEditSection, setDisplayEditSection] = useState(false);
    const [displayLoginPrompt, setDisplayLoginPrompt] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const { user } = useContext(UserContext);

    function showEnrollDialog() {
        setDisplayEnrollDialog(true);
    }

    function hideEnrollDialog() {
        setDisplayEnrollDialog(false);
    }

    function showEditSection() {
        setDisplayEditSection(true);
    }

    function hideEditSection() {
        setDisplayEditSection(false);
    }

    function showLogin() {
        setDisplayLoginPrompt(true);
    }

    function hideLogin() {
        setDisplayLoginPrompt(false);
    }

    function handleClickOff(event) {
        if (event.target.className === "edit-backdrop") {
            setDisplayEditSection(false);
        }
    }

    const updateIsEnrolled = useCallback(() => {
        if (user.enrolled_sections) {
            user.enrolled_sections.forEach(element => {
                fetch(`http://localhost:5000/enrolled_section/${element}`, {
                    headers: {
                        'auth_token': user.token
                    }
                })
                    .then(response => response.json())
                    .then(enrolled_section => {
                        fetch(`http://localhost:5000/section/${enrolled_section.section_id}`)
                            .then(response => response.json())
                            .then(sectionData => {
                                if (sectionData._id === section._id) {
                                    setIsEnrolled(true);
                                }
                            })
                    })
            });
        }

    }, [section._id, user.enrolled_sections, user.token])


    useEffect(() => {
        updateIsEnrolled();
    }, [user, updateIsEnrolled])


    return (
        <div>
            <div className="section-content-header article-body">
                <h1>{course.name}: {section.professor}</h1>
                {user && user.token && <button className="edit-button" onClick={showEditSection}>
                    <span>Edit</span>
                </button>}
                {(!user || !user.token) && <h3 onClick={showLogin} className="enroll-button">Login to Edit</h3>}
            </div>
            <div id="section-content">
                <div id="top-section-content">
                    <div>
                        <div id="section-info">
                            <h3>Section: <span>{section.section_id}</span></h3>
                            <h3>Instructor: <span>{section.professor}</span></h3>
                            <h3>Lecture: <span>{section.lecture_times}</span></h3>
                        </div>
                        <p className="section-description">
                            {section.description}
                        </p>
                    </div>
                    <div>
                        {user && user.token && !isEnrolled && <button className="enroll-button" onClick={showEnrollDialog}>
                            <span>Enroll</span>
                        </button>}
                        {user && user.token && isEnrolled && <h3 className="enrolled">
                            {"\u2705"} Enrolled </h3>
                        }
                        {(!user || !user.token) && <h3 onClick={showLogin} className="enroll-button">Login to Enroll</h3>}
                        <LinksPanel section={section} />
                    </div>
                </div>
                <h2 className="section-schedule">Schedule:</h2>
                <SectionSchedule course={course} section={section} />
            </div>
            <div className="enroll-dialog-wrapper">
                {displayEnrollDialog && <EnrollDialog show={showEnrollDialog} hide={hideEnrollDialog} section={section} updateIsEnrolled={updateIsEnrolled} />}
            </div>
            {displayEditSection &&
                <div className="edit-backdrop" onClick={handleClickOff}>
                    <div className="edit-section-wrapper">
                        <EditSection course={course} section={section} closeSectionEdit={hideEditSection} fetchSectionData={fetchSectionData} />
                    </div>
                </div>}
            <div className="login-wrapper">
                {displayLoginPrompt && <LoginDialog show={showLogin} hide={hideLogin} />}
            </div>
        </div>
    );
}

export default SectionContent