import React from 'react'
import Layout from './layout'
import configureStore from '../redux/store'
import { Provider } from 'react-redux'

const initialState = {
  connectionStatus: 'Connect To Server'
};

const store = configureStore(initialState);

window.onload = function(){
  ReactDOM.render(
    <Provider store={store}>
      <Layout />
    </Provider>,
  document.getElementById('layout-container'));
}
