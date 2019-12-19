import React from 'react';
import { Link } from 'react-router-dom';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    let { user } = this.props;
    if (!user) user = {};
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
        city: user.currentCity || "",
        town: user.hometown || "",
        number: user.phoneNumber || "",
        gender: user.gender || "",
        birthdate: user.birthDate || ""
      }
    };
    this.allowSubmit = true;
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

  handleUpdate(type, col) {
    return e => {
      e.preventDefault();
      const { user, updateUser } = this.props;
      const userData = new FormData();

      userData.append('user[id]', user.id);
      userData.append(`user[val]`, this.state.userData[type]);
      userData.append('user[col]', col);

      if(this.allowSubmit) {
        this.allowSubmit = false;
        updateUser(userData).then(({user}) => {
          this.allowSubmit = true;
          this.state.activeForms[type] = false;
          this.setState(this.state);
        });
      }
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
          <>
            <ul className="av_wrapper av_overview">
            {(user.currentCity || user.hometown) ?
              (
                <li className="shorter" onClick={this.updateActiveSection("places")}>
                  <div className="av_overview_data_wrapper">
                    <span className="av_overview_icn_wrapper"><i className="material-icons">home</i></span>
                    <div className="data_wrapper">
                      {user.currentCity ? (<p className="data_value">Lives in <a>{user.currentCity}</a></p>) : null }
                      {user.hometown ? 
                        (
                          <p className={"data_value " + (user.currentCity ? "extra" : "")}>From <a>{user.hometown}</a></p>
                        ) : null
                      }
                      {self ? (<span className="edit_prompt">Edit the places you've lived</span>) : null}
                    </div>
                  </div>
                </li>
              ) : null 
            }
            {user.currentCity ?
              null : 
              (self ?
                (
                  <li onClick={this.updateActiveSection("places")}>
                      <div className="btn_av_add">
                        <div className="icn_wrapper">
                          <span className="icn_add">+</span>
                        </div>
                        Add your current city
                      </div>
                  </li>
                ) : (
                  <li className="shorter dne">
                    <div className="av_overview_data_wrapper">
                      <span className="av_overview_icn_wrapper"><i className="material-icons">home</i></span>
                      <div className="data_wrapper">
                        <p className="data_value">No current city to show</p>
                      </div>
                    </div>
                  </li>
                )
              )
            }
            {user.hometown ? 
              null : 
              (self ? 
                (
                  <li onClick={this.updateActiveSection("places")}>
                    <div className="btn_av_add">
                      <div className="icn_wrapper">
                        <span className="icn_add">+</span>
                      </div>
                      Add your hometown
                    </div>
                  </li>
                ) : (
                  <li className="shorter dne">
                    <div className="av_overview_data_wrapper">
                      <span className="av_overview_icn_wrapper"><i className="material-icons">home</i></span>
                      <div className="data_wrapper">
                        <p className="data_value">No hometown to show</p>
                      </div>
                    </div>
                  </li>
                )
              )
            }
          </ul>
            <div className="av_contact_basic_preview" onClick={this.updateActiveSection("contact_basic")}>
              {user.phoneNumber ? (
                <p className="av_contact_basic_data">
                  <span className="icn_wrapper"><i className="material-icons">smartphone</i></span>
                  {user.phoneNumber}
                </p>
              ) : null}
              <p className="av_contact_basic_data">
                <span className="icn_wrapper"><i className="material-icons">cake</i></span>
                {birthDateStr}
              </p>
              {self ? (<span className="edit_prompt">Edit your contact and basic info</span>) : null}
            </div>
          </>
        )
      case "places":
        return (
          <>
            <p className="av_header">Current city and hometown</p>
            <ul className="av_wrapper av_places">
              {!self && !user.currentCity && !user.hometown ?
                (
                  <li className="shorter dne">
                    <div className="av_overview_data_wrapper">
                      <span className="av_overview_icn_wrapper"><i className="material-icons">room</i></span>
                      <div className="data_wrapper">
                        <p className="data_value">No places to show</p>
                      </div>
                    </div>
                  </li>
                ) : null
              }
              <li className={"av_places_inner av_places_city " + this.getActiveForm("city")}>
                {user.currentCity ? 
                  (
                    <div className="av_data_wrapper">
                      <p className="data_key">Current City</p>
                      <p className="data_value">{user.currentCity}</p>
                      {self ? (
                        <span className="edit_prompt" onClick={this.toggleActiveForms("city")}>
                          <span className="edit_prompt_icn_wrapper"><i className="material-icons">create</i></span>
                          <span className="edit_prompt_text">Edit</span>
                        </span>
                      ) : null}
                    </div>
                  ) : ( self ? (
                      <div className="btn_av_add" onClick={this.toggleActiveForms("city")}>
                        <div className="icn_wrapper">
                          <span className="icn_add">+</span>
                        </div>
                        Add your current city
                      </div>
                    ) : null
                  )
                }
                {self ? (
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
                        <button className="btn_confirm" onClick={this.handleUpdate("city", "current_city")}>Save Changes</button>
                        <button className="btn_cancel" onClick={this.toggleActiveForms("city")}>Cancel</button>
                      </div>
                    </form>
                  </div>
                ) : null}
              </li>
              <li className={"av_places_inner av_places_town " + this.getActiveForm("town")}>
                {user.hometown ? 
                  (
                    <div className="av_data_wrapper">
                      <p className="data_key">Hometown</p>
                      <p className="data_value">{user.hometown}</p>
                      {self ? (
                        <span className="edit_prompt" onClick={this.toggleActiveForms("town")}>
                          <span className="edit_prompt_icn_wrapper"><i className="material-icons">create</i></span>
                          <span className="edit_prompt_text">Edit</span>
                        </span>
                      ) : null}
                    </div>
                  ) : (self ? (
                      <div className = "btn_av_add" onClick = {this.toggleActiveForms("town")}>
                        <div className="icn_wrapper">
                          <span className="icn_add">+</span>
                        </div>
                        Add your hometown
                      </div>
                    ) : null
                  )
                }
                {self ? (
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
                        <button className="btn_confirm" onClick={this.handleUpdate("town", "hometown")}>Save Changes</button>
                        <button className="btn_cancel" onClick={this.toggleActiveForms("town")}>Cancel</button>
                      </div>
                    </form>
                  </div>
                ) : null}
              </li>
            </ul>
          </>
        )
      case "contact_basic":
        return (
         <>
            <p className="av_header">Contact information</p>
            <ul className="av_wrapper av_places">
              <li className="av_contact_email">
                <div className="av_data_wrapper">
                  <p className="data_key">Email</p>
                  <p className="data_value">{user.email}</p>
                </div>
              </li>
              <li className={"av_contact_inner av_contact_number " + this.getActiveForm("number")}>
                {self ? (user.phoneNumber ?
                    (
                      <div className="av_data_wrapper">
                        <p className="data_key">Mobile Phone</p>
                        <p className="data_value">{user.phoneNumber}</p>
                        <span className="edit_prompt" onClick={this.toggleActiveForms("number")}>
                          <span className="edit_prompt_icn_wrapper"><i className="material-icons">create</i></span>
                          <span className="edit_prompt_text">Edit</span>
                        </span>
                      </div>
                    ) : (
                      <div className="btn_av_add" onClick={this.toggleActiveForms("number")}>
                        <div className="icn_wrapper">
                          <span className="icn_add">+</span>
                        </div>
                        Add a mobile phone
                      </div>
                    )
                  ) : (user.phoneNumber ?
                    (
                      <div className="av_data_wrapper">
                        <p className="data_key">Mobile Phone</p>
                        <p className="data_value">{user.phoneNumber}</p>
                      </div>
                    ) : null
                  )
                }
                {self ? (
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
                          <button className="btn_confirm" onClick={this.handleUpdate("number", "phone_number")}>Save Changes</button>
                          <button className="btn_cancel" onClick={this.toggleActiveForms("number")}>Cancel</button>
                        </div>
                      </form>
                    </div>
                  ) : null
                }
              </li>
            </ul>
            <p className="av_header">Basic information</p>
            <ul className="av_wrapper av_places">
              <li className="av_basic_birthdate">
                <div className="av_data_wrapper">
                  <p className="data_key">Birth Date</p>
                  <p className="data_value">{birthDateStr}</p>
                </div>
              </li>
              <li className={"av_basic_gender " + this.getActiveForm("gender")}>
                <div className="av_data_wrapper">
                  <p className="data_key">Gender</p>
                  <p className="data_value">{user.gender}</p>
                  {self ? (
                    <span className="edit_prompt" onClick={this.toggleActiveForms("gender")}>
                      <span className="edit_prompt_icn_wrapper"><i className="material-icons">create</i></span>
                      <span className="edit_prompt_text">Edit</span>
                    </span>
                  ) : null}
                </div>
                {self ? (
                  <div className="av_edit_form">
                    <form>
                      <div className="av_field_wrapper">
                        <label>Gender</label>
                        <input type="text"
                          value={this.state.userData.gender}
                          onChange={this.updateInput("gender")}
                        />
                      </div>
                      <hr />
                      <div className="btn_wrapper">
                        <button className="btn_confirm" onClick={this.handleUpdate("gender", "gender")}>Save Changes</button>
                        <button className="btn_cancel" onClick={this.toggleActiveForms("gender")}>Cancel</button>
                      </div>
                    </form>
                  </div>
                ) : null
                }
              </li>
            </ul>
          </>
        )
    }
  }


  render() {
    const { user, self } = this.props;

    const aboutEl = user ? 
      (
        <section className="about_container">
          <div className="about_header">
            <Link to={"/users/" + user.id + "/about"}>
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
      ) : null;

    return (
      <>
        {aboutEl}
      </>
    )
  }
}