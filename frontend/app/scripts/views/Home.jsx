import React from 'react';
import CompositionActions from '../actions/CompositionActions';
import CompositionPublisherStore from '../stores/CompositionPublisherStore';
import { Navigation } from 'react-router';

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
        <button onClick={this.createComposition}>Create Composition</button>
      </div>
    );
  }

});

export default Home;
