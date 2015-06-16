import React from 'react';
import CompositionActions from '../actions/CompositionActions';
import CompositionPublisherActions from '../actions/CompositionPublisherActions';
import CompositionConsumerStore from '../stores/CompositionConsumerStore';
import ImportModal from '../views/ImportModal.jsx';
import { Menubar, MenubarItem } from '../components/Menubar.jsx';
import Workspace from '../components/Workspace.jsx';

const Composition = React.createClass({

  getInitialState() {
    let state = CompositionConsumerStore.getState();
    state.isModalOpen = false;
    return state;
  },

  openModal() {
    this.setState({ isModalOpen: true });
  },

  closeModal() {
    this.setState({ isModalOpen: false });
  },

  handleCreateRaid() {
    CompositionPublisherActions.addRaid();
  },

  componentDidMount() {
    CompositionConsumerStore.listen(this.onStoreChange);
    CompositionActions.setComposition(this.props.params.compositionId);
  },

  componentWillUnmount() {
    CompositionConsumerStore.unlisten(this.onStoreChange);
  },

  onStoreChange(state) {
    this.setState(state);
  },

  render() {
    return (
      <div className='Composition'>
        <Menubar>
          <MenubarItem icon='fa-user' text='Import Characters' onClick={this.openModal} />
          <MenubarItem icon='fa-server' text='Create Raid' onClick={this.handleCreateRaid} />
        </Menubar>
        <Workspace characters={this.state.characters} raids={this.state.raids} />
        <ImportModal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
        />
      </div>
    );
  }

});

export default Composition;
