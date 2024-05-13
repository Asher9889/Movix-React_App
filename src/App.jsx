import { useEffect } from 'react';
import './App.scss'
import fetchDataFromApi from './utils/axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home, SearchResults, Explore, Details, PageNotFound } from "./pages/index"
import {Header, Footer} from "./components/index"
import { useSelector } from 'react-redux';
import { getApiData, getGenresData } from './store/reducers/homeSlice';
import { useDispatch } from 'react-redux';
import VideoPlay from './components/videoPlay/VideoPlay';

function App() {
  const dispatch = useDispatch();
  


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
          <Route path='/:mediaType/:id' element={<Details/>}>

          <Route path='/:mediaType/:id/video' element={<VideoPlay/>}/>

          </Route>
          <Route path='/search/:query' element={<SearchResults/>}/>
          <Route path='/explore/:mediaType' element={<Explore/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
    </>
  )
}

export default App;
