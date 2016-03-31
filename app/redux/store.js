import {applyMiddleware, compose, createStore, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import ZMQ from 'zmq';

import * as reducers from './reducers/connection';
import rbkit from './rbkitMiddleware';

let connectTimer;

const requester = ZMQ.socket('req');
const subscriber = ZMQ.socket('sub');

requester.monitor(500, 0);
subscriber.monitor(500, 0);

const createStoreWithMiddleware = compose(
  applyMiddleware(logger(), thunk, rbkit(requester, subscriber))
)(createStore);

const rootReducer = combineReducers(reducers);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
