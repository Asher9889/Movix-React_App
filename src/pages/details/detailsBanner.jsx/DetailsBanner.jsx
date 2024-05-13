import React from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import Image from "../../../components/lazyLoadImage/Image";
import { Genres, RatingCircle } from "../../../components/index";
import PlayIcon from "../../../components/playIcon/PlayIcon";
import Play from "../../../assets/playIcon.svg";
import dayjs from "dayjs";
import useFetch from "../../../hooks/useFetch";
import { Link, Outlet, useParams } from "react-router-dom";
import imdb from "../../../assets/imdb.png"
import VideoPlay from "../../../components/videoPlay/VideoPlay";

const DetailsBanner = ({ data }) => {
  const { info } = useSelector((state) => state.home);
  console.log(info);
  console.log(data);
  const { id, mediaType } = useParams();
  console.log(id, mediaType);

  const { data: c } = useFetch(`/${mediaType}/${id}/credits`);
  console.log(c);

  const director = c && c.crew?.filter((e) => e.job === "Director");
  console.log(director);

  const Actors = c && c.cast?.filter((e) => e.known_for_department === "Acting" && e.order < 4);
  console.log(Actors);
  const { data: v } = useFetch(`/${mediaType}/${id}/videos`);
  console.log(v);

  const information = useFetch(`/`);

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
                <Link target="_blank" to={`https://www.imdb.com/title/${data.imdb_id}`}><img className="imdb-img" src={imdb}/></Link>
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
                  <Link to={`${mediaType}/${id}/video`}><span className="play-div">
                    <img src={Play} />
                    {/* <PlayIcon /> */}
                    <p className="play-text">Watch Trailer</p>
                  </span>
                  </Link>
                  
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
                    Director:
                    {director?.map((e) => (
                      <span key={e.id}> {`${e.name}`} </span>
                    ))}
                  </p>{" "}
                </div>
                <hr />
                <div className="director">
                  <p>
                    Actors:
                    {Actors?.map((e) => (
                      <span key={e.id}> {e.name} </span>
                    ))}
                  </p>
                </div>

                
              </div>
            </div>
            <Outlet />
          </ContentWrapper>
        </div>
      )}
    </>
  );
};

export default DetailsBanner;
