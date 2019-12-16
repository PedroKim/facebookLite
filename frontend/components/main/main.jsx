import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from "../nav_bar/nav_bar";
import NewsFeed from '../news_feed/news_feed';
import ProfilesContainer from '../profiles/profiles_container';

const Main = ({currentUser, logout}) => {

  return (
    <main className="logged-in">
      <div className="nav_wrapper">
        <Route path="/" component={NavBar} />
      </div>
      <Route exact path="/" component={NewsFeed} />
      <Route path="/users/:user_id" component={ProfilesContainer} />
      {/* <img src={currentUser.profileImg} /> */}
    </main>
  )
};

export default Main;