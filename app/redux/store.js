import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import * as reducers from './reducer'

let createStoreWithMiddleware;

createStoreWithMiddleware = applyMiddleware(logger(), thunk)(createStore)

const rootReducer = combineReducers(reducers);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
