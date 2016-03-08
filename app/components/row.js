import React from 'react'

class Row extends React.Component {

  render() {
    return(
      <tr>
        <td>{this.props.rowData[0]}</td>
        <td>{this.props.rowData[1]}</td>
        <td>{this.props.rowData[2]}</td> 
      </tr>
    )
  }
}

export default Row;


/* Sample data

return ([
  { // requset id 
    // timestamp 
    event_type: 'cpu_sample',
    timestamp: 24022015070000100,
    payload: [
      {
        method_name: 'large',
        label: 'largeLabel',
        file: 'layout.js'
      },
      {
        method_name: 'small',
        label: 'smallLabel',
        file: 'layout.js'
      },
      {
        method_name: 'medium',
        label: 'mediumLabel',
        file: 'layout.js'
      }
    ]
  },
  {
    event_type: 'cpu_sample',
    timestamp: 24022015070000130,
    payload: [
      {
        method_name: 'small',
        label: 'smallLabel',
        file: 'layout.js'
      }
    ]
  },
  {
    event_type: 'cpu_sample',
    timestamp: 24022015070000140,
    payload: [
      {
        method_name: 'medium',
        label: 'mediumLabel',
        file: 'layout.js'
      }
    ]
  },
  {
    event_type: 'cpu_sample',
    timestamp: 24022015070000160,
    payload: [
      {
        method_name: 'large',
        label: 'largeLabel',
        file: 'layout.js'
      },
      {
        method_name: 'medium',
        label: 'mediumLabel',
        file: 'layout.js'
      }
    ]
  },
  {
    event_type: 'cpu_sample',
    timestamp: 24022015070000170,
    payload: [
      {
        method_name: 'small',
        label: 'smallLabel',
        file: 'layout.js'
      },
      {
        method_name: 'medium',
        label: 'mediumLabel',
        file: 'layout.js'
      }
    ]
  }
])
*/