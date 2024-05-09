import { useEffect } from 'react';
import './App.scss'
import fetchDataFromApi from './utils/axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home, SearchResults, Explore, Details, PageNotFound } from "./pages/index"
import {Header, Footer} from "./components/index"
import { useSelector } from 'react-redux';
import { getApiData } from './store/reducers/homeSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispath = useDispatch();


  useEffect(() => {
    getDataFromApi()
  },[])

  const getDataFromApi = async () => {
    const {images} = await fetchDataFromApi("/configuration")
    dispath(getApiData(images.secure_base_url))

  }

  

  return (
   
    <>
    <BrowserRouter>
     <Header/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:mediaType/:id' element={<Details/>}/>
          <Route path='/search/:query' element={<SearchResults/>}/>
          <Route path='/explore/:mediaType' element={<Explore/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App;
