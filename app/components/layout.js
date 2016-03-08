import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Navbar from '../components/common/Navbar'
import Row from '../components/Row'
import Button from '../components/common/Button'
import ZMQ from 'zmq'
import MsgPack from 'msgpack'
import actions from '../redux/actions'
import Table from './Table'

class Layout extends React.Component {

  connectToServer() {
    console.log('Connecting to Server...');
    this.props.actions.connectToServer();
  }

  componentDidMount() {

    var rawProfilingData = [];

    const requester = ZMQ.socket('req');
    const subscriber = ZMQ.socket('sub');

    requester.monitor();

    requester.on('connect', (e) => {
      console.log('requestor connected', e);
    });

    subscriber.on('connect', (e) => {
      console.log('subscriber connected', e);
    });

    requester.on('disconnect', (e) => {
      console.log('requestor disconnected', e);
    });

    subscriber.on('disconnect', (e) => {
      console.log('subscriber disconnected', e);
    });

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
      requester.unmonitor();
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

        <Button onClick={this.connectToServer.bind(this)} value={this.props.connectionStatus} />

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
