import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './index.css';
import { ConfigProvider, message } from 'antd';
import { Provider } from 'react-redux';
import { store } from './RTK/store';
import { antdTheme } from './theme';

message.config({
  maxCount: 3,
  duration: 2,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={antdTheme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
