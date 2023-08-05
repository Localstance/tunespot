import React, { useState } from 'react';
import localStyles from './radios.less';
import { useGetRadiosQuery } from '../../store/api';
import { Channel } from '../Channel';
import { ITab, RadiosTabs } from '../RadiosTabs';
import { filterRadios } from './business';
import Select from "react-select";
import { FAVORITES_KEY, useStorageValue } from '../../utils/localStorage';

const sortByOptions = [
  {
    value: 'popularity',
    label: 'Sort by popularity'
  },
  {
    value: 'reliability',
    label: 'Sort by reliability'
  },
];

export const Radios = () => {
  const [activeTab, setActiveTab] = useState<ITab>({id: 'all', name: 'All'});
  const [sortBy, setSortBy] = useState('popularity');
  const { data } = useGetRadiosQuery(null);
  const rawFavorites = useStorageValue(FAVORITES_KEY);
  const favorites:string[] = rawFavorites ? JSON.parse(rawFavorites) : [];
  const radios = filterRadios(data, activeTab, sortBy, favorites);

  const onTabChange = (tab: ITab) => {
    setActiveTab(tab);
  };

  const onSortChange = (sortBy: string) => {
    setSortBy(sortBy);
  };

  return (
    <div className={localStyles.base}>
      <h1 className={localStyles.heading}>Radio Channels</h1>

      <div className={localStyles.filters}>
        <RadiosTabs onTabChange={onTabChange} activeTab={activeTab} />
        <Select defaultValue={sortByOptions[0]} options={sortByOptions} onChange={(value) => onSortChange(value?.value || 'popularity')}/>
      </div>

      <div className={localStyles.channels}>
        {radios?.map(radio => (
          <Channel key={radio.id} channel={radio} />
        ))}
      </div>
    </div>
  );
};