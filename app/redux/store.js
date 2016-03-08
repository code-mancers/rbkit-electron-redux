import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import reducer from './reducer'

let finalCreateStore = compose(
  applyMiddleware(logger())
)(createStore)


export default function configureStore(initialState = { connectionStatus: '' }) {
  return finalCreateStore(reducer, initialState)
}
