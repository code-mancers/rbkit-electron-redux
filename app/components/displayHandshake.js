import {Component} from 'react';

class DisplayHandshake extends Component {

  display() {
    if (Object.keys(this.props.data).length !== 0) {
      return (
        <table className="table table-bordered table-condensed">
          <tr><td>Rbkit Server Version</td><td>{this.props.data[2]['rbkit_server_version']}</td></tr>
          <tr><td>Rbkit Protocol Version</td><td>{this.props.data[2]['rbkit_protocol_version']}</td></tr>
          <tr><td>Process Name</td><td>{this.props.data[2]['process_name']}</td></tr>
          <tr><td>PWD</td><td>{this.props.data[2]['pwd']}</td></tr>
          <tr><td>PID</td><td>{this.props.data[2]['pid']}</td></tr>
          <tr><td>Object Trace Enabled</td><td>{this.props.data[2]['object_trace_enabled']}</td></tr>
          <tr><td>CPU Profiling Enabled</td><td>{this.props.data[2]['cpu_profiling_enabled']}</td></tr>
          <tr><td>Clock Type</td><td>{this.props.data[2]['clock_type']}</td></tr>
          <tr><td>CPU Profiling Mode</td><td>{this.props.data[2]['cpu_profiling_mode']}</td></tr>
        </table>
      )      
    }    
  }

  render () {
    return (
      <div>
        {this.display()}
      </div>
    )
  }
}

export default DisplayHandshake;
