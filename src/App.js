
import { useEffect, useState } from 'react';
import jwtDecode  from 'jwt-decode';
import { Routes,Route , Navigate, useNavigate } from 'react-router-dom';
import Home from './component/Home/Home';
import About from './component/About/About';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Movies from './component/movies/Movies';
import MovieDetails from './component/movieDetails/MovieDetsails';
import Person from './component/Person/Person';
import PersonDetails from './component/PersonDetails/PersonDetails';
import Tv from './component/Tv/Tv';
import TvDetails from './component/tvDetails/TvDetails';
import Footer from './component/footer/Footer';
import Notfound from './component/notfound/Notfound';
import Navbar from './component/navbar/Navbar';

function App() {
  let navigate = useNavigate();
  const [userData, setUserData] = useState(null)
     useEffect(() => {
       
      if(localStorage.getItem('userToken'))
      {
        saveUserData()
      }
       
     }, [])

     function saveUserData()
     {
      let encodedData = localStorage.getItem('userToken');
      let decodedData = jwtDecode(encodedData);
      setUserData(decodedData);
      // console.log(decodedData);
     }


     function ProtectData({children})
     {
      if(localStorage.getItem('userToken') === null){
        // navigate to login
        return <Navigate to='/login' />
      }
      else{
        return children;
      }
     }


     function logOut()
     {
      setUserData(null);
      localStorage.removeItem('userToken');
      navigate('/login');
     }
  return (
    <>
        <Navbar userData={userData} logOut={logOut} />
        <div className='container'>
          <Routes>
            <Route path='/' element={<ProtectData><Home/></ProtectData>}/>
            <Route path='home' element={<ProtectData><Home/></ProtectData>}/>
            <Route path='about' element={<ProtectData><About userWelcom={userData}/></ProtectData>}/>
            <Route path='movies' element={ <ProtectData><Movies/></ProtectData>}/>
            <Route path='person' element={ <ProtectData><Person/></ProtectData>}/>
            <Route path='tv' element={ <ProtectData><Tv/></ProtectData>}/>
            <Route path='moviedetails' element={<ProtectData><MovieDetails/></ProtectData>}>
              <Route path=':id' element={<ProtectData><MovieDetails/></ProtectData>} />
          </Route>
          <Route path='tvdetails' element={<ProtectData><TvDetails/></ProtectData>}>
              <Route path=':id' element={<ProtectData><TvDetails/></ProtectData>} />
          </Route>
          <Route path='personDetails' element={<ProtectData><PersonDetails/></ProtectData>}>
              <Route path=':id' element={<ProtectData><PersonDetails/></ProtectData>} />
          </Route>
            <Route path='register' element={ <Register/>}/>
            <Route path='login' element={ <Login saveUserData={saveUserData}/>}/>
            <Route path='*' element={ <Notfound/>}/>
          </Routes>
        </div>
        <Footer/>
    </>
  );
}

export default App;
