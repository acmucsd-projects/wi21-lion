import React, { useState, useEffect } from 'react';
import './userProfile.css';
import { ReactComponent as InfoDots } from './res/info-dots.svg';
import { PasswordDialog } from '../popups/dialogs';
import { useHistory } from 'react-router';
const server = "http://localhost:5000"
const getProfileUrl = `${server}/users/profile`;
const getSectionUrl = `${server}/section`;
const getClassUrl = `${server}/class`;
const getEnrolledSectionUrl = `${server}/enrolled_section`;

const ProfileAPI = {
  getProfile: async function(token) {
    let response = {};
    response = await fetch(`${getProfileUrl}`, {
      method: 'GET',
      headers: {
        'auth_token': token 
      }
    })
    .then(response => (
      response.json()
    ))
    .catch(error => {
      console.log(error)
    })
    return response;
  },
  getSection: async function(sectionId, token) {
    let response = {};
    response = await fetch(`${getSectionUrl}/${sectionId}`, {
      method: 'GET',
      headers: {
        'auth_token': token
      }
    })
    .then(response => (
      response.json()
    ))
    .catch(error => {
      console.log(error) 
    })
    return response;
  },
  getClass: async function(classId, token) {
    let response = {};
    response = await fetch(`${getClassUrl}/${classId}`, {
      method: 'GET',
      headers: {
        'auth_token': token
      }
    })
    .then(response => (
      response.json()
    ))
    .catch(error => {
      console.log(error) 
    })
    return response; 
  },
  getEnrolledSection: async function(enrolledSectionId, token) {
    let response = {};
    response = await fetch(`${getEnrolledSectionUrl}/${enrolledSectionId}`, {
      method: 'GET',
      headers: {
        'auth_token': token
      }
    })
    .then(response => (
      response.json()
    ))
    .catch(error => {
      console.log(error) 
    })
    console.log(response); 
    return response; 
  }
}

 

export default function UserProfile() {

  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({});
  const [enrolledSections, setEnrolledSections] = useState([]);

  const user = JSON.parse(localStorage.getItem('currentSession'));

  const tabs = [
    <ClassList sections={enrolledSections}/>,
    <Settings />,
  ]

  // use to switch tab views between settings and enrolled sections
  useEffect(() => {

    // get all user profile nav tabs
    let navItems = [...document.getElementsByClassName('profile-nav-item')];
    
    // check if nav tab is active, then apply correct styles
    navItems.forEach(navItem => {
      if(navItem.classList.contains(`item${activeTab}`)) {
        navItem.classList.add('active');
      } else {
        navItem.classList.remove('active');
      }
    });

  }, [activeTab]);

  // fetch all enrolled courses of logged in user
  useEffect(() => {
    async function fetchData() {
      // get user profile to get enrolled sections
      let profileData = await ProfileAPI.getProfile(user.token);
      console.log(profileData);
      setProfileData(profileData.user);

      // build enrolled sections datalist
      let enrolledSections = [];
      let profileSections = profileData.user.enrolled_sections;
      
      // for each enrolled section fetch the class and section data
      for await (let enrolledSectionId of profileSections) {
        let enrolledSectionData = await ProfileAPI.getEnrolledSection(enrolledSectionId, user.token);
        if (!enrolledSectionData) {
          setEnrolledSections(null);
          return;
        }
        let sectionData = await ProfileAPI.getSection(enrolledSectionData.section_id, user.token);
        let classData = await ProfileAPI.getClass(sectionData.class_id, user.token);
        
        console.log('FETCHED DATA');
        console.log(sectionData)
        console.log(classData)
        // push all data into data array
        enrolledSections.push({
          ...enrolledSectionData,
          ...sectionData,
          name: classData.name
        })
      }
      setEnrolledSections(enrolledSections);
    }
    fetchData();
  }, [user.token])

  return (
    <div id="user-profile">
      <div id="content">
        <nav>
          <ul>
            <li 
              className="profile-nav-item item0"
              key="classes" 
              onClick={() => setActiveTab(0)}>classes</li>
            <li 
              className="profile-nav-item item1" 
              key="settings" 
              onClick={() => setActiveTab(1)}>settings</li>
          </ul>
          <section>
            { 
              tabs[activeTab]
            }
          </section>
        </nav>
      </div>
      <div id="profile-info">
        {profileData && <ul>
          <h3>{ profileData.first_name } { profileData.last_name }</h3>
          <li>{ profileData.email }</li>
        </ul>}
      </div>
    </div>
  )
}


function ClassList({ sections }) {

 

  function ClassItem({ section }) {

    const history = useHistory();
    const [sectionItemPanelShown, setSectionItemPanelShown] = useState(false);

    function SectionItemPanel({ section, unenroll, sectionItemPanelShown }) {
      let className = sectionItemPanelShown ? 'active' : 'hidden';
      function handleUnenrollment() {
        unenroll(section.id); // this should be the id of the enrolled object
      }
      return (
        <ul id="section-item-panel" className={className} >
          <li>
            <button id="unenroll-btn"onClick={e => handleUnenrollment(e)}>
              unenroll
            </button>
          </li>
        </ul>
      )
    }

    function handleUnenrollment() {
      setSectionItemPanelShown(false);
      console.log('you unenrolled!');
    }

    function showProfileClassDialog() {
      setSectionItemPanelShown(true);
    }

    function handleSectionClick() {
      console.log(section);
      console.log(section.year);
      console.log(section.quarter);
      console.log(section.section_id);
      console.log(section.name);
      // console.log(section.year);
      let department = section.name.split(/[0-9]/)[0];
      let routeName = `courses/${department}/${section.name}/${section.quarter}/${section.year}/${section.id}`;
      history.push(routeName);
    }

    return (
      <li id="class-item">
        <div>
          <h2 onClick={e => handleSectionClick(e)}>{ section.name } section { section.section_id }</h2>
          <p>{ section.description }</p>
          <p>{ section.professor }</p>
        </div>
        <div>
          <p>lecture days:</p>
          <p>
            <span id="lecture-days">
              { section.lecture_times }
            </span>
          </p>
          <InfoDots id="dots" onClick={showProfileClassDialog}/>
          <SectionItemPanel 
            section={section}
            sectionItemPanelShown={sectionItemPanelShown} 
            unenroll={handleUnenrollment} />
        </div>
        <ul id="links">
          { section.website && <li>
            <a href={ section.website } rel="noreferrer" target="_blank">
              website
            </a>
          </li>
          }
          { section.canvas && 
          <li>
            <a href={ section.canvas } rel="noreferrer" target="_blank">
              canvas
            </a>
          </li>
          }
          { section.lecture_zoom &&
          <li>
            <a href={ section.lecture_zoom }>
              lecture zoom
            </a>
          </li>
          }
          { section.discussion_zoom && 
          <li>
            <a href={ section.discussion_zoom }>
              dicussion zoom  
            </a>
          </li>
          }
          { section.lab_zoom &&
          <li>
            <a href={ section.lab_zoom }>
              lab zoom
            </a>
          </li>
          }
          {section.oh_zoom &&
          <li>
            <a href={ section.oh_zoom }>
              professor OH
            </a>
          </li>
          }
          { section.piazza &&
          <li>
            <a href={ section.piazza }>
              piazza
            </a>
          </li>
          }
          { section.gradescope &&
          <li>
            <a href={ section.gradescope }>
              gradescope
            </a>
          </li>
          }
        </ul>
      </li>
    )
  }

  if (sections) {
    return (
      <ul>
        { 
          sections.map(section => {
            return <ClassItem section={section}/>
          }) 
        }
      </ul>
    )
  } else {
    return <p>you are not enrolled in any classes</p>
  }
  
}

function Settings() {
  
  const [passwordDialogShown, setShowPasswordDialog] = useState(false);
  function hidePasswordDialog() { setShowPasswordDialog(false); }
  function showPasswordDialog() { setShowPasswordDialog(true); }

  return (
    <div>
      <PasswordDialog show={passwordDialogShown} hide={hidePasswordDialog}/>
      <button onClick={showPasswordDialog}>password</button>
    </div>
  )
}
