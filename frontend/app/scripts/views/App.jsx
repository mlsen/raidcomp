import React from 'react';
import CharacterStore from '../stores/CharacterStore';
import Workspace from '../components/Workspace.jsx';

const App = React.createClass({

  getInitialState() {
    return CharacterStore.getState();
  },

  componentDidMount() {
    CharacterStore.listen(this.onStoreChange);
  },

  componentWillUnmount() {
    CharacterStore.unlisten(this.onStoreChange);
  },

  onStoreChange(state) {
    this.setState(state);
  },

  render() {
    return (
      <div className='App'>
        <Workspace characters={this.state.characters} raids={this.state.raids} />
      </div>
    );
  }

});

export default App;
