import React from "react";
import "./style.scss"

const Toast = ({name})=> {
    return (
        <div className="toast-div">
            <i class="ri-star-smile-fill"></i>
            <p className="text">{`Welcome ${name} `}</p>
        </div>
    )
}

export default Toast;