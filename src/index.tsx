import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './reset.less';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);