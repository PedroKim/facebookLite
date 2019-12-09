import React from 'react';
import BirthDateSelect from './birthdate_select'

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(type) {
    return e => {
      this.setState({ [type]: e.target.value });
    }
  }
  handleChildInput(type, value) {
    this.setState({ [type]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createNewUser(this.state);
      // .then(() => this.props.history.push('/chirps'));
  }

  render() {
    return (
      <div className="signup_form">
        <h2>Sign Up!</h2>
        <p>It's quick and easy.</p>
        <form onSubmit={this.handleSubmit}>
          <input type="text"
            placeholder="First name"
            value={this.state.fname}
            onChange={this.handleInput("fname")}
          />
          <input type="text" 
            placeholder="Email"
            value={this.state.email} 
            onChange={this.handleInput("email")}
          />
          <input type="password" 
            placeholder="New password"
            value={this.state.password} 
            onChange={this.handleInput("password")} 
          />
          <BirthDateSelect handleChildInput={this.handleChildInput} />
          <button>Sign Up</button>
        </form>
      </div>
    );
  }
};