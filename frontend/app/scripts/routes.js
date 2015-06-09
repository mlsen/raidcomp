import React from 'react';
import { Route, DefaultRoute, NotFoundRoute, Redirect } from 'react-router';

import App from './views/App.jsx';

var routes = (
  <Route name="app" path="/" handler={ App } />
);

export default routes;
