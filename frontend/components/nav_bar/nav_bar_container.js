import { connect } from 'react-redux';
import { fetchUser } from '../../actions/users_action';
import { logout } from '../../actions/session';
import NavBar from "./nav_bar";

const msp = ({ entities, session }) => {
  return {
    currentUser: entities.users[session.currentUser]
  }
};

const mdp = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(msp, mdp)(NavBar);