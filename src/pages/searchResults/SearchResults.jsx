import React, { useEffect } from 'react'
import "./style.scss"
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import { Carousel, ContentWrapper, Genres } from '../../components';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {Image} from '../../components';
import noposter from "../../assets/no-poster.png"

const SearchResults = () => {
  const {info} = useSelector((state)=> state.home)
  const {query} = useParams();

  
    const {data} = useFetch(`/search/multi?query=${query}`)
    const newData = data && data.results
    console.log(newData)
  

  
  return (
    <div className='searchResults'>
      <ContentWrapper>
        <div className="items">
          {newData?.map((e)=>(
            <div className="item" key={e.id}>
            <Image src={e.poster_path ? info + "original" + e.poster_path : noposter}/>
            <p className='title'>{e.original_name || e.name}</p>
           
            <p className='title date'>{dayjs(e.first_air_date).format("MMM D, YYYY")}</p>
          </div>
          ))}
        </div>
      </ContentWrapper>
    
    </div>
  )
}

export default SearchResults
