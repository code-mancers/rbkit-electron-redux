import {CONNECT_TO_SERVER, CONNECTED, DISCONNECTED} from './../actions';

const initialState = {
  ip: '',
  status: ''
};

const connection = function (state = initialState, action) {
  switch (action.type) {
    case CONNECT_TO_SERVER:
      return Object.assign({}, state, {status: ''});
    case CONNECTED:
      return Object.assign({}, state, {status: 'CONNECTED', ip: action.ip});
    case DISCONNECTED:
    case 'DISCONNECT':
      return Object.assign({}, state, {status: 'DISCONNECTED', ip: ''});

    default:
      return state;
  }
};

const handshake = function (state = {}, action) {
  switch (action.type) {
    case 'DATA':
      return action.data;
    default:
      return state;
  }
};

const cpuProfile = (state = {status: 'STOPPED', data: []}, action) => {
  switch (action.type) {
    case 'DATA':
      if (action.from !== 'subscriber') {
        return Object.assign({}, state, {status: 'STOPPED'});
      }
      return Object.assign({}, state, {status: 'RUNNING', data: [...state.data, action.data], from: action.from});
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
