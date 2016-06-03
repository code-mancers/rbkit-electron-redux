import React, {PropTypes} from 'react';

const Alert = props => {
  return (
    <div className={`alert alert-${props.type}`} role="alert">
      <strong>Error!</strong> {props.children}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.string,
  children: PropTypes.string
};

export default Alert;
