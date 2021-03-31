import React from 'react'
import "./createPage.css";
function successPage(){
    

    return(
        
        <div className="spacing" style={{backgroundImage: "url(https://rady.ucsd.edu/images/start-me-up/background2.jpg)", backgroundRepeat: "no-repeat", backgroundPosition: "bottom"}}>
            <div className="successDialog">
                <p>Successfully submitted!</p>
                <p>Thank you for creating a new page.</p>
            
            <a href="/">
                    <button className="createsection-button">
                        Back to homepage
                    </button>
            </a>
            </div>
        </div>
    );
}

export default successPage;