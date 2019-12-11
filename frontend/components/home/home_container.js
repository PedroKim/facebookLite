import { connect } from 'react-redux';
import { fetchUser } from '../../actions/users_action';
import { logout } from '../../actions/session';
import Home from './home';

const msp = ({users, session}) => {
  return {
    currentUser: session.currentUser,
    users
  }
};

const mdp = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  logout: () => dispatch(logout())
});

export default connect(msp, mdp)(Home);