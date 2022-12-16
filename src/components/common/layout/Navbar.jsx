import React, { useState, useRef, useEffect } from "react";
import { NavLink, useHref, useNavigate, Link } from 'react-router-dom';
import Logo from "../../../assets/Meries..svg";
import Search from "../search/Search";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import LogoSmall from "../../../assets/M..svg"

const Navbar = () => {
  const [navbar, setNavbar] = useState(false)
  const [navbarOpen, setNavbarOpen] = useState(false)

  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (navbarOpen && ref.current && !ref.current.contains(e.target)) {
        setNavbarOpen(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [navbarOpen])


  const handleToggle = () => {
    setNavbarOpen(!navbarOpen)
  }

  const changeBackground = () => {
    // console.log(window.scrollY)
    if (window.scrollY >= 10) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  useEffect(() => {
    changeBackground()
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground)
  })  


  return (
    <nav 
    className={navbar ? 'navbar colorChange' : 'navbar'}
    >
      <div className="nav-wrap">
        <span className="logo-wrap">
          <NavLink to="/">
            <img className="logo-img logo-big" src={Logo} alt="logo" />
          </NavLink>
          <NavLink to="/">
            <img className="logo-small" src={LogoSmall} alt="LogoSmall" />
          </NavLink>
        </span>

        <Search placeholder="Search movies .e.g."/>
        
          <ul 
          id='nav-items' 
          className={`nav-items ${navbarOpen ? "showMenu" : ""}`}
          ref={ref}
          >
     
            <li className="nav-item">
              <NavLink 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              to="/"
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              to="/movies"
              >
                Movies
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              to="/tvshows"
              >
                TV Shows
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              to="/people"
              >
                People
              </NavLink>
            </li>

          </ul>

        <button 
        onClick={handleToggle}
        className={navbarOpen ? "nav-toggle active" : "nav-toggle"}
        aria-controls="nav-items" 
        aria-expanded="false">
            {navbarOpen ? <AiOutlineClose className="nav-icon close"/> : <AiOutlineMenu className="nav-icon menu"/>}
            <span className='sr-only'>Menu</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar