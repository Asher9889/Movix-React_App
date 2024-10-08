import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';

const Image = ({src, className}) => {
  return (
    <div>
      <LazyLoadImage
      class={className || " "}
      src={src}
      effect='blur'
      >
      </LazyLoadImage>
    </div>
  )
}

export default Image
