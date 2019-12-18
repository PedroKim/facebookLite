import React from 'react';
import { Link } from 'react-router-dom';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: "overview",
      activeForms: {
        city: false,
        town: false,
        number: false,
        gender: false,
        birthdate: false
      },
      userData: {
        city: "",
        town: "",
        number: "",
        gender: "",
        birthdate: ""
      }
    };

  }

  updateActiveSection(section) {
    return e => {
      this.setState({activeSection: section});
    };
  }

  toggleActiveForms(type) {
    return e => {
      const newState = this.state;
      newState.activeForms[type] = !newState.activeForms[type];
      this.setState(newState);
    }
  }

  getActiveSection(section) {
    return this.state.activeSection === section ? "active" : "";
  }

  getActiveForm(type) {
    return this.state.activeForms[type] ? "active" : "";
  }

  updateInput(type) {
    return e => {
      const newState = this.state;
      newState.userData[type] = e.target.value;
      this.setState(newState);
    }
  }


  activeViewport(activeSection) {
    const { user, self } = this.props;

    let birthDateStr = new Date(user.birthDate);
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'};
    birthDateStr = birthDateStr.toLocaleDateString('en-US', dateOptions);

    switch (activeSection) {
      case "overview":
        return (
          <ul className="av_wrapper av_overview">
            <li onClick={this.updateActiveSection("places")}>
              <div className="btn_av_add">
                <div className="icn_wrapper">
                  <span className="icn_add">+</span>
                </div>
                Add your current city
              </div>
            </li>
            <li onClick={this.updateActiveSection("places")}>
              <div className="btn_av_add">
                <div className="icn_wrapper">
                  <span className="icn_add">+</span>
                </div>
                Add your hometown
              </div>
            </li>
          </ul>
        )
      case "places":
        return (
          <>
            <p className="av_header">Current city and hometown</p>
            <ul className="av_wrapper av_places">
              <li className={"av_places_inner av_places_city " + this.getActiveForm("city")}>
                <div className="btn_av_add" onClick={this.toggleActiveForms("city")}>
                  <div className="icn_wrapper">
                    <span className="icn_add">+</span>
                  </div>
                  Add your current city
                </div>
                <div className="av_edit_form">
                  <form>
                    <div className="av_field_wrapper">
                      <label>Current City</label>
                      <input type="text"
                        value={this.state.userData.city}
                        onChange={this.updateInput("city")}
                      />
                    </div>
                    <hr />
                    <div className="btn_wrapper">
                      <button className="btn_confirm" >Save Changes</button>
                      <button className="btn_cancel" onClick={this.toggleActiveForms("city")}>Cancel</button>
                    </div>
                  </form>
                </div>
              </li>
              <li className={"av_places_inner av_places_town " + this.getActiveForm("town")}>
                <div className="btn_av_add" onClick={this.toggleActiveForms("town")}>
                  <div className="icn_wrapper">
                    <span className="icn_add">+</span>
                  </div>
                  Add your hometown
                </div>
                <div className="av_edit_form">
                  <form>
                    <div className="av_field_wrapper">
                      <label>Hometown</label>
                      <input type="text"
                        value={this.state.userData.town}
                        onChange={this.updateInput("town")}
                      />
                    </div>
                    <hr />
                    <div className="btn_wrapper">
                      <button className="btn_confirm" >Save Changes</button>
                      <button className="btn_cancel" onClick={this.toggleActiveForms("town")}>Cancel</button>
                    </div>
                  </form>
                </div>
              </li>
            </ul>
          </>
        )
      case "contact_basic":
        return (
         <>
            <p className="av_header">Contact information</p>
            <ul className="av_wrapper av_places">
              <li className="">
                <div className="av_data_wrapper">
                  <p className="data_key">Email</p>
                  <p className="data_value">{user.email}</p>
                </div>
              </li>
              <li className={"av_contact_inner av_contact_number " + this.getActiveForm("number")}>
                <div className="btn_av_add" onClick={this.toggleActiveForms("number")}>
                  <div className="icn_wrapper">
                    <span className="icn_add">+</span>
                  </div>
                  Add a mobile phone
                </div>
                <div className="av_edit_form">
                  <form>
                    <div className="av_field_wrapper">
                      <label>Mobile Phones</label>
                      <input type="text"
                        value={this.state.userData.number}
                        onChange={this.updateInput("number")}
                      />
                    </div>
                    <hr />
                    <div className="btn_wrapper">
                      <button className="btn_confirm" >Save Changes</button>
                      <button className="btn_cancel" onClick={this.toggleActiveForms("number")}>Cancel</button>
                    </div>
                  </form>
                </div>
              </li>
            </ul>
            <p className="av_header">Basic information</p>
            <ul className="av_wrapper av_places">
              <li className="">
                <div className="av_data_wrapper">
                  <p className="data_key">Birth Date</p>
                  <p className="data_value">{birthDateStr}</p>
                </div>
              </li>
              <li className="av_basic_gender">
                <div className="av_data_wrapper">
                  <p className="data_key">Gender</p>
                  <p className="data_value">{user.gender}</p>
                </div>
              </li>
            </ul>
          </>
        )
    }
  }


  render() {

    return (
      <section className="about_container">
        <div className="about_header">
          <Link to="/users/">
            <span className="icn_wrapper">
              <i className="material-icons">person</i>
            </span>
            <h2>About</h2>
          </Link>
        </div>
        <div className="about_body">
          <aside className="about_sidebar">
            <ul>
              <li className={this.getActiveSection("overview")}>
                <a onClick={this.updateActiveSection("overview")}>Overview</a>
              </li>
              <li className={this.getActiveSection("places")}>
                <a onClick={this.updateActiveSection("places")}>Places You've Lived</a>
              </li>
              <li className={this.getActiveSection("contact_basic")}>
                <a onClick={this.updateActiveSection("contact_basic")}>Contact and Basic Info</a>
              </li>
            </ul>
          </aside>
          <div className="about_viewport">
            {this.activeViewport(this.state.activeSection)}
          </div>
        </div>
      </section>
    )
  }
}