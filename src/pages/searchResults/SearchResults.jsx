import React, { useEffect } from 'react'
import "./style.scss"
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import { Carousel, ContentWrapper, Genres } from '../../components';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {Image} from '../../components';
import noposter from "../../assets/no-poster.png"

const SearchResults = () => {
  const {info} = useSelector((state)=> state.home)
  const {query} = useParams();
  const navigate = useNavigate();

  
    const {data} = useFetch(`/search/multi?query=${query}`)
    const newData = data && data.results
    console.log(newData)
  

  
  return (
    <div class='searchResults'>
      <ContentWrapper>
        <div class="items">
          {newData?.map((e)=>(
          <div onClick={()=> navigate(`/search/${e.media_type}/${e.id}`)} class="item" key={e.id}>
            <Image src={e.poster_path ? info + "original" + e.poster_path : noposter}/>
            <p class='title'>{e.original_name || e.name || e.title}</p>
           
            <p class='title date'>{dayjs(e.first_air_date || e.release_date).format("MMM D, YYYY")}</p>
          </div>
          ))}
        </div>
      </ContentWrapper>
    
    </div>
  )
}

export default SearchResults
