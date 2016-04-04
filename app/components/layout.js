import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Navbar from '../components/common/Navbar';
import {connectToServer, disconnectFromServer, handshake, startCpuProfiling, stopCpuProfiling} from '../redux/actions';
import DisplayHandshake from './displayhandshake';
import DisplayCPUProfile from './displayCPUProfile';
import Toolbelt from './toolbelt';
import Alert from './common/alert';

class Layout extends React.Component {
  constructor() {
    super(...arguments);
    this.cpuProfiling = this.cpuProfiling.bind(this);
    this.handshake = this.handshake.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  connect() {
    this.props.dispatch(connectToServer());
  }

  disconnect() {
    this.props.dispatch(stopCpuProfiling());
    this.props.dispatch(disconnectFromServer());
  }

  handshake() {
    this.props.dispatch(handshake());
  }

  cpuProfiling() {
    let action;
    if (this.props.cpuProfile.status === 'STOPPED') {
      action = startCpuProfiling();
    } else {
      action = stopCpuProfiling();
    }
    this.props.dispatch(action);
  }

  displayCPUProfilingTable() {
    if (this.props.cpuProfile.data.length !== 0 && this.props.cpuProfile.status === 'STOPPED') {
      return (
        <DisplayCPUProfile 
          data={this.props.cpuProfile}
          updateProfilingData={this.updateProfilingData}
          cpuProfilingTable={this.props.cpuProfilingTable}
        />
      )
    }
  }

  render() {
    let toolbelt = null;
    if (this.props.status === 'CONNECTED') {
      toolbelt = <Toolbelt {...this.props}
                    handshake={this.handshake}
                    handleCpuSampling={this.cpuProfiling}/>;
    }
    return (
      <div>
        <Navbar {...this.props} handleConnect={this.connect} handleDisconnect={this.disconnect}/>
        {
          (this.props.status === 'FAILED') ? <Alert type="danger">{this.props.message}</Alert> : ''
        }
        <div className="container">
          <div className="row tools-wrapper">
            {toolbelt}
            <div className="row">
              <div className="col-md-12">Data Count : {this.props.cpuProfile.data.length} </div>
            </div>
            <div className="row">
              {this.props.handshake ? <DisplayHandshake data={this.props.handshake}/> : null}
            </div>
            <div className="row">
              { this.displayCPUProfilingTable() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  dispatch: PropTypes.func,
  message: PropTypes.string,
  status: PropTypes.string,
  cpuProfile: PropTypes.object,
  handshake: PropTypes.object,
  cpuProfilingTable: PropTypes.object
};

function mapStateToProps(state) {
  return {
    ip: state.connection.ip,
    status: state.connection.status,
    message: state.connection.message,
    handshake: state.handshake,
    cpuProfile: state.cpuProfile,
    cpuProfilingTable: state.cpuProfilingTable
  };
}

export default connect(mapStateToProps)(Layout);
