import React from 'react'
import "./createPage.css";
function createPage(){
    

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
                            <option>Class</option>
                            <option>Club Sport</option>
                            <option>NCAA Sport</option>
                            <option>Academic Org</option>
                            <option>Social Org</option>
                        </select>
                    </label>

                    <label id="largetextbox" class="spacing">Title</label>
                    <input class="textbox" style={{type: "text"}}></input>

                    <label class="spacing">Content</label>
                    <textarea class="textbox" style={{height: "392px"}}/>

                    <label class="spacing">Images</label>
                    <textarea class="textbox" style={{height: "156px"}}/>
                </form>

                <div class="spacing" style={{float: "right"}}>
                    <button style={{backgroundColor: "#42F3E9", margin: "0px 20px", color: "#FFFFFF", border: "none"}}>
                        Save For Later
                    </button>
                    <button style={{backgroundColor: "#00F16F", color: "#FFFFFF", border: "none"}}>
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
}

export default createPage;