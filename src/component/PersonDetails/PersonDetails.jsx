
import React, { useEffect, useState } from 'react'
import  Axios  from 'axios';
import { useParams } from 'react-router-dom';
import avatar from '../../imgNot.jpg'
export default function PersonDetails() {
    let paramPerson = useParams()
    const [personDetails, setPersonDetails] = useState(null)
    async function getPersonDetails(id){
        let {data} = await Axios(`https://api.themoviedb.org/3/person/${id}?api_key=47c8c3a70fa59926cb0e5bac9d8cb66d&language=en-US`);
        setPersonDetails(data)
    }
    useEffect(() => {
        getPersonDetails(paramPerson.id)
    }, [])
    
  return (
   <>
    <div>
        {personDetails ? 
        <div className="row">
            <div className="col-md-3 pt-5">
       

                 {personDetails.profile_path ===null ? <img src={avatar} className='w-100'/> :<img className='w-100' src={'https://image.tmdb.org/t/p/w500'+personDetails.profile_path} alt="" />}
          
     
             </div>
             <div className="col-md-9 pt-4">
                <h3>{personDetails.name}</h3>
                <h5 className=' text-muted'>known_for_department : {personDetails.known_for_department}</h5>
                <ul style={{marginLeft:'-30px'}}>
                    <li>Popularity : {personDetails.popularity}</li>
                    <li>place_of_birth : {personDetails.place_of_birth}</li>
                    <li>birthday : {personDetails.birthday}</li>
                </ul>
                <p className='text-muted'>{personDetails.biography}</p>
            </div>
         </div>
        : <div className='d-flex align-items-center justify-content-center vh-100 '><i className="spinner-border"></i></div>}
    </div>
   </>
  )
}
