import React from 'react'
import "./style.scss"
import ReactPlayer from 'react-player'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


const VideoPlay = () => { 
  const {mediaType, id} = useParams()

 const navigate = useNavigate()

 const {video} = useSelector((state)=> state.home)

//  console.log(video)
 

//  console.log(trailer)

  return (
   <div onClick={()=>navigate(-1)} className='videoPlayer-div'>
    <div className='videoPlayer'>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${video && video.key}`}
        controls="true"
        width="350px"
        >

      </ReactPlayer>
      <div className="opacityLayer"></div>
      {/* <span className='close' onClick={()=>navigate(`/${mediaType}`)} >Close</span> */}

    </div>
      
   </div>
  )
}

export default VideoPlay
