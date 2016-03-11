import {Component} from 'react';

class DisplayHandshake extends Component {

  display() {

     const params = [
      'rbkit_server_version',
      'rbkit_protocol_version',
      'process_name',
      'pwd',
      'pid',
      'object_trace_enabled',
      'cpu_profiling_enabled',
      'clock_type',
      'cpu_profiling_mode'
    ];

    if (Object.keys(this.props.data).length !== 0) {
      return (
        <table className="table table-bordered table-condensed">
          {
            params.map(value => {
              return (
                <tr>
                  <td>{value.replace(/_/g, ' ')}</td>
                  <td>{this.props.data[2][value]}</td>
                </tr>
              )
            })
          }
        </table>
      )
    }
  }

  render () {
    return (
      <div className='col-md-10 col-md-offset-1'>
        {this.display()}
      </div>
    )
  }
}

export default DisplayHandshake;
