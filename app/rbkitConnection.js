import ZMQ from 'zmq';
import MsgPack from 'msgpack';

const RbkitConnection = (() => {
  let ip;
  let requester;
  let subscriber;
  let rawProfilingData = [];

  const connect = options => {
    console.log('connect ', options);
    requester = ZMQ.socket('req');
    subscriber = ZMQ.socket('sub');
    ip = options.ip;

    requester.connect(`tcp://${ip}:5556`);
    subscriber.connect(`tcp://${ip}:5555`);
    subscriber.subscribe("");

    requester.monitor(500, 0);

    requester.on('connect', options.onConnect);
    requester.on('disconnect', options.onDisconnect);

    // subscriber.on('connect', onConnect);
    // subscriber.on('disconnect', onDisconnect);
    subscriber.subscribe("");

    subscriber.on("message", function (stream) {
      const decodedStream = MsgPack.unpack(stream);
      console.log("Subscriber Received reply", ": [", decodedStream, ']');
      rawProfilingData.push(decodedStream);
    });

    process.on('SIGINT', function () {
      requester.unmonitor();
      requester.close();
    });
  };

  return {
    connect
  };
})();

export default RbkitConnection;
