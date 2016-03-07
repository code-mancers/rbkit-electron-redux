let reducer = function(state, action) {
  switch(action.type) {
    case 'CONNECT_TO_SERVER':
      return Object.assign({}, state, { connectionStatus: 'Connected'})

    default:
      return state;
  }
}

export default reducer