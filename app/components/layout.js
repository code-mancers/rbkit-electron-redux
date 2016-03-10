import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Navbar from '../components/common/Navbar'
import Row from './row'
import connectToServer from '../redux/actions'
import Table from './Table'

class Layout extends React.Component {
  constructor() {
    super(...arguments);
    this.connect = this.connect.bind(this);
  }

  connect(ip) {
    console.log('Layout connect :: ', ip);
    this.props.dispatch(connectToServer(ip));
  }

  render() {
    return(
      <div>
        <Navbar {...this.props} connect={this.connect}/>
        <div className="container">
          <div className="starter-template">
            <h1>Bootstrap starter template</h1>
            <p className="lead">Use this document as a way to quickly start any new project.</p>
          </div>
        </div>
        <Table />
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./devTools').default;
              return <DevTools />;
            }
          })()
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.connection
}

export default connect(mapStateToProps)(Layout)
