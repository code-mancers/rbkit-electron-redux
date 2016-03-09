import React from 'react'
import Layout from './layout'
import configureStore from '../redux/store'
import { Provider } from 'react-redux'

let store = configureStore();

window.onload = function(){
  ReactDOM.render(
    <Provider store={store}>
      <Layout />
    </Provider>,
  document.getElementById('layout-container'));
}
