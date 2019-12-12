import React from 'react';
import BirthDateSelect from './birthdate_select';
import * as validateUtils from '../../utils/validate_utils';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        fname: "",
        lname: "",
        email: "",
        reEmail: "",
        password: "",
        birth_date: "1994/1/1",
        gender: "",
      },
      errors: {},
      selected: "",
      showReEmail: "hide",
      showHelper: ""
    };

    this.refObj = {
      fname: React.createRef(),
      lname: React.createRef(),
      email: React.createRef(),
      reEmail: React.createRef(),
      password: React.createRef()
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChildInput = this.handleChildInput.bind(this);
    this.handleCloseHelper = this.handleCloseHelper.bind(this);
    this.loginDemoUser = this.loginDemoUser.bind(this);
  }

  handleInput(type) {
    return e => {
      const {dataset, value} = e.target;
      const newState = this.state;
      newState.user[type] = value;
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
    const newState = this.state;
    newState.user[type] = value;
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { user } = this.state;
    let valid = true;

    Object.entries(this.refObj).forEach((attr, idx) => {
      const [field, ref] = attr;
      const {dataset, value} = ref.current;
      this.runValidation(dataset.vtype, value, field);
    });

    const errors = Object.entries(this.state.errors);

    for (let i = 0; i < errors.length; i++) {
      const [field, error] = errors[i];
      if (error) {
        this.refObj[field].current.focus();
        this.state.selected = field;
        valid = false;
        break;
      }
    }

    this.setState(this.state);

    if (valid) this.props.createNewUser(this.state.user);
      // .then(() => this.props.history.push('/chirps'));
  }

  loginDemoUser(e) {
    e.preventDefault();
    this.props.login({
      email: "demo@mail.com", 
      password: "hunter2"
    });
  }

  handleBlur(field) {
    return e => {
      const {dataset, value} = e.target;
      const newState = this.runValidation(dataset.vtype, value, field);
      newState.selected = "";
      this.setState(newState);
    }
  }

  runValidation(vtype, val, field) {
    let result;
    if (vtype === "reEmail") {
      result = validateUtils[vtype](val, this.state.user.email);
    } else {
      result = validateUtils[vtype](val);
    }
    this.state;
    this.state.errors[field] = result.message;
    return this.state;
  }

  handleFocus(field) {
    return e => {
      this.setState({selected: field});
    }
  }

  handleShowHelper(field) {
    return e => {
      e.preventDefault();
      if (this.state.showHelper.length === 0) {
        this.setState({showHelper: field});
      }
    }
  }

  handleCloseHelper(e) {
    e.preventDefault();
    this.setState({showHelper: ""});
  }

  errorActive(field) {
    // console.log(this.state);
    return this.state.errors[field] ? "error" : "";
  }

  focusActive(field) {
    return this.state.selected === field ? "focus" : "";
  }

  helperActive(field) {
    return this.state.showHelper === field ? "show" : "";
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
                ref={this.refObj.fname}
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
                ref={this.refObj.lname}
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
              ref={this.refObj.email}
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
              ref={this.refObj.reEmail}
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
              ref={this.refObj.password}
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
              <button className="icon_help_wrapper" onClick={this.handleShowHelper("birthdate")} onBlur={this.handleCloseHelper}>
                <i className="material-icons">help</i>
                <span className={"helper_inner " + this.helperActive("birthdate")}>
                  <span className="helper_tooltip_border"></span>
                  <span className="helper_tooltip"></span>
                  <span className="helper_box">
                    <p className="helper_text"><b>Providing your birthday</b> helps make sure you get the right Facebook experience for your age. If you want to change who sees this, go to the About section of your profile. For more details, please visit our <a>Data Policy</a>.</p>
                    <hr />
                    <span className="button_wrapper">
                      <a onClick={this.handleCloseHelper}>Close</a>
                    </span>
                  </span>
                </span>
              </button>
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
              <button className="icon_help_wrapper" onClick={this.handleShowHelper("gender")} onBlur={this.handleCloseHelper}>
                <i className="material-icons">help</i>
                <span className={"helper_inner " + this.helperActive("gender")}>
                  <span className="helper_tooltip_border"></span>
                  <span className="helper_tooltip"></span>
                  <span className="helper_box">
                    <p className="helper_text">You can change who sees your gender on your profile later. </p>
                    <hr />
                    <span className="button_wrapper">
                      <a onClick={this.handleCloseHelper}>Close</a>
                    </span>
                  </span>
                </span>
              </button>
            </span>
          </span>
          <p className="terms">By clicking Sign Up, you are signing up on this clone project. So, do not sign up with sensitive information. Also, you can explore through this website using this <a onClick={this.loginDemoUser}>demo login</a>. Enjoy checking out this fb clone!</p>
          <div className="button_container">
            <button className="form_button">Sign Up</button>
            <button className="form_button demo" onClick={this.loginDemoUser}>Demo User</button>
          </div>
        </form>
        {/* <hr /> */}
      </div>
    );
  }
};