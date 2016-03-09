const initialState = {
  connectionStatus: ''
}

const connection = function (state = initialState, action) {
  switch (action.type) {
    case 'CONNECT_TO_SERVER':
      return Object.assign({}, state, { connectionStatus: 'Connecting...'})
    case 'CONNECTED':
      return Object.assign({}, state, { connectionStatus: 'Connected'})
    case 'DISCONNECTED':
      return Object.assign({}, state, { connectionStatus: 'Disconnected'})

    default:
      return state;
  }
};

export {
  connection
};
