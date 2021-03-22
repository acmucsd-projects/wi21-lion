import React, { useState, useEffect } from 'react';
import './userProfile.css';

const Lists = [
  <ClassList />,
  <PageList />,
  <Settings />,
]

export default function UserProfile() {

  const [activeTab, setActiveTab] = useState(0);
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    let navItems = [...document.getElementsByClassName('profile-nav-item')];
    navItems.forEach(navItem => {
      if(navItem.classList.contains(`item${activeTab}`)) {
        navItem.classList.add('active');
      } else {
        navItem.classList.remove('active');
      }
    });

    setContentList(Lists[activeTab]);
  }, [activeTab]);

  

  return (
    <div id="user-profile">
      <div id="content">
        <nav>
          <ul>
            <li className="profile-nav-item item0" onClick={() => setActiveTab(0)}>classes</li>
            <li className="profile-nav-item item1" onClick={() => setActiveTab(1)}>pages</li>
            <li className="profile-nav-item item2" onClick={() => setActiveTab(2)}>settings</li>
          </ul>
          <section>
            { contentList }
          </section>
        </nav>
      </div>
      <div id="profile-info">
        hi
      </div>
    </div>
  )
}


function ClassList() {

  function ClassItem() {
    return (
      <div>

      </div>
    )
  }


  return (
    <li>
      classlist
    </li>
  )
}

function PageList() {
  return (
    <li>
      pagelist
    </li>
  )
}

function Settings() {
  return (
    <li>
      settings
    </li>
  )
}

