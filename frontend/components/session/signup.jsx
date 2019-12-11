import React from 'react';
import BirthDateSelect from './birthdate_select';
import * as validateUtils from '../../utils/validate_utils';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      reEmail: "",
      password: "",
      birth_date: "1994/1/1",
      gender: "",
      errors: {},
      selected: "",
      showReEmail: "hide"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChildInput = this.handleChildInput.bind(this);
  }

  handleInput(type) {
    return e => {
      const {dataset, value} = e.target;
      const newState = this.state;
      newState[type] = value;
      if (dataset.vtype === "email") {
        if (validateUtils.isValidEmail(value)){
          newState.showReEmail = "fadeIn";
        } else {
          newState.showReEmail = "hide";
          // setTimeout(()=> this.setState({showReEmail: "hide"}), 500);
        }
      }
      this.setState(newState);
      // setTimeout(()=> console.log(this.state), 0);
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

  handleBlur(field) {
    return e => {
      const {dataset, value} = e.target;
      let result;
      if (dataset.vtype === "reEmail") {
        result = validateUtils[dataset.vtype](value, this.state.email);
      } else {
        result = validateUtils[dataset.vtype](value);
      }
      const newState = this.state;
      newState.errors[field] = result.message;
      newState.selected = "";
      this.setState(newState);
    }
  }

  handleFocus(field) {
    return e => {
      this.setState({selected: field});
    }
  }

  errorActive(field) {
    // console.log(this.state.errors);
    return this.state.errors[field] ? "error" : "";
  }

  focusActive(field) {
    return this.state.selected === field ? "focus" : "";
  }

  render() {
    let errorComponent, {errors} = this.props;

    if (errors.length > 0) {
      const errorLis = errors.map((error, idx) => (<li key={idx}>{error}</li>));
      errorComponent = (
        <ul className="error_list fadeIn">{errorLis}</ul>
      );
    }

    return (
      <div className="signup_form">
        <h2>Sign Up</h2>
        <p className="signup_helper_text">It's quick and easy.</p>
        {errorComponent}
        <form onSubmit={this.handleSubmit}>
          <span className="name_wrapper">
            <span className={"input_wrapper " + this.errorActive("fname") + " " + this.focusActive("fname")}>
              <input type="text"
                data-vtype="name"
                placeholder="First name"
                value={this.state.fname}
                onChange={this.handleInput("fname")}
                onBlur={this.handleBlur("fname")}
                onFocus={this.handleFocus("fname")}
              />
              <span className="icon_wrapper">
                <i className="material-icons">priority_high</i>
              </span>
              <span className="tooltip_wrapper">
                <span className="tooltip_inner">
                  <span className="tooltip"></span>
                  <span className="tooltip_message">{this.state.errors.fname}</span>
                </span>
              </span>
            </span>
            <span className={"input_wrapper " + this.errorActive("lname") + " " + this.focusActive("lname")}>
              <input type="text"
                data-vtype="name"
                placeholder="Last name"
                value={this.state.lname}
                onChange={this.handleInput("lname")}
                onBlur={this.handleBlur("lname")}
                onFocus={this.handleFocus("lname")}
              />
              <span className="icon_wrapper">
                <i className="material-icons">priority_high</i>
              </span>
              <span className="tooltip_wrapper bottom">
                <span className="tooltip_inner">
                  <span className="tooltip"></span>
                  <span className="tooltip_message">{this.state.errors.lname}</span>
                </span>
              </span>
            </span>
          </span>
          <span className={"input_wrapper " + this.errorActive("email") + " " + this.focusActive("email")}>
            <input type="email" 
              data-vtype="email"
              placeholder="Email"
              value={this.state.email} 
              onChange={this.handleInput("email")}
              onBlur={this.handleBlur("email")}
              onFocus={this.handleFocus("email")}
            />
            <span className="icon_wrapper">
              <i className="material-icons">priority_high</i>
            </span>
            <span className="tooltip_wrapper long">
              <span className="tooltip_inner">
                <span className="tooltip"></span>
                <span className="tooltip_message">{this.state.errors.email}</span>
              </span>
            </span>
          </span>
          <span className={"reEmail input_wrapper " + this.errorActive("reEmail") + " " + this.focusActive("reEmail") + " " + this.state.showReEmail}>
            <input type="email"
              data-vtype="reEmail"
              placeholder="Re-enter email"
              value={this.state.reEmail}
              onChange={this.handleInput("reEmail")}
              onBlur={this.handleBlur("reEmail")}
              onFocus={this.handleFocus("reEmail")}
            />
            <span className="icon_wrapper">
              <i className="material-icons">priority_high</i>
            </span>
            <span className="tooltip_wrapper short">
              <span className="tooltip_inner">
                <span className="tooltip"></span>
                <span className="tooltip_message">{this.state.errors.reEmail}</span>
              </span>
            </span>
          </span>
          <span className={"input_wrapper " + this.errorActive("password") + " " + this.focusActive("password")}>
            <input type="password" 
              data-vtype="password"
              placeholder="New password"
              value={this.state.password} 
              onChange={this.handleInput("password")} 
              onBlur={this.handleBlur("password")}
              onFocus={this.handleFocus("password")}
            />
            <span className="icon_wrapper">
              <i className="material-icons">priority_high</i>
            </span>
            <span className="tooltip_wrapper long">
              <span className="tooltip_inner">
                <span className="tooltip"></span>
                <span className="tooltip_message">{this.state.errors.password}</span>
              </span>
            </span>
          </span>
          <span className="input_wrapper birthdate">
            <BirthDateSelect handleChildInput={this.handleChildInput} />
            <span className="helper_wrapper">
              <span className="icon_help_wrapper">
                <i className="material-icons">help</i>
              </span>
              <span className="helper_inner">
                <span className="helper_tooltip_border"></span>
                <span className="helper_tooltip"></span>
                <span className="helper_box">
                  <p className="helper_text"><b>Providing your birthday</b> helps make sure you get the right Facebook experience for your age. If you want to change who sees this, go to the About section of your profile. For more details, please visit our Data Policy.</p>
                  <hr />
                  <span className="button_wrapper">
                    <button>Close</button>
                  </span>
                </span>
              </span>
            </span>
          </span>
          <span className="gender_wrapper input_wrapper">
            <label>Gender</label>
            <span className="radio_wrapper">
              <input type="radio" 
                name="gender" 
                value="female"
                onChange={this.handleInput("gender")}
              /> Female
            </span>
            <span className="radio_wrapper">
            <input type="radio"
              name="gender"
              value="male"
              onChange={this.handleInput("gender")}
            /> Male
            </span>
            <span className="helper_wrapper">
              <span className="icon_help_wrapper">
                <i className="material-icons">help</i>
              </span>
            </span>
          </span>
          <p className="terms">By clicking Sign Up, you agree to our <a>Terms</a>, <a>Data Policy</a> and <a>Cookies Policy</a>. You may receive SMS Notifications from us and can opt out any time.</p>
          <button className="form_button">Sign Up</button>
        </form>
        <hr />
        <p className="create_page"><a>Create a Page</a> for a celebrity, band or business.</p>
      </div>
    );
  }
};