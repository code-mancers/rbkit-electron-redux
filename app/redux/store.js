import {applyMiddleware, compose, createStore, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from './reducers/connection';
import ZMQ from 'zmq';
import MsgPack from 'msgpack';

const requester = ZMQ.socket('req');
const subscriber = ZMQ.socket('sub');

requester.monitor(500, 0);
subscriber.monitor(500, 0);

const zmqMiddlewareCreator = (zmq, subzmq) => {
  return ({dispatch}) => {
    return next => action => {
      if (!action.sock) {
        return next(action);
      }

      console.log('zmqMiddleWare :: ', action);

      const {type, sock, ...rest} = action;
      console.log('zmqMiddleWare :: ', sock, type, rest);

      if (type) {
        next({type, ...rest});
      }

      console.log('zmq :: ', zmq);

      switch (type) {
        case 'CONNECT':
          zmq.connect(`tcp://${sock.ip || 'localhost'}:5556`);
          subzmq.connect(`tcp://${sock.ip || 'localhost'}:5555`);

          break;
        case 'COMMAND':
          if (sock.cmd !== "handshake") {
            subzmq.subscribe('');
          }
          zmq.send(sock.cmd);
          break;
        case 'DISCONNECT':
          subzmq.unsubscribe();

          zmq.disconnect();
          subzmq.disconnect();
          break;
        default:
          break;
      }

      const onConnect = evt => {
        console.log('zmqMiddleWare :: on connect :: ', evt);
        dispatch({
          type: 'CONNECTED'
        });
      };

      const onDisconnect = () => {
        dispatch({
          type: 'DISCONNECTED'
        });
      };

      zmq.on('connect', onConnect);
      subzmq.on('connect', onConnect);

      zmq.on('disconnect', onDisconnect);
      subzmq.on('disconnect', onDisconnect);

      zmq.on('message', reply => {
        const data = MsgPack.unpack(reply);
        console.log('Received reply in middleware : ', data);
        dispatch({
          type: 'DATA',
          from: 'requester',
          data
        });
      });

      subzmq.on('message', reply => {
        const data = MsgPack.unpack(reply);
        console.log('Received reply in middleware : ', data);
        dispatch({
          type: 'DATA',
          from: 'subscriber',
          data
        });
      });

      // return next(type, ...rest);
    };
  };
};

const createStoreWithMiddleware = compose(
  applyMiddleware(logger(), thunk, zmqMiddlewareCreator(requester, subscriber))
)(createStore);

const rootReducer = combineReducers(reducers);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
