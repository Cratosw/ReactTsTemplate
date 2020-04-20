import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/styles';
import themeUIConfig from "./styles/theme-ui-config";
import zhCN from 'antd/es/locale/zh_CN'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <ThemeProvider theme={themeUIConfig}>
        <BrowserRouter>
          <React.Suspense fallback={<div>Loading...</div>}>
            <App />
          </React.Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
