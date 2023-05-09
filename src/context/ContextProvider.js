import React from 'react'
import { createContext,useState } from 'react'

export const loginContext = createContext()

const ContextProvider = ({children}) => {   

    //User session
    const[loginStatus,setLoginStatus]=useState()

  return (
    <loginContext.Provider value={{loginStatus:loginStatus,setLoginStatus:setLoginStatus}}>
        {children}
    </loginContext.Provider>
  )
}

export default ContextProvider