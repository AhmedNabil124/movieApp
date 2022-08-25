import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Movies() {
  const [trendingMovie, setTrendingMovie] = useState([])
  let nums = new Array(9).fill(1).map((el,index)=> index+1);
  console.log(nums);
 async function getTrending(pageNumber){
  let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=47c8c3a70fa59926cb0e5bac9d8cb66d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`);
  setTrendingMovie(data.results);
  }

  useEffect(() => {
    getTrending(1)
  }, [])
  
  return (
    <>
           {trendingMovie ? <div className="row g-5 d-flex justify-content-center ">
              {trendingMovie.map((movie,i)=><div key={i} className='col-md-2'>
                <div className="movie">
                <Link to={`/moviedetails/${movie.id}`}>
                  <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt="" />
                    <h3 className='h4 my-2'>{movie.title}</h3>
                </Link>
                </div>
              </div>)}
          </div>: <div className='d-flex align-items-center justify-content-center vh-100 '><i className="spinner-border"></i></div> }



          <nav aria-label="Page navigation example ">
            <ul className="pagination d-flex justify-content-center mt-5">
              {
                nums.map((pageNum,i)=><li onClick={()=>getTrending(pageNum)} key={i} className="page-item active"><a className="page-link bg-transparent text-white">{pageNum}</a></li>)
              }
            </ul>
          </nav>
    </>
  )
}
