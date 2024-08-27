import React, { useState } from "react";
import "./style.scss";
import { ContentWrapper, SwitchTab, Carousel } from "../../../components";
import useFetch from "../../../hooks/useFetch";


const Similar = ({res}) => {
  const [endPoint, setEndPoint] = useState("movie");
  // console.log(endPoint)
  
    const {data, loading} = useFetch(`/${endPoint}/top_rated`);
    const rawData = data?.results
    // console.log(rawData)
    // console.log(loading)

    // console.log(endPoint)
  

  return (
    <div class="trending">
      <ContentWrapper>
        <p>Similar</p>

        {/* <SwitchTab data={["Movie", "Tv"]} setEndPoint={setEndPoint} /> */}
      </ContentWrapper>
      {data && endPoint && <Carousel data={res} loading={loading} />}
    </div>
  );
};

export default Similar;
