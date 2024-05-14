import React from 'react'
import "./details.scss"
import DetailsBanner from './detailsBanner.jsx/DetailsBanner'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Cast from './cast/Cast'
import VideoSection from './videoSection/VideoSection'

const Details = () => {
  
  const {id, mediaType} = useParams()
  const {data} = useFetch(`/${mediaType}/${id}`)

  const response = useFetch(`/${mediaType}/${id}/credits`);
  console.log(response);
  const credit = response.data
  // console.log(data)

  const res = useFetch(`/${mediaType}/${id}/videos`);

  return (
    <div>
      <DetailsBanner data={data} credit={credit}/>
      <Cast credit={credit} />
      <VideoSection res={res}/>
    </div>
  )
}

export default Details
