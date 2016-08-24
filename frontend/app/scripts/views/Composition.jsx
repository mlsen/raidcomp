import React from 'react';
import { Navigation } from 'react-router';
import CompositionActions from '../actions/CompositionActions';
import CompositionPublisherActions from '../actions/CompositionPublisherActions';
import CompositionConsumerStore from '../stores/CompositionConsumerStore';
import ImportModal from '../views/ImportModal.jsx';
import { Menubar, MenubarItem } from '../components/Menubar.jsx';
import Workspace from '../components/Workspace.jsx';

const Composition = React.createClass({

  // mixins: [Navigation],
  // contextTypes: {
  //       router: React.PropTypes.object.isRequired
  // },

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
    console.log("Mounting: " + this.props.params.compositionId);
    CompositionActions.setComposition.defer(this.props.params.compositionId);
  },

  componentWillUpdate(nextProps, nextState) {
    if(nextState.compositionId === null) {
      console.log("hi...")
      //this.context.router.push('/');
    }
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
