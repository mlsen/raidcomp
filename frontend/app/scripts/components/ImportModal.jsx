import React from 'react';
import Modal from 'react-modal';
import Tabs from 'react-simpletabs';
import ImportGuildTab from './ImportGuildTab.jsx';

Modal.setAppElement(document.getElementById('modal'));
Modal.injectCSS();


const ImportModal = React.createClass({

  propTypes: {
    isOpen: React.PropTypes.bool
  },

  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <div className='ImportModal'>
          <a onClick={this.props.onRequestClose} href='#'>
            <i className='fa fa-lg fa-close ImportModal-closeIcon'></i>
          </a>
          <Tabs>
            <Tabs.Panel title='Import Guild'>
              <ImportGuildTab />
            </Tabs.Panel>
            <Tabs.Panel title='Import Character'>
              <p>Import Character Content</p>
            </Tabs.Panel>
          </Tabs>
        </div>
      </Modal>
    );
  }

});

export default ImportModal;
