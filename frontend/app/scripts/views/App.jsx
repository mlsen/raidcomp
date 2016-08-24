import React from 'react';
import { RouteHandler } from 'react-router';
import AppActions from '../actions/AppActions';
import Workspace from '../components/Workspace.jsx';

const App = React.createClass({

  componentWillMount() {
    AppActions.connectToSocket();
  },

  render() {
    var children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {})
    })

    return (
      <div className='Content'>
        {children}
      </div>
    );
  }

});

export default App;
