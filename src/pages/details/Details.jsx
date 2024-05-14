import React, { useEffect, useState } from "react";
import "./details.scss";
import DetailsBanner from "./detailsBanner.jsx/DetailsBanner";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Cast from "./cast/Cast";
import VideoSection from "./videoSection/VideoSection";

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
    


  return (
    <div>
      <DetailsBanner data={data} credit={credit} res={videoData} />
      <Cast credit={credit} />
      <VideoSection res={videoData} />
    </div>
  );
};

export default Details;
