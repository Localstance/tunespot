import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as radiosReducer } from './radios/radios.slice';
import { api } from './api';

const reducers = combineReducers({
  radios: radiosReducer,
  [api.reducerPath]: api.reducer
});

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;