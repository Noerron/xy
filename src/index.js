import React from 'react';
import ReactDOM from 'react-dom/client';
import {Router} from 'react-router-dom'
import history from './util/history';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import './index.css'
import IndexRouter from './router/IndexRouter';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('en');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router history={history}>
  <ConfigProvider locale={zhCN}> 
    <IndexRouter />
  </ConfigProvider>
  </Router>

);

