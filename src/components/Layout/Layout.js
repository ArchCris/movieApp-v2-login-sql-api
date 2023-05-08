import React from 'react'
import './Layout.css'
import { Outlet, Link } from "react-router-dom";
import { loginContext } from '../../context/ContextProvider';
import { useContext } from 'react';
import axios from 'axios'
import SessionCredential from '../SessionCredential.js/SessionCredential';

const Layout = () => {

  const {loginStatus,setLoginStatus} = useContext(loginContext)

  const closeSession = () =>{
    axios.get('http://localhost:3001/endSession').then(resp=>{
      setLoginStatus(null)
    })
  }

  return (
    <div className='layout__conteiner'>
      <nav className='layout__navbar'>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/movies">MOVIES</Link>
          </li>
          <li>
            <Link to="/contact">CONTACT</Link>
          </li>
          {loginStatus ?
          <li>
            <SessionCredential props={{loginStatus:loginStatus,closeSession:closeSession}}/>
          </li> :
          null}
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default Layout