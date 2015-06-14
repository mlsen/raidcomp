import React from 'react';
import CompositionActions from '../actions/CompositionActions';
import CompositionConsumerStore from '../stores/CompositionConsumerStore';
import Menubar from '../components/Menubar.jsx';
import Workspace from '../components/Workspace.jsx';

const Composition = React.createClass({

  getInitialState() {
    return CompositionConsumerStore.getState();
  },

  componentWillMount() {
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
        <Menubar />
        <Workspace characters={this.state.characters} raids={this.state.raids} />
      </div>
    );
  }

});

export default Composition;
