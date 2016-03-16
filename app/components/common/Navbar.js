import React, {Component} from 'react'
import ConnectionForm from '../connectionForm';
import Indicator from '../indicator';

export default class Navbar extends Component {
  render() {
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Rbkit</a>
          </div>
          <div id="navbar">
            <ul className="nav navbar-nav navbar-right">
              {
                (this.props.status !== '') ? Indicator(this.props) : <ConnectionForm {...this.props} />
              }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
