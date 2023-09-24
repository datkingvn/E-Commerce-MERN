import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { redux } from './store/redux';
import App from './App';
import './index.css';
import {BrowserRouter} from 'react-router-dom'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={redux}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);