import React from 'react'

import './Article.css'


function LinkEntry(props) {
    const { name, url } = props
    return (
        <div>
            <h4 id="link-name">{name}</h4>
            <a href={url} className="link">
                <div id="link-container">
                    {url}
                </div>
            </a>
        </div>
    )
}

function LinksPanel(props) {
    const { section } = props;
    //border outline
    //header
    //few important sections with css border animation on hover
    //couple extra ones that are mapped from the extra links array
    return (
        <div id="links-container">
            <h3 id="link-name">Useful Links</h3>
            {/* /* discord/canva/gradescope/general website icons  */}
            <LinkEntry name="Website" url={section.website} />
            <LinkEntry name="Canvas" url={section.canvas} />
            <LinkEntry name="Discord" url={section.discord} />
            {section.additionalLinks.map((link) => (
                <LinkEntry name={link.name} url={link.url} />
            ))}
        </div>
    )
}

export default LinksPanel
