import { connect } from 'react-redux';
import NavList from './nav_list';
import { logout } from '../../actions/session';

const msp = ({ entities, session }) => ({
  user: entities.users[session.currentUser]
});

const mdp = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(msp, mdp)(NavList);