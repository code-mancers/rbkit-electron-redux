let connectionReducer = function(connectionStatus='Connect To Server', action) {
  switch(action.type) {
    case 'CONNECT_TO_SERVER':
      return Object.assign({}, { connectionStatus: 'Connected'})

    default:
      return connectionStatus;
  }
}

export default connectionReducer