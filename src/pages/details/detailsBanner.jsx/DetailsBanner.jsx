import React, { useEffect, useState } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import Image from "../../../components/lazyLoadImage/Image";
import { Genres, RatingCircle } from "../../../components/index";
import Play from "../../../assets/playIcon.svg";
import dayjs from "dayjs";
import useFetch from "../../../hooks/useFetch";
import { Link, Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import imdb from "../../../assets/imdb.png"
import VideoPlay from "../../../components/videoPlay/VideoPlay";
import { getVideoData, getCastData, removeVideoData} from "../../../store/reducers/homeSlice";



const DetailsBanner = ({ data, credit, res }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.home);


  // console.log(data);
  const { id, mediaType } = useParams();
  // console.log(id, mediaType);

  

  const director = credit && credit.crew.filter((e) => e.job === "Director");
  // console.log(director);

  const writers = credit && credit.crew.filter((e) => e.job === "Writer" || "Writing").slice(0,4);
  // if(Actors) dispatch(getCastData(Actors));

 



  
  

  console.log(res)
  // const trailer = res && res.find(e => ["Official Trailer", "Original Trailer","International Trailer","Season 1 Trailer", "Trailer", "Official US Trailer | English Subtitles", "Official Preview [Subtitled]"].includes(e.name))
  // const trailer1 = res && res.data?.results?.filter((e)=> e.name ==="Official Trailer")
  // console.log(trailer)

  useEffect(()=>{
    matchingValues()
    // {trailer && dispatch(getVideoData(trailer))}
    return(()=>{
      dispatch(removeVideoData())
    })
  },[res])


  let matchingData = []

  const matchingValues = ()=> {
    if(res){
      for(let i = 0; i < res.length; i++){
        if(res[i].name.includes("Official Trailer", "Trailer", "Official Trailer [Subtitled]")){
        // res[i].some((e) => e.includes("Official Trailer"));
        matchingData.push(res[i])
        console.log(res[i].key)
       dispatch(getVideoData(res[i]))
       setTrailerKey(res[i].key)}
      }
    }
  }
  console.log(matchingData)


  return (
    <>
      {data && info && (
        <div class="detailsBanner">
          <img
            class="bgMobile"
            src={info + "original" + data.poster_path}
            alt=""
          />
          <img
            class="bgDesktop"
            src={info + "original" + data.backdrop_path}
            alt=""
          />
          <div class="opacity-layer"></div>
          <ContentWrapper>
            <div class="bannerDetails">
              <div class="left">
                <Image src={info + "original" + data.poster_path} />
               
              </div>
              <div class="right">
                <p class="title">{data.title || data.name}</p>
                <p class="subTitle">{data.tagline}</p>
                <span class="rating-span">
                  <Genres data={data.genres.map((e) => e.id)} />
                </span>
                <div class="div-rate-play">
                  <span class="details-rating">
                    <RatingCircle data={data.vote_average.toFixed(1)} />
                  </span>
                  <span onClick={()=> setShowTrailer(true)} class="play-div">
                    <img src={Play} />
                    {/* <PlayIcon /> */}
                    <p class="play-text">Watch Trailer</p>
                  </span>
                  <img onClick={()=> window.open(`https://www.imdb.com/title/${data.imdb_id}` , "_blank", console.log("clicked"))} class="imdb-img" src={imdb}/>
                 
                  
                </div>

                <div class="overview">
                  <p class="overview-title">Overview</p>
                  <p class="overview-content">{data.overview}</p>
                </div>

                <div class="info">
                  <div class="info-text">
                    <p>Status:</p>
                    <p class="info-content">{data.status}</p>
                  </div>
                  <div class="info-text">
                    <p>Release Date:</p>
                    <p class="info-content">
                      {dayjs(data.release_date).format("MMM DD, YYYY")}
                    </p>
                  </div>
                  <div class="info-text">
                    <p>Runtime:</p>
                    <p class="info-content">
                      {Math.floor(data.runtime / 60) +
                        "h " +
                        (data.runtime % 60) +
                        "min"}
                    </p>
                  </div>
                </div>

                <hr />

                <div class="director">
                  <p>
                    Director :
                    {director?.map((e) => (
                      <span key={e.id}> {`${e.name}`} </span>
                    ))}
                  </p>{" "}
                </div>
                <hr />
                <div class="director">
                  <p>
                    Writers :
                    {writers?.map((e) => (
                      <span key={e.id}> {e.name} </span>
                    ))}
                  </p>
                </div>

                
              </div>
            </div>
            
          </ContentWrapper>
          {showTrailer && <VideoPlay setShowTrailer={setShowTrailer} videoKey={trailerKey}/>}
        </div>
      )}
    </>
  );
};

export default DetailsBanner;
