import React from 'react'
import "./createPage.css";
//import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
function createPageSection(){

    
    function handleSubmit(){
        let titleInput; 
        let contentInput;
        let profInput;
        let qyInput;
        let sectionInput;
        let websiteInput;
        let discordInput;

        if(document.getElementById("titleInput").value == null){
            titleInput = " ";
        }
        else{
            titleInput = document.getElementById("titleInput");    
        }
        
        if(document.getElementById("qyInput").value == null){
            qyInput = " ";
        }
        else{
            qyInput = document.getElementById("qyInput");    
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
            Name: titleInput.value,
            Date: new Date().getTime()/1000,
            QuarterYear: qyInput.value,
            Section: sectionInput.value,
            Professor: profInput.value,
            Description: contentInput.value,
            Website: websiteInput.value,
            Discord: discordInput.value
        }

        fetch("/class/:dep", {
            method: 'POST', 
            headers: {
                'auth_token': JWTtoken
            },
            body: JSON.stringify(postBody) 
        }).then(response => {window.location.assign("/successPage")});
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
                    <button className="previewpage-button">
                        Preview Page
                    </button>
                </div>
                
                <div id="formDiv" className="spacing">
                    <form style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <label className="spacing yellow">Quarter and Year</label>
                        <input id="qyInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input>

                        <label className="spacing yellow">Professor</label>
                        <input id="profInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input>

                        <label className="spacing yellow">Section Number</label>
                        <input id="sectionInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input>

                        <label id="largetextbox" class="spacing yellow">Course Name</label>
                        <input id="titleInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input>

                        <label className="spacing yellow">Content</label>
                        <textarea id="contentInput" class="textbox" style={{height: "392px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}/>

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

                        <label id="largetextbox" className="spacing yellow" style={{zIndex: "5"}}>Website</label>
                        <input id="websiteInput" className="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input>

                        <label id="largetextbox" className="spacing yellow" style={{zIndex: "5"}}>Discord</label>
                        <input id="discordInput" className="textbox yellow" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input>
                        
                    </form>

                    <div className="spacing" style={{float: "right", marginTop: "3%"}}>
                        <button className="publish-button" onClick={handleSubmit}>
                            Publish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default createPageSection;