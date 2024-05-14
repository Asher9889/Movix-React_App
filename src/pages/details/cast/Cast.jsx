import React from 'react'
import "./style.scss"
import { ContentWrapper, Image } from '../../../components';
import { useSelector } from 'react-redux';
import avatar from "../../../assets/avatar.png"



const Cast = ({credit}) => {

  const {info} = useSelector((state)=> state.home)
  const actors = credit && credit.cast.filter((e)=> e.known_for_department === "Acting")
  console.log(actors);
  // const url = {}

  return <>
    <div className='cast-div'>
      <ContentWrapper>
      <p className='top-casts'>Top Casts</p>
        <div className="items">
          
          {actors && actors.map((e)=> (
            <div key={e.id} className="item">
              <Image src={e.profile_path ? info + "original" +  e.profile_path : avatar }/>
              <p className='subName'>{e.character}</p>
              <p className='name'>{e.original_name || e.name}</p>
            </div>
          ))}
        </div>
      </ContentWrapper>
      
    </div>
  </>
}

export default Cast
