import { useEffect } from 'react';
import './App.scss'
import fetchDataFromApi from './utils/axios';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import {Home, SearchResults, Explore, Details, PageNotFound, Login, CreateAccount } from "./pages/index"
import {Header, Footer} from "./components/index"
import { useSelector } from 'react-redux';
import { getApiData, getGenresData } from './store/reducers/homeSlice';
import { useDispatch } from 'react-redux';
import {Toast} from './components/index';
import VideoPlay from './components/videoPlay/VideoPlay';
import { useFirebase } from './context/FirebaseContext';

function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const {isLoggedIn} = useFirebase();

  useEffect(() => {
    getDataFromApi()
    genersCall()
  },[])

  const getDataFromApi = async () => {
    const {images} = await fetchDataFromApi("/configuration")
    // console.log(images)
    dispatch(getApiData(images.base_url))
  }

    const genersCall = async () =>{
      let endPoints = ["movie", "tv"]
      let allGeners = {}
      let promises = []

      endPoints.forEach((elem)=>{
        promises.push(fetchDataFromApi(`/genre/${elem}/list`))
      })

      const data = await Promise.all(promises)
      // console.log(data)

      data.map(({genres})=>{
        return genres.map((elem,index) =>{
          return allGeners[elem.id] = elem
        })
    })

    dispatch(getGenresData(allGeners))
    // console.log(allGeners)
    }

   

  

  return (
   
    <>
    <BrowserRouter>
     <Header/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<CreateAccount/>}/>
          <Route path='/:mediaType/:id' element={<Details/>}>

            {/* <Route path='/:mediaType/:id/video' element={<VideoPlay/>}/> */}

          </Route>
          <Route path='/search/:mediaType/:id' element={<Details/>}/>
          <Route path='/search/:query' element={<SearchResults/>}/>
          <Route path='/explore/:mediaType' element={<Explore/>}/>
          <Route path='*' element={<PageNotFound/>}/>
          {/* <Route path='/toast' element={<Toast/>}/> */}
        </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
    </>
  )
}

export default App;
