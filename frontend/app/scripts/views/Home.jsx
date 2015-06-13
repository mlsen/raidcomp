import React from 'react';

const Home = React.createClass({

  render() {
    return (
      <div className='Home'>
        <button onClick={this.createComposition}>Create Composition</button>
      </div>
    );
  }

});

export default Home;
