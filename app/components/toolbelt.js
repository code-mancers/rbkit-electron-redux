import React, {Component, PropTypes} from 'react';
import Button from './common/Button';

class Toolbelt extends Component {
  render() {
    const cpuProfile = this.props.cpuProfile;
    let btnText = 'Stop CPU Profiling';
    let btnClass = 'btn btn-danger';
    if (cpuProfile.status === 'STOPPED') {
      btnText = 'Start CPU Profiling';
      btnClass = 'btn btn-success';
    }
    return (
      <div className="row">
        <div className="col-md-2">
          <Button value="Handshake" onClick={this.props.handshake}/>
        </div>
        <div className="col-md-3">
          <button className={btnClass} data-status={cpuProfile.status} onClick={this.props.handleCpuSampling}>
            {btnText}
            {cpuProfile.status === 'RUNNING' ? <i className="fa fa-spinner fa-spin"></i> : null}
          </button>
        </div>
      </div>
    );
  }
}

Toolbelt.propTypes = {
  cpuProfile: PropTypes.object,
  handshake: PropTypes.func,
  handleCpuSampling: PropTypes.func
};

export default Toolbelt;
