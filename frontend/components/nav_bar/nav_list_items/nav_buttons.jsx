import React from 'react';

export default class NavButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btnHovered: ""
    }

    this.hoverTimer = null;

  }

  onBtnHover(type) {
    return e => {
      if (this.hoverTimer) clearTimeout(this.hoverTimer);
      this.hoverTimer = setTimeout(() => this.setState({btnHovered: type}), 1000);
    }
  }

  onBtnHoverOff() {
    return e => {
      if (this.hoverTimer) clearTimeout(this.hoverTimer);
      this.setState({ btnHovered: "" });
    }
  }

  isHovered(type) {
    return this.state.btnHovered === type ? "hover" : "";
  }

  render() {
    return (
      <>
        <ul className="nav_buttons_wrapper">
          <li>
            <button className={"btn_nav_link friend " + this.isHovered("friend")}
              onMouseEnter={this.onBtnHover("friend")}
              onMouseLeave={this.onBtnHoverOff()}
            >
              <span className="icon_wrapper">
                <i className="material-icons">people_alt</i>
              </span>
              <div className="tt_hover">
                <span className="tt_wrapper">
                  {/* <span className="tt_border"></span> */}
                  <span className="tt"></span>
                  <div className="tt_msg_wrapper">
                    <span className="tt_msg">Friends Requests</span>
                  </div>
                </span>
              </div>
            </button>
          </li>
          <li>
            <button className={"btn_nav_link " + this.isHovered("notifications")}
              onMouseEnter={this.onBtnHover("notifications")}
              onMouseLeave={this.onBtnHoverOff()}
            >
              <span className="icon_wrapper">
                <i className="material-icons">notifications</i>
              </span>
              <div className="tt_hover">
                <span className="tt_wrapper">
                  {/* <span className="tt_border"></span> */}
                  <span className="tt"></span>
                  <div className="tt_msg_wrapper">
                    <span className="tt_msg">Notifications</span>
                  </div>
                </span>
              </div>
            </button>
          </li>
        </ul>
        <a><span className="link_text"></span></a>
      </>
    )
  }
};