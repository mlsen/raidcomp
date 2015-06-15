import React from 'react';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';
import ItemTypes from '../misc/itemTypes';
import CompositionPublisherActions from '../actions/CompositionPublisherActions';
import { roles } from '../misc/wow';

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

const roleIcons = {};
roleIcons[roles.HEALER] = 'fa-plus';
roleIcons[roles.MELEE] = 'fa-gavel';
roleIcons[roles.RANGED] = 'fa-bolt';
roleIcons[roles.TANK] = 'fa-shield';
roleIcons[roles.UNKNOWN] = 'fa-question';


const Character = React.createClass({

  propTypes: {
    character: React.PropTypes.object,
    delete: React.PropTypes.func
  },

  renderRoleIcon() {
    const cssClass = 'fa fa-fw ' + roleIcons[this.props.character.role];
    return <i className={cssClass}></i>
  },

  render() {
    const { connectDragSource, isDragging } = this.props;
    const cssClass = 'Character fg-' + this.props.character.className;

    const removeIcon = classNames({
      'fa': true,
      'fa-fw': true,
      'fa-trash': this.props.character.raidId === '0',
      'fa-remove': this.props.character.raidId !== '0'
    });

    return connectDragSource(
      <div className={cssClass}>
        <span className='Character-role'>
          {this.renderRoleIcon()}
        </span>
        <span className='Character-delete'>
          <a href='javascript:;' onClick={this.props.delete.bind(null, this.props.character.id)}>
            <i className={removeIcon}></i>
          </a>
        </span>
        <span className='Character-ilvl'>
          692
        </span>
        <span className='Character-name'>
          {this.props.character.name}
        </span>
      </div>
    );
  }

});

export default DragSource(ItemTypes.CHARACTER, characterSource, collect)(Character);
