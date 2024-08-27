import React, { useState } from "react";
import "./style.scss";
import { ContentWrapper, SwitchTab, Carousel } from "../../../components";
import useFetch from "../../../hooks/useFetch";



const Popular = () => {
  const [endPoint, setEndPoint] = useState("movie");
  // console.log(endPoint)
  
    const {data, loading} = useFetch(`/${endPoint}/popular`);
    const rawData = data?.results
    console.log(rawData)
    console.log(loading)
  

  return <>
    {rawData ? <div class="trending">
      <ContentWrapper>
        <p>What's Popular</p>

        <SwitchTab data={["Movie", "Tv"]} setEndPoint={setEndPoint} />
      </ContentWrapper>
      <Carousel data={rawData} loading={loading} endPoint={endPoint} />
    </div> : null}
    </>
}

export default Popular;
