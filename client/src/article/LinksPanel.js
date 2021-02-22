import React from 'react';

import './Article.css';

import { ReactComponent as DiscordSVG } from './icons/discord.svg';
import { ReactComponent as WebsiteSVG } from './icons/website.svg';

/**
 * Single link area that exists under a section's link panel 
 * @param {*} props 
 */
function LinkEntry(props) {
    const { name, url, icon } = props
    return (
        <div>
            <a href={url} className="link">
                <div id="link-container">
                    <h4 id="link-name"> {name}</h4>
                    {icon}
                </div>
            </a>
        </div>
    );
}

/**
 * Panel of useful links that corresponds to a specific class section 
 * @param {*} props 
 */
function LinksPanel(props) {
    const { section } = props;
    return (
        <div id="links-container">
            <h3 id="link-name">Useful Links</h3>
            <LinkEntry name="Website" url={section.website} icon={<WebsiteSVG className="link-glyph" />} />
            <LinkEntry name="Canvas" url={section.canvas} />
            <LinkEntry name="Discord" url={section.discord} icon={<DiscordSVG />} />
            {section.additionalLinks.map((link) => (
                <LinkEntry name={link.name} url={link.url} />
            ))}
        </div>
    );
}

export default LinksPanel
