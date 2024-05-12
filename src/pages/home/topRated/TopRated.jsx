import React, { useState } from "react";
import "./style.scss";
import { ContentWrapper, SwitchTab, Carousel } from "../../../components";
import useFetch from "../../../hooks/useFetch";


const TopRated = () => {
  const [endPoint, setEndPoint] = useState("movie");
  // console.log(endPoint)
  
    const {data, loading} = useFetch(`/${endPoint}/top_rated`);
    const rawData = data?.results
    console.log(rawData)
    console.log(loading)
  

  return (
    <div className="trending">
      <ContentWrapper>
        <p>Top Rated</p>

        <SwitchTab data={["Movie", "Tv"]} setEndPoint={setEndPoint} />
      </ContentWrapper>
      <Carousel data={rawData} loading={loading} />
    </div>
  );
};

export default TopRated;
