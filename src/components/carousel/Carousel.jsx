import React from "react";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import Image from "../lazyLoadImage/Image";
import dayjs from "dayjs";
import RatingCircle from "../ratingCircle/RatingCircle";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading }) => {
  const { info } = useSelector((state) => state.home);
  console.log(info);
  return (
    <div className="carousel">
      <ContentWrapper>
        <div className="carouselItems">
          {data?.map((e, index) => {
            return (
              <div key={e.id} className="carouselItem">
                <Image src={info + "original" + e.poster_path} key={e.id} />
                <p className="title">
                  {e && (e.original_title || e.title || e.name).slice(0, 15)}
                </p>
                <p className="date">{dayjs(e.release_date).format("MMM D, YYYY")}</p>
                <RatingCircle data={e?.vote_average.toFixed(1)}/>
                <Genres data={e.genre_ids} />
              </div>
            );
          })}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
