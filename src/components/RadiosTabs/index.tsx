import React, { useEffect, useRef, useState } from 'react';
import localStyles from './radiosTabs.less';
import { config } from '../../config';

export interface ITab {
  id: string,
  name: string,
  tags?: string[],
}

interface IRadiosTabsProps {
  onTabChange: (tab: ITab) => void,
  activeTab: ITab,
}

export const RadiosTabs = ({ onTabChange, activeTab } : IRadiosTabsProps) => {

  const handleTabChange = (tab: ITab) => {
    onTabChange(tab);
  }

  return (
    <div className={localStyles.base}>
      {config.tabs.map(tab => <Tab key={tab.id} tab={tab} isActive={tab.id === activeTab?.id} onTabChange={handleTabChange} />)}
    </div>
  );
};

interface ITabProps {
  onTabChange: (tab: ITab) => void,
  tab: ITab,
  isActive: boolean,
}

const Tab = ({ tab, onTabChange, isActive }: ITabProps) => {

  return (
    <div onClick={() => onTabChange(tab)} className={`${localStyles.tab} ${isActive ? localStyles.tab_active : ''}`}>
      {tab.name}
    </div>
  );
}