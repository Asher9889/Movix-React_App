import React, { useEffect, useState } from "react";
import "./style.scss";
import MovixLogo from "../../assets/movix-logo.svg";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { IoSearchSharp } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [query, setQuery] = useState(null);
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate();
  // for scoll feature for header
  const [showHeader, setShowHeader] = useState("top")
  const [scrollY, setScrollY] = useState(0)

  const showMenu = () => {
    setMobileMenu(true);
    setShowMobileMenu(true);
    setShowSearch(false)
  };
  const hideMenu = () => {
    setMobileMenu(false);
    setShowMobileMenu(false);
  };

  const menuNavigationHandle = (type)=>{
    setMobileMenu(false)
    if(type === "movie") {navigate("/explore/movie")}
    else if(type === "tv") {navigate("/explore/tv")}
  }

  useEffect(()=>{
    window.addEventListener("scroll", ()=>{
      if(window.scrollY > 300 && !showMobileMenu){
        setShowHeader("hide")
        setScrollY(window.scrollY)
        if(window.scrollY< scrollY){
          setShowHeader("show")
        }
      } else{
        setShowHeader("top")
      }

    })
  },[scrollY])

  const searchInputHandle = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(()=>{
        setShowSearch(false)
      },100)
    }
  };

  return (
    <>
      <header className={`header ${showHeader} ${!showMobileMenu ? "backgroundF" : ""} `}>
        <ContentWrapper>
          <div>
            <img onClick={()=>navigate("/")} src={MovixLogo} alt="" />
          </div>

          <ul className="desktopMenu">
            <li onClick={()=>menuNavigationHandle("movie")} >Movie</li>
            <li onClick={()=>menuNavigationHandle("tv")}>TV Shows</li>
            <li>
              <IoSearchSharp className="searchDesktop" onClick={()=>{setShowSearch(true)
              setMobileMenu(false)
            }} />
            </li>
          </ul>

          <div className="mobileMenu">
            <IoSearchSharp onClick={()=>{setShowSearch(true)
              setMobileMenu(false)
            }} />
            {!mobileMenu ? (
              <IoMenu onClick={showMenu} />
            ) : (
              <IoCloseOutline onClick={hideMenu} />
            )}
          </div>
        </ContentWrapper>

        {mobileMenu ? (
          <div className="showMobileMenu">
            <ul>
              <li className="mobileMenuItems" onClick={()=>menuNavigationHandle("movie")}>Movies</li>
              <hr />
              <li className="mobileMenuItems" onClick={()=>menuNavigationHandle("tv")}>TV Shows</li>
            </ul>
          </div>
        ) : null}

       {showSearch ?  <div className="searchInput">
          <ContentWrapper>
            <input
              onKeyUp={searchInputHandle}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="search for movie and tv shows..."
            />
            <IoCloseOutline  onClick={()=>setShowSearch(false)} className="closeIcon"  />
          </ContentWrapper>
        </div> : null}
      </header>
    </>
  );
};

export default Header;
