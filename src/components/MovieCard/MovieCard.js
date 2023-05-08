import React from 'react'
import './movieCard.css'

const MovieCard = (props) => {
  return (
    <div className='movieCard__conteiner'>
        <img className='movieCard__poster' alt='Movie poster' src={`https://image.tmdb.org/t/p/w400${props.img}`}></img>
    </div>
  )
}

export default MovieCard