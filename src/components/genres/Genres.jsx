import React from 'react'
import "./style.scss"
import { useSelector } from 'react-redux'
const Genres = ({data}) => {
    const {genres} = useSelector((state)=> state.home)
    // console.log(genres)
    // console.log(data)
  return (
    <div class='genres'>
      {data?.map((e)=>{
        if(!data || !genres) return;
        return <p key={e}>{genres[e]?.name}</p>
      })}
    </div>
  )
}

export default Genres
