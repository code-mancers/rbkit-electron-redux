import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Navbar from '../components/common/Navbar';
import {connectToServer, disconnectFromServer, handshake, startCpuProfiling, stopCpuProfiling} from '../redux/actions';
import DisplayHandshake from './displayhandshake';
import Toolbelt from './toolbelt';

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
        <div className="container">
          <div className="row tools-wrapper">
            {toolbelt}
            <div className="row">
              <div className="col-md-12">Data Count : {this.props.cpuProfile.data.length} </div>
            </div>
            <div className="row">
              <DisplayHandshake data={this.props.handshake}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  dispatch: PropTypes.func,
  cpuProfile: PropTypes.object,
  handshake: PropTypes.object
};

function mapStateToProps(state) {
  return {
    ip: state.connection.ip,
    status: state.connection.status,
    handshake: state.handshake,
    cpuProfile: state.cpuProfile
  };
}

export default connect(mapStateToProps)(Layout);
