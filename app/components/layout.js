import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Navbar from '../components/common/Navbar'
import Row from './row'
import actions from '../redux/actions'
import Table from './Table'
import Connect from './connectionForm';

class Layout extends React.Component {

  connectToServer() {
    console.log('Connecting to Server...');
    this.props.actions.connectToServer();
  }

  componentDidMount() {

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
        <Connect />
        <Table />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
