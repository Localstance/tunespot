import React from 'react';
import localStyles from './header.less';
import logo from 'assets/images/logo.png';

export const Header = () => (
  <header className={localStyles.base}>
    <a className={localStyles.logo} href='/'>
      <img 
        src={logo}
        alt='Logo'
      />
    </a>
    <span className={localStyles.title}>TuneSpot</span>
  </header>
);