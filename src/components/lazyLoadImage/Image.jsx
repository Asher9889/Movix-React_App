import React from 'react'
import LazyLoad from 'react-lazy-load'

const Image = ({src}) => {
  return (
    <div>
      <LazyLoad>
        <img src={src} />
      </LazyLoad>
    </div>
  )
}

export default Image
