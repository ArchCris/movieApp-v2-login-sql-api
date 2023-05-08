import React from 'react'
import './sessionCredential.css'

const SessionCredential = ({props}) => {
    
  return (
    <div className='sessionCredential__conteiner'>
        <div className='sessionCredential__light'></div>
        <p className='sessionCredential__title'>{props.loginStatus?.name.toUpperCase()}</p>
        <button className='sessionCredential__button' onClick={()=>{props.closeSession()}}>Log out</button>
    </div>
  )
}

export default SessionCredential