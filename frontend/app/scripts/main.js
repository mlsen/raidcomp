import React from 'react';
import Router from 'react-router';
import routes from './routes';
import 'whatwg-fetch';

Router.run(routes, Handler => {
  React.render(<Handler />, document.getElementById('app'))
});
