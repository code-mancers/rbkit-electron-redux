let connectionReducer = function(todos = [], action) {
  switch (action.type) {
    case 'CONNECT':
      return [{
          text: action.text,
          completed: false,
          id: getId(todos)
        }, ...todos]
    default: 
      return todos;
  }
}

export default connectionReducer
