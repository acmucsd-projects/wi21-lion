import React, { useEffect, useState } from 'react';

import './Article.css';

import banner from './icons/ded 1.jpg';
import PathItem from './PathItem';
import PathDropdownMenu from './PathDropdownMenu';

import OrgContent from './OrgContent';
import { useParams } from 'react-router';

const rootBackendURL = "http://localhost:5000"
/**
 * General organization article template.
 *  
 * @param {*} props 
 */
function OrgArticle() {

    const [org, setOrg] = useState({});
    const [orgList, setOrgList] = useState([]);
    const params = useParams();

    function updateSelectedArticleType(element) {
        if (element.type === "Orgs") {
            window.location = `/orgs`
        } else if (element.type === "Courses") {
            window.location = `/courses`
        }
    }

    function updateSelectedOrg(element) {
        window.location = `/orgs/${element.name}`
    }

    function fetchOrgList() {
        fetch(`${rootBackendURL}/organization/`)
            .then(response => response.json())
            .then(data => {
                data.organizations.forEach(tmpOrg => {
                    if (tmpOrg.name === params.orgName) {
                        setOrg(tmpOrg);
                    }
                });
                setOrgList(data.organizations);
            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchOrgList();
        // eslint-disable-next-line
    }, [])

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
                            list={orgList}
                            type={"name"}
                            updateSelection={updateSelectedOrg}
                            selectedItem={org.name}
                        />
                    </PathItem>
                </ul>
            </div>
            <OrgContent org={org} />
        </div>
    );
}

export default OrgArticle


export const BlankOrg = () => {

    const [orgList, setOrgList] = useState([]);

    function updateSelectedArticleType(element) {
        if (element.type === "Orgs") {
            window.location = `/orgs`
        } else if (element.type === "Courses") {
            window.location = `/courses`
        }
    }

    function updateSelectedOrg(element) {
        window.location = `/orgs/${element.name}`
    }

    function fetchOrgList() {
        fetch(`${rootBackendURL}/organization/`)
            .then(response => response.json())
            .then(data => {
                setOrgList(data.organizations);
            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchOrgList();
    }, [])

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
                    <PathItem name={"Select an Org..."}>
                        <PathDropdownMenu
                            list={orgList}
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