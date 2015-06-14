import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../misc/itemTypes';
import CompositionPublisherActions from '../actions/CompositionPublisherActions';

const characterSource = {
  beginDrag(props) {
    return {};
  },

  endDrag(props, monitor, component) {
    const dropResult = monitor.getDropResult();
    if(dropResult && dropResult.hasOwnProperty('raidId')) {
      CompositionPublisherActions.moveCharacter(props.character.id, dropResult.raidId);
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
    const cssClass = 'Character bg-' + this.props.character.className;

    return connectDragSource(
      <li className={cssClass}>
        {this.props.character.name}
        <span className='Character-delete'>
          <a href='javascript:;' onClick={this.props.delete.bind(null, this.props.character.id)}>
            <i className='fa fa-remove'></i>
          </a>
        </span>
      </li>
    );
  }

});

export default DragSource(ItemTypes.CHARACTER, characterSource, collect)(Character);
