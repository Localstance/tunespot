import React from 'react';
import localStyles from './channelPage.less';
import { IRadio } from '../../types/radio.types';
import { Tag } from '../Tag';
import { useParams } from 'react-router-dom';
import { useActions } from '../../utils/useActions';
import { useTypedSelector } from '../../utils/useTypedSelector';
import { useGetRadiosQuery } from '../../store/api';
import StarRatingComponent from 'react-star-rating-component';
import { FAVORITES_KEY, useStorageValue, writeStorageItem } from '../../utils/localStorage';

export const ChannelPage = () => {
  const rawFavorites = useStorageValue(FAVORITES_KEY);
  const { id } = useParams();
  const { data, isLoading } = useGetRadiosQuery(null);
  const { current, paused } = useTypedSelector(state => state.radios);
  const { toggleCurrentRadio } = useActions();
  const channel = data?.find(radio => radio.id === id);
  const isActive = current?.id === channel?.id;

  const favorites:string[] = rawFavorites ? JSON.parse(rawFavorites) : [];
  const isFavorite = channel && favorites.includes(channel.id);

  const handleAddToFavoritesClick = (channel: IRadio) => {
    if (favorites.some(id => id === channel.id)) {
      writeStorageItem(FAVORITES_KEY, JSON.stringify(favorites.filter(id => id !== channel.id)));
    } else {
      favorites.push(channel.id);
      writeStorageItem(FAVORITES_KEY, JSON.stringify(favorites))
    }
  };

  return isLoading ? (
    <div className={localStyles.base}>Loading..</div>
  ) : channel && (
    <div className={localStyles.base}>
      <h1 className={localStyles.heading}>{channel?.name}</h1>

      <img 
        src={channel.imgUrl} 
        alt={`Radio ${channel.name} logo`} 
        className={localStyles.image}
      />

      <p className={localStyles.description}>{channel?.description}</p>

      <div className={localStyles.actions}>
        <span 
          onClick={() => toggleCurrentRadio(channel)}
          className={`${localStyles.action_button} ${isActive && !paused ? localStyles.action_button__pause : localStyles.action_button__play}`}
        ></span>

        <span 
          onClick={(e) => {
            e.stopPropagation();
            handleAddToFavoritesClick(channel);
          }}
          className={`${localStyles.favorites_button} ${isFavorite ? localStyles.favorites_button__active : ''}`}
        ></span>
      </div>

      <div className={localStyles.rating}>
        <span>Popularity: {channel?.popularity}</span>
        
        <StarRatingComponent 
          starColor={'red'}
          value={channel?.popularity || 0}
          name={'popularity'}
          editing={false}
          starCount={5}
        />
      </div>

      <div className={localStyles.rating}>
        <span>Reliability: {channel?.reliability}</span>

        <StarRatingComponent 
          starColor={'red'}
          value={channel?.reliability / 10 + 1 || 0}
          name={'reliability'}
          editing={false}
          starCount={10}
        />
      </div>

      <div className={localStyles.tags}>
        {channel?.tags.map((tag, index) => <Tag key={index} value={tag} />)}
      </div>
    </div>
  ) || (
    <div className={localStyles.base}>Channel not found</div>
  );
};