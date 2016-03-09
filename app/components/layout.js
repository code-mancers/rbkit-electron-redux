import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Navbar from '../components/common/Navbar'
import Row from './row'
import connectToServer from '../redux/actions'
import Table from './Table'
import Connect from './connectionForm';

class Layout extends React.Component {
  connect(ip) {
    console.log('Layout connect :: ', ip);
    this.props.dispatch(connectToServer(ip));
    // this.props.dispatch(actions.connectToServer(ip));
  }

  render() {
    return(
      <div>
        <Navbar/>
        <div className="container">
          <div className="starter-template">
            <h1>Bootstrap starter template</h1>
            <p className="lead">Use this document as a way to quickly start any new project.</p>
          </div>
        </div>
        <Connect {...this.props} connect={this.connect.bind(this)}/>
        <Table />
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps : ', state);
  return state.connection
}

export default connect(mapStateToProps)(Layout)
