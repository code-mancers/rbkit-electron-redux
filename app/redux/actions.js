import RbkitConnection from '../rbkitConnection';

export function connectToServer (ip) {
  console.log('in connectToServer : ', ip);
  return dispatch => {
    RbkitConnection.connect({
      ip: ip,
      onConnect: () => {
        console.log('onConnect');
        dispatch({type: 'CONNECTED'});
      },
      onDisconnect: () => {
        dispatch({type: 'DISCONNECTED'});
      }
    });
  }
}

export default connectToServer;
