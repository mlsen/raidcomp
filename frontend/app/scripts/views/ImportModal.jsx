import React from 'react';
import Modal from 'react-modal';
// import Tabs from 'react-simpletabs';
import ImportActions from '../actions/ImportActions';
import ImportStore from '../stores/ImportStore';
import ImportGuildTab from '../components/ImportGuildTab.jsx';

Modal.setAppElement(document.getElementById('modal'));
Modal.injectCSS();

const ImportModal = React.createClass({

  propTypes: {
    isOpen: React.PropTypes.bool
  },

  getInitialState() {
    return ImportStore.getState();
  },

  componentDidMount() {
    ImportStore.listen(this.onStoreChange);
  },

  componentWillUnmount() {
    ImportStore.unlisten(this.onStoreChange);
  },

  componentWillReceiveProps(props) {
    if(!this.props.isOpen && props.isOpen) {
      ImportActions.fetchRealms('eu');
    }
  },

  onStoreChange(state) {
    this.setState(state);
  },

  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <div className='ImportModal'>
          <a href='javascript:;' onClick={this.props.onRequestClose}>
            <i className='fa fa-lg fa-close ImportModal-closeIcon'></i>
          </a>

              <ImportGuildTab
                guild={this.state.guild}
                realms={this.state.realms}
                loading={this.state.loading}
                error={this.state.error} />

        </div>
      </Modal>
    );
  }

});

export default ImportModal;
