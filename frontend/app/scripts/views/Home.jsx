import React from 'react';
import CompositionActions from '../actions/CompositionActions';
import CompositionPublisherStore from '../stores/CompositionPublisherStore';
import { Navigation } from 'react-router';
import { Menubar, MenubarItem } from '../components/Menubar.jsx';

const Home = React.createClass({

  mixins: [Navigation],

  getInitialState() {
    let state = CompositionPublisherStore.getState();
    state.error = null;
    return state;
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

  handleSubmit(e) {
    e.preventDefault();
    const compositionId = this.refs.compositionId.getDOMNode().value;
    if(compositionId.length !== 10 && compositionId.length !== 40) {
      this.setState({
        error: 'Invalid Composition ID.'
      });
      return;
    }
    this.transitionTo('composition', { compositionId: compositionId });
  },

  renderError() {
    return (
      <div className='Home-error'>
        {this.state.error}
      </div>
    );

  },

  render() {

    let error = null;
    if(this.state.error) {
      error = this.renderError();
    }

    return (
      <div className='Home'>
        <Menubar />
        <div className='Home-box'>
          <button onClick={this.createComposition}>Create Composition</button>
          <div className='Home-separator'>
            <span className='Home-separatorText'>OR</span>
          </div>
          <div className='Home-boxInput'>
            <input type='text' ref='compositionId' placeholder='Enter ID' />
            <button onClick={this.handleSubmit}>
              <i className='fa fa-fw fa-arrow-right'></i>
            </button>
          </div>
          {error}
        </div>
      </div>
    );
  }

});

export default Home;
