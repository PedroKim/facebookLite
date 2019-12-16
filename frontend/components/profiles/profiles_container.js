import { connect } from 'react-redux';
import Profiles from './profiles';

const msp = ({entities}, ownProps) => {
  const user = entities.users[ownProps.match.params.user_id];
  return { user };
};

const mdp = dispatch => ({

});


export default connect(msp, mdp)(Profiles);