import React from 'react';
import NavBar from "../nav_bar/nav_bar";

const Main = ({currentUser, logout}) => {

  return (
    <main className="logged-in">
      <div className="nav_wrapper">
        <NavBar currentUser={currentUser} logout={logout} />
      </div>
    </main>
  )
};

export default Main;