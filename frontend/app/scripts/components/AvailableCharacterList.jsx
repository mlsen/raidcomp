import React from 'react';
import CharacterActions from '../actions/CharacterActions';
import CharacterList from './CharacterList.jsx';

const AvailableCharacterList = React.createClass({

  propTypes: {
    characters: React.PropTypes.object
  },

  getInitialState() {
    return {
      characterName: ''
    };
  },

  handleChange(e) {
    this.setState({
      characterName: e.target.value
    });
  },

  handleCreate(e) {
    e.preventDefault();
    CharacterActions.create({
      name: this.state.characterName
    });
    this.setState(this.getInitialState());
  },

  delete(characterId) {
    CharacterActions.delete(characterId);
  },

  render() {
    return (
      <div className='AvailableCharacterList'>
        <div className='AvailableCharacterList-form'>
          <input
            type='text'
            ref='characterName'
            onChange={this.handleChange}
            value={this.state.characterName}
            placeholder='Name'
          />
          <button onClick={this.handleCreate}>+</button>
        </div>
        <CharacterList characters={this.props.characters} delete={this.delete} />
      </div>
    );
  }

});

export default AvailableCharacterList;
