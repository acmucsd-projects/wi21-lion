import React from 'react'
import "./createPage.css";
//import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
function createPageClass(){

    
    function handleSubmit(){
        let titleInput = document.getElementById("titleInput");
        let contentInput = document.getElementById("contentInput");
        // let imagesInput = document.getElementById("imagesInput");
        console.log(titleInput.value);
        console.log(contentInput.toSource());

        let postBody = {
            Name: titleInput.value,
            Date: new Date.getTime()/1000,
            Description: contentInput.value
        }

        fetch("/class/:dep", {
            method: 'POST', 
            //headers: {
           //     'Content-Type': 'application/json'
            //},
            body: JSON.stringify(postBody) 
        }).then(response => {console.log(response)});
    }

    return(
        
        <div className="spacing" className="fullPage">
            <div id="buttonsDiv"  style={{backgroundColor: "A6E5FF"}}>
                <button style={{backgroundColor: "transparent", border: "none"}}>
                    Back<i className='fas fa-arrow-left'></i>
                </button>
                <button className="previewpage-button">
                    Preview Page
                </button>
            </div>
            <div id="formDiv" className="spacing">
                <form style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <label className="spacing">
                        Department
                        <select className="textbox">
                            <option>Class</option>
                            <option>Club Sport</option>
                            <option>NCAA Sport</option>
                            <option>Academic Org</option>
                            <option>Social Org</option>
                        </select>
                    </label>

                    <label id="largetextbox" class="spacing">Title</label>
                    <input id="titleInput" class="textbox" style={{type: "text"}}></input>

                    <label className="spacing">Content</label>
                    <textarea id="contentInput" class="textbox" style={{height: "392px"}}/>

                    <label className="spacing">Images</label>
                    <textarea placeholder="" id="imagesInput" class="textbox" style={{height: "156px"}}/>
                </form>

                <div className="spacing" style={{float: "right"}}>
                    <button className="saveforlater-button">
                        Save For Later
                    </button>
                    <button className="publish-button" onClick={handleSubmit}>
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
}

export default createPageClass;