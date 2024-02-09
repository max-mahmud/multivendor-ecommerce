import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <Toaster toastOptions={{
        position: 'top-right',
        style: {
          background: 'white',
          color: 'black'
        }
      }} />
    </React.StrictMode>
  </Provider>
);


