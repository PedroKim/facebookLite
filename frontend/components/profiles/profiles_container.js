import { connect } from 'react-redux';
import { fetchUser } from '../../actions/users_action';
import Profiles from './profiles';

const msp = ({entities}, ownProps) => {
  const user = entities.users[ownProps.match.params.user_id];
  return { user };
};

const mdp = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId))
});


export default connect(msp, mdp)(Profiles);