import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_utils';

import Home from './home';
import SignupContainer from './session/signup_container';

const App = () => (
  <div>
    <ProtectedRoute exact path="/" component={Home} />
    <AuthRoute path="/signup" component={SignupContainer} />
  </div>
);

export default App;