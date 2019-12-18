import { connect } from 'react-redux';
import { fetchUser, updateUser } from '../../actions/users_action';
import Profiles from './profiles';

const msp = ({entities, session}, ownProps) => {
  const user = entities.users[ownProps.match.params.user_id];
  return { 
    self: user && user.id === session.currentUser,
    user 
  };
};

const mdp = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  updateUser: userData => dispatch(updateUser(userData))
});


export default connect(msp, mdp)(Profiles);