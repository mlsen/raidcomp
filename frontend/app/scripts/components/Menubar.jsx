import React from 'react';

const Menubar = React.createClass({

  render() {
    return (
      <nav className='Menubar'>
        <ul className='Menubar-links'>
          <li><a href='#'>Bla</a></li>
          <li><a href='#'>Blub</a></li>
          <li><a href='#'>Blu</a></li>
          <li><a href='#'>Bli</a></li>
        </ul>
      </nav>
    );
  }

});

export default Menubar;
