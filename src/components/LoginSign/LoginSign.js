import React from 'react'
import './LoginSign.css'
import axios from 'axios'
import { useState,useContext } from 'react'
import { loginContext } from '../../context/ContextProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const LoginSign = () => {

  const {setLoginStatus} = useContext(loginContext)

  //Session setting
  axios.defaults.withCredentials = true

  //Sign up data
  const[nameSign,setNameSign]=useState('')
  const[passwordSign,setPasswordSign]=useState('')
  const[signMessage,setSignMessage]=useState(null)
  //Sign function
  const signUp = () =>{
    axios.post(`${process.env.REACT_APP_LOCAL_URL}/signup`,{
      name:nameSign,
      password:passwordSign
    }).then(resp=>{
      console.log(resp)
      if(resp.data.message===''){
        setSignMessage('Sucesfully signed')
      }else{
        setSignMessage(resp.data.code)
      }
    })
    setNameSign('')
    setPasswordSign('')
  }

  //Log in data
  const[nameLog,setNameLog]=useState('')
  const[passwordLog,setPasswordLog]=useState('')
  const[logMessage,setLogMessage]=useState(null)
  //Login function
  const logIn = () =>{
    axios.post(`${process.env.REACT_APP_LOCAL_URL}/login`,{
      name:nameLog,
      password:passwordLog
    }).then(resp=>{
      if(resp.data.message){
        setLogMessage(resp.data.message)
      }else{
        setLoginStatus(resp.data[0])
      }
    })
  }

  return (
    <div className='loginSign__conteiner'>
      <div className='loginSign__signUp'>
        <h3>Sign Up  <FontAwesomeIcon icon={faUser} /></h3>
          <label>Username</label>
          <input onChange={(e)=>{setNameSign(e.target.value)}} value={nameSign} type='text' placeholder='Username...'></input>
          <label>Password</label>
          <input onChange={(e)=>{setPasswordSign(e.target.value)}} value={passwordSign} type='text' placeholder='Password...'></input>
          {signMessage}
          <button onClick={()=>{signUp()}}>Sign Up</button>
      </div>
      <div className='loginSign__logIn'>
        <h3>Log In  <FontAwesomeIcon icon={faPen} /></h3>
          <label>Username</label>
          <input onChange={(e)=>{setNameLog(e.target.value)}} type='text' placeholder='Username...'></input>
          <label>Password</label>
          <input onChange={(e)=>{setPasswordLog(e.target.value)}} type='text' placeholder='Password...'></input>
          {logMessage}
          <button onClick={()=>{logIn()}}>Log In</button>
      </div>
    </div>
  )
}

export default LoginSign