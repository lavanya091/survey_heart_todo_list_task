import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot instead of ReactDOM.render
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

// Find the root element in your HTML
const container = document.getElementById('root');

// Use createRoot to create the root and render the app
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
