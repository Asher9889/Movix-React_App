import React from "react";
import "./style.scss";
import { ContentWrapper } from "../../../components";
import { Link, Outlet, useParams } from "react-router-dom";
import {Image} from "../../../components";

const VideoSection = ({ res }) => {
const {mediaType, id} = useParams()
// console.log(data)
const videos = res?.data?.results
  console.log(videos)

  return (
    <div className="official-video">
      <ContentWrapper>
        <p className="name">Official Videos</p>
        <div className="items">
          {videos && videos.map((e) => (
            <Link to={`/${mediaType}/${id}/video`}>
            <div className="item">
              <Image src={`https://img.youtube.com/vi/${e.key}/mqdefault.jpg`} />
              
            </div>
            {videos.name}
            </Link>
          ))}
        </div>
      </ContentWrapper>
      <Outlet/>
    </div>
  );
};

export default VideoSection;
