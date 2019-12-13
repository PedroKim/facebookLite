import ReactDOM from 'react-dom';
import React from 'react';
import Root from './components/root';
import configureStore from './store/store';

import { postSession } from "./utils/session";

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let preloadedState = undefined;
  if (window.currentUser) {
    preloadedState = {
      entities: {
        users: {[window.currentUser.id]: window.currentUser}
      },
      session: {
        currentUser: window.currentUser.id
      }
    };
    delete window.currentUser;
  }

  const store = configureStore(preloadedState);
  
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.postSession = postSession;

  ReactDOM.render(<Root store={store} />, root);
});