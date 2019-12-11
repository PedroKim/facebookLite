import { connect } from 'react-redux';
import { createNewUser, login, clearErrors } from '../../actions/session';
import Splash from './splash';

const msp = ({errors}) => ({
  signupErrors: errors.session.signup,
  loginErrors: errors.session.login
});

const mdp = dispatch => ({
  createNewUser: formUser => dispatch(createNewUser(formUser)),
  login: formUser => dispatch(login(formUser)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(msp, mdp)(Splash);