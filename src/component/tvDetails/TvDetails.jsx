import React, { useEffect, useState } from 'react'
import  Axios  from 'axios';
import { useParams } from 'react-router-dom';

export default function TvDetails() {
    let paramTv = useParams()
    const [tvDetails, setTvDetails] = useState(null)
    async function getTvDetails(id){
        let {data} = await Axios(`https://api.themoviedb.org/3/tv/${id}?api_key=47c8c3a70fa59926cb0e5bac9d8cb66d&language=en-US`);
        setTvDetails(data)
    }
    useEffect(() => {
        getTvDetails(paramTv.id)
    }, [])
    
  return (
   <>
    <div>
        {tvDetails ? 
        <div className="row" style={{marginTop:'50px'}}>
            <div className="col-md-3">
                 <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+tvDetails.poster_path} alt="" />
             </div>
             <div className="col-md-9 pt-4">
                <h3>{tvDetails.name}</h3>
                <h5 className='ps-1 text-muted'>status : {tvDetails.status}</h5>
                   <p>Vote : <span>{tvDetails.vote_average.toFixed(1)}</span> </p>
                   <p>Vote Count : {tvDetails.vote_count}</p>
                   <p>Popularity : {tvDetails.popularity}</p>
                   <p>first_air_date : {tvDetails.first_air_date}</p>
                   <p>last_air_date : {tvDetails.last_air_date}</p>
                <p className='text-muted'>{tvDetails.overview}</p>
            </div>
         </div>
        : <div className='d-flex align-items-center justify-content-center vh-100 '><i className="spinner-border"></i></div>}
    </div>
   </>
  )
}
