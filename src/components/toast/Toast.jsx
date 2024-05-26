import React from "react";
import "./style.scss"

const Toast = ({name})=> {
    return (
        <div class="toast-div">
            <i class="ri-star-smile-fill"></i>
            <p class="text">{`Welcome ${name} `}</p>
        </div>
    )
}

export default Toast;