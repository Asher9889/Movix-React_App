import React, { useState, useEffect } from "react";
import "./style.scss";
import fetchDataFromApi from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { Image, ContentWrapper } from "../../../components";

const HeroBanner = () => {
  const { info } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const [wallpaper, setWallpaper] = useState();
  const [query, setQuery] = useState();

  const searchInputHandle = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      // dynamic banana baki hai
    }
  };

  const { data, loading } = useFetch("/movie/upcoming");
  // console.log(data, loading);

  const bg =
    info &&
    data &&
    info +
      "original" +
      data.results[Math.floor([Math.random() * 20])].backdrop_path;

  useEffect(() => {
    setWallpaper(bg);
  }, [data]);

  return (
    <div className="heroBanner">
      <div className="heroBanner-image-div">
        <Image src={wallpaper} />
      </div>
      <div className="gradient-layer"></div>
      <ContentWrapper>
        <div className="heroBannerBottom">
          <h1 className="title">Welcome</h1>
          <h1 className="subTitle">
            Misslions of movies , Tv Shows and people to discover. Explore now
            !!
          </h1>

          <div className="searchInput">
            <input
              onKeyUp={searchInputHandle}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="search for movie and tv shows..."
            />
            <button>search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
