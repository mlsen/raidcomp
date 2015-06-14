import React from 'react';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';
import CompositionPublisherActions from '../actions/CompositionPublisherActions';
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
    raid: React.PropTypes.object,
    counter: React.PropTypes.number
  },

  removeRaid() {
    CompositionPublisherActions.removeRaid(this.props.raid.id);
  },

  removeCharacter(characterId) {
    CompositionPublisherActions.moveCharacter(characterId, '0');
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
    const raidClasses = classNames({
      'Raid': true,
      'hover': isOver
    });

    return connectDropTarget(
      <div className={raidClasses}>
        <div className='Raid-header'>
          <a href='javascript:;' onClick={this.removeRaid}>
            <i className='Raid-deleteIcon fa fa-lg fa-remove'></i>
          </a>
          Raid {this.props.counter}
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
