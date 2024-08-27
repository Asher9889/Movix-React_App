import React from "react";
import "./style.scss"
import ContentWrapper from "../contentWrapper/ContentWrapper";

const Toast = ({name})=> {
    return (
        <div className="toast">
            <ContentWrapper>
                <div class="toast-div">
                    
                    <i class="ri-star-smile-fill"></i>
                    <p class="text">{`Welcome ${name} `}</p>

        
                </div>
            </ContentWrapper>
            
        </div>
            
        
        
    )
}

export default Toast;