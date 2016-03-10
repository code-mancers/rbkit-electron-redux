import React, {Component} from 'react'

export default class Indicator extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
        <div className="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-id-custom-switch-01 bootstrap-switch-on">
          <div className="bootstrap-switch-container">
            <span className="bootstrap-switch-handle-on bootstrap-switch-primary">
              <span className="fui-check"></span>
            </span>
            <label className="bootstrap-switch-label">&nbsp;</label>
            <span className="bootstrap-switch-handle-off bootstrap-switch-default">
              <span className="fui-cross"></span>
            </span>
            <input type="checkbox" checked={this.props.status === 'CONNECTED'} data-toggle="switch" id="custom-switch-01" />
          </div>
        </div>
        <span>{this.props.status} </span>
      </div>
		)
	}
}
