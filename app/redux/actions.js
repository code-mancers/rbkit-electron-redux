export const CONNECTED = 'CONNECTED';
export const CONNECT_TO_SERVER = 'CONNECT_TO_SERVER';
export const DISCONNECTED = 'DISCONNECTED';
export const CONNECT = 'CONNECT';

import RbkitConnection from '../rbkitConnection';

export function connectToServer (ip) {
  return {
    type: CONNECT,
    sock: {
      ip
    }
  };
}

export function handshake () {
  return {
    type: 'COMMAND',
    sock: {
      cmd: 'handshake'
    }
  };
}
