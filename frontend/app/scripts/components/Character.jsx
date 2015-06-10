import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../misc/itemTypes';
import RaidActions from '../actions/RaidActions';

const characterSource = {

  beginDrag(props) {
    return {};
  },

  endDrag(props, monitor, component) {
    const dropResult = monitor.getDropResult();
    if(dropResult && dropResult.hasOwnProperty('raidId')) {
      RaidActions.addCharacter(dropResult.raidId, props.character);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const Character = React.createClass({

  propTypes: {
    character: React.PropTypes.object,
    delete: React.PropTypes.func
  },

  render() {
    const { connectDragSource, isDragging } = this.props;

    return connectDragSource(
      <div className='character'>
        {this.props.character.name}
        <a href='#' onClick={this.props.delete.bind(null, this.props.character.id)}>x</a>
      </div>
    );
  }

});

export default DragSource(ItemTypes.CHARACTER, characterSource, collect)(Character);
