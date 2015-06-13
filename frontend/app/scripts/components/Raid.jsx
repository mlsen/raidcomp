import React from 'react';
import { DropTarget } from 'react-dnd';
import CharacterActions from '../actions/CharacterActions';
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

  removeRaid() {
    RaidActions.delete(this.props.raid.id);
  },

  removeCharacter(characterId) {
    CharacterActions.move(characterId, 0);
  },

  renderCategory(name, content) {
    return (
      <div className='Raid-category'>
        <div className='Raid-categoryHeader'>
          {name}
        </div>
        <div className='Raid-categoryBody'>
          {content}
        </div>
      </div>
    );
  },

  renderInfoCategory() {
    return this.renderCategory('Info', (
      <ul className='Raid-infoList'>
        <li>Characters: {this.props.raid.characters.size}</li>
      </ul>
    ));
  },

  renderTokenCategory() {
    return this.renderCategory('Tokens', (
      <ul className='Raid-tokenList'>
        <li>Conqueror: {this.props.raid.tokens.get('conqueror')}</li>
        <li>Protector: {this.props.raid.tokens.get('protector')}</li>
        <li>Vanquisher: {this.props.raid.tokens.get('vanquisher')}</li>
      </ul>
    ));
  },

  render() {
    const { connectDropTarget, isOver } = this.props;
    const style = {
      background: isOver ? '#26ADE4' : ''
    };

    return connectDropTarget(
      <div className='Raid' style={style}>
        <div className='Raid-header'>
          <a href='#' onClick={this.removeRaid}>
            <i className='Raid-deleteIcon fa fa-lg fa-remove'></i>
          </a>
          Raid {this.props.raid.id}
        </div>
        <div className='Raid-body'>
          <div className='Raid-characters'>
            <CharacterList characters={this.props.raid.characters} delete={this.removeCharacter} />
          </div>
          <div className='Raid-summary'>
            {this.renderInfoCategory()}
            {this.renderTokenCategory()}
          </div>
        </div>
      </div>
    );
  }

});

export default DropTarget(ItemTypes.CHARACTER, raidTarget, collect)(Raid);
