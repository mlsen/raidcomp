import React from 'react';
import ImportActions from '../actions/ImportActions';
import ImportStore from '../stores/ImportStore';

const ImportGuildTab = React.createClass({

  getInitialState() {
    return ImportStore.getState();
  },

  componentDidMount() {
    ImportStore.listen(this.onStoreChange);
  },

  componentWillUnmount() {
    ImportStore.unlisten(this.onStoreChange);
  },

  onStoreChange(state) {
    this.setState(state);
  },

  handleSearch(e) {
    e.preventDefault();

    const region = this.refs.region.getDOMNode().value;
    const realm = this.refs.realm.getDOMNode().value;
    const guild = this.refs.guild.getDOMNode().value;

    ImportActions.fetchGuild(region, realm, guild);
  },

  renderResults() {
    let cssClass = '';
    return (
      <div>
        {this.state.ranks.map((members, rank) => {
          return (
            <div className='ImportGuildTab-rank'>
              <div className='ImportGuildTab-rankHeader'>
                Rank: {rank}
              </div>
              <div className='ImportGuildTab-rankCharacters'>
                {members.map(character => {
                  cssClass = 'ImportGuildTab-character fg-' + character.get('class');
                  console.log(cssClass);
                  return <span className={cssClass}>{character.get('name')}</span>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  },

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
          <button className='ImportGuildTab-importButton' onClick={this.importSelected}>Import selected</button>
        </div>
        <div className='ImportGuildTab-results'>
          {this.renderResults()}
        </div>
      </div>
    );
  }

});

export default ImportGuildTab;
