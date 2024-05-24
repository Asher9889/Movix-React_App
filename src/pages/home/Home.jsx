import React, { useEffect } from 'react'
import HeroBanner from "./heroBanner/HeroBanner"
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
import "./home.scss"
import { useFirebase } from '../../context/FirebaseContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const {isLoggedIn} = useFirebase()
  // console.log(data)

  useEffect(()=>{
    isLoggedIn ? navigate("/") : navigate("/login")
  },[])
  
  return (
    <div className='home'>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
     

     
    </div>
  )
}

export default Home
