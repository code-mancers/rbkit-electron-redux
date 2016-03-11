import React from 'react'
import $ from 'jquery'
import Row from './row'

class Table extends React.Component {

  render() {
    return(
      <div>
        <table className="table table-bordered table-rounded">
          <tr><th>Self (ms)</th><th>Total (ms)</th><th>Method</th></tr>
        </table>
      </div>
    )
  }
}

export default Table;
