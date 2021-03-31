import React from 'react'
import "./createPage.css";
//import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
function createPageClass(){

    
    function handleSubmit(){
        let titleInput;
        let typeInput; 
        let contentInput;
        let coverImageInput;
        let linksInput;

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        if(document.getElementById("titleInput").value === null){
            titleInput = " ";
        }
        else{
            titleInput = document.getElementById("titleInput");    
        }
        
        if(document.getElementById("typeInput").value === null){
            typeInput = " ";
        }
        else{
            typeInput = document.getElementById("typeInput");    
        }

        if(document.getElementById("contentInput").value === null){
            contentInput = " ";
        }
        else{
            contentInput = document.getElementById("contentInput");    
        }

        if(!document.getElementById("coverImageInput").files){
            coverImageInput = " ";
        }
        else{
            coverImageInput = toBase64(document.getElementById("coverImageInput").files[0]);    
        }

        if(document.getElementById("linksInput").value === null){
            linksInput = " ";
        }
        else{
            linksInput = document.getElementById("linksInput");    
        }

        let user = JSON.parse(localStorage.getItem('currentSession'));
        let JWTtoken = user.token;

        let postBody = {
            Name: titleInput.value,
            Date: new Date().getTime()/1000,
            Department: typeInput.value,
            Description: contentInput.value,
            CoverImage: coverImageInput,
            Links: linksInput.value,
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

                    <a href="/createPageSection">
                    <button className="createsection-button">
                        Create Section
                    </button>
                    </a>
                </div>

                <div id="formDiv" className="spacing">
                    <form style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                        <label className="spacing yellow">Department</label>
                        <input id="typeInput" className="textbox " style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}} required></input>

                        <label id="largetextbox" className="spacing yellow">Course Name</label>
                        <input id="titleInput" className="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}} required></input>

                        <label className="spacing yellow">Content</label>
                        <textarea id="contentInput" class="textbox" style={{height: "392px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}/>

                        <label class="spacing yellow">Cover Photo</label>
                        <input id="coverImageInput" className="yellow" type="file" name="filename"></input>


                        <label className="spacing yellow">Additional Links</label>
                        <input id="linksInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input>
                        
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

export default createPageClass;