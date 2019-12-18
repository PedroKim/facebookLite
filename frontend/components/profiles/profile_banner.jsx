import React from 'react';
import { Link } from 'react-router-dom';

export default class ProfileBanner extends React.Component {
  constructor(props) {
    super(props);
    const {user} = this.props;
    this.state = {
      coverImg: {
        imgUrl: user.coverImg || "",
        imgFile: null
      },
      profileImg: {
        imgUrl: user.profileImg || "",
        imgFile: null
      },
      updateState: ""
    }

    this.allowSubmit = true;

    this.coverImgFileRef = React.createRef();
    this.profileImgFileRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      const { user } = this.props;
      this.setState({
        profileImg: {
          imgUrl: user.profileImg,
          imgFile: ""
        },
        coverImg: {
          imgUrl: user.coverImg,
          imgFile: ""
        },
        updateState: ""
      });
    }
  }

  updateImage(type) {
    return e => {
      e.preventDefault();
      this[type].current.click();
    }
  }

  handleFileInput(type) {
    return e => {
      const reader = new FileReader();
      const file = e.currentTarget.files[0];
      reader.onloadend = () => {
        const newState = this.state;
        const stateSlice = newState[type];
        stateSlice.imgUrl = reader.result;
        stateSlice.imgFile = file;
        newState.updateState = type;

        this.setState(newState);

        setTimeout(() => {
          console.log(this.state);
        }, 0);

      }
      if (file) {
        console.log(reader.readAsDataURL(file));
      } else {
        this.setState({[type]: {imgUrl: user[type], imgFile: ""}});
      }
      console.log(type);
    }
  }
  
  handleCancel(type) {
    return e => {
      e.preventDefault();
      const {user} = this.props;
      const newState = this.state;

      newState[type] = {
        imgUrl: user[type],
        imgFile: ""
      };
      newState.updateState = "";
      this[type + "FileRef"].current.value = "";

      this.setState(newState);
    }
  }

  handleUpdate(type) {
    return e => {
      e.preventDefault();
      const { user, updateUser } = this.props;
      const { imgFile } = this.state[type];
      const userData = new FormData();
  
      userData.append('user[id]', user.id);
      userData.append(`user[val]`, imgFile);
      userData.append('user[col]', type.split("Img")[0] + "_img");
  
      if (this.allowSubmit){
        this.allowSubmit = false;
        updateUser(userData).then(({user}) => {
          this[type + "FileRef"].current.value = "";
          this.setState({
            profileImg: {
              imgUrl: user.profileImg,
              imgFile: ""
            },
            coverImg: {
              imgUrl: user.coverImg,
              imgFile: ""
            },
            updateState: ""
          });
          this.allowSubmit = true;
          setTimeout(() => {
            console.log(this.state);
          }, 0);
        });

      }
    }
  }

  updateStatus() {
    return this.state.updateState === "coverImg" ? "updating" : "";
  }

  render() {
    const { user, self } = this.props;
    const { coverImg, profileImg, updateState } = this.state;
    const coverImgClass = coverImg.imageUrl ? "has_image" : "";

    const btn_add_cover_img = self ?
      (
        <button className="btn_add_cover_img wt" onClick={this.updateImage("coverImgFileRef")}>
          <span className="banner_icn_wrapper"><i className="material-icons">photo_camera</i></span>
          {coverImg.imgUrl ? 
            (<span className="btn_text">Update Cover Photo</span>)
             : (<span className="btn_text">Add Cover Photo</span>)
          }
        </button>
      ) : null;

    const coverImgEl = coverImg.imgUrl ?
      (<div className="pb_cover_img_wrapper" style={{backgroundImage: 'url(' + coverImg.imgUrl + ')'}}>
        {/* // "background-image= url(" + coverImg.imgUrl + ")" */}
          <img className="pb_cover_img" src={coverImg.imgUrl} />
        </div>
      ) : null;

    const profileImgEl = profileImg.imgUrl ? 
      ( self ? (
        <>
          <img src={profileImg.imgUrl} />
          <button className="btn_add_profile_img wt" onClick={this.updateImage("profileImgFileRef")}>
            <span className="btn_api_inner">
              <span className="banner_icn_wrapper"><i className="material-icons">photo_camera</i></span>
              <span className="btn_text">Update Photo</span>
            </span>
          </button>
        </>
        ) : (<img src={profileImg.imgUrl} />)
      ) : 
      ( self ? (
        <button className="btn_add_profile_img wt" onClick={this.updateImage("profileImgFileRef")}>
          <span className="btn_api_inner">
            <span className="banner_icn_wrapper"><i className="material-icons">photo_camera</i></span>
            <span className="btn_text">Add Photo</span>
          </span>
        </button>
      ) : null
    );

    const navEl = updateState ? 
      (
        <div className="pb_update_btns_wrapper">
          <ul className="pb_update_btns">
            <li>
              <button className="btn_cancel" onClick={this.handleCancel(this.state.updateState)}>Cancel</button>
            </li>
            <li>
              <button className="btn_confirm" onClick={this.handleUpdate(this.state.updateState)}>Save Changes</button>
            </li>
          </ul>
        </div>
      ) : (
        <nav className = "pb_nav">
          <ul>
            <li>
              <Link to={`/users/${user.id}/`}><span>Timeline</span></Link>
            </li>
            <li>
              <Link to={`/users/${user.id}/about`}><span>About</span></Link>
            </li>
            <li><a><span>Friends</span></a></li>
            <li><a><span>Photos</span></a></li>
          </ul>
        </nav>
      );

    return (
      <div className={"pb_wrapper " + this.updateStatus("coverImg")}>
        <input type="file" ref={this.coverImgFileRef} onChange={this.handleFileInput("coverImg")} />
        <input type="file" ref={this.profileImgFileRef} onChange={this.handleFileInput("profileImg")} />
        <div className={"pb_cover " + coverImgClass}>
          {coverImgEl}
          <div className="pb_name_wrapper">
            <Link to={"/users/" + user.id}>
              <h1>{user.name}</h1>
            </Link>
          </div>
          {btn_add_cover_img}
        </div>
        <div className="pb_nav_wrapper">
          {navEl}
        </div>
        <div className="pb_profile_frame">
          <div className="pb_profile_img_wrapper">
            {profileImgEl}
            {/* <div className="" */}
          </div>
        </div>
      </div>
    );
  }
};