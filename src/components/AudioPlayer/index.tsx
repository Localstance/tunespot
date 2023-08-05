import React, { useEffect, useRef } from 'react';
import localStyles from './audioPlayer.less';
import { useTypedSelector } from '../../utils/useTypedSelector';

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { current, paused } = useTypedSelector(state => state.radios);

  useEffect(() => {
    if (current) {
      !paused ? audioRef.current?.play() : audioRef.current?.pause();
    } 
  }, [current, paused]);

  return (
    <div className={`${localStyles.base} ${current ? localStyles.base_active : ''}`}>
      <audio controls autoPlay ref={audioRef}>
        <source src={current?.streamUrl} type="audio/mpeg"/>
      </audio>

      <span>Now playing: {current?.name}</span>
    </div>
  );
};