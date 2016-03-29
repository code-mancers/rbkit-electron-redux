import React, {Component} from 'react';

class DisplayCPUProfile extends Component {

  constructor() {
    super(...arguments);
    this.parseProfilingData = this.parseProfilingData.bind(this);
    this.getSamplesFromDump = this.getSamplesFromDump.bind(this);
    this.getTopOfStack = this.getTopOfStack.bind(this);
    this.getMethodCountInStack = this.getMethodCountInStack.bind(this);
    this.handleRowExpansion = this.handleRowExpansion.bind(this);
    this.getlistOfSamples = this.getlistOfSamples.bind(this);
    this.getCallersof = this.getCallersof.bind(this);
    this.displayCPUProfilingTable = this.displayCPUProfilingTable.bind(this);
    this.createTableFromTopOfStack = this.createTableFromTopOfStack.bind(this);
    this.updateTableFromStore = this.updateTableFromStore.bind(this);
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
      this.tableLength = 0;
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

  getCallersof(blockName) {
    let callers = {};
    for(let i=0; i<this.listOfSamples.length; i++) {
      const sample = this.listOfSamples[i];
      if (sample.split('-')[sample.split('-').length-1] === blockName) {
        const caller = this.listOfSamples[i+1].split('-')[this.listOfSamples[i+1].split('-').length-1];
        callers[caller]? ++callers[caller] : callers[caller]=1;
      }
    }
    return callers;
  }

  handleRowExpansion(event) {
    let callerBlockId = event.currentTarget.dataset.rowId;
    const callerBlockName = event.currentTarget.dataset.blockName;
    const callerBlockTime = event.currentTarget.dataset.blockTime;
    const callers = this.getCallersof(callerBlockName);
    let numberOfCallers = 0;
    let newRowIdCount = 0;
    for (var prop in callers) { numberOfCallers+=callers[prop]; }
    for (var prop in callers) {
      // console.log(callerBlockName + ' called by ' + prop);
      let newRow = [];
      newRow.push(callerBlockId + '_' + newRowIdCount++);
      newRow.push(prop);
      newRow.push((callers[prop]/numberOfCallers)*callerBlockTime);
      this.finalTable.splice(++callerBlockId, 0, newRow);
    }
    this.props.updateProfilingData(this.finalTable);
    this.tableLength = this.finalTable.length;

    // for (var prop in callers) {
    //   let row = [];
    //   row.push(000);
    //   row.push(prop);
    //   row.push(Math.round((this.topOfStack[this.sortedTopOfStack[i]]*100/this.cpuSamples.length)*this.executionTime)/100);
    //   // this.finalTable.push(row)
    // };
  }

  createTableFromTopOfStack() {
    // console.log('from top of stack')
    this.finalTable = [];
    for (let i=0; i<this.sortedTopOfStack.length; i++) {
      let row = [];
      row.push(i);
      row.push(this.sortedTopOfStack[i].split('-')[this.sortedTopOfStack[i].split('-').length-1]);
      row.push(Math.round((this.topOfStack[this.sortedTopOfStack[i]]*100/this.cpuSamples.length)*this.executionTime)/100);
      this.finalTable.push(row)
    };
    this.tableLength = this.finalTable.length;
    this.props.updateProfilingData(this.finalTable);
  }

  updateTableFromStore() {
    // console.log('from store')
    this.finalTable = [];
    for (let i=0; i<this.sortedTopOfStack.length; i++) {
      let row = [];
      row.push(i);
      row.push(this.sortedTopOfStack[i].split('-')[this.sortedTopOfStack[i].split('-').length-1]);
      row.push(Math.round((this.topOfStack[this.sortedTopOfStack[i]]*100/this.cpuSamples.length)*this.executionTime)/100);
      this.finalTable.push(row)
    };
    this.tableLength = this.finalTable.length;
  }

  // updateProfilingTable() {
  //   this.props.cpuProfilingTable.cpuProfilingTable.length === 0 ? 
  //     this.createTableFromTopOfStack() : this.displayCPUProfilingTable();
  // }

  displayCPUProfilingTable() {
    return (
      <table className="table table-bordered table-condensed">
        <tbody>
          {
            this.props.cpuProfilingTable.cpuProfilingTable.map(row => {
              return (
                <tr key={row[0]}>
                  <td>{row[1]}</td>
                  <td>
                    {row[2] + 'ms '}
                    <button className="btn btn-xs" 
                      data-row-id={row[0]}
                      data-block-name={row[1]}
                      data-block-time={row[2]}
                      onClick={this.handleRowExpansion}
                    >
                      <i className="fa fa-caret-down" />
                    </button>
                  </td>
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
      // console.log('++++++++++++')
      // console.log(this.props.cpuProfilingTable.cpuProfilingTable.length);
      // console.log(this.tableLength);
      const condition1 = (this.props.cpuProfilingTable.cpuProfilingTable.length === 0) && (this.tableLength === 0);
      const condition2 = this.props.cpuProfilingTable.cpuProfilingTable.length !== this.tableLength;
      // console.log(condition1);
      // console.log(condition2);
      return condition1 || condition2 ? this.createTableFromTopOfStack() : this.displayCPUProfilingTable();
    }
  }

  render() {
    return (
      <div className='col-md-10 col-md-offset-1'>
        {this.parseProfilingData()}
      </div>
    )
  }
}

export default DisplayCPUProfile;
