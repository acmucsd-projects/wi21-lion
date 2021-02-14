import React from 'react'
import './NavStyles.css'

import { FaSchool as Classes, FaBasketballBall as Nsports, FaTableTennis as Csports } from 'react-icons/fa'; 
import { BiNetworkChart as Aorgs } from 'react-icons/bi'; 
import { BsFillPeopleFill as Sorgs } from 'react-icons/bs'; 



function getIcon(id) {
  switch (id) {
    case "classes": 
      return <Classes className="icon"/>;
    case "csports":
      return <Csports className="icon"/>;
    case "nsports":
      return <Nsports className="icon"/>;
    case "aorgs":
      return <Aorgs className="icon"/>;
    case "sorgs":
      return <Sorgs className="icon"/>;
  }
}

export default function TabItem({ listItem, isActive, depth, handleTabItemClick }) {

  const { name, id } = listItem;
  const icon = depth === 0 ? getIcon(id) : "";
  const className = isActive ? "active" : "";

  return (
    <li className={className} onClick={() => handleTabItemClick(id, name, depth)}> 
      {/* this is hidden to the left by ddefault maybe */}
      {icon}
      <h2>{name}</h2>
    </li>
  )
}
