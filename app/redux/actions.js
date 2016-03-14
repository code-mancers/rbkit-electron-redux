export const CONNECTED = 'CONNECTED';
export const CONNECT_TO_SERVER = 'CONNECT_TO_SERVER';
export const DISCONNECTED = 'DISCONNECTED';
export const CONNECT = 'CONNECT';
export const COMMAND = 'COMMAND';

export function connectToServer(ip) {
  return {
    type: CONNECT,
    sock: {
      ip
    }
  };
}

export function handshake() {
  return {
    type: COMMAND,
    sock: {
      cmd: 'handshake'
    }
  };
}
