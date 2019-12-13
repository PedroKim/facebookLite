import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_utils';

import MainContainer from './main/main_container';
import SplashContainer from './splash/splash_container';

const App = () => (
  <>
    <ProtectedRoute exact path="/" component={MainContainer} />
    <AuthRoute path="/splash" component={SplashContainer} />
  </>
);

export default App;