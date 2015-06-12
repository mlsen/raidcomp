import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import AvailableCharacterList from './AvailableCharacterList.jsx';
import RaidList from './RaidList.jsx';

const Workspace = React.createClass({

  propTypes: {
    raids: React.PropTypes.object
  },

  render() {
    return (
      <div className='Workspace'>
        <AvailableCharacterList characters={this.props.raids.get('0').characters} />
        <RaidList raids={this.props.raids} />
      </div>
    );
  }

});

export default DragDropContext(HTML5Backend)(Workspace);
