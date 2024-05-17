import React, {useState} from 'react'
import "./style.scss"
import ReactPlayer from 'react-player'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeVideoData } from '../../store/reducers/homeSlice'


const VideoPlay = ({setShowTrailer, setShow, videoKey}) => { 

  const {video} = useSelector((state)=> state.home)
  const dispatch = useDispatch()
  // const [show, setShow] = useState(false)
  const {mediaType, id} = useParams()
  // console.log(setShow)
  console.log(videoKey)

 const navigate = useNavigate()
  // const el = document.querySelector("videoPlayer-div")

//  console.log(video)
//  console.log(trailer)

const handleCloseClick = (e) => {
  console.log("Close button clicked");
  e.stopPropagation()
  if(setShowTrailer)dispatch(setShowTrailer(false))
  if(setShow)dispatch(setShow(false))
  
  
  // dispatch(removeVideoData())
  // el.scrollTop = 0
  // navigate(-1)
};

  return (
   <div  className='videoPlayer-div'>
    <div className='videoPlayer'>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoKey}`}
        controls="true"
        width="100%"
        // height="100%"
        >

      </ReactPlayer>
      <div className="opacityLayer"></div>
      <span className='close' onClick={(e) => handleCloseClick(e)} >Close</span>

    </div>
      
   </div>
  )
}

export default VideoPlay
