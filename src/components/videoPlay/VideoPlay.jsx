import React, {useState} from 'react'
import "./style.scss"
import ReactPlayer from 'react-player'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


const VideoPlay = () => { 
  // const [show, setShow] = useState(false)
  const {mediaType, id} = useParams()

 const navigate = useNavigate()

 const {video} = useSelector((state)=> state.home)

//  console.log(video)
//  console.log(trailer)

const handleCloseClick = () => {
  console.log("Close button clicked");
  e.stopPropagation()
  // setShow(false)
  navigate(`/${mediaType}/${id}`);
  // navigate(-1)
};

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
      <span className='close' onClick={(e) => handleCloseClick(e)} >Close</span>

    </div>
      
   </div>
  )
}

export default VideoPlay
