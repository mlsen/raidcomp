import React from 'react';
import CompositionActions from '../actions/CompositionActions';
import CompositionPublisherStore from '../stores/CompositionPublisherStore';
import { Navigation } from 'react-router';
import { Menubar, MenubarItem } from '../components/Menubar.jsx';

const Home = React.createClass({

  mixins: [Navigation],

  getInitialState() {
    return CompositionPublisherStore.getState();
  },

  componentDidMount() {
    CompositionPublisherStore.listen(this.onStoreChange);
  },

  componentWillUnmount() {
    CompositionPublisherStore.unlisten(this.onStoreChange);
  },

  componentWillUpdate(nextProps, nextState) {
    if(nextState.compositionId !== null) {
      this.transitionTo('composition', { compositionId: nextState.compositionId });
    }
  },

  onStoreChange(state) {
    this.setState(state);
  },

  createComposition(e) {
    CompositionActions.createComposition();
  },

  render() {
    return (
      <div className='Home'>
        <Menubar />
        <div className='Home-box'>
          <div className='Home-boxHeader'>
            Start now!
          </div>
          <div className='Home-boxBody'>
            <button onClick={this.createComposition}>Create Composition</button>
          </div>
        </div>
      </div>
    );
  }

});

export default Home;
