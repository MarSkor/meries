import React from 'react';
import themoviedbLogo from "../../../assets/themoviedblogo.svg"

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer__content">
        <div className='footer__logo'>
          <img className='db-logo' src={themoviedbLogo} alt="themoviedb.org logo" />
        </div>
        <div className='footer__info'>
          <p>Made with <a className='link' href="https://www.themoviedb.org/" target="_blank">themoviedb.org API</a>.</p>
          <p>The website is not affiliated with themoviedb</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer