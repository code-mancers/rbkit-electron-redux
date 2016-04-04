import React, {Component} from 'react';
  
class DisplayCPUProfile extends Component {

  getStyle(nestedLevel) {
    const padding = (nestedLevel*15) + "px";
    return {paddingLeft: padding};
  }

  getMethodNameFromBlock(blockName) {
    return blockName.split('-')[blockName.split('-').length-1];
  }

  displayCPUProfilingTable() {
    return (
      <table className="table table-bordered table-condensed">
        <thead><th>Total</th><th>Function</th></thead>
        <tbody>
          {
            this.props.cpuProfilingTable.map(row => {
              if (!row['isHidden']) {
                return (
                  <tr key={row['id']}>
                    <td style={this.getStyle(row['nestedLevel'])}>
                      {this.getMethodNameFromBlock(row['blockName'])}
                    </td>
                    <td style={{paddingLeft:"15px"}}>
                      <i className={row['isOpen'] ? 'fa fa-caret-down' : 'fa fa-caret-right'} />
                      {' ' + row['self'] + ' ms'}
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

  render() {
    return (
      <div className='col-md-10 col-md-offset-1'>
        { this.displayCPUProfilingTable() }
      </div>
    )
  }
}

export default DisplayCPUProfile;
