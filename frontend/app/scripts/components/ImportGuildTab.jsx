import React from 'react';

const ImportGuildTab = React.createClass({

  render() {
    return (
      <div className='ImportGuildTab'>
        <div className='ImportGuildTab-form'>
          <p>
            <label>Region</label>
            <input type='text' ref='region' />
          </p>
          <p>
            <label>Realm</label>
            <input type='text' ref='realm' />
          </p>
          <p>
            <label>Guild Name</label>
            <input type='text' ref='guild' />
          </p>
          <button className='ImportGuildTab-searchButton' onClick={this.handleSearch}>Search</button>
        </div>
        <div className='ImportGuildTab-results'>
          blagdgdga
        </div>
      </div>
    );
  }

});

export default ImportGuildTab;
