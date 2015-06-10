import React from 'react';
import RaidActions from '../actions/RaidActions';
import Raid from './Raid.jsx';

const RaidList = React.createClass({

  propTypes: {
    raids: React.PropTypes.object
  },

  handleCreate(e) {
    e.preventDefault();
    RaidActions.create();
  },

  render() {
    return (
      <div className='raids'>
        {this.props.raids.map(raid => {
          return <Raid key={raid.id} raid={raid} />;
        })}
        <div className='raids-form'>
          <button onClick={this.handleCreate}>Create Raid</button>
        </div>
      </div>
    );
  }

});

export default RaidList;
