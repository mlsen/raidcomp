import React from 'react';
import Character from './Character.jsx';

const CharacterList = React.createClass({

  propTypes: {
    characters: React.PropTypes.object,
    delete: React.PropTypes.func
  },

  render() {
    return (
      <div className='characters'>
        {this.props.characters.map(character => {
          return <Character key={character.id} character={character} delete={this.props.delete} />;
        })}
      </div>
    );
  }

});

export default CharacterList;
