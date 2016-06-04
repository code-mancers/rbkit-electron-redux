import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import configureStore from '../redux/store';
import {Provider} from 'react-redux';

const store = configureStore();

window.onload = function () {
  ReactDOM.render(
    <Provider store={store}>
      <Layout/>
    </Provider>,
  document.getElementById('layout-container'));
};
