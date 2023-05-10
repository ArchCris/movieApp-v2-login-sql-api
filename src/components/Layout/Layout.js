import React from 'react'
import './Layout.css'
import { Outlet, Link ,useNavigate} from "react-router-dom";
import { loginContext } from '../../context/ContextProvider';
import { useContext,useEffect } from 'react';

import axios from 'axios'
import SessionCredential from '../SessionCredential.js/SessionCredential';
import LiveSearch from '../LiveSearch/LiveSearch';


const Layout = () => {
  const navigate = useNavigate();
  //This to make it work in all the pages
  axios.defaults.withCredentials = true

  const {loginStatus,setLoginStatus} = useContext(loginContext)
 
  const closeSession = () =>{
    axios.get(`${process.env.REACT_APP_LOCAL_URL}/endSession`).then(resp=>{
      setLoginStatus(null)
      navigate("/")
    })
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_LOCAL_URL}/login`).then(resp=>{
      if(resp.data.loggedIn===true){
        setLoginStatus(resp.data.user[0])
      }else{
        console.log(resp.data)
      }
    })
  }, []);

  return (
    <div className='layout__conteiner'>
      <nav className='layout__navbar'>
        <ul className='layout__ul'>
          <li>
            <Link className='layout__link' to="/">HOME</Link>
          </li>
          <li>
            <Link className='layout__link' to="/contact">CONTACT</Link>
          </li>
          {loginStatus ?
          <li>
            <SessionCredential props={{loginStatus:loginStatus,closeSession:closeSession}}/>
          </li> :
          null}
        </ul>
        <div className='layout__searchBarConteiner'>
          <LiveSearch/>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default Layout