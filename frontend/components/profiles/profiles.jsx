import React from 'react';
import ProfileBanner from './profile_banner';

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
      // debugger;
      fetchUser(match.params.user_id);
    }
  }

  render() {
    const {user, match } = this.props;
    const outputMsg = user ? 
      (<h1>{user.name + "'s profile page."}</h1>)
      : (<h1>User with id: ({match.params.user_id}) does not exist.</h1>);
    const profileBanner = user ? (<ProfileBanner user={user} />) : null;

    return (
      <section className="profiles">
        {profileBanner}
        {/* {outputMsg} */}
      </section>
    );
  }
};