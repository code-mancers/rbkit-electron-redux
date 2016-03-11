import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import * as reducers from './reducers/connection'
import ZMQ from 'zmq';

const requester = ZMQ.socket('req');
requester.monitor(500, 0);

let createStoreWithMiddleware;

const zmqMiddlewareCreator = (zmq, options = {}) => {
  console.log("zmqMiddlewareCreator");
  const {onConnect, onDisconnect} = options;
  return ({dispatch}) => {
    return (next) => action => {
      if (!action.sock) return next(action);
      console.log('zmqMiddleWare :: ', action);

      const {type, sock, ...rest} = action;
      console.log('zmqMiddleWare :: ', sock, type, rest);

      if (type) {
        next({type, ...rest});
      }

      if (type === 'CONNECT') {
        zmq.connect(`tcp://${sock.ip}:5556`);
      }

      zmq.on('connect', () => {
        console.log('zmqMiddleWare :: on connect');
        dispatch({
          type: 'CONNECTED'
        });
      });

      zmq.on('disconnect', () => {
        dispatch({
          type: 'DISCONNECTED'
        });
      });
    };
  };
};

createStoreWithMiddleware = compose(
  applyMiddleware(logger(), thunk, zmqMiddlewareCreator(requester))
)(createStore)

const rootReducer = combineReducers(reducers);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
