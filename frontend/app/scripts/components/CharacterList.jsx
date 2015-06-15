import React from 'react';
import Character from './Character.jsx';
import { roles } from '../misc/wow';

const CharacterList = React.createClass({

  propTypes: {
    characters: React.PropTypes.object,
    delete: React.PropTypes.func
  },

  renderRole(role) {
    return (
      <li className='CharacterList-role'>
        {this.props.characters.filter(character => {
          return character.role === role;
        }).map(character => {
          return <Character key={character.id} character={character} delete={this.props.delete} />;
        }).toArray()}
      </li>
    );
  },

  render() {
    return (
      <ul className='CharacterList'>
        {this.renderRole(roles.TANK)}
        {this.renderRole(roles.HEALER)}
        {this.renderRole(roles.RANGED)}
        {this.renderRole(roles.MELEE)}
        {this.renderRole(roles.UNKNOWN)}
      </ul>
    );
  }

});

export default CharacterList;
