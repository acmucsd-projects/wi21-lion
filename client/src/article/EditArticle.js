import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext';

const rootBackendURL = "http://localhost:5000"

export const EditSection = ({ course, section, closeSectionEdit, fetchSectionData }) => {

    const [sectionIdVal, setSectionIdVal] = useState(section.section_id);
    const [instructorVal, setInstructorVal] = useState(section.professor);
    const [descriptionVal, setDescriptionVal] = useState(section.description);
    const [websiteVal, setWebsiteVal] = useState(section.website);
    const [canvasVal, setCanvasVal] = useState(section.canvas);
    const [discordVal, setDiscordVal] = useState(section.discord);
    const lecture_times = section.lecture_times;
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
    const [dayVals, setDayVals] = useState(lectureTimeData);
    let startSplit = 5;
    let endSplit = 5;
    if (lecture_times.split(" ")[1].split("-")[0].length === 6) {
        startSplit = 4;
    }
    if (lecture_times.split(" ")[1].split("-")[1].length === 6) {
        endSplit = 4;
    }
    const startTime = lecture_times.split(" ")[1].split("-")[0].substring(0, startSplit);
    let startTimeHr = startTime.split(":")[0];
    if (startTimeHr.length === 1) {
        startTimeHr = "0" + startTimeHr;
    }
    const startTimeMin = startTime.split(":")[1];
    const startTimePM = lecture_times.split(" ")[1].split("-")[0].substring(startSplit, startTime.length) === "PM";
    if (startTimePM) {
        startTimeHr += 12;
    }
    const endTime = lecture_times.split(" ")[1].split("-")[1].substring(0, endSplit);
    let endTimeHr = endTime.split(":")[0];
    if (endTimeHr.length === 1) {
        endTimeHr = "0" + endTimeHr;
    }
    const endTimeMin = endTime.split(":")[1];
    const endTimePM = lecture_times.split(" ")[1].split("-")[1].substring(endSplit, endTime.length) === "PM";
    if (endTimePM) {
        endTimeHr += 12;
    }
    const [startTimeVal, setStartTimeVal] = useState(`${startTimeHr}:${startTimeMin}`);
    const [endTimeVal, setEndTimeVal] = useState(`${endTimeHr}:${endTimeMin}`);

    const updateSectionId = event => {
        setSectionIdVal(event.target.value);
    }

    const updateInstructor = event => {
        setInstructorVal(event.target.value);
    }

    const updateDescription = event => {
        setDescriptionVal(event.target.value);
    }

    const updateWebsite = event => {
        setWebsiteVal(event.target.value);
    }

    const updateCanvas = event => {
        setCanvasVal(event.target.value);
    }

    const updateDiscord = event => {
        setDiscordVal(event.target.value);
    }

    const updateStartTime = event => {
        setStartTimeVal(event.target.value);
    }

    const updateEndTime = event => {
        setEndTimeVal(event.target.value);
    }

    const updateMonday = event => {
        let newJson = dayVals;
        newJson.monday = !newJson.monday;
        setDayVals(newJson);
        document.getElementById("monday").checked = newJson.monday;
    }

    const updateTuesday = event => {
        let newJson = dayVals;
        newJson.tuesday = !newJson.tuesday;
        setDayVals(newJson);
        document.getElementById("tuesday").checked = newJson.tuesday;
    }

    const updateWednesday = event => {
        let newJson = dayVals;
        newJson.wednesday = !newJson.tuesday;
        setDayVals(newJson);
        document.getElementById("wednesday").checked = newJson.wednesday;
    }

    const updateThursday = event => {
        let newJson = dayVals;
        newJson.thursday = !newJson.thursday;
        setDayVals(newJson);
        document.getElementById("thursday").checked = newJson.thursday;
    }

    const updateFriday = event => {
        let newJson = dayVals;
        newJson.friday = !newJson.friday;
        setDayVals(newJson);
        document.getElementById("friday").checked = newJson.friday;
    }

    const resetVals = () => {
        setSectionIdVal(section.section_id);
        setInstructorVal(section.professor);
        setDescriptionVal(section.description);
        setWebsiteVal(section.website);
        setCanvasVal(section.canvas);
        setDiscordVal(section.discord);
        setDayVals(lectureTimeData);
        setStartTimeVal(`${startTimeHr}:${startTimeMin}`);
        setEndTimeVal(`${endTimeHr}:${endTimeMin}`);
    }

    const saveSectionData = () => {
        let user = JSON.parse(localStorage.getItem('currentSession'));
        let JWTtoken = user.token;
        if (!JWTtoken) {
            alert("not logged in");
            return;
        }
        let newStartTime = document.getElementById("startTime").value;
        let newEndTime = document.getElementById("endTime").value;
        let lecture_times = "";
        if (dayVals.monday) {
            lecture_times += "M";
        }
        if (dayVals.tuesday) {
            lecture_times += "Tu";
        }
        if (dayVals.wednesday) {
            lecture_times += "W";
        }
        if (dayVals.thursday) {
            lecture_times += "Th";
        }
        if (dayVals.friday) {
            lecture_times += "F";
        }
        let newStartTimeHr = newStartTime.split(":")[0];
        let newStartTimeMin = newStartTime.split(":")[1];
        lecture_times += " ";
        lecture_times += newStartTimeHr % 12;
        lecture_times += ":";
        lecture_times += newStartTimeMin;
        if (newStartTimeHr > 12 && newStartTimeHr !== 0) {
            lecture_times += "PM";
        } else {
            lecture_times += "AM";
        }
        let newEndTimeHr = newEndTime.split(":")[0];
        let newEndTimeMin = newEndTime.split(":")[1];
        lecture_times += "-"
        lecture_times += newEndTimeHr % 12;
        lecture_times += ":";
        lecture_times += newEndTimeMin;
        if (newEndTimeHr > 12 && newStartTimeHr !== 0) {
            lecture_times += "PM";
        } else {
            lecture_times += "AM";
        }


        fetch(`${rootBackendURL}/department/${course.department}`)
            .then(response => response.json())
            .then(data => {
                data.classes.forEach(tmpCourseId => {
                    fetch(`${rootBackendURL}/class/${tmpCourseId}`)
                        .then(repsonse => repsonse.json())
                        .then(tmpCourse => {
                            if (course.name === tmpCourse.name) {
                                tmpCourse.sections.forEach(tmpSectionId => {
                                    fetch(`${rootBackendURL}/section/${tmpSectionId}`)
                                        .then(response => response.json())
                                        .then(tmpSection => {
                                            if (section.quarter === tmpSection.quarter &&
                                                section.year === tmpSection.year &&
                                                section.section_id === tmpSection.section_id) {
                                                fetch(`${rootBackendURL}/section/${tmpSectionId}`, {
                                                    method: "PATCH",
                                                    headers: {
                                                        'auth_token': JWTtoken,
                                                        'content-type': 'application/json'
                                                    },
                                                    body: JSON.stringify({
                                                        "section_id": sectionIdVal,
                                                        "professor": instructorVal,
                                                        "description": descriptionVal,
                                                        "website": websiteVal,
                                                        "canvas": canvasVal,
                                                        "discord": discordVal,
                                                        "lecture_times": lecture_times
                                                    })
                                                }).then(response => response.json())
                                                    .then(() => {
                                                        closeSectionEdit();
                                                        fetchSectionData();
                                                    })
                                                    .catch(error => {
                                                        alert("Error with updating section");
                                                        console.error(error);
                                                        console.log(error);
                                                    })
                                            }
                                        })
                                })
                            }
                        }
                        )
                }
                )
            })
    }

    return (
        <div class="spacing" style={{ margin: "1% 5%", paddingTop: "0", fontFamily: "Montserrat, sans-serif", fontWeight: "600", style: "normal" }}>
            <h2>{`Edit ${course.name} - Section ${section.section_id}`}</h2>
            <div id="buttonsDiv">
                {/* <button style={{ backgroundColor: "transparent", border: "none" }}>
                        Back<i class='fas fa-arrow-left'></i>
                    </button> */}
                <button onClick={resetVals} style={{ backgroundColor: "#414141", float: "right", color: "#FFFFFF", border: "none", borderRadius: "10px" }}>
                    Reset Fields
                </button>
            </div>
            <div id="formDiv" class="spacing">
                <form style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                    {/* <label class="spacing">
                            Department
                        <select class="textbox">
                                <option>Class</option>
                                <option>Club Sport</option>
                                <option>NCAA Sport</option>
                                <option>Academic Org</option>
                                <option>Social Org</option>
                            </select>
                        </label> */}

                    <label id="largetextbox" class="spacing">Instructor</label>
                    <input id="professorInput" class="textbox" value={instructorVal} onInput={updateInstructor} style={{ type: "text" }}></input>
                    <label id="largetextbox" class="spacing" >Section ID</label>
                    <input id="sectionIdInput" class="textbox" value={sectionIdVal} onInput={updateSectionId} style={{ type: "text" }}></input>
                    <p style={{ padding: '2% 0 2% 0' }}>Select Lecture Times</p>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <div>
                            <div>
                                <input type="checkbox" id="monday" name="monday" checked={dayVals.monday} value={dayVals.monday ? "checked" : ""} onInput={updateMonday} />
                                <label for="monday">Monday</label>
                            </div>
                            <div>
                                <input type="checkbox" id="tuesday" name="tuesday" checked={dayVals.tuesday} value={dayVals.tuesday ? "checked" : ""} onInput={updateTuesday} />
                                <label for="tuesday">Tuesday</label>
                            </div>
                            <div>
                                <input type="checkbox" id="wednesday" name="wednesday" checked={dayVals.wednesday} value={dayVals.wednesday ? "checked" : ""} onInput={updateWednesday} />
                                <label for="wednesday">Wednesday</label>
                            </div>
                            <div>
                                <input type="checkbox" id="thursday" name="thursday" checked={dayVals.thursday} value={dayVals.thursday ? "checked" : ""} onInput={updateThursday} />
                                <label for="thursday">Thursday</label>
                            </div>
                            <div>
                                <input type="checkbox" id="friday" name="friday" checked={dayVals.friday} value={dayVals.friday ? "checked" : ""} onInput={updateFriday} />
                                <label for="friday">Friday</label>
                            </div>
                        </div>
                        <div>
                            <label class="spacing">
                                Start Time
                        </label>
                            <input type="time" id="startTime" name="startTime" value={startTimeVal} onInput={updateStartTime}></input>
                        </div>
                        <div>
                            <label class="spacing">
                                End Time
                        </label>
                            <input type="time" id="endTime" name="endTime" value={endTimeVal} onInput={updateEndTime}></input>
                        </div>
                    </div>

                    <label id="largetextbox" class="spacing">Website</label>
                    <input id="websiteInput" class="textbox" value={websiteVal} onInput={updateWebsite} style={{ type: "text" }}></input>
                    <label id="largetextbox" class="spacing">Discord</label>
                    <input id="discordInput" class="textbox" value={discordVal} onInput={updateDiscord} style={{ type: "text" }}></input>
                    <label id="largetextbox" class="spacing">Canvas</label>
                    <input id="canvasInput" class="textbox" value={canvasVal} onInput={updateCanvas} style={{ type: "text" }}></input>

                    <label class="spacing">Description</label>
                    <textarea id="contentInput" class="textbox" value={descriptionVal} onInput={updateDescription} style={{ height: "392px", resize: 'none' }} />

                    {/* <label class="spacing">Images</label>
                        <textarea placeholder="" id="imagesInput" class="textbox" style={{ height: "156px" }} /> */}
                </form>

                <div class="spacing" style={{ float: "right" }}>
                    {/* <button class="saveforlater-button" style={{ backgroundColor: "#42F3E9", margin: "0px 20px", color: "#FFFFFF", border: "none", borderRadius: "10px" }}>
                            Save For Later
                    </button> */}
                    <button class="publish-button" style={{ backgroundColor: "#00F16F", color: "#FFFFFF", border: "none", borderRadius: "10px" }} onClick={saveSectionData}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export const EditCourse = ({ course, closeCourseEdit, fetchCourseData }) => {

    const [courseNameVal, setCourseNameVal] = useState(course.name);
    const [descriptionVal, setDescriptionVal] = useState(course.description);
    const [previewImgSrc, setPreviewImgSrc] = useState(course.image);

    let user = JSON.parse(localStorage.getItem('currentSession'));
    let JWTtoken = user.token;
    if (!JWTtoken) {
        alert("not logged in");
        return;
    }

    const updateCourseVal = event => {
        setCourseNameVal(event.target.value);
    }

    const updateDescriptionVal = event => {
        setDescriptionVal(event.target.value);
    }

    const previewFile = () => {
        // const preview = document.getElementById("course-preview-img");
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // convert image file to base64 string
            //   preview.src = reader.result;
            //   console.log(reader.result);
            setPreviewImgSrc(reader.result);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const saveCourse = () => {
        fetch(`${rootBackendURL}/department/${course.department}`)
            .then(response => response.json())
            .then(data => {
                data.classes.forEach(tmpCourseId => {
                    fetch(`${rootBackendURL}/class/${tmpCourseId}`)
                        .then(repsonse => repsonse.json())
                        .then(tmpCourse => {
                            console.log(tmpCourse);
                            if (course.name === tmpCourse.name) {
                                fetch(`${rootBackendURL}/class/${tmpCourse._id}`, {
                                    method: "PATCH",
                                    headers: {
                                        'auth_token': JWTtoken,
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        name: courseNameVal,
                                        description: descriptionVal,
                                        image: previewImgSrc
                                    })
                                }).then(response => response.json())
                                    .then(() => {
                                        closeCourseEdit();
                                        fetchCourseData();
                                    })
                                    .catch(error => {
                                        alert("Error with updating section");
                                        console.error(error);
                                        console.log(error);
                                    })
                            }
                        })
                })
            })
    }

    const resetVals = () => {
        setCourseNameVal(course.name);
        setDescriptionVal(course.description);
        setPreviewImgSrc(course.image);
    }

    return (
        <div class="spacing" style={{ margin: "1% 5%", paddingTop: "0", fontFamily: "Montserrat, sans-serif", fontWeight: "600", style: "normal" }}>
            <h2>{`Edit ${course.name}`}</h2>
            <div id="buttonsDiv">
                {/* <button style={{ backgroundColor: "transparent", border: "none" }}>
                    Back<i class='fas fa-arrow-left'></i>
                </button> */}
                <button onClick={resetVals} style={{ backgroundColor: "#414141", float: "right", color: "#FFFFFF", border: "none", borderRadius: "10px" }}>
                    Reset fields
                </button>
            </div>
            <div id="formDiv" class="spacing">
                <form style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>

                    <label id="largetextbox" class="spacing">Course Name</label>
                    <input id="titleInput" class="textbox" value={courseNameVal} onInput={updateCourseVal} style={{ type: "text" }}></input>

                    <label class="spacing">Description</label>
                    <textarea id="contentInput" class="textbox" value={descriptionVal} onInput={updateDescriptionVal} style={{ height: "200px", resize: "none" }} />

                    <label class="spacing">Images</label>
                    <input type="file" placeholder="" id="imagesInput" onChange={previewFile} style={{ height: "40px" }} /><br></br>
                    <img src={previewImgSrc} id="course-preview-img" alt="Preview..." style={{ width: "40%", maxHeight: "auto" }}></img>
                </form>

                <div class="spacing" style={{ float: "right" }}>
                    {/* <button class="saveforlater-button" style={{ backgroundColor: "#42F3E9", margin: "0px 20px", color: "#FFFFFF", border: "none", borderRadius: "10px" }}>
                        Save For Later
                    </button> */}
                    <button class="publish-button" onClick={saveCourse} style={{ backgroundColor: "#00F16F", color: "#FFFFFF", border: "none", borderRadius: "10px" }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export const EditOrg = ({ org, closeOrgEdit, fetchOrgData }) => {
    const [orgNameVal, setOrgNameVal] = useState(org.name);
    const [websiteVal, setWebsiteVal] = useState(org.website);
    const [descriptionVal, setDescriptionVal] = useState(org.description);
    const [previewImgSrc, setPreviewImgSrc] = useState(org.picture);

    const { user } = useContext(UserContext);

    // let user = JSON.parse(localStorage.getItem('currentSession'));
    // let JWTtoken = user.token;
    // if (!JWTtoken) {
        // alert("not logged in");
        // return;
    // }

    const updateOrgNameVal = event => {
        setOrgNameVal(event.target.value);
    }

    const updateWebsiteVal = event => {
        setWebsiteVal(event.target.value);
    }

    const updateDescriptionVal = event => {
        setDescriptionVal(event.target.value);
    }

    const previewFile = () => {
        // const preview = document.getElementById("course-preview-img");
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // convert image file to base64 string
            //   preview.src = reader.result;
            //   console.log(reader.result);
            setPreviewImgSrc(reader.result);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const saveOrg = () => {
        if(!user.token) {
            alert("Please Login before making changes");
            closeOrgEdit();
            return;
        }
            console.log(previewImgSrc);
        fetch(`${rootBackendURL}/organization`)
            .then(repsonse => repsonse.json())
            .then(data => {
                data.organizations.forEach(tmpOrg => {
                    if (org.name === tmpOrg.name) {
                        fetch(`${rootBackendURL}/organization/${tmpOrg._id}`, {
                            method: "PATCH",
                            headers: {
                                'auth_token': user.token,
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: orgNameVal,
                                description: descriptionVal,
                                website: websiteVal,
                                picture: previewImgSrc
                            })
                        }).then(response => response.json())
                            .then(() => {
                                closeOrgEdit();
                                fetchOrgData();
                            })
                            .catch(error => {
                                alert("Error with updating section");
                                console.error(error);
                                console.log(error);
                            })
                    }
                })
            })
    }

    const resetVals = () => {
        setOrgNameVal(org.name);
        setDescriptionVal(org.description);
        setPreviewImgSrc(org.picture);
    }

    return (
        <div class="spacing" style={{ margin: "1% 5%", paddingTop: "0", fontFamily: "Montserrat, sans-serif", fontWeight: "600", style: "normal" }}>
            <h2>{`Edit ${org.name}`}</h2>
            <div id="buttonsDiv">
                {/* <button style={{ backgroundColor: "transparent", border: "none" }}>
                    Back<i class='fas fa-arrow-left'></i>
                </button> */}
                <button onClick={resetVals} style={{ backgroundColor: "#414141", float: "right", color: "#FFFFFF", border: "none", borderRadius: "10px" }}>
                    Reset fields
                </button>
            </div>
            <div id="formDiv" class="spacing">
                <form style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>

                    <label id="largetextbox" class="spacing">Org Name</label>
                    <input id="titleInput" class="textbox" value={orgNameVal} onInput={updateOrgNameVal} style={{ type: "text" }}></input>

                    <label id="largetextbox" class="spacing">Website</label>
                    <input id="titleInput" class="textbox" value={websiteVal} onInput={updateWebsiteVal} style={{ type: "text" }}></input>

                    <label class="spacing">Description</label>
                    <textarea id="contentInput" class="textbox" value={descriptionVal} onInput={updateDescriptionVal} style={{ height: "200px", resize: "none" }} />

                    <label class="spacing">Images</label>
                    <input type="file" placeholder="" id="imagesInput" onChange={previewFile} style={{ height: "40px" }} /><br></br>
                    <img src={previewImgSrc} id="course-preview-img" alt="Preview..." style={{ width: "40%", maxHeight: "auto" }}></img>
                </form>

                <div class="spacing" style={{ float: "right" }}>
                    {/* <button class="saveforlater-button" style={{ backgroundColor: "#42F3E9", margin: "0px 20px", color: "#FFFFFF", border: "none", borderRadius: "10px" }}>
                        Save For Later
                    </button> */}
                    <button class="publish-button" onClick={saveOrg} style={{ backgroundColor: "#00F16F", color: "#FFFFFF", border: "none", borderRadius: "10px" }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
// export default EditSection