import React from 'react'
import './NavStyles.css'


import {ReactComponent as Classes} from './res/classes.svg';
import {ReactComponent as Csports} from './res/csports.svg';
import {ReactComponent as Nsports} from './res/nsports.svg';
import {ReactComponent as Aorgs} from './res/aorgs.svg';
import {ReactComponent as Sorgs} from './res/sorgs.svg';

// import { FaSchool as Classes, FaBasketballBall as Nsports, FaTableTennis as Csports } from 'react-icons/fa'; 
// import { BiNetworkChart as Aorgs } from 'react-icons/bi'; 
// import { BsFillPeopleFill as Sorgs } from 'react-icons/bs'; 



function getIcon(id) {
  switch (id) {
    case 1: 
      return <Classes className="icon"/>;
    case "csports":
      return <Csports className="icon"/>;
    case "nsports":
      return <Nsports className="icon"/>;
    case 2:
      return <Aorgs className="icon"/>;
    case "sorgs":
      return <Sorgs className="icon"/>;
    default: return id + "icon";
  }
}

export default function TabItem({ listItem, isActive, depth, handleTabItemClick, id }) {

  const { name } = listItem;
  const icon = depth === 0 ? getIcon(id) : "";
  const className = isActive ? "active" : "";

  return (
    <li className={className} onClick={() => handleTabItemClick(id, name, depth)}> 
      {icon}
      <h2>{name}</h2>
    </li>
  )
}
