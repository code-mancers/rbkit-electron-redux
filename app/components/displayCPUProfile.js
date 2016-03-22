import React, {Component} from 'react';

class DisplayCPUProfile extends Component {

  constructor() {
    super(...arguments);
    this.getSamplesFromDump = this.getSamplesFromDump.bind(this);
    this.getTopOfStack = this.getTopOfStack.bind(this);
    this.methodCountInStack = this.methodCountInStack.bind(this);
  }

  getSamplesFromDump(dump) {
    let cpuSamples = [];
    dump.forEach(function(samples) {
      samples[2].forEach(function(sample) {
        cpuSamples.push(sample);
      });
    });
    return cpuSamples;
  }

  getTopOfStack(cpuSamples) {
    let topOfStack = {};
    cpuSamples.forEach(function(sample) {
      const sampleIdentifier = sample[2][0][6].concat(' ', sample[2][0][7], ' ', sample[2][0][13].replace(/ /g, '_')).replace(/ /g, '-');
      topOfStack[sampleIdentifier]? ++topOfStack[sampleIdentifier] : topOfStack[sampleIdentifier]=1;
    });
    return topOfStack;
  }

  methodCountInStack(cpuSamples) {
    let methodCountInStack = {};
    cpuSamples.forEach(function(sample) {
      const sampleIdentifier = sample[2][0][6].concat(' ', sample[2][0][7], ' ', sample[2][0][13].replace(/ /g, '_')).replace(/ /g, '-');
      methodCountInStack[sampleIdentifier]? ++methodCountInStack[sampleIdentifier] : methodCountInStack[sampleIdentifier]=1;
    });
    return methodCountInStack;
  }

  getExecutionTime(cpuSamples) {
    if (cpuSamples[0]) {
      return (cpuSamples[cpuSamples.length-1][1] - cpuSamples[0][1]);
    }
  }

  display() {
    if( this.props.data !== undefined) {
      const cpuSamples = this.getSamplesFromDump(this.props.data.data);
      const topOfStack = this.getTopOfStack(cpuSamples);
      const sortedTopOfStack = Object.keys(topOfStack).sort(function(a,b){return topOfStack[a]-topOfStack[b]}).reverse();
      const methodCountInStack = this.methodCountInStack(cpuSamples);
      const executionTime = this.getExecutionTime(cpuSamples);

      return (
        <table className="table table-bordered table-condensed">
          <tbody>
            {
              sortedTopOfStack.map(property => {
                return (
                  <tr>
                    <td>{property.split('-')[property.split('-').length-1]}</td>
                    <td>{Math.round((topOfStack[property]*100/cpuSamples.length)*executionTime)/100 + 'ms'}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      )
    }
  }

  render () {
    return (
      <div className='col-md-10 col-md-offset-1'>
        {this.display()}
      </div>
    )
  }
}

export default DisplayCPUProfile;
