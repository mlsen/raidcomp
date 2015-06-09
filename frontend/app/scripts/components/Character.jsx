import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../misc/itemTypes';

const characterSource = {
  beginDrag(props) {
    return {
      name: props.name
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const Character = React.createClass({

  render() {
    const { connectDragSource, isDragging } = this.props;
    const name = this.props.name;

    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move'
      }}>
        Character {{ name }}
      </div>
    );
  }

});

export default DragSource(ItemTypes.CHARACTER, characterSource, collect)(Character);
