import React, { useEffect, useState } from 'react'
import './movie.css'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios'
import { loginContext } from '../../context/ContextProvider';
import ScoreBadge from '../../components/ScoreBadge/ScoreBadge';


const Movie = () => {

    const {loginStatus} = useContext(loginContext)

    let  movieId  = useParams();

    const[movieDetail,setMovieDetail]=useState(null)

    const getMovie = () =>{
            axios.post('http://localhost:3001/movie/id',{id:movieId}).then(resp=>{
            setMovieDetail(resp.data)
        })
    }

    useEffect(() => {
        getMovie()
    }, []);

  return (
    <>
    <div className='movieDetail__conteiner'>
        {loginStatus && movieDetail!=null ?
        <div className='movieDetail__movieConteiner'>
            <div className='movieDetail__img'>
                <img className='movieDetail__poster' alt='Movie poster' src={`https://image.tmdb.org/t/p/w400${movieDetail?.poster_path}`}></img>
            </div>
            <div className='movieDetail__data'>
              <div className='movieDetail__title'><p className='identifier'>Title: </p>{movieDetail?.original_title}</div>
              <div className='movieDetail__caption'><p className='identifier'>Description: </p>{movieDetail?.overview}</div>
              <div className='movieDetail__caption'><p className='identifier'>Release date: </p>{movieDetail?.release_date}</div>
              <div className='movieDetail__caption'><p className='identifier'>Genres: </p>{movieDetail?.genres.map((gen,key)=>{return(<span className='genre' key={key}>{gen.name}</span>)})}</div>
              <div className='movieDetail__caption'><p className='identifier'>Duration: </p>{(movieDetail?.runtime/60).toFixed(2)}hs</div>
              <div className='movieDetail__caption'><p className='identifier'>Movie buddget: </p>{movieDetail?.budget!==0 ? '$'+movieDetail?.budget : "No data"}</div>
              <ScoreBadge data={{totalVote:movieDetail?.vote_count,averageScore:movieDetail?.vote_average}}/>
            </div>
        </div> :
        <p>Please Login to see the movies</p>}
    </div>
    <div className='movieDetail__conteiner2'>

    </div>
    </>
  )
}

export default Movie