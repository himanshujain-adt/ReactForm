import React from 'react';
import logoImg from '../assets/logo.png';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        {/* <a className="navbar-brand" href="#">purelyprep</a> */}
     <img src={logoImg} alt="" />
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
   
      </div>
    </nav>
  );
};

export default Navbar;
