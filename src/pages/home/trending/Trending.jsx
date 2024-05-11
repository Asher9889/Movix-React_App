import React, { useState } from "react";
import "./style.scss";
import { ContentWrapper, SwitchTab, Carousel } from "../../../components";
import useFetch from "../../../hooks/useFetch";
const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");
  // console.log(endPoint)
  
    const {data, loading} = useFetch(`/trending/all/${endPoint}`);
    const rawData = data?.results
    console.log(rawData)
    console.log(loading)
  

  return (
    <div className="trending">
      <ContentWrapper>
        <p>Trending</p>

        <SwitchTab data={["Day", "Week"]} setEndPoint={setEndPoint} />
      </ContentWrapper>
      <Carousel data={rawData} loading={loading} />
    </div>
  );
};

export default Trending;
