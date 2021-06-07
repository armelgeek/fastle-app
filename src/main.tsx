import React from 'react'
import ReactDOM from 'react-dom'
import { StoreProvider } from "easy-peasy";
import './index.css'
import App from './App'
import store from "./store";
import 'antd/dist/antd.css';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <StoreProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById('root')
)
