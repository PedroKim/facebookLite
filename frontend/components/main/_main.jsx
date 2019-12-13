import React from 'react';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const currentUser = this.props.users[this.props.currentUser.id];
    if (!currentUser) return null;
    return (
      <>
        <h1>{currentUser.name}, Welcome to facebookLite!</h1>
        <button onClick={this.handleClick}>Logout</button>
      </>
    )
  }
}