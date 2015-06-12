import React from 'react';
import { DropTarget } from 'react-dnd';
import CharacterActions from '../actions/CharacterActions';
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
    CharacterActions.move(characterId, 0);
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
