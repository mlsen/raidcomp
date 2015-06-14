import React from 'react';
import CompositionActions from '../actions/CompositionActions';
import Raid from './Raid.jsx';

const RaidList = React.createClass({

  propTypes: {
    raids: React.PropTypes.object
  },

  handleCreate(e) {
    e.preventDefault();
    CompositionActions.createRaid();
  },

  render() {
    const raids = this.props.raids.delete('0');
    let raidCount = 0;

    return (
      <div className='RaidList'>
        {raids.map(raid => {
          return <Raid key={raid.id} counter={++raidCount} raid={raid} />;
        }).toArray()}
      </div>
    );
  }

});

export default RaidList;
