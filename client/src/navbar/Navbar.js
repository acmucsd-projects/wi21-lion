import React, { useEffect, useRef, useState } from 'react'
import TabItem from './TabItem';
import './NavStyles.css';



const topSections = [
  { id: "classes", name: "CLASSES" },
  { id: "csports", name: "CLUB SPORTS" },
  { id: "nsports", name: "NCAA SPORTS" },
  { id: "aorgs", name: "ACADEMIC ORGS" },
  { id: "sorgs", name: "SOCIAL ORGS" }, 
]
const sectionsMid = {
  classes: [
    { id: "CSE", name: "CSE" },
    { id: "MATH", name: "MATH" },
    { id: "ECE", name: "ECE" },
    { id: "COGS", name: "COGS" },
    { id: "BIO", name: "BIO" },
    { id: "CAT", name: "CAT" },
  ],
  csports: [
    { id: "cswim", name: "SWIM" },
    { id: "csoccer", name: "SOCCER" },
    { id: "cwapo", name: "WATER POLO" },
    { id: "csurf", name: "SURF" },
    { id: "cbaseball", name: "BASEBALL" },
    { id: "cbball", name: "BASEBALL" },
  ]
}
const sectionsLow = {
  CSE: [
    { id: "3", name: "3" },
    { id: "5", name: "5" },
    { id: "8A", name: "8A" },
    { id: "8B", name: "8B" },
    { id: "11", name: "11" },
    { id: "12", name: "12" },
    { id: "15L", name: "15L" },
    { id: "20", name: "20" },
    { id: "21", name: "21" },
    { id: "30", name: "30" },
  ]
}
const dynamicDepth = {
  gang: [{ id: "gang", name: "gang"}]
}


/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, handleTabClick) {
  useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
              handleTabClick(1, "", -1);
          }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [ref, handleTabClick]);
}



export default function Navbar() {

  // arrays of arrays, each array is a deeper section
  const [sections, setSections] = useState([]);
  const topNav = topSections;
  const [isTopNavShrunk, setIsTopNavShrunk] = useState(""); // is top nav shrunk
  const [activeItems, setActiveItems] = useState([]); // array of active list item indices

  // detect click outside
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handleTabClick);

  // open or collapse tabs
  function handleTabClick(id, name, depth) {

    // disable query if we click on the header
    if (id === 0) return;

    // ***mock api call replace with actual backend call***
    let queryData;
    switch(depth) {
      case -1: queryData = []
      break;
      case 0: queryData = sectionsMid[id];
      break;
      case 1: queryData = sectionsLow[id];
      break;
      case 2: queryData = dynamicDepth['gang'];
      break;
      default: queryData = undefined;
    } 

    // check if query data returned a list
    if (queryData === undefined) return;

    // add selected section to new list
    queryData = [{ id: 0, name: name}, ...queryData];

    // set the state
    let updatedSections = [...sections];
    let updatedActiveItems = [...activeItems];

    updatedSections[depth] = queryData;
    updatedSections.length = depth + 1;

    updatedActiveItems[depth] = id;
    updatedActiveItems.length = depth + 1;
    console.log(updatedSections)
    setSections(updatedSections);
    setActiveItems(updatedActiveItems);

    // shrink top level if there are more elements
    if (depth >= 0) setIsTopNavShrunk(true);
    else setIsTopNavShrunk(false);
  }

  // separate main tab from small tabs
  return (
    <nav id="navbar" ref={wrapperRef}>
      <ul id="top-nav" className={isTopNavShrunk ? "shrink" : ""}>
        {topNav.map(listItem => {
          let isActive = activeItems[0] === listItem.id ? true : false;
          return <TabItem 
            listItem={listItem}
            isActive={isActive}
            depth={0} 
            key={listItem.id} 
            handleTabItemClick={handleTabClick}/>
        })}
      </ul>

      {sections.map((list, index) => (
        <ul key={index+list[0].name} style={{ zIndex: 0 - index }}>
          {list.map(listItem => {
            let isActive = activeItems[index+1] === listItem.id ? true : false;
            return <TabItem 
              listItem={listItem}
              isActive={isActive}
              depth={index+1} 
              key={listItem.id} 
              handleTabItemClick={handleTabClick}/>
          })}
        </ul>
      ))}
    </nav>
  )
}
