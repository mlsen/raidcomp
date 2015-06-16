import React from 'react';
import { RouteHandler } from 'react-router';
import AppActions from '../actions/AppActions';
import Workspace from '../components/Workspace.jsx';

const App = React.createClass({

  componentWillMount() {
    AppActions.connect();
  },

  render() {
    return (
      <div className='Content'>
        <RouteHandler />
      </div>
    );
  }

});

export default App;
