import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import reducer from './reducer'

const store = compose(
  applyMiddleware(logger())
)(createStore)


export default function configureStore(initialState = { connectionStatus: '' }) {
  return store(reducer, initialState)
}
