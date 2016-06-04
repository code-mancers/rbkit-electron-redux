import MsgPack from 'msgpack';
import config from '../../config/config';

const zmqConfig = config.zmq;

const rbkit = (reqzmq, subzmq) => {
  return ({dispatch}) => {
    const onConnect = () => {
      dispatch({
        type: 'CONNECTED'
      });
    };

    const onDisconnect = () => {
      dispatch({
        type: 'DISCONNECTED'
      });
    };

    reqzmq.on('connect', onConnect);
    subzmq.on('connect', onConnect);

    reqzmq.on('disconnect', onDisconnect);
    subzmq.on('disconnect', onDisconnect);

    reqzmq.on('message', reply => {
      const data = MsgPack.unpack(reply);
      console.log('Received reply in middleware : ', data);
      dispatch({
        type: 'DATA',
        from: 'requester',
        data
      });
    });

    subzmq.on('message', reply => {
      const data = MsgPack.unpack(reply);
      console.log('Received reply in middleware : ', data);
      dispatch({
        type: 'DATA',
        from: 'subscriber',
        data
      });
    });

    return next => action => {
      if (!action.zmq) {
        return next(action);
      }

      console.log('zmqMiddleWare :: ', action);

      const {type, zmq, ...rest} = action;
      console.log('zmqMiddleWare :: ', zmq, type, rest);

      if (type) {
        next({type, ...rest});
      }

      console.log('zmq :: ', zmq);

      switch (type) {
        case 'CONNECT':
          reqzmq.connect(zmqConfig.requester);
          subzmq.connect(zmqConfig.subscriber);

          break;
        case 'COMMAND':
          if (zmq.cmd && zmq.cmd.indexOf('start') === 0) {
            subzmq.subscribe('');
          }
          if (zmq.cmd && zmq.cmd.indexOf('stop') === 0) {
            subzmq.unsubscribe('');
          }

          reqzmq.send(zmq.cmd);
          break;
        case 'DISCONNECT':
          subzmq.unsubscribe('');

          reqzmq.disconnect(zmqConfig.requester);
          subzmq.disconnect(zmqConfig.subscriber);
          break;
        default:
          break;
      }

      // return next(type, ...rest);
    };
  };
};

export default rbkit;
