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
    });
  },

  render() {
    return (
      <ul className='CharacterList'>
        <li className='CharacterList-role'>Tank</li>
        {this.renderRole(roles.TANK)}

        <li className='CharacterList-role'>Healer</li>
        {this.renderRole(roles.HEALER)}

        <li className='CharacterList-role'>Ranged</li>
        {this.renderRole(roles.RANGED)}

        <li className='CharacterList-role'>Melee</li>
        {this.renderRole(roles.MELEE)}
      </ul>
    );
  }

});

export default CharacterList;
