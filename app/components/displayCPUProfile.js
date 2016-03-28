import React, {Component} from 'react';

class DisplayCPUProfile extends Component {

  constructor() {
    super(...arguments);
    this.parseProfilingData = this.parseProfilingData.bind(this);
    this.getSamplesFromDump = this.getSamplesFromDump.bind(this);
    this.getTopOfStack = this.getTopOfStack.bind(this);
    this.getMethodCountInStack = this.getMethodCountInStack.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.getlistOfSamples = this.getlistOfSamples.bind(this);
    this.getCallersof = this.getCallersof.bind(this);
    this.showTable = this.showTable.bind(this);
  }

  componentWillMount() {
    if( this.props.data !== undefined) {
      this.cpuSamples = this.getSamplesFromDump();
      this.topOfStack = this.getTopOfStack();
      this.sortedTopOfStack = Object.keys(this.topOfStack).sort(function(a,b){ return this.topOfStack[a]-this.topOfStack[b]}.bind(this)).reverse();
      this.methodCountInStack = this.getMethodCountInStack();
      this.executionTime = this.getExecutionTime();
      this.listOfSamples = this.getlistOfSamples();
      this.finalTable = [];
    }
  }

  getSamplesFromDump() {
    const dump = this.props.data.data;
    let cpuSamples = [];
    dump.forEach(function(samples) {
      samples[2].forEach(function(sample) {
        cpuSamples.push(sample);
      });
    });
    return cpuSamples;
  }

  getTopOfStack() {
    const cpuSamples = this.cpuSamples;
    let topOfStack = {};
    cpuSamples.forEach(function(sample) {
      const sampleIdentifier = sample[2][0][6].concat(' ', sample[2][0][7], ' ', sample[2][0][13].replace(/ /g, '_')).replace(/ /g, '-');
      topOfStack[sampleIdentifier]? ++topOfStack[sampleIdentifier] : topOfStack[sampleIdentifier]=1;
    });
    return topOfStack;
  }

  getMethodCountInStack() {
    const cpuSamples = this.cpuSamples;
    let methodCountInStack = {};
    cpuSamples.forEach(function(sample) {
      const sampleIdentifier = sample[2][0][6].concat(' ', sample[2][0][7], ' ', sample[2][0][13].replace(/ /g, '_')).replace(/ /g, '-');
      methodCountInStack[sampleIdentifier]? ++methodCountInStack[sampleIdentifier] : methodCountInStack[sampleIdentifier]=1;
    });
    return methodCountInStack;
  }

  getExecutionTime() {
    const cpuSamples = this.cpuSamples;
    if (cpuSamples[0]) {
      return (cpuSamples[cpuSamples.length-1][1] - cpuSamples[0][1]);
    }
  }

  getlistOfSamples() {
    const cpuSamples = this.cpuSamples;
    let listOfSamples = [];
    cpuSamples.forEach(function(samples) {
      samples[2].forEach(function(sample) {
        const sampleIdentifier = sample[6].concat(' ', sample[7], ' ', sample[13].replace(/ /g, '_')).replace(/ /g, '-');
        listOfSamples.push(sampleIdentifier);
      });
    });
    return listOfSamples;
  }

  getCallersof(listOfSamples, blockName) {
    let callers = {};
    for(let i=0; i<listOfSamples.length; i++) {
      if (listOfSamples[i].split('-')[listOfSamples[i].split('-').length-1] === blockName) {
        callers[blockName]? ++callers[blockName] : callers[blockName]=1;
      }
    }
    return callers;
  }

  handleExpand(listOfSamples, event) {
    const callerBlockId = event.currentTarget.id;
    const callers = this.getCallersof(listOfSamples, callerBlockId);
  }

  showTable() {
    return (
      <table className="table table-bordered table-condensed">
        <tbody>
          {
            table.map(row => {
              return (
                <tr>
                  <td>{row[1]}</td>
                  <td>{row[2] + 'ms'}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }

  parseProfilingData() {
    if( this.props.data !== undefined) {
      this.finalTable = [];
      for (let i=0; i<this.sortedTopOfStack.length; i++) {
        let row = [];
        row.push(i);
        row.push(this.sortedTopOfStack[i].split('-')[this.sortedTopOfStack[i].split('-').length-1]);
        row.push(Math.round((this.topOfStack[this.sortedTopOfStack[i]]*100/this.cpuSamples.length)*this.executionTime)/100);
        this.finalTable.push(row)
      };
      return (this.showTable());
    }
  }

  render () {
    return (
      <div className='col-md-10 col-md-offset-1'>
        {this.parseProfilingData()}
      </div>
    )
  }
}

export default DisplayCPUProfile;
