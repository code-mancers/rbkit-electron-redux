import { applyMiddleware, compose, createStore } from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'

let finalCreateStore = compose(
  applyMiddleware(logger())
)(createStore)


export default function configureStore(initialState = { connectionStatus: 'Connect To Server' }) {
  return finalCreateStore(reducer, initialState)
}
