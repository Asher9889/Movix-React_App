import React, {useState} from 'react'
import "./style.scss"
import ReactPlayer from 'react-player'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


const VideoPlay = ({setShow}) => { 
  // const [show, setShow] = useState(false)
  const {mediaType, id} = useParams()

 const navigate = useNavigate()

 const {video} = useSelector((state)=> state.home)

//  console.log(video)
//  console.log(trailer)

const handleCloseClick = (e) => {
  console.log("Close button clicked");
  e.stopPropagation()
  // setShow(false)
  navigate(-1);
  // navigate(-1)
};

  return (
   <div onClick={()=>navigate(-1)} className='videoPlayer-div'>
    <div className='videoPlayer'>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${video && video.key}`}
        controls="true"
        width="100%"
        >

      </ReactPlayer>
      <div className="opacityLayer"></div>
      <span className='close' onClick={(e) => handleCloseClick(e)} >Close</span>

    </div>
      
   </div>
  )
}

export default VideoPlay
