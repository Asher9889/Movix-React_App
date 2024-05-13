import React from 'react'
import "./style.scss"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import { useSelector } from 'react-redux'
import Image from "../../../components/lazyLoadImage/Image"
import {Genres, RatingCircle} from "../../../components/index"
import PlayIcon from '../../../components/playIcon/PlayIcon'
import Play from "../../../assets/playIcon.svg"


const DetailsBanner = ({data}) => {
  const {info} = useSelector((state)=> state.home)
  console.log(info)
    
  return <>
    { data && info &&   
      <div className='detailsBanner'>
        <img className='bgMobile' src={info + "original" + data.poster_path} alt="" />
        <img className='bgDesktop' src={info + "original" + data.backdrop_path} alt="" />
        <div className='opacity-layer'></div>
        <ContentWrapper>
          <div className="bannerDetails">
              <div className="left">
                <Image src={info + "original" + data.poster_path} />
              </div>
              <div className="right">
                <p className='title'>{data.title}</p>
                <p className='subTitle'>{data.tagline}</p>
                <span className='rating-span'>
                  <Genres data={data.genres.map((e)=> e.id)}/>
                </span>
                <div className='div-rate-play'>
                  <span className='details-rating'>
                    <RatingCircle data={data.vote_average.toFixed(1)} />
                  </span>
                  <span className='play-div'>
                    <img src={Play} />
                    {/* <PlayIcon /> */}
                  </span>

                </div>

                <div className='overview'>
                  <p>Overview</p>
                </div>
                
              </div>


               
          </div>
        </ContentWrapper>
    
      </div>}
  </>
  
}

export default DetailsBanner
