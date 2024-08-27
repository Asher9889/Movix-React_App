import React from 'react';
import "./style.scss";

const ContentWrapper = ({children}) => {
  return (
    <div class='contentWrapper'>
      {children}
    </div>
  )
} 

export default ContentWrapper
