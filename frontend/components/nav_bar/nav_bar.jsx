import React from 'react';
import LogoSearch from './logo_search';
import NavListContainer from './nav_list_container';

const NavBar = (props) => {
  
  function handleClick(e) {
    e.preventDefault();
    logout();
  }
  
  return (
    <nav>
      <LogoSearch />
      <NavListContainer />
      {/* <h1>{currentUser.name}, Welcome to facebookLite!</h1> */}
      {/* <button onClick={handleClick}>Logout</button> */}
    </nav>
  )
};

export default NavBar;