import React, {Component, PropTypes} from 'react';
import Button from './common/Button';

class Toolbelt extends Component {
  render() {
    return (
      <div className="col-md-10 col-md-offset-1">
        <Button value="Handshake" onClick={this.props.handshake}/>
      </div>
    );
  }
}

Toolbelt.propTypes = {
  handshake: PropTypes.func
};

export default Toolbelt;
