import React, {Component, PropTypes} from 'react';
import Button from './common/Button';

class Toolbelt extends Component {
  render() {
    const btnText = this.props.cpuProfile.status === 'STOPPED' ? "Start CPU Profiling" : "Stop CPU Profiling";
    return (
      <div className="col-md-10 col-md-offset-1">
        <Button value="Handshake" onClick={this.props.handshake}/>
        <button className='btn btn-success' onClick={this.props.handleCpuSampling}>
          {btnText}
          {this.props.cpuProfile.status === 'RUNNING' ? <i className="fa fa-spinner fa-spin"></i> : null}
        </button>
      </div>
    );
  }
}

Toolbelt.propTypes = {
  handshake: PropTypes.func,
  handleCpuSampling: PropTypes.func
};

export default Toolbelt;
