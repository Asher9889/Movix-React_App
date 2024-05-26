import React, { useState, useEffect } from "react";
import "./style.scss";
import fetchDataFromApi from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { Image, ContentWrapper, Toast } from "../../../components";
import { useFirebase } from "../../../context/FirebaseContext";

const HeroBanner = () => {
  const { info } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const [wallpaper, setWallpaper] = useState();
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState(false) 

  const searchInputHandle = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      // dynamic banana baki hai
    }
  };

  const { data, loading } = useFetch("/movie/upcoming");
  // console.log(data, loading);

  const {current_user} = useFirebase();
  // console.log(current_user)
  const first_name = current_user?.displayName?.split(" ")[0]  || current_user?.email?.split("@")[0];
  // console.log(current_user?.displayName?.split(" ")[0] || current_user?.email?.split("@")[0])

  

  const bg =
    info &&
    data &&
    info +
      "original" +
      data.results[Math.floor([Math.random() * 20])].backdrop_path;

  useEffect(() => {
    setWallpaper(bg);
    setToast(true)
    setTimeout(()=>{
      setToast(false)
    }, 6000)
  }, [data]);

  return (
    <div class="heroBanner">
      <div class="heroBanner-image-div">
        <Image src={wallpaper} />
      </div>
      <div class="gradient-layer"></div>
      <ContentWrapper>
        <div class="heroBannerBottom">
          <h1 class="title">Welcome</h1>
          <h1 class="subTitle">
            Millions of Movies , Tv Shows and people to discover. Explore now
            !!
          </h1>

          <div class="searchInput">
            <input
              onKeyUp={searchInputHandle}
              onChange={(e) => setQuery(e.target.value)}
              value={query}

              type="text"
              placeholder="search for movie and tv shows...."
            />
            <button>search</button>
          </div>
        </div>
        {/* {toast && <Toast name={first_name} />} */}
        <Toast />
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
