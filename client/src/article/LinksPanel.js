import React from 'react';

import './Article.css';

import { ReactComponent as DiscordSVG } from './icons/discord.svg';
import { ReactComponent as WebsiteSVG } from './icons/website.svg';

import CanvasPNG from './icons/canvas.png'

const CanvasIMG = (
    <img src={CanvasPNG} alt='canvas' className="link-glyph"></img>
)

/**
 * Single link area that exists under a section's link panel 
 * @param {*} props 
 */
function LinkEntry(props) {
    const { name, url, icon } = props
    return (
        <a href={url} id="link-container">
            <i>{icon}</i>
            {name}
        </a>
    );
}

/**
 * Panel of useful links that corresponds to a specific class section 
 * @param {*} props 
 */
function LinksPanel(props) {
    const { section, org } = props;
    if (section) {
        if (((!section.website || section.website.length === 0) &&
            (!section.canvas || section.canvas.length === 0) &&
            (!section.discord || section.discord.length === 0))) {
            return (
                <div></div>
            )
        }
        return (
            <div id="links-container">
                <h4 id="link-name">Useful Links</h4>
                {section.website && section.website.length !== 0 && <LinkEntry name="Website" url={section.website} icon={<WebsiteSVG className="link-glyph" />} />}
                {section.canvas && section.canvas.length !== 0 && <LinkEntry name="Canvas" url={section.canvas} icon={CanvasIMG} />}
                {section.discord && section.discord !== 0 && <LinkEntry name="Discord" url={section.discord} icon={<DiscordSVG className="link-glyph" />} />}
            </div>
        );
    }
    if (org) {
        if (!org.website || org.website.length === 0) {
            return (
                <div></div>
            )
        }
        return (
            <div id="links-container">
                <LinkEntry name="Website" url={org.website} icon={<WebsiteSVG className="link-glyph" />} />
            </div>
        );
    }

    return (<div id="links-container">
        Error with loading links
    </div>)
}

export default LinksPanel
