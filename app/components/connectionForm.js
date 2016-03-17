import React, {Component, PropTypes} from 'react';

export default class Connect extends Component {
  constructor(props) {
    super(props);
    this.handleConnect = this.handleConnect.bind(this);
  }
  handleConnect() {
    const ip = this.refs.ip.value;
    this.props.connect(ip);
  }
  renderConnect() {
    return (
      <div>
        <input ref="ip" id="ip" name="ip" placeholder="Ip Eg: 12.0.0.1/localhost"/>
        <button type="button" className="btn btn-success" onClick={this.handleConnect}>Connect</button>
      </div>
    );
  }
  renderDisconnect() {
    return (
      <div>
        <button type="button" data-ip={this.props.ip} className="btn btn-danger" onClick={this.props.handleDisconnect}>Disconnect</button>
      </div>
    );
  }
  render() {
    return this.props.status === 'CONNECTED' ? this.renderDisconnect() : this.renderConnect();
  }
}

Connect.propTypes = {
  ip: PropTypes.string,
  status: PropTypes.string,
  connect: PropTypes.func,
  handleDisconnect: PropTypes.func
};
