import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { persistState } from 'redux-devtools';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import * as reducers from './reducers/connection'
import DevTools from '../components/devTools'

let createStoreWithMiddleware;

createStoreWithMiddleware = compose(
  applyMiddleware(logger(), thunk),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
)(createStore)

const rootReducer = combineReducers(reducers);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
