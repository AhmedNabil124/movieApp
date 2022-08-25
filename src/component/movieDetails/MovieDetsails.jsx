import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import  Axios  from 'axios';

export default function MovieDetails() {
    let parameter = useParams();
    const [movieDetails, setMovieDetails] = useState(null)
 
    
    async function getMovieDetails(id){
        let {data} = await Axios(`https://api.themoviedb.org/3/movie/${id}?api_key=47c8c3a70fa59926cb0e5bac9d8cb66d&language=en-US`);
        setMovieDetails(data);
    }
    useEffect(() => {
        getMovieDetails(parameter.id)
    }, [])


  return (
    <>
    <div>
        {movieDetails?   <div className="row mt-5  ">
            <div className="col-md-3">
                <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movieDetails.poster_path} alt="" />
            </div>
            <div className="col-md-9 pt-4">
                <h3>{movieDetails.title}</h3>
                <ul style={{marginLeft:'-30px'}}>
                    <li>Vote : {movieDetails.vote_average.toFixed(1)}</li>
                    <li>Vote Count: {movieDetails.vote_count}</li>
                    <li>Popularity: {movieDetails.popularity}</li>
                    <li>release_date: {movieDetails.release_date}</li>
                </ul>
                <p className='text-muted'>{movieDetails.overview}</p>
            </div>
        </div> : <div className='d-flex align-items-center justify-content-center vh-100 '><i className="spinner-border"></i></div> }
    </div>
    </>
  )
}
