import React from 'react';
import ReactDOM from 'react-dom';
import {history} from './routes/History';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/styles';
import themeUIConfig from "./styles/theme-ui-config";
import zhCN from 'antd/es/locale/zh_CN'
import { Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <ThemeProvider theme={themeUIConfig}>
        <Router history={history}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <App />
          </React.Suspense>
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
