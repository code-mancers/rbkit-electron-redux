import React from 'react'
import Layout from './Layout'
import configureStore from '../redux/store'
import { Provider } from 'react-redux'

let initialState = {
  connectionStatus: 'Connect To Server'
};

let store = configureStore(initialState);

window.onload = function(){
  ReactDOM.render(
    <Provider store={store}>
      <Layout />
    </Provider>,
  document.getElementById('layout-container'));
}
