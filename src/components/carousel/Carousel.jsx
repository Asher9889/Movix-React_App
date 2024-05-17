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
    <div className="carousel">
      <ContentWrapper>
        <div className="carouselItems" >
          {data?.map((e, index) => {
            return (
              <div onClick={()=> navigate(`/${ endPoint || e.media_type }/${e.id}`)} key={e.id} className="carouselItem" >
                <Image src={info + "original" + e.poster_path} key={e.id} />
                <p className="title">
                  {e && (e.original_title || e.title || e.name).slice(0, 15)}
                </p>
                <p className="date">{dayjs(e.release_date).format("MMM D, YYYY")}</p>
                <div className="rating-div">
                  <RatingCircle data={e?.vote_average.toFixed(1)}/>
                </div>
                
                <div className="genre-div">
                 <Genres data={e.genre_ids.slice(0,2)} />
                </div>
                
              </div>
            );
          })}

          <span className="left-arrow" ><FaArrowLeftLong /></span>
          <span className="right-arrow" ><FaArrowRightLong /></span>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
