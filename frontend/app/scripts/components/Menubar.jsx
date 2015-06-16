import React from 'react';

const Menubar = React.createClass({
  render() {
    return (
      <div>
        <nav className='Menubar'>
          <div className='Menubar-brand'>
            Raid Composer
          </div>
          <ul className='Menubar-list'>
            {this.props.children}
          </ul>
        </nav>
      </div>
    );
  }
});

const MenubarItem = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func,
    icon: React.PropTypes.string,
    text: React.PropTypes.string
  },

  render() {
    return (
      <li className='Menubar-item'>
        <a href='javascript:;' onClick={this.props.onClick}>
          <i className={'fa fa-fw fa-lg ' + this.props.icon}></i> {this.props.text}
        </a>
      </li>
    );
  }
});

export { Menubar, MenubarItem };
