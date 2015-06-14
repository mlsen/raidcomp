import React from 'react';
import { RouteHandler } from 'react-router';
import AppActions from '../actions/AppActions';
import Menubar from '../components/Menubar.jsx';
import Workspace from '../components/Workspace.jsx';

const App = React.createClass({

  componentWillMount() {
    AppActions.connect();
  },

  render() {
    return (
      <div className='App'>
        <Menubar />
        <div className='Content'>
          <RouteHandler />
        </div>
      </div>
    );
  }

});

export default App;
