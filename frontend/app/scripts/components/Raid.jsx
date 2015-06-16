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

  numSummaryTypes: {
    numTokens: {},
    numArmorTypes: {},
    numTrinkets: {}
  },

  setInitialState: function () {
    this.numSummaryTypes.numTokens[tokens.CONQUEROR] = 0;
    this.numSummaryTypes.numTokens[tokens.PROTECTOR] = 0;
    this.numSummaryTypes.numTokens[tokens.VANQUISHER] = 0;

    this.numSummaryTypes.numTrinkets[trinketTypes.STR] = 0;
    this.numSummaryTypes.numTrinkets[trinketTypes.AGI] = 0;
    this.numSummaryTypes.numTrinkets[trinketTypes.TANK] = 0;
    this.numSummaryTypes.numTrinkets[trinketTypes.CASTER] = 0;
    this.numSummaryTypes.numTrinkets[trinketTypes.HEALER] = 0;

    this.numSummaryTypes.numArmorTypes[armorTypes.CLOTH] = 0;
    this.numSummaryTypes.numArmorTypes[armorTypes.LEATHER] = 0;
    this.numSummaryTypes.numArmorTypes[armorTypes.MAIL] = 0;
    this.numSummaryTypes.numArmorTypes[armorTypes.PLATE] = 0;
  },

  countTypes(num, type) {
    if(!num.hasOwnProperty(type)) {
      num[type] = 0;
    } else {
      num[type] = num[type] + 1;
    }
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
    let totalIlvl = 0;
    this.props.characters.forEach(character => {
      totalIlvl = totalIlvl + character.ilvl;
    });
    const averageIlvl = parseInt(totalIlvl / this.props.characters.size);

    return this.renderCategory('Info', (
      <ul>
        <li><i className='fa fa-fw fa-users'></i> {this.props.characters.size}</li>
        <li><i className='fa fa-fw fa-ban'></i> {averageIlvl}</li>
      </ul>
    ));
  },

  renderTokenCategory() {
    return this.renderCategory('Tokens', (
      <ul className='Raid-tokenList'>
        <li>{this.numSummaryTypes.numTokens[tokens.PROTECTOR]} &times; Protector</li>
        <li>{this.numSummaryTypes.numTokens[tokens.VANQUISHER]} &times; Vanquisher</li>
        <li>{this.numSummaryTypes.numTokens[tokens.CONQUEROR]} &times; Conqueror</li>
      </ul>
    ));
  },
  renderArmorTypeCategory() {
    return this.renderCategory('Armor Types', (
      <ul className='Raid-armorTypeList'>
        <li>{this.numSummaryTypes.numArmorTypes[armorTypes.CLOTH]} &times; Cloth</li>
        <li>{this.numSummaryTypes.numArmorTypes[armorTypes.LEATHER]} &times; Leather</li>
        <li>{this.numSummaryTypes.numArmorTypes[armorTypes.MAIL]} &times; Mail</li>
        <li>{this.numSummaryTypes.numArmorTypes[armorTypes.PLATE]} &times; Plate</li>
      </ul>
    ));
  },
  renderTrinketCategory() {
    return this.renderCategory('Trinkets', (
      <ul className='Raid-trinketList'>
        <li>{this.numSummaryTypes.numTrinkets[trinketTypes.STR]} &times; Strength Trinket</li>
        <li>{this.numSummaryTypes.numTrinkets[trinketTypes.AGI]} &times; Agility Trinket</li>
        <li>{this.numSummaryTypes.numTrinkets[trinketTypes.TANK]} &times; Tank Trinket</li>
        <li>{this.numSummaryTypes.numTrinkets[trinketTypes.CASTER]} &times; Caster Trinket</li>
        <li>{this.numSummaryTypes.numTrinkets[trinketTypes.HEALER]} &times; Healer Trinket</li>
      </ul>
    ));
  },

  render() {
    const { connectDropTarget, isOver } = this.props;
    const raidClasses = classNames({
      'Raid': true,
      'hover': isOver
    });

    this.setInitialState();
    this.props.characters.map(character => {
      this.countTypes(this.numSummaryTypes.numTokens, getTokenForClass(character.className));
      this.countTypes(this.numSummaryTypes.numArmorTypes, getArmorTypeForClass(character.className));
      this.countTypes(this.numSummaryTypes.numTrinkets, getTrinketForSpec(character.className, character.spec));
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
