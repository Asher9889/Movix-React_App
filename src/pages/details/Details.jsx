import React, { useEffect, useState } from "react";
import "./details.scss";
import DetailsBanner from "./detailsBanner.jsx/DetailsBanner";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Cast from "./cast/Cast";
import VideoSection from "./videoSection/VideoSection";
import Recommended from "./recommended/Recommended";
import Similar from "./similar/Similar";

const Details = () => {
  // const [trailer, setTrailer] = useState(null);
  const { id, mediaType } = useParams();
  const { data } = useFetch(`/${mediaType}/${id}`);

  const response = useFetch(`/${mediaType}/${id}/credits`);
  console.log(response);
  const credit = response.data;
  // console.log(data)

  const res = useFetch(`/${mediaType}/${id}/videos`);
  const videoData = res?.data?.results

  // if(res) {setTrailer(res)}

  
  const {data: r} = useFetch(`/${mediaType}/${id}/recommendations`)
    
  const recommend = r && r.results

  const {data: s} = useFetch(`/${mediaType}/${id}/similar`)
    
  const similar = s && s.results

  return (
    <div>
      <DetailsBanner data={data} credit={credit} res={videoData} />
      <Cast credit={credit} />
      <VideoSection res={videoData} />
      <Recommended res={recommend} />
      <Similar res={similar}/>
    </div>
  );
};

export default Details;
