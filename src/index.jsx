import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {Provider} from "react-redux";
import {store} from "./redux/store";

import { WagmiProvider } from 'wagmi'
import config from './config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 0. Setup queryClient
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  </React.StrictMode>
);