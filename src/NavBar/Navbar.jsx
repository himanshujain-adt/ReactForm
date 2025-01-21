import React from 'react';


// Navbar Component
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        {/* <a className="navbar-brand" href="#">purelyprep</a> */}
     <img src="src\assets\logo.png" alt="" />
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
   
      </div>
    </nav>
  );
};

export default Navbar;
