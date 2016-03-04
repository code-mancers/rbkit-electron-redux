import React from 'react'
import ReactDom from 'react-dom'
import Navbar from '../components/navbar'
import Row from '../components/row'
import Button from '../components/common/button'
import ZMQ from 'zmq'
import MsgPack from 'msgpack'

class Layout extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  connectToServer() {
    console.log('Connecting to Server...');
    // connection logic goes here
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

        <Button onClick={this.connectToServer} value='Connect To Server' />
      </div>
    )
  }
}

Layout.propTypes = {
  // Validation logic
};

window.onload = function(){
  ReactDOM.render(<Layout/>, document.getElementById('layout-container'));
}
