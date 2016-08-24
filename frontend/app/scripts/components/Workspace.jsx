import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AvailableCharacterList from './AvailableCharacterList.jsx';
import RaidList from './RaidList.jsx';

const Workspace = React.createClass({

  propTypes: {
    raids: React.PropTypes.object,
    characters: React.PropTypes.object
  },

  render() {

    const roster = this.props.characters.filter(character => {
      return character.raidId === '0';
    });

    return (

      <div className='Workspace'>
        <AvailableCharacterList
          characters={this.props.characters}
          roster={roster}
        />
        <RaidList
          characters={this.props.characters}
          raids={this.props.raids}
        />
      </div>
    );
  }

});

export default DragDropContext(HTML5Backend)(Workspace);
