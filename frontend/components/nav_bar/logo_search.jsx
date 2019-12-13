import React from 'react';
import { Link } from 'react-router-dom';

const LogoSearch = (props) => {

  return (
    <div className="logo_search_wrapper">
      <div className="logo_wrapper">
        <Link to="/" className="logo-small" title="Go to Fauxbook Home"><span className="ball"></span></Link>
      </div>
      <div className="search_wrapper">
        <input type="text" placeholder="Search" />
        <button className="btn_search">
          <span className="icon_wrapper">
            <i className="material-icons">search</i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default LogoSearch;