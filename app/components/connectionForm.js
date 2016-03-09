import {Component} from 'react';

// import {Rbkit} from './rbkit';
import Button from './common/Button'

export default class Connect extends Component {
  constructor (props) {
    super(props);
    this.connectToServer = this.connectToServer.bind(this);
  }
  connectToServer () {
    const ip = this.refs.ip.value;
    this.props.connect(ip);
  }
  render () {
    return (
      <div>
        <input ref="ip" id="ip" name="ip" placeHolder="Ip" />
        <Button onClick={this.connectToServer} value={this.props.connectionStatus || 'Connect'} />
      </div>
    )
  }
}

// export default Rbkit(Connect);
