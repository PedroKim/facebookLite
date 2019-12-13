import React from 'react';

export default class NavDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false
    };
    this.icnRef = React.createRef();

    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    if (e.target === this.icnRef.current){
      this.setState(prevState => ({
        dropdownActive: !prevState.dropdownActive
      }));
    }
  }

  handleBlur(e) {
    this.setState({dropdownActive: false});
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  activeDropdown() {
    return this.state.dropdownActive ? "active" : "";
  }

  render() {

    return (
      <button className={"btn_dropdown " + this.activeDropdown()} 
        onClick={this.handleClick}
        onBlur={this.handleBlur}
      >
        <i className="material-icons" ref={this.icnRef}>arrow_drop_down</i>
        <div className="dd_logout_wrapper">
          <span className="tt_wrapper">
            <span className="tt_border"></span>
            <span className="tt"></span>
          </span>
          <ul className="dd_logout">
            <li onClick={this.handleLogout}><a title="Logout">Log Out</a></li>
          </ul>
        </div>
      </button>
    )
  }
}