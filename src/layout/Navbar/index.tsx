import React from 'react';
import { NavLink } from "react-router-dom";
import localStyles from './navbar.less';

export const Navbar = () => {

  return (
    <nav className={localStyles.base}>
      <ul className={localStyles.list}>
        <li className={localStyles.list__item}>
          <NavLink to="/" className={localStyles.list__link}>
            <span className={`${localStyles.list__icon} ${localStyles.list__icon_home}`}></span>
            <span className={localStyles.list__title}>Home</span>
          </NavLink>
        </li>
        <li className={localStyles.list__item}>
          <NavLink to="/radios" className={localStyles.list__link}>
            <span className={`${localStyles.list__icon} ${localStyles.list__icon_radios}`}></span>
            <span className={localStyles.list__title}>Radios</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};