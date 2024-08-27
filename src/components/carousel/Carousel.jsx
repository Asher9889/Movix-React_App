import React, {useState} from "react";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import Image from "../lazyLoadImage/Image";
import dayjs from "dayjs";
import RatingCircle from "../ratingCircle/RatingCircle";
import Genres from "../genres/Genres";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Carousel = ({ data, loading, endPoint }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const { info } = useSelector((state) => state.home);
  // console.log(info);

  // const scrollRight = ()=>{
  //   if(amount > 1000) setAmount(1000)
  //   setAmount(amount + 150)
  // }
  // const scrollLeft = ()=>{
  //   if(amount > 1000) setAmount(1000)
  //   setAmount(amount - 150)
  // }
  // console.log(endPoint)

  return (
    <div class="carousel">
      <ContentWrapper>
        <div class="carouselItems" >
          {data?.map((e, index) => {
            return (
              <div onClick={()=> navigate(`/${ endPoint || e.media_type }/${e.id}`)} key={e.id} class="carouselItem" >
                <Image src={info + "original" + e.poster_path} key={e.id} />
                <p class="title">
                  {e && (e.original_title || e.title || e.name).slice(0, 15)}
                </p>
                <p class="date">{dayjs(e.release_date).format("MMM D, YYYY")}</p>
                <div class="rating-div">
                  <RatingCircle data={e?.vote_average.toFixed(1)}/>
                </div>
                
                <div class="genre-div">
                 <Genres data={e.genre_ids.slice(0,2)} />
                </div>
                
              </div>
            );
          })}

          <span class="left-arrow" ><FaArrowLeftLong /></span>
          <span class="right-arrow" ><FaArrowRightLong /></span>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
