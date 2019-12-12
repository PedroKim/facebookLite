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
            <Link to="/" className="logo">fauxbook</Link>
          </div>
          <Signin login={login} clearErrors={clearErrors} errors={loginErrors} />
        </div>
      </header>
      <section className="signup_outer">
        <div className="signup_inner">
          <div className="intro">
            <h2>Connect with friends and the world around you on Fauxbook.</h2>
            <ul>
              <li><span><i className="material-icons">dynamic_feed</i></span><p><em>See photos and updates</em> from friends in News Feed.</p></li>
              <li><span><i className="material-icons">share</i></span><p><em>Share what's new</em> in your life on your Timeline.</p></li>
              <li><span><i className="material-icons">search</i></span><p><em>Find more</em> of what you're looking for with Fauxbook Search.</p></li>
            </ul>
          </div>
          <Signup createNewUser={createNewUser} login={login} errors={signupErrors} />
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
          <ul>
            <li>Checkout my colleagues' projects:</li>
            <li><a target="_blank" href="https://g-cord.herokuapp.com/">g-cord</a></li>
            <li><a target="_blank" href="https://mysticamp.herokuapp.com/">MystiCamp</a></li>
            <li><a target="_blank" href="https://hoopr.herokuapp.com/">Hoopr</a></li>
            <li><a target="_blank" href="https://tinnitus-audio.herokuapp.com/">Tinnitus</a></li>
            <li><a target="_blank" href="https://couch9.herokuapp.com/">Couch9</a></li>
            <li><a target="_blank" href="http://soundshroud000.herokuapp.com/">SoundShroud</a></li>
            <li><a target="_blank" href="https://open-playful.herokuapp.com/">OpenPlayful</a></li>
            <li><a target="_blank" href="https://airgot.herokuapp.com/">AirGoT</a></li>
            <li><a target="_blank" href="https://tilda-music.herokuapp.com/">Tilda</a></li>
            <li><a target="_blank" href="https://dopamine-dispenser.herokuapp.com/">Dopamine Dispenser</a></li>
            <li><a target="_blank" href="https://photo32em.herokuapp.com/">32em</a></li>
          </ul>
          <span className="copyright">Peter © 2019</span>
        </div>
      </footer>
    </main>
  )
};

export default Splash;