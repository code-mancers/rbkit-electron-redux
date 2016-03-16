import {Component} from 'react';
import Button from './common/Button'

import ZMQ from 'zmq';
import MsgPack from 'msgpack';

class Toolbelt extends Component {

  handleHandshake() {

    let requester = ZMQ.socket('req');
    let subscriber = ZMQ.socket('sub');
    let ip = 'localhost';

    requester.on("message", function(reply) {
      const decodedReply = MsgPack.unpack(reply);
      console.log("Received reply", ": [", decodedReply, ']');
      this.displayHandshake(decodedReply);
    }.bind(this));

    requester.connect(`tcp://${ip}:5556`);
    subscriber.connect(`tcp://${ip}:5555`);

    subscriber.on("message", function (stream) {
      const decodedStream = MsgPack.unpack(stream);
      console.log("Subscriber Received reply", ": [", decodedStream, ']');
    });

    process.on('SIGINT', function() {
      requester.close();
    });

    requester.send("handshake");

  }

  displayHandshake(status) {
    this.props.handshake(status)
  }

  render () {
    return (
      <div className='col-md-10 col-md-offset-1'>
        <Button value='Handshake' onClick={this.handleHandshake.bind(this)} />
      </div>
    )
  }
}

export default Toolbelt;
