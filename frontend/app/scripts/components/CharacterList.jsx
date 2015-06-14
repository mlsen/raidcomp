import React from 'react';
import Character from './Character.jsx';
import { roles } from '../misc/wow';

const CharacterList = React.createClass({

  propTypes: {
    characters: React.PropTypes.object,
    delete: React.PropTypes.func
  },

  renderRole(role) {
    return this.props.characters.filter(character => {
      return character.role === role;
    }).map(character => {
      return <Character key={character.id} character={character} delete={this.props.delete} />;
    }).toArray();
  },

  renderUnknownRole() {
    let roleNodes = this.renderRole(roles.UNKNOWN);
    if(roleNodes.length) {
      roleNodes.unshift(<li key='unknown' className='CharacterList-role'>Unknown</li>);
      return roleNodes;
    }
    return null;
  },

  render() {
    return (
      <ul className='CharacterList'>
        <li key='tank' className='CharacterList-role'>Tank</li>
        {this.renderRole(roles.TANK)}

        <li key='healer' className='CharacterList-role'>Healer</li>
        {this.renderRole(roles.HEALER)}

        <li key='ranged' className='CharacterList-role'>Ranged</li>
        {this.renderRole(roles.RANGED)}

        <li key='melee' className='CharacterList-role'>Melee</li>
        {this.renderRole(roles.MELEE)}

        {this.renderUnknownRole()}
      </ul>
    );
  }

});

export default CharacterList;
