import React, {PropTypes} from 'react';

const ConnectButton = props => {
  return (
    <button type="button" className="btn btn-success" onClick={props.handleConnect}>
      { props.status === 'CONNECTING' ? 'Connecting...' : 'Connect' }
    </button>
  );
};

ConnectButton.propTypes = {
  handleConnect: PropTypes.func
};

const DisconnectButton = props => {
  return <button type="button" className="btn btn-danger" onClick={props.handleDisconnect}>Disconnect</button>;
};

DisconnectButton.propTypes = {
  handleDisconnect: PropTypes.func
};

const Connect = props => {
  return props.status === 'CONNECTED' ? <DisconnectButton {...props}/> : <ConnectButton {...props}/>;
};

Connect.propTypes = {
  status: PropTypes.string
};

export default Connect;
