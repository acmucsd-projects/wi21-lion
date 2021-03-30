import React, { useState } from 'react'
import { EditOrg } from './EditArticle';
import LinksPanel from './LinksPanel';


function OrgContent(props) {
    const { org, fetchOrgData } = props;
    const [displayEditOrg, setDisplayEditOrg] = useState(false);

    function showEditOrg() {
        setDisplayEditOrg(true);
    }

    function hideEditOrg() {
        setDisplayEditOrg(false);
    }

    function handleClickOff(event) {
        if(event.target.className === "edit-backdrop") {
            setDisplayEditOrg(false);
        }
    }

    return (
        <div>
            <div className="section-content-header article-body">
                <h1>{org.name}</h1>
                <button className="edit-button" onClick={showEditOrg}>
                    <span>Edit</span>
                </button>
            </div>
            <div className="org-body">
                <img className="org-img" src={org.picture} alt={org.name}></img>
                <p>{org.description}</p>
                <LinksPanel org={org} />
            </div>
            {displayEditOrg &&
                <div className="edit-backdrop" onClick={handleClickOff}>
                    <div className="edit-section-wrapper">
                        <EditOrg org={org} closeOrgEdit={hideEditOrg} fetchOrgData={fetchOrgData}/>
                    </div>
                </div>}
        </div>
    )
}

export default OrgContent
