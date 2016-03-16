import React from 'react'

export default props => {
  const status = props.status === 'CONNECTED' ? 'on' : 'off';
  return (
    <div>
      <div className={`bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-${status}`}>
        <div className="bootstrap-switch-container">
          <span className="bootstrap-switch-handle-on bootstrap-switch-primary">
            <span className="fui-check"></span>
          </span>
          <label className="bootstrap-switch-label">&nbsp;</label>
          <span className="bootstrap-switch-handle-off bootstrap-switch-default">
            <span className="fui-cross"></span>
          </span>
          <input type="checkbox" checked={props.status === 'CONNECTED'} data-toggle="switch"/>
        </div>
      </div>
      <span>{props.status} </span>
    </div>
  )
}
