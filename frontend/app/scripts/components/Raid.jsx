import React from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../misc/itemTypes';
import CharacterActions from '../actions/CharacterActions';
import Character from './Character.jsx';

const raidTarget = {
  drop(props, monitor) {
    CharacterActions.add(monitor.getItem());
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const Raid = React.createClass({

  render() {
    const { connectDropTarget, isOver } = this.props;

    const nodes = this.props.characters.map(character => {
      console.log(character);
      return <Character name={ character.get('name') } />;
    });

    return connectDropTarget(
      <div style={{
        border: '1px solid black',
        height: '40vh',
        width: '10%'
      }}>
        { nodes }
      </div>
    );
  }

});

export default DropTarget(ItemTypes.CHARACTER, raidTarget, collect)(Raid);
