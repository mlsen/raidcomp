import React from 'react';
import CharacterActions from '../actions/CharacterActions';
import RaidActions from '../actions/RaidActions';

const Menubar = React.createClass({

  handleCreateRaid() {
    RaidActions.add();
  },

  handleCreateCharacter() {
    CharacterActions.add({});
  },

  render() {
    return (
      <nav className='Menubar'>
        <div className='Menubar-brand'>
          Raid Composer
        </div>
        <ul className='Menubar-list'>
          <li className='Menubar-item'>
            <a href='#' onClick={this.handleCreateCharacter}><i className='fa fa-fw fa-lg fa-plus'></i> Add Characters</a>
          </li>
          <li className='Menubar-item'>
            <a href='#' onClick={this.handleCreateRaid}><i className='fa fa-fw fa-lg fa-rss'></i> Create Raid</a>
          </li>
        </ul>
      </nav>
    );
  }

});

export default Menubar;
