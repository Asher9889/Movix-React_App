import React, {useEffect, useState} from "react";
import "./style.scss";
import { ContentWrapper } from "../../../components";
import { Link, Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import {Image} from "../../../components";
import ReactPlayer from "react-player";
import {getVideoData, removeVideoData, getOfficialVideosData} from "../../../store/reducers/homeSlice"
import VideoPlay from "../../../components/videoPlay/VideoPlay";
import { useDispatch } from "react-redux";

const VideoSection = ({ res }) => {
  const [show, setShow] = useState(false)
  const [videoKey, setVideoKey] = useState("")
  const navigate = useNavigate();
  const {mediaType, id} = useParams()
  const dispatch = useDispatch();
  // console.log(res)

  const videoShowHandle = (e)=>{
    // e.preventDefault()
    // e.stopPropagation()
    setShow(false)
    // dispatch(removeVideoData())
    console.log("clicked")
    dispatch(getOfficialVideosData(e))
    setVideoKey(e.key)
    setShow(true)
    // navigate(`/${mediaType}/${id}`)
  }

  const handleCloseClick = (e) => {
    console.log("Close button clicked");
    e.stopPropagation()
    setShow(false)
    // el.scrollTop = 0
    navigate(-1);
    // navigate(-1)
  };

  // useEffect(()=>{
  //   dispatch(removeVideoData())
  // },[handleCloseClick])

  return (
    <div class="official-video">
      <ContentWrapper>
        <p class="name">Official Videos</p>
        <div class="items">
          {res && res.map((e) => (
            // <a key={e.name} to={`/${mediaType}/${id}/video`}>
              <div key={e.id} onClick={()=> videoShowHandle(e)}  class="item">
                <Image src={`https://img.youtube.com/vi/${e.key}/mqdefault.jpg`} >
                </Image>
                {console.log(" ai am from video section")}
                {/* <ReactPlayer class="reactPlayer" src={`https://www.youtube.com/watch?v=${res && res.key}`}/> */}
                
                {/* {e.name} */}
                {/* <video src=""></video> */}
                
              </div>
              
            // </a>
          ))}
        </div>
      </ContentWrapper>
      
      {show && <VideoPlay setShow={setShow} handleCloseClick={handleCloseClick} videoKey={videoKey} />}
    </div>
  );
};

export default VideoSection;
