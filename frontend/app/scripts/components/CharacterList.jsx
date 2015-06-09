import React from 'react';
import Character from './Character.jsx';


const CharacterList = React.createClass({

  render() {

    const nodes = this.props.characters.map(character => {
      console.log('Character:', character.get('name'));
      return <Character name={ character.get('name') } />;
    });

    return (
      <div style={{
        border: '1px solid blue',
        height: '40vh',
        width: '10%'
      }}>
        { nodes }
      </div>
    );
  }

});

export default CharacterList;
