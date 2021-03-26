import React, { useState, createContext } from 'react'

export const UserContext = createContext();

export function UserContextProvider(props) {

  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      { props.children }
    </UserContext.Provider>
  )
}
 