import React from 'react'
import "./createPage.css";
function createPageOrg(){
    
    function handleSubmit(){
        let titleInput = document.getElementById("titleInput");
        let contentInput = document.getElementById("contentInput");
        let imagesInput = document.getElementById("imagesInput");
        console.log(titleInput.value);
        console.log(contentInput.toSource());

        let postBody = {
            Name: titleInput.value,
            Date: new Date.getTime()/1000,
            Description: contentInput.value
        }

        fetch("https..", {
            method: 'POST', 
            //headers: {
           //     'Content-Type': 'application/json'
            //},
            body: JSON.stringify(postBody) 
        }).then(response => {console.log(response)});
    }

    return(
        
        <div class="spacing" style={{marginLeft: "30%", marginRight: "17%", marginTop: "0", paddingTop: "0", fontFamily: "Montserrat", fontWeight: "600", style: "normal"}}>
            <div id="buttonsDiv">
                <button style={{backgroundColor: "transparent", border: "none"}}>
                    Back<i class='fas fa-arrow-left'></i>
                </button>
                <button style={{backgroundColor: "#414141", float: "right", color: "#FFFFFF", border: "none"}}>
                    Preview Page
                </button>
            </div>
            <div id="formDiv" class="spacing">
                <form style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <label class="spacing">
                        Page Type
                        <select class="textbox">
                            <option>Club Sport</option>
                            <option>NCAA Sport</option>
                            <option>Academic Org</option>
                            <option>Social Org</option>
                        </select>
                    </label>

                    <label id="largetextbox" class="spacing">Title</label>
                    <input id="titleInput" class="textbox" style={{type: "text"}}></input>

                    <label class="spacing">Content</label>
                    <textarea id="contentInput" class="textbox" style={{height: "392px"}}/>

                    <label class="spacing">Images</label>
                    <textarea id="imagesInput" class="textbox" style={{height: "156px"}}/>
                </form>

                <div class="spacing" style={{float: "right"}}>
                    <button style={{backgroundColor: "#42F3E9", margin: "0px 20px", color: "#FFFFFF", border: "none"}}>
                        Save For Later
                    </button>
                    <button ckass="publish-button" onClick={handleSubmit} style={{backgroundColor: "#00F16F", color: "#FFFFFF", border: "none"}}>
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
}

export default createPageOrg;