import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import rootReducer from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
// import reportWebVitals from './reportWebVitals';
import './index.css';

const store = configureStore({ reducer: rootReducer });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// 성능 측정할 때 사용하는 함수
// reportWebVitals();
