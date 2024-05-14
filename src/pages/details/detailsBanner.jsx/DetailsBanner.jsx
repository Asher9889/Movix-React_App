import React, { useEffect, useState } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import Image from "../../../components/lazyLoadImage/Image";
import { Genres, RatingCircle } from "../../../components/index";
import PlayIcon from "../../../components/playIcon/PlayIcon";
import Play from "../../../assets/playIcon.svg";
import dayjs from "dayjs";
import useFetch from "../../../hooks/useFetch";
import { Link, Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import imdb from "../../../assets/imdb.png"
import VideoPlay from "../../../components/videoPlay/VideoPlay";
import { getVideoData, getCastData} from "../../../store/reducers/homeSlice";



const DetailsBanner = ({ data, credit, res }) => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.home);

  // console.log(info);
  // console.log(data);
  const { id, mediaType } = useParams();
  // console.log(id, mediaType);

  

  const director = credit && credit.crew.filter((e) => e.job === "Director");
  // console.log(director);

  const writers = credit && credit.crew.filter((e) => e.job === "Writer" || "Writing").slice(0,4);
  // if(Actors) dispatch(getCastData(Actors));

 



  
  const video = res?.data?.results
  // console.log(video)
  const trailer = video?.find(e => ["Official Trailer", "Original Trailer","International Trailer","Season 1 Trailer", "Trailer", "Official US Trailer | English Subtitles", "Official Preview [Subtitled]"].includes(e.name))
 console.log(trailer)
  if(trailer) dispatch(getVideoData(trailer));

 




  return (
    <>
      {data && info && (
        <div className="detailsBanner">
          <img
            className="bgMobile"
            src={info + "original" + data.poster_path}
            alt=""
          />
          <img
            className="bgDesktop"
            src={info + "original" + data.backdrop_path}
            alt=""
          />
          <div className="opacity-layer"></div>
          <ContentWrapper>
            <div className="bannerDetails">
              <div className="left">
                <Image src={info + "original" + data.poster_path} />
               
              </div>
              <div className="right">
                <p className="title">{data.title}</p>
                <p className="subTitle">{data.tagline}</p>
                <span className="rating-span">
                  <Genres data={data.genres.map((e) => e.id)} />
                </span>
                <div className="div-rate-play">
                  <span className="details-rating">
                    <RatingCircle data={data.vote_average.toFixed(1)} />
                  </span>
                  <span onClick={()=> navigate(`/${mediaType}/${id}/video`)} className="play-div">
                    <img src={Play} />
                    {/* <PlayIcon /> */}
                    <p className="play-text">Watch Trailer</p>
                  </span>
                  <img onClick={()=> window.open(`https://www.imdb.com/title/${data.imdb_id}` , "_blank", console.log("clicked"))} className="imdb-img" src={imdb}/>
                 
                  
                </div>

                <div className="overview">
                  <p className="overview-title">Overview</p>
                  <p className="overview-content">{data.overview}</p>
                </div>

                <div className="info">
                  <div className="info-text">
                    <p>Status:</p>
                    <p className="info-content">{data.status}</p>
                  </div>
                  <div className="info-text">
                    <p>Release Date:</p>
                    <p className="info-content">
                      {dayjs(data.release_date).format("MMM DD, YYYY")}
                    </p>
                  </div>
                  <div className="info-text">
                    <p>Runtime:</p>
                    <p className="info-content">
                      {Math.floor(data.runtime / 60) +
                        "h " +
                        (data.runtime % 60) +
                        "min"}
                    </p>
                  </div>
                </div>

                <hr />

                <div className="director">
                  <p>
                    Director :
                    {director?.map((e) => (
                      <span key={e.id}> {`${e.name}`} </span>
                    ))}
                  </p>{" "}
                </div>
                <hr />
                <div className="director">
                  <p>
                    Writers :
                    {writers?.map((e) => (
                      <span key={e.id}> {e.name} </span>
                    ))}
                  </p>
                </div>

                
              </div>
            </div>
           <Outlet/>
            
          </ContentWrapper>
        </div>
      )}
    </>
  );
};

export default DetailsBanner;
