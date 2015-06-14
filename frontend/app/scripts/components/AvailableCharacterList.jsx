import React from 'react';
import CompositionActions from '../actions/CompositionActions';
import CharacterList from './CharacterList.jsx';

const AvailableCharacterList = React.createClass({

  propTypes: {
    characters: React.PropTypes.object,
    roster: React.PropTypes.object
  },

  delete(characterId) {
    CompositionActions.deleteCharacter(characterId);
  },

  renderNoCharacters() {
    return (
      <div className='AvailableCharacterList-noCharacters'>
        <p>No characters available.</p>
        <a href='#'><i className='fa fa-2x fa-plus'></i></a>
        <p>Add some!</p>
      </div>
    );
  },

  render() {
    let node = null;
    if(this.props.characters.size) {
      node = (
        <CharacterList
          characters={this.props.roster}
          delete={this.delete}
        />
      );
    } else {
      node = this.renderNoCharacters();
    }

    return (
      <div className='AvailableCharacterList'>
        {node}
      </div>
    );
  }

});

export default AvailableCharacterList;
