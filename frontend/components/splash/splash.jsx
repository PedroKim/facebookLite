import React from 'react';
import { Link } from 'react-router-dom';
import Signup from "../session/signup";
import Signin from "../session/signin";

const Splash = ({ createNewUser, login, clearErrors, signupErrors, loginErrors}) => {

  return (
    <main className="splash_main">
      <header>
        <div className="header_inner">
          <div className="logo_wrapper">
            <Link to="/" className="logo">facebookLite</Link>
          </div>
          <Signin login={login} clearErrors={clearErrors} errors={loginErrors} />
        </div>
      </header>
      <section className="signup_outer">
        <div className="signup_inner">
          <div className="intro">
            <h2>Connect with friends and the world around you on Facebook.</h2>
            <ul>
              <li><span><i className="material-icons">dynamic_feed</i></span><p><em>See photos and updates</em> from friends in News Feed.</p></li>
              <li><span><i className="material-icons">share</i></span><p><em>Share what's new</em> in your life on your Timeline.</p></li>
              <li><span><i className="material-icons">search</i></span><p><em>Find more</em> of what you're looking for with FacebookLite Search.</p></li>
            </ul>
          </div>
          <Signup createNewUser={createNewUser} errors={signupErrors} />
        </div>
      </section>
      <footer>
        <div className="footer_inner">
          <ul>
            <li><a href="">LinkedIn</a></li>
            <li><a href="">Github</a></li>
            <li><a href="">AngelList</a></li>
          </ul>
          <hr />
          <span className="copyright">Peter © 2019</span>
        </div>
      </footer>
    </main>
  )
};

export default Splash;