import React, {useState} from "react";
import "./style.scss";
import { ContentWrapper } from "../../../components";
import { Link, Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import {Image} from "../../../components";
import ReactPlayer from "react-player";
import {getVideoData, removeVideoData} from "../../../store/reducers/homeSlice"
import VideoPlay from "../../../components/videoPlay/VideoPlay";
import { useDispatch } from "react-redux";

const VideoSection = ({ res }) => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate();
  const {mediaType, id} = useParams()
  const dispatch = useDispatch();
  // console.log(res)

  const videoShowHandle = (e)=>{
    // e.preventDefault()
    // e.stopPropagation()
    dispatch(removeVideoData())
    console.log("clicked")
    dispatch(getVideoData(e))
    setShow(true)
    navigate(`/${mediaType}/${id}`)
  }

  const handleCloseClick = (e) => {
    console.log("Close button clicked");
    e.stopPropagation()
    setShow(false)
    // el.scrollTop = 0
    navigate(-1);
    // navigate(-1)
  };

  return (
    <div className="official-video">
      <ContentWrapper>
        <p className="name">Official Videos</p>
        <div className="items">
          {res && res.map((e) => (
            // <a key={e.name} to={`/${mediaType}/${id}/video`}>
              <div key={e.id} onClick={()=> videoShowHandle(e)}  className="item">
                <Image src={`https://img.youtube.com/vi/${e.key}/mqdefault.jpg`} >
                </Image>
                {console.log(" ai am from video section")}
                {/* <ReactPlayer className="reactPlayer" src={`https://www.youtube.com/watch?v=${res && res.key}`}/> */}
                
                {/* {e.name} */}
                {/* <video src=""></video> */}
                
              </div>
              
            // </a>
          ))}
        </div>
      </ContentWrapper>
      
      {show && <VideoPlay setShow={setShow} handleCloseClick={handleCloseClick} />}
    </div>
  );
};

export default VideoSection;
