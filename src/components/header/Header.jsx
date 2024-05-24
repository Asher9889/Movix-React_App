import React, { useEffect, useState } from "react";
import "./style.scss";
import MovixLogo from "../../assets/movix-logo.svg";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { IoSearchSharp } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import getDataFromApi from "../../utils/axios"
import fetchDataFromApi from "../../utils/axios";
import demo from "../../assets/demo.jpg"
import Image from "../lazyLoadImage/Image";
import { useSelector } from "react-redux";
import unavailable from "../../assets/unavailable.jpg"
import { useFirebase } from "../../context/FirebaseContext";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false)
  const [searchData, setSearchData] = useState(null)
  const navigate = useNavigate();
  // for scoll feature for header
  const [showHeader, setShowHeader] = useState("top")
  const [scrollY, setScrollY] = useState(0)


  const {info} = useSelector((state)=> state.home)

  const {isLoggedIn} = useFirebase()

  const {signOutUser} = useFirebase();

  const logoutHandle = async ()=>{
    await signOutUser();
    setMobileMenu(false)
    navigate("/login")
  }

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


  // for search functionality
  const  queryData = async () => {
    try {
      console.log("working")
        const res = await fetchDataFromApi(`/search/multi?query=${query}`)
        const searchData = res && res.results 
        setSearchData(searchData)
        console.log(searchData)
        // return searchData; 
      } catch (error) {
      console.log("Error caught during Search call", error)
    }
  }
   

  useEffect(()=>{
    queryData()
  },[query])

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
            {isLoggedIn && 
              <li className="mobileMenuItems" onClick={logoutHandle}>Logout</li> }
           
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
              {isLoggedIn && <> <hr />
              <li className="mobileMenuItems" onClick={logoutHandle}>Logout</li> </>}
            </ul>
          </div>
        ) : null}

       {showSearch ?  <div className="searchInput">
          <ContentWrapper>
            <input
              onKeyUp={searchInputHandle}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="search for movie and tv shows..."
            />
            <IoCloseOutline  onClick={()=>{setShowSearch(false)
              setQuery("")
            }} className="closeIcon"  />
          </ContentWrapper>
        </div> : null}

        {showSearch && <div className="searchResults-div">
          <ContentWrapper>
            <div className="searchResultsItems">
              {searchData && searchData.map((e)=> (
              <div key={e.id}>
                <div className="resultsItem" onClick={()=> {navigate(`/search/${e.media_type}/${e.id}`)
                setShowSearch(false)
              } }>
                  <Image src={e.backdrop_path ? info  + "original" + e.backdrop_path : unavailable} />
                  <span>{e.name|| e.title || e.original_title}</span>
                </div>
                <hr />
              
                </div>
              ))}
              
              
            </div>
          </ContentWrapper>
        </div>}
      </header>
    </>
  );
};

export default Header;
