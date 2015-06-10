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
      <div className='RaidList'>
        {this.props.raids.map(raid => {
          return <Raid key={raid.id} raid={raid} />;
        })}
      </div>
    );
  }

});

export default RaidList;
