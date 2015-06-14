import React from 'react';
import CompositionActions from '../actions/CompositionActions';
import CompositionStore from '../stores/CompositionStore';
import Menubar from '../components/Menubar.jsx';
import Workspace from '../components/Workspace.jsx';

const Composition = React.createClass({

  getInitialState() {
    return CompositionStore.getState();
  },

  componentWillMount() {
  },

  componentDidMount() {
    CompositionStore.listen(this.onStoreChange);
    CompositionActions.setComposition(this.props.params.compositionId);
  },

  componentWillUnmount() {
    CompositionStore.unlisten(this.onStoreChange);
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
