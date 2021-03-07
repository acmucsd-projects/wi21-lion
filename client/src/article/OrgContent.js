import React from 'react'
import LinksPanel from './LinksPanel';

function OrgContent(props) {
    const { org } = props;
    return (
        <div>
            <h1 className="article-body">{org.name}</h1>
            <div className="org-body">
                <p>{org.description}</p>
                <LinksPanel org={org} />
            </div>
        </div>
    )
}

export default OrgContent
