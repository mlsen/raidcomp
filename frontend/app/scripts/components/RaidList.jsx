import React from 'react';
import Raid from './Raid.jsx';

const RaidList = React.createClass({

  propTypes: {
    raids: React.PropTypes.object,
    characters: React.PropTypes.object
  },

  render() {
    let raids = this.props.raids.delete('0');
    raids = raids.reverse();
    let raidCount = 0, characters;

    return (
      <div className='RaidList'>
        {raids.map(raidId => {

          characters = this.props.characters.filter(character => {
            return character.raidId === raidId;
          });

          return <Raid key={raidId} counter={++raidCount} raidId={raidId} characters={characters} />;
        }).toArray()}
      </div>
    );
  }

});

export default RaidList;
