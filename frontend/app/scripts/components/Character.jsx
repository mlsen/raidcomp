import React from 'react';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';
import ItemTypes from '../misc/itemTypes';
import CompositionPublisherActions from '../actions/CompositionPublisherActions';
import { roles, specs } from '../misc/wow';

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

  getInitialState() {
    return { showSettings: false };
  },

  showSettings() {
    this.setState({ showSettings: !this.state.showSettings });
  },

  changeRole(role) {
    if(role !== this.props.character.role) {
      let character = this.props.character.set('role', role);
      CompositionPublisherActions.updateCharacter(character);
    }
    this.setState({ showSettings: false });
  },

  renderRoleIcon() {
    const cssClass = 'fa fa-fw ' + roleIcons[this.props.character.role];
    return <i className={cssClass} onClick={this.showSettings}></i>
  },

  renderCharacter() {
    const cssClass = 'Character-normal fg-' + this.props.character.className;
    const removeIcon = classNames({
      'fa': true,
      'fa-fw': true,
      'fa-trash': this.props.character.raidId === '0',
      'fa-remove': this.props.character.raidId !== '0'
    });

    return (
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
          {this.props.character.ilvl}
        </span>
        <span className='Character-name'>
          {this.props.character.name}
        </span>
      </div>
    );
  },

  renderSettings() {

    let roleIconNodes = [];
    for(let spec in specs[this.props.character.className]) {
      let role = specs[this.props.character.className][spec];

      let spanCss = classNames({
        'Character-role': true,
        'highlighted': this.props.character.role == role
      });
      let iconCss = 'fa fa-fw ' + roleIcons[role];

      roleIconNodes.push(
        <span key={role} className={spanCss} onClick={this.changeRole.bind(this, role)}>
          <i className={iconCss}></i>
        </span>
      );
    }

    return (
      <div className='Character-settings'>
        {roleIconNodes}
      </div>
    );
  },

  render() {
    const { connectDragSource, isDragging } = this.props;

    return connectDragSource(
      <div className='Character'>
        {this.state.showSettings ? this.renderSettings() : this.renderCharacter()}
      </div>
    );
  }

});

export default DragSource(ItemTypes.CHARACTER, characterSource, collect)(Character);
