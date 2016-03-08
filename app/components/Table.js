import React from 'react'
import $ from 'jquery'
import Row from '../Row'

class Table extends React.Component {

  render() {
    return(
      <div>
        <table className="table table-bordered table-rounded">
          <tr><th>Self (ms)</th><th>Total (ms)</th><th>Method</th></tr>
          {this.displayRows()}
        </table>
      </div>
    )
  }

  displayRows() {
    let sampleData = this.getSampleData();
    return sampleData.forEach(sample => {
      return (
        <Row rowData={sample} />
      )
    })
  }

  getSampleData() {
    return (
      [ 
        [ 1, 'A', 'B' ],
        [ 2, 'C', 'D' ]
      ]
    )
  }
}

export default Table;
