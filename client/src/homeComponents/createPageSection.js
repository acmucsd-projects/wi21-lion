import React from 'react'
import "./createPage.css";
//import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
function createPageSection(){

    
    function handleSubmit(e){
        e.preventDefault()
        let titleInput; 
        let contentInput;
        let profInput;
        let qInput;
        let yInput;
        let sectionInput;
        let websiteInput;
        let discordInput;
        let canvasInput;
        let newStartTime = document.getElementById("startTime").value;
        let newEndTime = document.getElementById("endTime").value;
        let lecture_times = "";

        // if (dayVals.monday) {
        //     lecture_times += "M";
        // }
        // if (dayVals.tuesday) {
        //     lecture_times += "Tu";
        // }
        // if (dayVals.wednesday) {
        //     lecture_times += "W";
        // }
        // if (dayVals.thursday) {
        //     lecture_times += "Th";
        // }
        // if (dayVals.friday) {
        //     lecture_times += "F";
        // }
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

        if(document.getElementById("titleInput").value == null){
            titleInput = " ";
        }
        else{
            titleInput = document.getElementById("titleInput");    
        }
        
        if(document.getElementById("qInput").value == null){
            qInput = " ";
        }
        else{
            qInput = document.getElementById("qInput");    
        }

        if(document.getElementById("yInput").value == null){
            yInput = " ";
        }
        else{
            yInput = document.getElementById("yInput");    
        }

        if(document.getElementById("profInput").value == null){
            profInput = " ";
        }
        else{
            profInput = document.getElementById("profInput");    
        }

        if(document.getElementById("sectionInput").value == null){
            sectionInput = " ";
        }
        else{
            sectionInput = document.getElementById("sectionInput");    
        }

        if(document.getElementById("contentInput").value == null){
            contentInput = " ";
        }
        else{
            contentInput = document.getElementById("contentInput");    
        }

        if(document.getElementById("canvasInput").value == null){
            canvasInput = " ";
        }
        else{
            canvasInput = document.getElementById("canvasInput");    
        }

        if(document.getElementById("websiteInput").value == null){
            websiteInput = " ";
        }
        else{
            websiteInput = document.getElementById("websiteInput");    
        }

        if(document.getElementById("discordInput").value == null){
            discordInput = " ";
        }
        else{
            discordInput = document.getElementById("discordInput");    
        }

        let user = JSON.parse(localStorage.getItem('currentSession'));
        let JWTtoken = user.token;

        let postBody = {
            name: titleInput.value,
            //Date: new Date().getTime()/1000,
            quarter: qInput.value,
            year: yInput.value,
            section_id: sectionInput.value,
            lecture_times: lecture_times,
            professor: profInput.value,
            description: contentInput.value,
            canvas: canvasInput.value,
            website: websiteInput.value,
            discord: discordInput.value
        }
        console.log(postBody);
        let classID;

        fetch(`http://localhost:5000/class`)
        .then(response => response.json())
        .then(data => {
            data.classes.forEach(element => {
                if(element.name === titleInput.value){
                    classID = element._id
                    console.log(classID);

                    fetch(`http://localhost:5000/section/${classID}`, {
                    method: 'POST', 
                    headers: {
                            'content-type': "application/json",
                            'auth_token': JWTtoken
                    },
                        body: JSON.stringify(postBody) 
                    }).then(response => {window.location.assign("/successPage")});
                    // }).then(response => alert("Class not found"));
                }

                    
                
            });
        })

    }

    return(
        
        <div className="spacing" style={{backgroundImage: "url(https://ucsandiegobookstore.com/Images/06BookstorePerksWallpapers.png)", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
            <div className="fullPage">
                <div id="buttonsDiv">
                    <a href="/">
                        <button style={{backgroundColor: "transparent", border: "none"}}>
                            Back<i className='fas fa-arrow-left'></i>
                        </button>
                    </a>
                   
                </div>
                
                <div id="formDiv" className="spacing">
                    <form style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                        <label className="spacing yellow">Quarter</label>
                        <input id="qInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}} required></input>

                        <label className="spacing yellow">Year</label>
                        <input id="yInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}} required></input>

                        <label className="spacing yellow">Professor</label>
                        <input id="profInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}} required></input>

                        <label className="spacing yellow">Section Number</label>
                        <input id="sectionInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}} required></input>

                        <label id="largetextbox" class="spacing yellow">Course Name</label>
                        <input id="titleInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}} required></input>

                        <label className="spacing yellow">Content</label>
                        <textarea id="contentInput" class="textbox" style={{height: "392px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}} required/>

                        <p style={{padding:'2% 0 2% 0'}} className="yellow">Select Lecture Times</p>
                        <div id="lectureInput" style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                            <div>
                                <div>
                                    <input type="checkbox" id="monday" name="monday" />
                                    <label for="monday" className="yellow">Monday</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="tuesday" name="tuesday" />
                                    <label for="tuesday" className="yellow">Tuesday</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="wednesday" name="wednesday" />
                                    <label for="wednesday" className="yellow">Wednesday</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="thursday" name="thursday" />
                                    <label for="thursday" className="yellow">Thursday</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="friday" name="friday" />
                                    <label for="friday" className="yellow">Friday</label>
                                </div>
                            </div>
                            <div>
                                <label className="spacing yellow">
                                    Start Time
                            </label>
                                <input type="time" id="startTime" name="startTime" required></input>
                            </div>
                            <div>
                                <label className="spacing yellow">
                                    End Time
                            </label>
                                <input type="time" id="endTime" name="endTime" required></input>
                            </div>
                        </div>

                        <label id="largetextbox" className="spacing yellow" style={{zIndex: "5"}}>Canvas</label>
                        <input id="canvasInput" className="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input>

                        <label id="largetextbox" className="spacing yellow" style={{zIndex: "5"}}>Website</label>
                        <input id="websiteInput" className="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input>

                        <label id="largetextbox" className="spacing yellow" style={{zIndex: "5"}}>Discord</label>
                        <input id="discordInput" className="textbox yellow" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input>
                        
                        <div className="spacing" style={{float: "right", marginTop: "3%"}}>
                            <button className="publish-button" onClick={e => handleSubmit(e)}>
                                Publish
                            </button>
                        </div>
                        
                    </form>

                </div>
            </div>
        </div>
    );
}

export default createPageSection;