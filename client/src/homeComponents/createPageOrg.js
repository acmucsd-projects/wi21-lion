import React from 'react'
import "./createPage.css";
function createPageOrg(){
    
    function handleSubmit(){
        let titleInput;
        let typeInput; 
        let contentInput;
        let coverImageInput;
        let headerImageInput;
        let websiteInput;
        let discordInput;
        let reader = new FileReader();

        if(document.getElementById("titleInput").value == null){
            titleInput = " ";
        }
        else{
            titleInput = document.getElementById("titleInput");    
        }
        
        if(document.getElementById("typeInput").value == null){
            typeInput = " ";
        }
        else{
            typeInput = document.getElementById("typeInput");    
        }

        if(document.getElementById("contentInput").value == null){
            contentInput = " ";
        }
        else{
            contentInput = document.getElementById("contentInput");    
        }

        if(reader.readAsDataURL(document.getElementById("coverImageInput")) == null){
            coverImageInput = " ";
        }
        else{
            coverImageInput = reader.readAsDataURL(document.getElementById("coverImageInput"));    
        }

        if(document.getElementById("headerImageInput").value == null){
            headerImageInput = " ";
        }
        else{
            headerImageInput = document.getElementById("headerImageInput");    
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
            Department: typeInput.value,
            Description: contentInput.value,
            // CoverImage: coverImageInput.value,
            // HeaderImage: headerImageInput.value,
            Website: websiteInput.value,
            Discord: discordInput.value,
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
                        <label className="spacing yellow">
                            Org Type
                            <select className="textbox" id="typeInput">
                                <option>Club Sport</option>
                                <option>NCAA Sport</option>
                                <option>Academic Org</option>
                                <option>Social Org</option>
                            </select>
                        </label>

                        <label id="largetextbox" class="spacing yellow">Org Name</label>
                        <input id="titleInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input>

                        <label className="spacing yellow">Content</label>
                        <textarea id="contentInput" class="textbox" style={{height: "392px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}/>

                        <label class="spacing yellow">Cover Photo</label>
                        <input id="coverImageInput" type="file" id="myFile" name="filename" className="yellow"></input>

                        <label id="largetextbox" class="spacing yellow">Website</label>
                        <input id="websiteInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input>

                        <label id="largetextbox" class="spacing yellow">Discord</label>
                        <input id="discordInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input>

                        {/* <label id="largetextbox" class="spacing" style={{zIndex: "5"}}>Additional Link</label>
                        <input id="titleInput" class="textbox" style={{type: "text", height: "30px", fontSize: "20px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input> */}
                        
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

export default createPageOrg;