import React from 'react';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';
import CompositionPublisherActions from '../actions/CompositionPublisherActions';
import ItemTypes from '../misc/itemTypes';
import CharacterList from './CharacterList.jsx';
import { getTokenForClass, tokens, getArmorTypeForClass, armorTypes, getTrinketForSpec, trinketTypes } from '../misc/wow';

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
    raidId: React.PropTypes.string,
    characters: React.PropTypes.object,
    counter: React.PropTypes.number
  },

  getInitialState() {
    let numTokens = {};
    numTokens[tokens.CONQUEROR] = 0;
    numTokens[tokens.PROTECTOR] = 0;
    numTokens[tokens.VANQUISHER] = 0;

    let numTrinkets = {};
    numTrinkets[trinketTypes.STR] = 0;
    numTrinkets[trinketTypes.AGI] = 0;
    numTrinkets[trinketTypes.TANK] = 0;
    numTrinkets[trinketTypes.CASTER] = 0;
    numTrinkets[trinketTypes.HEALER] = 0;

    let numArmorTypes = {};
    numArmorTypes[armorTypes.CLOTH] = 0;
    numArmorTypes[armorTypes.LEATHER] = 0;
    numArmorTypes[armorTypes.MAIL] = 0;
    numArmorTypes[armorTypes.PLATE] = 0;

    return {
      numTokens: numTokens,
      numArmorTypes: numArmorTypes,
      numTrinkets: numTrinkets,
      numCharacters: 0
    };
  },

  componentWillReceiveProps(props) {
    let numTokens = this.getInitialState().numTokens;
    let numArmorTypes = this.getInitialState().numArmorTypes;
    let numTrinkets = this.getInitialState().numTrinkets;

    let countTypes = function(num, type) {
      if(!num.hasOwnProperty(type)) {
        num[type] = 0;
      } else {
        num[type] = num[type] + 1;
      }
    }

    props.characters.map(character => {
      countTypes(numTokens, getTokenForClass(character.className));
      countTypes(numArmorTypes, getArmorTypeForClass(character.className));
      countTypes(numTrinkets, getTrinketForSpec(character.className, character.spec));
    });

    this.setState({
      numTokens: numTokens,
      numArmorTypes: numArmorTypes,
      numTrinkets: numTrinkets,
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
      <ul>
        <li><i className='fa fa-fw fa-users'></i> {this.state.numCharacters}</li>
        <li><i className='fa fa-fw fa-ban'></i> 962</li>
      </ul>
    ));
  },

  renderTokenCategory() {

    let numTokens = this.getInitialState().numTokens;
    let token;

    this.props.characters.map(character => {
      token = getTokenForClass(character.className);
      if(!numTokens.hasOwnProperty(token)) {
        numTokens[token] = 0;
      } else {
        numTokens[token] = numTokens[token] + 1;
      }
    });

    return this.renderCategory('Tokens', (
      <ul className='Raid-tokenList'>
        <li>{this.state.numTokens[tokens.PROTECTOR]} &times; Protector</li>
        <li>{this.state.numTokens[tokens.VANQUISHER]} &times; Vanquisher</li>
        <li>{this.state.numTokens[tokens.CONQUEROR]} &times; Conqueror</li>
      </ul>
    ));
  },
  renderArmorTypeCategory() {
    return this.renderCategory('Armor Types', (
      <ul className='Raid-armorTypeList'>
        <li>{this.state.numArmorTypes[armorTypes.CLOTH]} &times; Cloth</li>
        <li>{this.state.numArmorTypes[armorTypes.LEATHER]} &times; Leather</li>
        <li>{this.state.numArmorTypes[armorTypes.MAIL]} &times; Mail</li>
        <li>{this.state.numArmorTypes[armorTypes.PLATE]} &times; Plate</li>
      </ul>
    ));
  },
  renderTrinketCategory() {
    return this.renderCategory('Trinkets', (
      <ul className='Raid-trinketList'>
        <li>{this.state.numTrinkets[trinketTypes.STR]} &times; Strength Trinket</li>
        <li>{this.state.numTrinkets[trinketTypes.AGI]} &times; Agility Trinket</li>
        <li>{this.state.numTrinkets[trinketTypes.TANK]} &times; Tank Trinket</li>
        <li>{this.state.numTrinkets[trinketTypes.CASTER]} &times; Caster Trinket</li>
        <li>{this.state.numTrinkets[trinketTypes.HEALER]} &times; Healer Trinket</li>
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
            <i className='Raid-deleteIcon fa fa-lg fa-trash'></i>
          </a>
          Raid {this.props.counter}
        </div>
        <div className='Raid-body'>
          <div className='Raid-characters'>
            <CharacterList characters={this.props.characters} delete={this.removeCharacter} />
          </div>
          <div className='Raid-summary'>
            {this.renderInfoCategory()}
            {this.renderTokenCategory()}
            {this.renderArmorTypeCategory()}
            {this.renderTrinketCategory()}
          </div>
        </div>
      </div>
    );
  }

});

export default DropTarget(ItemTypes.CHARACTER, raidTarget, collect)(Raid);
