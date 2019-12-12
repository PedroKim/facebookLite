import React from 'react';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // let field = document.getElementById('password-field');
    // field.focus();
  }
  
  componentDidUpdate(prevProps) {
    // debugger;
    if (prevProps.errors.length !== this.props.errors.length && this.props.errors.length > 0) {
      setTimeout(() => this.props.clearErrors(), 3000);
    }
  }

  handleInput(type) {
    return e => {
      this.setState({ [type]: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.login(user);
  }

  render() {

    return (
      <div className="signin_form">
        <form onSubmit={this.handleSubmit}>
          <span className="input_wrapper">
            <label>Email</label>
            <input type="email" 
              value={this.state.email} 
              onChange={this.handleInput("email")} />
          </span>
          <span className="input_wrapper">
            <label>Password</label>
            <input type="password"
              value={this.state.password}
              onChange={this.handleInput("password")} />
            {/* <a>Forgot account?</a> */}
          </span>
          <button>Log In</button>
        </form>
        <span className={"tooltip_wrapper login " + (this.props.errors.length > 0 ? "show fadeIn" : "")}>
          <span className="tooltip_inner">
            <span className="tooltip"></span>
            <span className="tooltip_message">{this.props.errors.join(" ")}</span>
          </span>
        </span>
      </div>
    )
  }
}