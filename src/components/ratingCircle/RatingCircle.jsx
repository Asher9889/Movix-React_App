import React from 'react'
import "./style.scss"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RatingCircle = ({data}) => {
  return (
    <div className='rating'>
      <CircularProgressbar
        value={data}
        maxValue={10}
        text={data}
        styles={buildStyles({
            pathColor: data < 5 ? "red" : data < 7 ? "orange" : "green"
        })}
      >

      </CircularProgressbar>
    </div>
  )
}

export default RatingCircle
