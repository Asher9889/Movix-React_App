import React, { useState } from "react";
import "./style.scss";
import MovixLogo from "../../assets/movix-logo.svg";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { IoSearchSharp } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";



const Header = () => {

  const[mobileMenu, setMobileMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const showMenu = ()=>{
    setMobileMenu(true)
    setShowMobileMenu(true)
  }
  const hideMenu = ()=>{
    setMobileMenu(false)
    setShowMobileMenu(false)
  }
  return (<>
    <header className={`header ${showMobileMenu ? "background" : ""} `}>
      <ContentWrapper >
        <div>
          <img src={MovixLogo} alt="" />
        </div>

        <ul className="desktopMenu">
          <li>Movie</li>
          <li>TV Shows</li>
          <li>
            <IoSearchSharp />
          </li>
        </ul>

       

        <div className="mobileMenu">
          <IoSearchSharp />
          {!mobileMenu ? (<IoMenu onClick={showMenu} />) : (<IoCloseOutline onClick={hideMenu} />)}
          
        </div>
        


       
      </ContentWrapper>

      {mobileMenu ? <div className="showMobileMenu">
          <ul>
            <li className="mobileMenuItems">
              Movies
            </li>
            <hr />
            <li className="mobileMenuItems">
              TV Shows
            </li>
          </ul>
        </div> : null}

    </header>
    
    </>);
};

export default Header;
