import React, {Component} from 'react';
import RbkitConnection from '../rbkitConnection';

export const Rbkit = ComposedComponent => class extends Component {
  constructor(props) {
    super(props);
    this.connect = this.connect.bind(this);
  }
  onMessage() {
    console.log('event on message');
  }
  onConnect() {
    console.log('event on connect');
  }
  onDisconnect() {
    console.log('event on disconnect');
  }
  componentDidMount() {
    console.log('mount Rbkit');
  }
  connect(ip) {
    RbkitConnection.connect({
      ip: ip,
      onMessage: this.onMessage,
      onConnect: this.onConnect,
      onDisconnect: this.onDisconnect
    });
  }
  render() {
    return <ComposedComponent connect={this.connect}/>;
  }
};
