import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Navbar from '../components/common/Navbar'
import Row from './row'
import {connectToServer, handshake} from '../redux/actions'
import DisplayHandshake from './displayhandshake'
import Toolbelt from './toolbelt'

class Layout extends React.Component {
  constructor() {
    super(...arguments);
    this.connect = this.connect.bind(this);
    this.handshake = this.handshake.bind(this);
  }

  connect(ip) {
    console.log('Layout connect :: ', ip);
    this.props.dispatch(connectToServer(ip));
  }

  handshake(handshakeData) {
    this.props.dispatch(handshake(handshakeData));
  }

  render() {
    return(
      <div>
        <Navbar {...this.props} connect={this.connect}/>
        <div className="container">
          <div className="starter-template">
            <h1>Bootstrap starter template</h1>
            <p className="lead">
              Use this document as a way to quickly start any new project.
            </p>
          </div>
        </div>
        <Toolbelt {...this.props} handshake={this.handshake}/>
        <DisplayHandshake data={this.props.handshake}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps : ', state);
  return {
    status: state.connection.status,
    handshake: state.handshake
  }
}

export default connect(mapStateToProps)(Layout)
