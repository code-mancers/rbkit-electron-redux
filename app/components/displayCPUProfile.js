import React, {Component} from 'react';
import DataAnalyser from '../dataAnalyser'

class DisplayCPUProfile extends Component {

  constructor() {
    super(...arguments);
    this.handleSubRows = this.handleSubRows.bind(this);
  }

  componentWillMount() {
    if( this.props.data !== undefined) {
      this.updatedTable = [];
    }
  }

  handleSubRows(event) {
    if (!this.updatedTable[clickedRowIndex]['isOpen']) {
      this.createSubRows(event);
    }
  }

  createSubRows(event) {
    this.updatedTable = DataAnalyser.createSubRows(event);
    this.props.updateProfilingData(this.updatedTable);
  }

  getStyle(nestedLevel) {
    const padding = (nestedLevel*15) + "px";
    return {paddingLeft: padding};
  }

  displayCPUProfilingTable() {
    return (
      <table className="table table-bordered table-condensed">
        <thead><th>Block</th><th>Self</th></thead>
        <tbody>
          {
            this.updatedTable.map(row => {
              if (!row['isHidden']) {
                return (
                  <tr key={row['id']}>
                    <td>{row['self'] + ' ms'}</td>
                    <td style={this.getStyle(row['nestedLevel'])}>
                      <i className={row['isOpen'] ? 'fa fa-caret-down' : 'fa fa-caret-right'}
                        data-object-id={row['id']}
                        data-max-id={this.updatedTable.length}
                        onClick={this.handleSubRows}
                      />
                      {' ' + row['blockIdentifier'].split('-')[row['blockIdentifier'].split('-').length-1]}
                    </td>
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>
    )
  }

  parseProfilingData() {
    if (this.props.data !== undefined) {
      const noDataInTable = (this.props.cpuProfilingTable.cpuProfilingTable.length === 0) && (this.updatedTable.length === 0);
      if (noDataInTable) {
        this.updatedTable = DataAnalyser.initializeTable(this.props.data.data);
        this.props.updateProfilingData(this.updatedTable);
      } else {
        return this.displayCPUProfilingTable();
      } 
    }
  }

  render() {
    return (
      <div className='col-md-10 col-md-offset-1'>
        { this.parseProfilingData() }
      </div>
    )
  }
}

export default DisplayCPUProfile;
