import React from 'react';
import Router from 'react-router';
import routes from './routes';

console.log(specs);

Router.run(routes, Handler => React.render(<Handler />, document.body));
