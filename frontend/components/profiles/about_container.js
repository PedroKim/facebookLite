import { connect } from 'react-redux';
import { updateUser } from '../../actions/users_action';
import About from './about';

const msp = ({ entities, session }, ownProps) => {
  const user = entities.users[ownProps.match.params.user_id];
  return {
    self: user && user.id === session.currentUser,
    user
  };
};

const mdp = dispatch => ({
  updateUser: userData => dispatch(updateUser(userData))
});

export default connect(msp, mdp)(About);