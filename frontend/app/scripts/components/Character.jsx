import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../misc/itemTypes';
import RaidActions from '../actions/RaidActions';

const characterSource = {
  beginDrag(props) {
    return {};
  },

  endDrag(props, monitor, component) {
    console.log(props);
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

    const cssClass = 'Character ' + this.props.character.class;
    console.log(cssClass);

    return connectDragSource(
      <li className={cssClass}>
        {this.props.character.name}
        <span className='Character-delete'>
          <a href='#' onClick={this.props.delete.bind(null, this.props.character.id)}>
            <i className='fa fa-remove'></i>
          </a>
        </span>
      </li>
    );
  }

});

export default DragSource(ItemTypes.CHARACTER, characterSource, collect)(Character);
