import React from 'react';
import RaidActions from '../actions/RaidActions';

const Menubar = React.createClass({

  handleCreateRaid() {
    RaidActions.create();
  },

  render() {
    return (
      <nav className='Menubar'>
        <ul className='Menubar-list'>
          <li className='Menubar-item'>
            <a href='#'><i className='fa fa-fw fa-lg fa-plus'></i> Add Characters</a>
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
