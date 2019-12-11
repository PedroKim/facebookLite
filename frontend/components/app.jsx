import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_utils';

import HomeContainer from './home/home_container';
import SplashContainer from './splash/splash_container';

const App = () => (
  <div>
    <ProtectedRoute exact path="/" component={HomeContainer} />
    <AuthRoute path="/splash" component={SplashContainer} />
  </div>
);

export default App;