import React from 'react';
import CharacterActions from '../actions/CharacterActions';
import RaidActions from '../actions/RaidActions';
import ImportModal from './ImportModal.jsx';

const Menubar = React.createClass({

  getInitialState() {
    return { isModalOpen: false };
  },

  openModal() {
    this.setState({ isModalOpen: true });
  },

  closeModal() {
    this.setState({ isModalOpen: false });
  },

  handleCreateRaid() {
    RaidActions.add();
  },

  handleCreateCharacter() {
    CharacterActions.add();
  },

  render() {
    return (
      <div>
        <nav className='Menubar'>
          <div className='Menubar-brand'>
            Raid Composer
          </div>
          <ul className='Menubar-list'>
            <li className='Menubar-item'>
              <a href='#' onClick={this.openModal}>
                <i className='fa fa-fw fa-lg fa-plus'></i> Import Characters
              </a>
            </li>
            <li className='Menubar-item'>
              <a href='#' onClick={this.handleCreateRaid}>
                <i className='fa fa-fw fa-lg fa-rss'></i> Create Raid
              </a>
            </li>
          </ul>
        </nav>
        <ImportModal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
        />
      </div>
    );
  }

});

export default Menubar;
