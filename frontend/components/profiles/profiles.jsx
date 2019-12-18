import React from 'react';
import { Route } from 'react-router-dom';
import ProfileBanner from './profile_banner';
import AboutContainer from './about_container';

export default class Profiles extends React.Component {
  
  componentDidMount() {
    const { user, match, fetchUser } = this.props;
    if (!user) {
      fetchUser(match.params.user_id);
    }
  }

  componentDidUpdate(prevProps) {
    const { user, match, fetchUser } = this.props;
    if (prevProps.match.params.user_id !== match.params.user_id && !user) {
      fetchUser(match.params.user_id);
    }
  }

  render() {
    const { user, match, self, updateUser } = this.props;
    const outputMsg = user ? 
      (<h1>{user.name + "'s profile page."}</h1>)
      : (<h1>User with id: ({match.params.user_id}) does not exist.</h1>);
    const profileBanner = user ? 
      ( <ProfileBanner user={user} self={self} updateUser={updateUser}/>)  : null;

    return (
      <section className="profiles">
        <div className="profiles_inner">
          {profileBanner}
          {/* {outputMsg} */}
          {/* // Route for timeline exact */}
          <Route path="/users/:user_id/about" component={AboutContainer} />
        </div>
      </section>
    );
  }
};