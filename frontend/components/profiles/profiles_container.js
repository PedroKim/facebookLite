import { connect } from 'react-redux';
import { 
  fetchUser, updateUser, makeFriendRequest, deleteFriendRequest, approveFriendRequest 
} from '../../actions/users_action';
import Profiles from './profiles';

const msp = ({entities, session}, ownProps) => {
  const user = entities.users[ownProps.match.params.user_id];
  return { 
    self: user && user.id === session.currentUser,
    currentUserId: session.currentUser,
    user 
  };
};

const mdp = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  updateUser: userData => dispatch(updateUser(userData)),
  makeFriendRequest: friendRequest => dispatch(makeFriendRequest(friendRequest)),
  deleteFriendRequest: friendRequest => dispatch(deleteFriendRequest(friendRequest)),
  approveFriendRequest: friendRequest => dispatch(approveFriendRequest(friendRequest))
});


export default connect(msp, mdp)(Profiles);