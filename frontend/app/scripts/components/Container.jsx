import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import Raid from './Raid.jsx';
import CharacterStore from '../stores/CharacterStore';
import CharacterList from './CharacterList.jsx';
import Character from './Character.jsx';

const Container = React.createClass({

  getInitialState() {
    return CharacterStore.getState();
  },

  componentDidMount() {
    CharacterStore.listen(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },

  render() {
    return (
      <div>
        <CharacterList characters={ this.state.characters } />
        <Raid characters={ this.state.raid } />
      </div>
    );
  }

});

export default DragDropContext(HTML5Backend)(Container);
