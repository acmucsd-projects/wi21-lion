import React from 'react';

import './Article.css';

import banner from './icons/ded 1.jpg';
import PathItem from './PathItem';
import PathDropdownMenu from './PathDropdownMenu';

import dummyOrgs from './dummyOrgs.json';

/**
 * General organization article template.
 *  
 * @param {*} props 
 */
function OrgArticle(props) {

    const { org } = props;
    // const [orgList, setOrgList] = useState([]);

    function updateSelectedArticleType() {

    }

    function updateSelectedOrg(element) {
        window.location = `/orgs/${element.name}`
    }

    return (
        <div id="article">
            <img className="article-banner" src={banner} alt={org.name + " banner"}></img>
            <div className="article-header">
                <ul className="article-path">
                    <PathItem name="Classes">
                        <PathDropdownMenu
                            list={[{ "type": "courses" }, { "type": "orgs" }]}
                            type={"type"}
                            updateSelection={updateSelectedArticleType}
                            selectedItem={"orgs"} />
                    </PathItem>
                    <PathItem name={org.name}>
                        <PathDropdownMenu
                            list={dummyOrgs}
                            type={"name"}
                            updateSelection={updateSelectedOrg}
                            selectedItem={org.name}
                        />
                    </PathItem>
                </ul>
            </div>
            {props.children}
        </div>
    );
}

export default OrgArticle 
