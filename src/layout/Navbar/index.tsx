import React from 'react';
import { Link } from "react-router-dom";
import localStyles from './navbar.less';

export const Navbar = () => {

  return (
    <nav className={localStyles.base}>
      <ul className={localStyles.list}>
        <li className={localStyles.list__item}>
          <Link to="/" className={localStyles.list__link}>
            <span className={`${localStyles.list__icon} ${localStyles.list__icon_home}`}></span>
            <span className={localStyles.list__title}>Home</span>
          </Link>
        </li>
        <li className={localStyles.list__item}>
          <Link to="/radios" className={localStyles.list__link}>
            <span className={`${localStyles.list__icon} ${localStyles.list__icon_radios}`}></span>
            <span className={localStyles.list__title}>Radios</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};