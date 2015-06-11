import React from 'react';
import { DropTarget } from 'react-dnd';
import RaidActions from '../actions/RaidActions';
import ItemTypes from '../misc/itemTypes';
import CharacterList from './CharacterList.jsx';

const raidTarget = {
  drop(props, monitor) {
    return {
      raidId: props.raid.id
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const Raid = React.createClass({

  propTypes: {
    raid: React.PropTypes.object
  },

  remove(characterId) {
    RaidActions.removeCharacter(this.props.raid.id, characterId);
  },

  render() {
    const { connectDropTarget, isOver } = this.props;
    const style = {
      background: isOver ? '#26ADE4' : ''
    };

    return connectDropTarget(
      <div className='Raid' style={style}>
        <div className='Raid-header'>
          Raid {this.props.raid.id}
        </div>
        <CharacterList characters={this.props.raid.characters} delete={this.remove} />
      </div>
    );
  }

});

export default DropTarget(ItemTypes.CHARACTER, raidTarget, collect)(Raid);
