import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import Navbar from '../components/common/Navbar';
// import Row from './row';
import {connectToServer, handshake, startCpuProfiling} from '../redux/actions';
import DisplayHandshake from './displayhandshake';
import Toolbelt from './toolbelt';

class Layout extends React.Component {
  constructor() {
    super(...arguments);
    this.cpuProfiling = this.cpuProfiling.bind(this);
    this.handshake = this.handshake.bind(this);
  }

  connect(ip) {
    console.log('Layout connect :: ', ip);
    this.props.dispatch(connectToServer(ip));
  }

  handshake() {
    this.props.dispatch(handshake());
  }

  cpuProfiling() {
    this.props.dispatch(startCpuProfiling());
  }

  render() {
    return (
      <div>
        <Navbar {...this.props} connect={::this.connect}/>
        <div className="container">
          <div className="starter-template">
            <h1>Bootstrap starter template</h1>
            <p className="lead">
              Use this document as a way to quickly start any new project.
            </p>
          </div>
        </div>
        <Toolbelt {...this.props} handshake={this.handshake} handleCpuSampling={this.cpuProfiling}/>
        <DisplayHandshake data={this.props.handshake}/>
      </div>
    );
  }
}

Layout.propTypes = {
  dispatch: PropTypes.func,
  handshake: PropTypes.object
};

function mapStateToProps(state) {
  console.log('mapStateToProps : ', state);
  return {
    status: state.connection.status,
    handshake: state.handshake,
    cpuProfile: state.cpuProfile
  };
}

export default connect(mapStateToProps)(Layout);
