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

    const raids = this.props.raids.delete('0');

    return (
      <div className='RaidList'>
        {raids.map(raid => {
          return <Raid key={raid.id} raid={raid} />;
        })}
      </div>
    );
  }

});

export default RaidList;
