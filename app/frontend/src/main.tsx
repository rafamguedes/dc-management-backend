import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { GlobalStyle } from './assets/styles/GlobalStyle';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <Notifications />
        <GlobalStyle />
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
