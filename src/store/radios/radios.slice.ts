import { createSlice } from '@reduxjs/toolkit';
import { IRadio } from '../../types/radio.types';

interface IState {
  current: IRadio|null,
  paused: boolean,
}

const initialState:IState = {
  current: null,
  paused: false,
};


export const radiosSlice = createSlice({
  name: 'radios',
  initialState,
  reducers: {
    toggleCurrentRadio: (state, action) => {
      const radio = action.payload;

      if (state.current?.id === radio.id) {
        state.paused = !state.paused;
      } else {
        state.current = radio;
        state.paused = false;
      }
      
    },

    togglePlay: (state, action) => {
      const isPaused = action.payload;

      state.paused = isPaused;
    }
  }
});

export const reducer = radiosSlice.reducer;
export const actions = radiosSlice.actions;