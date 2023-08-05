import React from 'react';
import localStyles from './channel.less';
import { IRadio } from '../../types/radio.types';
import { Tag } from '../Tag';
import { Link } from 'react-router-dom';
import { useActions } from '../../utils/useActions';
import { useTypedSelector } from '../../utils/useTypedSelector';
import StarRatingComponent from 'react-star-rating-component';
import { FAVORITES_KEY, useStorageValue, writeStorageItem } from '../../utils/localStorage';

interface IChannelProps {
  channel: IRadio,
}

export const Channel = ({ channel } : IChannelProps) => {
  const rawFavorites = useStorageValue(FAVORITES_KEY);
  const { current, paused } = useTypedSelector(state => state.radios);
  const { toggleCurrentRadio } = useActions();
  
  const isActive = current?.id === channel.id;
  const favorites:string[] = rawFavorites ? JSON.parse(rawFavorites) : [];
  const isFavorite = favorites.includes(channel.id);

  const handleAddToFavoritesClick = (channel: IRadio) => {
    if (favorites.some(id => id === channel.id)) {
      writeStorageItem(FAVORITES_KEY, JSON.stringify(favorites.filter(id => id !== channel.id)));
    } else {
      favorites.push(channel.id);
      writeStorageItem(FAVORITES_KEY, JSON.stringify(favorites))
    }
  };

  return (
    <div className={localStyles.base} onClick={() => toggleCurrentRadio(channel)}>
      <span className={`${localStyles.favorites_button} ${isFavorite ? localStyles.favorites_button__active : ''}`} onClick={(e) => {e.stopPropagation(); handleAddToFavoritesClick(channel)}}></span>
      <img 
        src={channel.imgUrl} 
        alt={`Radio ${channel.name} logo`} 
        className={localStyles.image}
      />

      <h3 className={localStyles.heading3}>{channel.name}</h3>
      
      <div className={localStyles.actions}>
        <span className={`${localStyles.action_button} ${isActive && !paused ? localStyles.action_button__pause : localStyles.action_button__play}`}></span>
      </div>

      <div className={localStyles.rating}>
        <span>Popularity: {channel.popularity}</span>
        <StarRatingComponent 
          starColor={'red'}
          value={channel.popularity}
          name={'popularity'}
          editing={false}
          starCount={5}
        />
      </div>

      <div className={localStyles.tags}>
        {channel.tags.map((tag, index) => <Tag key={index} value={tag} />)}
      </div>

      <Link to={`/radio/${channel.id}`} className={localStyles.link} onClick={(e) => {e.stopPropagation()}}>
        More info
      </Link>
    </div>
  );
};