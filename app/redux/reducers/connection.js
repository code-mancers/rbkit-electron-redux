import {CONNECT_TO_SERVER, CONNECTED, DISCONNECTED} from './../actions';

const initialState = {
  ip: '',
  status: ''
};

const connection = function (state = initialState, action) {
  switch (action.type) {
    case CONNECT_TO_SERVER:
      return Object.assign({}, state, {status: ''});
    case 'CONNECTING':
      return Object.assign({}, state, {status: 'CONNECTING'});
    case CONNECTED:
      return Object.assign({}, state, {status: 'CONNECTED', ip: action.ip});
    case DISCONNECTED:
    case 'DISCONNECT':
      return Object.assign({}, state, {status: 'DISCONNECTED'});
    case 'ERROR':
      return Object.assign({}, state, {status: 'FAILED', message: action.message});

    default:
      return state;
  }
};

const handshake = function (state = {}, action) {
  switch (action.type) {
    case 'DATA':
      if (action.from === 'requester') {
        return action.data;
      }
      return null;
    default:
      return state;
  }
};

const cpuProfile = (state = {status: 'STOPPED', data: []}, action) => {
  switch (action.type) {
    case CONNECTED: {
      return Object.assign({}, state, {data: []});
    }
    case 'DATA': {
      if (action.from !== 'subscriber') {
        return Object.assign({}, state, {status: 'STOPPED'});
      }
      let data = state.data.splice(0);
      if (state.status === 'STOPPED') {
        data = [];
      }
      return Object.assign({}, state, {status: 'RUNNING', data: [...data, action.data], from: action.from});
    }
    case DISCONNECTED:
    case 'DISCONNECT':
      return Object.assign({}, state, {status: 'STOPPED', data: []});
    default:
      return state;
  }
};

export {
  connection,
  cpuProfile,
  handshake
};
