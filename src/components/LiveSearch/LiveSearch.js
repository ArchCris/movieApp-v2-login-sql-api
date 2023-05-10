import React from 'react'
import './liveSearch.css'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { loginContext } from '../../context/ContextProvider'


const LiveSearch = () => {

    const {loginStatus} = useContext(loginContext)

    const[searchingMovies,setSearchingMovies]=useState('')
    const[searchedMovies,setSearchedMovies]=useState([])

    const handleSearch = (e) =>{
        
        if(loginStatus){
        setSearchingMovies(e.target.value)
        axios.post(`${process.env.REACT_APP_LOCAL_URL}movieSearch`,{string:searchingMovies}).then(result=>{
            setSearchedMovies(result.data.results)
        })
    }
    }
    

  return (
    <div className='liveSearch__conteiner'>
        <input value={searchingMovies} onChange={(e)=>{handleSearch(e)}} className='liveSearch__input' type='text'></input>
        <ul className='liveSearch__results' onMouseLeave={() => {setSearchedMovies([]);setSearchingMovies('')}} >
            {searchedMovies.slice(0,5).map((movie,key)=>{
                return(
                    <a className='liveSearch__result' href={`/movie/${movie.id}`} key={key}>{movie.title}</a>
                )
            })}
        </ul>
    </div>
  )
}

export default LiveSearch