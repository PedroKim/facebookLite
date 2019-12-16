import React from 'react';
import ProfileBanner from './profile_banner';

export default class Profiles extends React.Component {
  
  render() {
    const {user, match} = this.props;
    const outputMsg = user ? 
      (<h1>{user.name + "'s profile page."}</h1>)
      : (<h1>User with id: ({match.params.user_id}) does not exist.</h1>);
      
    return (
      <section className="profiles">
        <ProfileBanner user={user} />
        {/* {outputMsg} */}
      </section>
    );
  }
};