import React from 'react';
import { Outlet } from "react-router-dom";
import localStyles from './mainContent.less';
import { Navbar } from '../Navbar';
import { AudioPlayer } from '../../components/AudioPlayer';

export const MainContent = () => {
  return (
    <main className={localStyles.base}>
      <aside className={localStyles.aside}>
        <Navbar />
      </aside>

      <div className={localStyles.content}>
        <Outlet />
      </div>

      <AudioPlayer />
    </main>
  );
};