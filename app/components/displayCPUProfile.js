import React, {Component} from 'react';
  
class DisplayCPUProfile extends Component {

  getStyle(nestedLevel) {
    const padding = (nestedLevel*15) + "px";
    return {paddingLeft: padding};
  }

  getBlockNameFromIdentifier(blockIdentifier) {
    return blockIdentifier.split('-')[blockIdentifier.split('-').length-1];
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
                    <td>{row['self'] + ' ms'}</td>
                    <td style={this.getStyle(row['nestedLevel'])}>
                      <i className={row['isOpen'] ? 'fa fa-caret-down' : 'fa fa-caret-right'} />
                      {' ' + this.getBlockNameFromIdentifier(row['blockIdentifier'])}
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
