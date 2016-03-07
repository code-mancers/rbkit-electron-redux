import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Navbar from '../components/Navbar'
import Row from '../components/Row'
import Button from '../components/common/Button'
import ZMQ from 'zmq'
import MsgPack from 'msgpack'
import Actions from '../redux/actions'

class Layout extends React.Component {

  connectToServer() {
    console.log('Connecting to Server...');
    console.log(this.props)
    this.props.dispatch(Actions.connectToServer());
  }

  componentDidMount() {

    var rawProfilingData = [];

    const requester = ZMQ.socket('req');
    const subscriber = ZMQ.socket('sub');

    requester.connect("tcp://localhost:5556");    
    subscriber.connect("tcp://localhost:5555"); 
    subscriber.subscribe("");  

    requester.on("message", function(reply) {
      const decodedReply = MsgPack.unpack(reply);
      console.log("Received reply", ": [", decodedReply, ']');
    });

    subscriber.on("message", function(stream) {
      const decodedStream = MsgPack.unpack(stream);
      console.log("Received reply", ": [", decodedStream, ']');
      rawProfilingData.push(decodedStream);
    });

    process.on('SIGINT', function() {
      requester.close();
    });

    console.log("Sending 'start_cpu_profiling'");
    requester.send("start_cpu_profiling");

    for(var i=0; i<5000; i++){
      console.log('');
      // loop to give the system time to profile
    }

    console.log("Sending 'stop_cpu_profiling'");
    requester.send("stop_cpu_profiling");
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

        <Button onClick={this.connectToServer.bind(this)} dispatch={this.props.dispatch} value={this.props.connectionStatus} actions={this.props.actions}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(Layout)
