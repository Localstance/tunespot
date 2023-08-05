import React from 'react';
import { Routes, Route } from "react-router-dom";
import localStyles from './main.less';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { MainContent } from './layout/MainContent';
import { Home } from './components/Home';
import { Radios } from './components/Radios';
import { ChannelPage } from './components/ChannelPage';

export const App: React.FC = () => (
  <div className={localStyles.base}>
    <Header />

    <Routes>
      <Route path="/" element={<MainContent />}>
        <Route index element={<Home />} />
        <Route path="radios" element={<Radios />} />
        <Route path="radio/:id" element={<ChannelPage />} />
      </Route>
    </Routes>
  </div>
);
