import React from 'react';
import { Link } from 'react-router-dom';

export default class ProfileBanner extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    debugger;
    const { user } = this.props;
    const coverImgClass = user.coverImg ? "has_image" : "";
    const profileImg = user.profileImg ? (<img src={user.profileImg} />) : null;

    return (
      <div className="pb_wrapper">
        <div className={"pb_cover " + coverImgClass}>
          <div className="pb_name_wrapper">
            <Link to={"/users/" + user.id}>
              <h1>{user.name}</h1>
            </Link>
          </div>
        </div>
        <div className="pb_nav_wrapper">
          <nav className="pb_nav">
            <ul>
              <li><a><span>Timeline</span></a></li>
              <li><a><span>About</span></a></li>
              <li><a><span>Friends</span></a></li>
              <li><a><span>Photos</span></a></li>
            </ul>
          </nav>
        </div>
        <div className="pb_profile_frame">
          <div className="pb_profile_img_wrapper">
            {profileImg}
            {/* <div className="" */}
          </div>
        </div>
      </div>
    );
  }
};