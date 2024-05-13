import React from 'react'
import "./details.scss"
import DetailsBanner from './detailsBanner.jsx/DetailsBanner'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'


const Details = () => {
  
  const {id, mediaType} = useParams()
  const {data} = useFetch(`/${mediaType}/${id}`)
  console.log(data)

  return (
    <div>
      <DetailsBanner data={data} />
    </div>
  )
}

export default Details
