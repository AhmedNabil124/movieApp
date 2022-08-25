import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Person() {
  const [trendingPerson, setTrendingPerson] = useState([])
  let nums = new Array(9).fill(1).map((el,index)=> index+1);
  console.log(nums);
 async function getPerson(pageNumber){
  let {data} = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=47c8c3a70fa59926cb0e5bac9d8cb66d&language=en-US&page=${pageNumber}`);
  setTrendingPerson(data.results);
  }

  useEffect(() => {
    getPerson(1)
  }, [])
  
  return (
    <>
           {trendingPerson ? <div className="row g-5 d-flex justify-content-center ">
              {trendingPerson.map((person,i)=><div key={i} className='col-md-2'>
                <div className="person">
                <Link to={`/personDetails/${person.id}`}>
                  <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+person.profile_path} alt="" />
                    <h3 className='h4 my-2'>{person.title}</h3>
                </Link>
                </div>
              </div>)}
          </div>: <div className='d-flex align-items-center justify-content-center vh-100 '><i className="spinner-border"></i></div> }

          <nav aria-label="Page navigation example ">
            <ul className="pagination d-flex justify-content-center mt-5">
              {
                nums.map((pageNum,i)=><li onClick={()=>getPerson(pageNum)} key={i} className="page-item active"><a className="page-link bg-transparent text-white">{pageNum}</a></li>)
              }
            </ul>
          </nav>
         
    </>
  )
}
