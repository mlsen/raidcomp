import React from 'react';
import classNames from 'classnames';
import ImportActions from '../actions/ImportActions';
import ImportStore from '../stores/ImportStore';
import { regions } from '../misc/wow';

const ImportGuildTab = React.createClass({

  getInitialState() {
    return {
      store: ImportStore.getState(),
      selectedRegion: 'eu',
      selectedRanks: new Set()
    };
  },

  componentDidMount() {
    ImportStore.listen(this.onStoreChange);
    ImportActions.fetchRealms(this.state.selectedRegion);
  },

  componentWillUnmount() {
    ImportStore.unlisten(this.onStoreChange);
  },

  onStoreChange(state) {
    this.setState({ store: state });
  },

  handleSearch(e) {
    e.preventDefault();
    const region = this.state.selectedRegion;
    const realm = this.refs.realm.getDOMNode().value;
    const guild = this.refs.guild.getDOMNode().value;
    this.setState({ selectedRanks: new Set() });
    ImportActions.fetchGuild(region, realm, guild);
  },

  handleRegionChange(e) {
    const region = e.target.value;
    if(!this.state.store.realms.has(region)) {
      ImportActions.fetchRealms(region);
    }
    this.setState({ selectedRegion: region });
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

  renderSpinner() {
    return (
      <div className='spinner'>
        <div className='bounce1'></div>
        <div className='bounce2'></div>
        <div className='bounce3'></div>
      </div>
    );
  },

  renderErrorMessage() {
    return (
      <div className='ImportGuildTab-error'>
        {this.state.store.errorMessage}
      </div>
    );
  },

  renderResults() {

    if(this.state.store.errorMessage) {
      return this.renderErrorMessage();
    }

    if(this.state.store.loading) {
      return this.renderSpinner();
    }

    let headerStyle = null;
    let characterCssClass = '';

    return (
      <div>
        {this.state.store.ranks.map((members, rank) => {

          let rankSelected = this.state.selectedRanks.has(parseInt(rank));

          // Green header background if rank is selected
          let headerStyle = classNames({
            'ImportGuildTab-rankHeader': true,
            // 'selected': rankSelected
          });

          // Remove symbol if rank is selected
          let selectIcon = classNames({
            'ImportGuildTab-selectIcon': true,
            'fa': true,
            'fa-plus-square': !rankSelected,
            'fa-minus-square': rankSelected
          });

          const selectedIcon = rankSelected ? (
            <i className='ImportGuildTab-checked fa fa-lg fa-fw fa-check'></i>
          ) : (
            <i className='ImportGuildTab-unchecked fa fa-lg fa-fw fa-remove'></i>
          );

          return (
            <div key={rank} className='ImportGuildTab-rank'>
              <div className={headerStyle}>
                <a href='#' onClick={this.handleSelect.bind(this, rank)}>
                  {selectedIcon}
                </a>
                Rank: {rank}
              </div>
              <div className='ImportGuildTab-rankCharacters'>
                {members.map((character, index) => {
                  characterCssClass = 'ImportGuildTab-character fg-' + character.get('class');
                  return (
                    <span key={index} className={characterCssClass}>
                      {character.get('name')}
                    </span>
                  );
                }).toArray()}
              </div>
            </div>
          );
        }).toArray()}
      </div>
    );
  },

  renderRegions() {
    let nodes = [];
    for(let key in regions) {
      if(regions.hasOwnProperty(key)) {
        nodes.push(<option key={key} value={key}>{regions[key]}</option>);
      }
    }
    return (
      <select value={this.state.selectedRegion} onChange={this.handleRegionChange}>
        {nodes}
      </select>
    );
  },

  renderRealms() {
    let nodes = [];
    if(this.state.store.realms.has(this.state.selectedRegion)) {
      this.state.store.realms.get(this.state.selectedRegion).map(realm => {
        nodes.push(
          <option key={realm.get('slug')} value={realm.get('slug')}>
            {realm.get('name')}
          </option>
        );
      });
    }

    return (
      <select ref='realm'>
        {nodes}
      </select>
    );
  },

  render() {
    return (
      <div className='ImportGuildTab'>
        <div className='ImportGuildTab-form'>
          <p>
            <label>Region</label>
            {this.renderRegions()}
          </p>
          <p>
            <label>Realm</label>
            {this.renderRealms()}
          </p>
          <p>
            <label>Guild Name</label>
            <input type='text' ref='guild' />
          </p>
          <button className='ImportGuildTab-searchButton' onClick={this.handleSearch}>
            Search
          </button>
          <button className='ImportGuildTab-importButton' onClick={this.handleImport}>
            Import selected
          </button>
        </div>
        <div className='ImportGuildTab-results'>
          {this.renderResults()}
        </div>
      </div>
    );
  }

});

export default ImportGuildTab;
