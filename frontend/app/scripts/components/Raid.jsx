import React from 'react';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';
import CompositionPublisherActions from '../actions/CompositionPublisherActions';
import ItemTypes from '../misc/itemTypes';
import CharacterList from './CharacterList.jsx';
import { getTokenForClass, tokens } from '../misc/wow';

const raidTarget = {
  drop(props, monitor) {
    return {
      raidId: props.raidId
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
    raidId: React.PropTypes.object,
    characters: React.PropTypes.object,
    counter: React.PropTypes.number
  },

  getInitialState() {
    let numTokens = {};
    numTokens[tokens.CONQUEROR] = 0;
    numTokens[tokens.PROTECTOR] = 0;
    numTokens[tokens.VANQUISHER] = 0;

    return {
      numTokens: numTokens,
      numCharacters: 0
    };
  },

  componentWillReceiveProps(props) {
    let numTokens = this.getInitialState().numTokens;
    let token;

    props.characters.map(character => {
      token = getTokenForClass(character.className);
      if(!numTokens.hasOwnProperty(token)) {
        numTokens[token] = 0;
      } else {
        numTokens[token] = numTokens[token] + 1;
      }
    });

    this.setState({
      numTokens: numTokens,
      numCharacters: this.props.characters.size
    });
  },

  removeRaid() {
    CompositionPublisherActions.removeRaid(this.props.raidId);
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
        <li>Characters: {this.state.numCharacters}</li>
      </ul>
    ));
  },

  renderTokenCategory() {
    return this.renderCategory('Tokens', (
      <ul className='Raid-tokenList'>
        <li>Conqueror: {this.state.numTokens[tokens.CONQUEROR]}</li>
        <li>Protector: {this.state.numTokens[tokens.PROTECTOR]}</li>
        <li>Vanquisher: {this.state.numTokens[tokens.VANQUISHER]}</li>
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
          Raid {this.props.raidId}
        </div>
        <div className='Raid-body'>
          <div className='Raid-characters'>
            <CharacterList characters={this.props.characters} delete={this.removeCharacter} />
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
