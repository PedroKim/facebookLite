import React from 'react';
import { Link } from 'react-router-dom';
import NavProfileLink from './nav_list_items/nav_profile_link';
import NavLink from './nav_list_items/nav_link';
import NavButtons from './nav_list_items/nav_buttons';
import NavDropdown from './nav_list_items/nav_dropdown';

const NavList = ({user, logout}) => {

  function handleLogout() {
    logout();
  }
  return (
    <ul className="nav_list">
      <li>
        <Link to={"/users/" + user.id} title="Profile" className="nav_reg_link">
          <span className="profile_image_small"></span><span className="link_text">Veso</span>
        </Link>
        </li>
      <li><Link to="/" className="nav_reg_link"><span className="link_text">Home</span></Link></li>
      <li className="nav_buttons"><NavButtons /></li>
      <li className="nav_dropdown">
        <NavDropdown logout={logout} />
      </li>
      {/* <a onClick={handleLogout}>logout</a> */}
    </ul>
  );
};

export default NavList;