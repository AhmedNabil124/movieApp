import axios from 'axios'
import React, { useEffect, useState } from 'react'
import avatar from '../../imgNot.jpg'
import styleHome from './home.module.css'
import { Link } from 'react-router-dom';
export default function Home() {
  const [trendingMovie, setTrendingMovie] = useState([])
  const [trendingTv, setTrendingTv] = useState([])
  const [trendingPerson, setTrendingPerson] = useState([])

 async function getTrending(mediaType , callback){
  let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=47c8c3a70fa59926cb0e5bac9d8cb66d`);
  callback(data.results.slice(0,10));
  console.log(data.results);
  }

  useEffect(() => {
    getTrending('movie',setTrendingMovie)
    getTrending('tv',setTrendingTv)
    getTrending('person',setTrendingPerson)
  }, [])
  
  return (
    <>


  
<div className="row g-5">
  <div className="col-md-4 d-flex align-items-center  justify-content-center">
    <div>
      <div className="brd w-25 mb-2"></div>
      <h2 className='h3'>Trending <br/> Movies <br/> To Watch Right Now</h2>
      <p className='text-muted'>Top Trending Movies By Day</p>
      <div className="brd w-75 mt-2"></div>
      </div>
  </div>
  {trendingMovie.map((movie,i)=><div key={i} className='col-md-2'>
    <div className="movie">
    <Link to={`/moviedetails/${movie.id}`}>
      <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt="" />
        <h3 className='h4 my-2'>{movie.title}</h3>
    </Link>
    </div>
  </div>)}
</div>


<div className="row g-5 my-5">
  <div className="col-md-4 d-flex align-items-center  justify-content-center">
    <div>
      <div className="brd w-25 mb-2"></div>
      <h2 className='h3'>Trending <br/> Tv <br/> To Watch Right Now</h2>
      <p className='text-muted'>Top Trending Tv By Day</p>
      <div className="brd w-75 mt-2"></div>
      </div>
  </div>
  {trendingTv.map((tv,i)=><div key={i} className='col-md-2'>
    <div className="tv">
    <Link to={`/tvDetails/${tv.id}`}>
      <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+tv.poster_path} alt="" />
        <h3 className='h4 my-2'>{tv.name}</h3>
    </Link>
    </div>
  </div>)}
</div>


<div className="row g-5 ">
  <div className="col-md-4 d-flex align-items-center  justify-content-center">
    <div>
      <div className="brd w-25 mb-2"></div>
      <h2 className='h3'>Trending <br/> Person <br/> To Watch Right Now</h2>
      <p className='text-muted'>Top Trending Person By Day</p>
      <div className="brd w-75 mt-2"></div>
      </div>
  </div>
  {trendingPerson.map((person,i)=><div key={i} className='col-md-2'>
    <div className="person">
    <Link to={`/personDetails/${person.id}`}>
        {person.profile_path ===null ? <img src={avatar} className={`${styleHome.imgNot} w-100`} /> : 
          
          <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+person.profile_path} alt="" />}
      <h3 className='h4 my-2'>{person.name}</h3>
    </Link>
        </div>
      </div>)}

  
</div>

    </>
  )
}
