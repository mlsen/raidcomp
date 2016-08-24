import React from 'react';
import ReactDOM from 'react-dom';
import ImportActions from '../actions/ImportActions';
import CompositionPublisherActions from '../actions/CompositionPublisherActions';
import classNames from 'classnames';
import { regions } from '../misc/wow';

const ImportGuildTab = React.createClass({

  propTypes: {
    guild: React.PropTypes.object,
    realms: React.PropTypes.object
  },

  getInitialState() {
    return {
      selectedRegion: 'eu'
    };
  },

  handleRegionChange(e) {
    const region = e.target.value;
    if(!this.props.realms.has(region)) {
      ImportActions.fetchRealms(region);
    }
    this.setState({ selectedRegion: region });
  },

  handleSearch(e) {
    e.preventDefault();
    const region = this.state.selectedRegion;
    // const realm = this.refs.realm.getDOMNode().value;
    // const guild = this.refs.guild.getDOMNode().value;
    const realm = ReactDOM.findDOMNode(this.refs.realm).value;
    const guild = ReactDOM.findDOMNode(this.refs.guild).value;
    ImportActions.fetchGuild(region, realm, guild);
  },

  handleSelect(rank) {
    ImportActions.selectGuildRank(rank);
  },

  handleImportStaging() {
    CompositionPublisherActions.importStaging();
  },

  renderErrorMessage() {
    return (
      <div className='ImportGuildTab-error'>
        {this.props.error.message}
      </div>
    );
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
    const realms = this.props.realms.get(this.state.selectedRegion);
    let nodes = [];

    if(realms) {
      realms.map(realm => {
        nodes.push(<option key={realm.slug} value={realm.slug}>{realm.name}</option>)
      });
    }

    return (
      <select ref='realm'>
        {nodes}
      </select>
    );
  },

  renderSearchForm() {
    return (
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
        <button className='ImportGuildTab-importButton' onClick={this.handleImportStaging}>
          Import selected
        </button>
      </div>
    );
  },

  renderResults() {

    if(this.props.error) {
      return this.renderErrorMessage();
    }

    if(this.props.loading) {
      return this.renderSpinner();
    }

    return (
      <div className='ImportGuildTab-results'>
        {this.props.guild.members.map((members, rank) => {

          const rankSelected = this.props.guild.selectedRanks.has(rank);

          const rankCss = classNames({
            'ImportGuildTab-rank': true,
            'selected': rankSelected
          });

          const checkedIconCss = classNames({
            'ImportGuildTab-checked': rankSelected,
            'ImportGuildTab-unchecked': !rankSelected,
            'fa': true,
            'fa-lg': true,
            'fa-fw': true,
            'fa-check': true
          });

          return (
            <div key={rank} className={rankCss} onClick={this.handleSelect.bind(this, rank)}>
              <div className='ImportGuildTab-rankHeader'>
                <i className={checkedIconCss}></i>
                Rank: {rank}
              </div>
              <div className='ImportGuildTab-rankCharacters'>
                {members.map((character, index) => {
                  return (
                    <span key={index} className={'ImportGuildTab-character fg-' + character.className}>
                      {character.name}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        }).toArray()}
      </div>
    );
  },

  render() {
    return (
      <div className='ImportGuildTab'>
        {this.renderSearchForm()}
        {this.renderResults()}
      </div>
    );
  }

});

export default ImportGuildTab;
