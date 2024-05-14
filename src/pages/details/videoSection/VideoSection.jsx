import React, {useState} from "react";
import "./style.scss";
import { ContentWrapper } from "../../../components";
import { Link, Outlet, useParams } from "react-router-dom";
import {Image} from "../../../components";
import ReactPlayer from "react-player";
import {getVideoData} from "../../../store/reducers/homeSlice"
import VideoPlay from "../../../components/videoPlay/VideoPlay";
import { useDispatch } from "react-redux";

const VideoSection = ({ res }) => {
  const [videoID, setVideoID] = useState(null);
  const [show, setShow] = useState(false)

  const {mediaType, id} = useParams()
  const dispatch = useDispatch();
  console.log(res)

  const videoShowHandle = (e)=>{
    console.log("clicked")
    dispatch(getVideoData(e))
    setInterval(()=>{

      setShow(true)
    },500)
  }

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
                {/* <ReactPlayer className="reactPlayer" src={`https://www.youtube.com/watch?v=${res && res.key}`}/> */}
                
                {/* {e.name} */}
                {/* <video src=""></video> */}
              </div>
            // </a>
          ))}
        </div>
      </ContentWrapper>
      {show && <VideoPlay />}
    </div>
  );
};

export default VideoSection;
