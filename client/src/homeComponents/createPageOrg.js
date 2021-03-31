import React from 'react'
import "./createPage.css";
function createPageOrg(){

    let coverImageInput;

    function previewImage() {
        const preview = document.getElementById("course-preview-img");
        const file = document.querySelector("input[type=file]").files[0];
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            // convert image file to base64 string
              preview.src = reader.result;
              coverImageInput = reader.result;
            //   console.log(reader.result);
            // setPreviewImgSrc(reader.result);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    
    function handleSubmit(e){
        e.preventDefault();

        let titleInput;
        let typeInput; 
        let contentInput;
        let websiteInput;

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


        if(document.getElementById("websiteInput").value == null){
            websiteInput = " ";
        }
        else{
            websiteInput = document.getElementById("websiteInput");    
        }


        let user = JSON.parse(localStorage.getItem('currentSession'));
        let JWTtoken = user.token;


        let postBody = {
            name: titleInput.value,
            // Date: new Date().getTime()/1000,
            department: typeInput.value,
            description: contentInput.value,
            picture: coverImageInput,
            website: websiteInput.value,
        }

        fetch(`http://localhost:5000/organization`, {
            method: 'POST', 
            headers: {
                'content-type': "application/json",
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
                    
                </div>
    
                <div id="formDiv" className="spacing">
                    <form onSubmit={e => handleSubmit(e)} style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                        <label className="spacing yellow">
                            Org Type
                            <select className="textbox" id="typeInput" required>
                                <option>Club Sport</option>
                                <option>NCAA Sport</option>
                                <option>Academic Org</option>
                                <option>Social Org</option>
                            </select>
                        </label>

                        <label id="largetextbox" class="spacing yellow">Org Name</label>
                        <input id="titleInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}} required></input>

                        <label className="spacing yellow">Content</label>
                        <textarea id="contentInput" class="textbox" style={{height: "392px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}} required/>

                        <label class="spacing yellow">Cover Photo</label>
                        <input id="coverImageInput" type="file" name="filename" className="yellow" onChange={previewImage}></input>
                        <img src="" id="course-preview-img" alt="Preview..." style={{ width: "40%", maxHeight: "auto" }}></img>

                        <label id="largetextbox" class="spacing yellow">Website</label>
                        <input id="websiteInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input>

                        <div className="spacing" style={{float: "right", marginTop: "3%"}}>
                            <button type="submit" className="publish-button">
                                Publish
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default createPageOrg;