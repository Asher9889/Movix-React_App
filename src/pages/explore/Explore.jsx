import React, { useEffect, useState } from 'react'
  import "./explore.scss"
  import { useNavigate, useParams } from 'react-router-dom'
  import useFetch from '../../hooks/useFetch';
  import { Carousel, ContentWrapper, Genres } from '../../components';
  import { useSelector } from 'react-redux';
  import dayjs from 'dayjs';
  import {Image} from '../../components';
  import noposter from "../../assets/no-poster.png"
  import fetchDataFromApi from '../../utils/axios';
  import InfiniteScroll from 'react-infinite-scroll-component';
  
  const Explore = () => {
    const [page, setPage] = useState(1)
    const [newData, setNewData] = useState([])
    const {info} = useSelector((state)=> state.home)
    const {mediaType} = useParams();
    // console.log(mediaType)
    const navigate = useNavigate();
  
    
      // const {data} = useFetch(`/trending/${mediaType}/day?page=1`)
      const exploreData = async() => {
        const res = await fetchDataFromApi(`/trending/${mediaType}/day?page=${page}`)
        console.log(res)
        const newData = res && res.results
        console.log(newData)
        setNewData((prev)=> [...prev, ...newData])
        setPage(page + 1);
        
      }
        
        // setPage(page + 1)
      
    useEffect(()=>{
      setNewData([])
      setPage(1)
      exploreData()
    },[mediaType])
  
    
    return (
      <div className='searchResults'>
      <ContentWrapper>
        <div className="items">
          {newData && newData.map((e)=>(
          <div onClick={()=> navigate(`/search/${e.media_type}/${e.id}`)} className="item" key={e.id}>
            <Image src={e.poster_path ? info + "original" + e.poster_path : noposter}/>
            <p className='title'>{e.original_name || e.name || e.title}</p>
           
            <p className='title date'>{dayjs(e.first_air_date || e.release_date).format("MMM D, YYYY")}</p>
          </div>
          ))}
        </div>

            <InfiniteScroll
            dataLength={newData.length}
            next={exploreData}
            hasMore={true}
            >

            </InfiniteScroll>
       </ContentWrapper>
    
     </div>
      
      
    )
  }
  

  


export default Explore
