import React, { useEffect,useState } from 'react'
import './displayMovies.css'
import axios from 'axios'
import MovieCard from '../MovieCard/MovieCard'

const DisplayMovies = () => {

  const[moviesToDisplay,setMoviesToDisplay]=useState([])

    const getPopularMovies = () =>{
        axios.get(`${process.env.REACT_APP_LOCAL_URL}movies`).then(resp=>{
          setMoviesToDisplay(resp.data.results)
    })
    }

    useEffect(() => {
      getPopularMovies()
    }, []);

  return (
    <div className='displayMovies__conteiner'>
        {moviesToDisplay.map((movie,key)=>{
          return(
            <MovieCard key={key} id={movie.id} img={movie.poster_path} title={movie.original_title} vote={movie.vote_average}/>
          )
        })}
    </div>
  )
}

export default DisplayMovies