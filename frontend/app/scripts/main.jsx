import React from 'react';
import { render } from 'react-dom';
import { Router, Route, NoMatch, IndexRoute, browserHistory } from 'react-router';
import 'whatwg-fetch';
import App from './views/App.jsx';
import Home from './views/Home.jsx'
import Composition from './views/Composition.jsx';


var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="comp/:compositionId" component={Composition} />
    </Route>
  </Router>
);

render(routes, document.getElementById('app'))
