import React from 'react';
import classNames from 'classnames';
import ImportActions from '../actions/ImportActions';
import ImportStore from '../stores/ImportStore';

const ImportGuildTab = React.createClass({

  getInitialState() {
    return {
      store: ImportStore.getState(),
      form: {
        region: '',
        realm: '',
        guild: ''
      },
      selectedRanks: new Set()
    };
  },

  componentDidMount() {
    ImportStore.listen(this.onStoreChange);
  },

  componentWillUnmount() {
    ImportStore.unlisten(this.onStoreChange);
  },

  onStoreChange(state) {
    this.setState({ store: state });
  },

  handleSearch(e) {
    e.preventDefault();
    const { region, realm, guild } = this.state.form;
    ImportActions.fetchGuild(region, realm, guild);
  },

  handleRegionChange(e) {
    let form = this.state.form;
    form.region = e.target.value;
    this.setState({ form: form });
  },

  handleRealmChange(e) {
    let form = this.state.form;
    form.realm = e.target.value;
    this.setState({ form: form });
  },

  handleGuildChange(e) {
    let form = this.state.form;
    form.guild = e.target.value;
    this.setState({ form: form });
  },

  handleSelect(rank) {
    let selectedRanks = this.state.selectedRanks;
    rank = parseInt(rank);

    if(!selectedRanks.has(rank)) {
      selectedRanks.add(rank);
    } else {
      selectedRanks.delete(rank);
    }

    this.setState({
      selectedRanks: selectedRanks
    });
  },

  handleImport(e) {
    e.preventDefault();
    ImportActions.importRanks(this.state.selectedRanks);
  },

  renderResults() {
    let headerStyle = null;
    let characterCssClass = '';

    return (
      <div>
        {this.state.store.ranks.map((members, rank) => {

          let rankSelected = this.state.selectedRanks.has(parseInt(rank));

          // Green header background if rank is selected
          let headerStyle = classNames({
            'ImportGuildTab-rankHeader': true,
            'selected': rankSelected
          });

          // Remove symbol if rank is selected
          let selectIcon = classNames({
            'ImportGuildTab-selectIcon': true,
            'fa': true,
            'fa-plus': !rankSelected,
            'fa-minus': rankSelected
          });

          return (
            <div className='ImportGuildTab-rank'>
              <div className={headerStyle}>
                <a href='#' onClick={this.handleSelect.bind(this, rank)}>
                  <i className={selectIcon}></i>
                </a>
                Rank: {rank}
              </div>
              <div className='ImportGuildTab-rankCharacters'>
                {members.map((character, index) => {
                  characterCssClass = 'ImportGuildTab-character fg-' + character.get('class');
                  return <span key={index} className={characterCssClass}>{character.get('name')}</span>;
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
            <input type='text' ref='region' value={this.state.form.region} onChange={this.handleRegionChange} />
          </p>
          <p>
            <label>Realm</label>
            <input type='text' ref='realm' value={this.state.form.realm} onChange={this.handleRealmChange} />
          </p>
          <p>
            <label>Guild Name</label>
            <input type='text' ref='guild' value={this.state.form.guild} onChange={this.handleGuildChange} />
          </p>
          <button className='ImportGuildTab-searchButton' onClick={this.handleSearch}>Search</button>
          <button className='ImportGuildTab-importButton' onClick={this.handleImport}>Import selected</button>
        </div>
        <div className='ImportGuildTab-results'>
          {this.renderResults()}
        </div>
      </div>
    );
  }

});

export default ImportGuildTab;
