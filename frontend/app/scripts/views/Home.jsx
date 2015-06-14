import React from 'react';
import CompositionActions from '../actions/CompositionActions';
import CompositionStore from '../stores/CompositionStore';
import { Navigation } from 'react-router';

const Home = React.createClass({

  mixins: [Navigation],

  getInitialState() {
    return CompositionStore.getState();
  },

  componentDidMount() {
    CompositionStore.listen(this.onStoreChange);
  },

  componentWillUnmount() {
    CompositionStore.unlisten(this.onStoreChange);
  },

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate:', nextState);
    const compositionId = nextState.longCompositionId || nextState.shortCompositionId;
    if(compositionId !== null) {
      this.transitionTo('composition', { compositionId: compositionId });
    }
  },

  onStoreChange(state) {
    console.log('onStoreChange:', state);
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
