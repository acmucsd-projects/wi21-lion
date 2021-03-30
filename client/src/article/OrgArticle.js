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

    if(!org) {
        return (
            <div id="article">
            <img className="article-banner" src={banner} alt={"org banner"}></img>
            <div className="article-header">
                <ul className="article-path">
                    <PathItem name="Orgs">
                        <PathDropdownMenu
                            list={[{ "type": "Courses" }, { "type": "Orgs" }]}
                            type={"type"}
                            updateSelection={updateSelectedArticleType}
                            selectedItem={"Orgs"} />
                    </PathItem>
                    <PathItem name={"Select an Org"}>
                        <PathDropdownMenu
                            list={dummyOrgs}
                            type={"name"}
                            updateSelection={updateSelectedOrg}
                            selectedItem={""}
                        />
                    </PathItem>
                </ul>
            </div>
            <h3 className="article-body">Select an Organization from the dropdown, search bar or navbar.</h3>
            </div>
        )
    }

    function updateSelectedArticleType(element) {
        if(element.type === "Orgs"){
            window.location = `/orgs`
        } else if(element.type === "Courses") {
            window.location = `/courses`
        }
    }

    function updateSelectedOrg(element) {
        window.location = `/orgs/${element.name}`
    }

    return (
        <div id="article">
            <img className="article-banner" src={banner} alt={org.name + " banner"}></img>
            <div className="article-header">
                <ul className="article-path">
                    <PathItem name="Orgs">
                        <PathDropdownMenu
                            list={[{ "type": "Courses" }, { "type": "Orgs" }]}
                            type={"type"}
                            updateSelection={updateSelectedArticleType}
                            selectedItem={"Orgs"} />
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
