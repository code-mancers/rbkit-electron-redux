export const CONNECTED = 'CONNECTED';
export const CONNECT_TO_SERVER = 'CONNECT_TO_SERVER';
export const DISCONNECTED = 'DISCONNECTED';
export const CONNECT = "CONNECT";

import RbkitConnection from '../rbkitConnection';

export function connectToServer (ip) {
  return {
    type: CONNECT,
    sock: {
      ip
    }
  };
  // return dispatch => {
  //   RbkitConnection.connect({
  //     ip: ip,
  //     onConnect: () => {
  //       console.log('onConnect');
  //       dispatch({type: CONNECTED});
  //     },
  //     onDisconnect: () => {
  //       dispatch({type: DISCONNECTED});
  //     }
  //   });
  // }
}

export function handshake (handshakeData) {
  console.log('in handshake : ', handshakeData);
  return {
    type: 'HANDSHAKE',
    data: handshakeData
  }
}
