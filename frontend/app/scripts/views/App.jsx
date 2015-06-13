import React from 'react';
import { RouteHandler } from 'react-router';
import CharacterStore from '../stores/CharacterStore';
import Menubar from '../components/Menubar.jsx';
import Workspace from '../components/Workspace.jsx';

const App = React.createClass({

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
