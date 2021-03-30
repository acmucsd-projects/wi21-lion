import React, { useState, useEffect } from 'react';
import './userProfile.css';

import testSections from './testSections.json';
import testClasses from './testClasses.json';
import testEnrolledSections from './testEnrolledSections.json';
import { ReactComponent as InfoDots } from './res/info-dots.svg';
import { PasswordDialog } from '../popups/dialogs';
const server = "http://localhost:5000"
const getProfileUrl = `${server}/users/profile`;
const getSectionUrl = `${server}/section`;
const getClassUrl = `${server}/class`;
const getEnrolledSectionUrl = `${server}/enrolled_section`;

const ProfileAPI = {
  getProfile: async function(email, token) {
    let response = {};
    response = await fetch(`${getProfileUrl}/${email}`, {
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
    console.log(response);  }
}

 

export default function UserProfile() {

  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({});
  const [enrolledSections, setEnrolledSections] = useState([]);

  const user = JSON.parse(localStorage.getItem('currentSession'));
  console.log(profileData);

  const tabs = [
    <ClassList sections={enrolledSections}/>,
    <PageList />,
    <Settings />,
  ]

  useEffect(() => {
    let navItems = [...document.getElementsByClassName('profile-nav-item')];
    navItems.forEach(navItem => {
      if(navItem.classList.contains(`item${activeTab}`)) {
        navItem.classList.add('active');
      } else {
        navItem.classList.remove('active');
      }
    });

  }, [activeTab]);

  useEffect(() => {
    async function fetchData() {
      let profileData = await ProfileAPI.getProfile(user.email, user.token);
      setProfileData(profileData.user);
      let enrolledSections = [];
      // for await (let enrolledSectionId of testSectionIds) {
      //   let enrolledSectionData = await ProfileAPI.getSection(enrolledSectionId, user.token);
      //   let sectionData = await ProfileAPI.getSection(enrolledSectionData.section_id, user.token);
      //   let classData = await ProfileAPI.getClass(sectionData.class_id, user.token);
      //   enrolledSections.push({
      //     ...enrolledSectionData,
      //     ...sectionData,
      //     ...classData
      //   })
      // }
      // console.log('enrolled sections:',enrolledSections);
      
  
      let classesTest = testClasses;
      let sectionsTest = testSections;
      let enrolledSectionsTest = testEnrolledSections;
  
      enrolledSections = enrolledSectionsTest.map((enrolledSection, index) => (
        {...enrolledSection, ...classesTest[index], ...sectionsTest[index] }
      ));
      console.log(enrolledSections)
      setEnrolledSections(enrolledSections);
    }
    fetchData();
  }, [])

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
              key="pages" 
              onClick={() => setActiveTab(1)}>pages</li>
            <li 
              className="profile-nav-item item2" 
              key="settings" 
              onClick={() => setActiveTab(2)}>settings</li>
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

    const [sectionItemPanelShown, setSectionItemPanelShown] = useState(false);

    function SectionItemPanel({ section, unenroll, sectionItemPanelShown }) {
      let className = sectionItemPanelShown ? 'active' : 'hidden';
      console.log(className)
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

    return (
      <li id="class-item">
        <div>
          <h2>{ section.name } section { section.section_id }</h2>
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
          <li>
            <a href={ section.lecture_zoom }>
              lecture zoom
            </a>
          </li>
          <li>
            <a href={ section.discussion_zoom }>
              dicussion zoom  
            </a>
          </li>
          <li>
            <a href={ section.lab_zoom }>
              lab zoom
            </a>
          </li>
          <li>
            <a href={ section.oh_zoom }>
              professor OH
            </a>
          </li>
          <li>
            <a href={ section.piazza }>
              piazza
            </a>
          </li>
          <li>
            <a href={ section.gradescope }>
              gradescope
            </a>
          </li>
        </ul>
      </li>
    )
  }

  return (
    <ul>
      { 
        sections.map(section => {
          return <ClassItem section={section}/>
        }) 
      }
    </ul>
  )
}

function PageList() {
  return (
    <ul>
      pagelist
    </ul>
  )
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
