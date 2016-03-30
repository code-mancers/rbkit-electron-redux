import React, {Component} from 'react';

class DisplayCPUProfile extends Component {

  constructor() {
    super(...arguments);
    this.handleSubRows = this.handleSubRows.bind(this);
  }

  componentWillMount() {
    if( this.props.data !== undefined) {
      this.allCPUSamples = this.getAllSamplesFromDump();
      this.blocksFromTopOfStack = this.getBlocksFromTopOfStack();
      this.sortedTopOfStack = Object.keys(this.blocksFromTopOfStack).sort(function(a,b){ return this.blocksFromTopOfStack[a]-this.blocksFromTopOfStack[b]}.bind(this)).reverse();
      this.blockCountFromStack = this.getBlockCountFromStack();
      this.executionTime = this.getExecutionTime();
      this.listOfBlockIdentifiers = this.getlistOfBlockIdentifiers();
      this.updatedTable = [];
      this.updatedTableLength = 0;
    }
  }

  getAllSamplesFromDump() {
    const dump = this.props.data.data;
    let allCPUSamples = [];
    dump.forEach(function(samples) {
      samples[2].forEach(function(sample) {
        allCPUSamples.push(sample);
      });
    });
    return allCPUSamples;
  }

  getBlocksFromTopOfStack() {
    const allCPUSamples = this.allCPUSamples;
    let topOfStack = {};
    allCPUSamples.forEach(function(sample) {
      const sampleIdentifier = sample[2][0][6].concat(' ', sample[2][0][7], ' ', sample[2][0][13].replace(/ /g, '_')).replace(/ /g, '-');
      topOfStack[sampleIdentifier]? ++topOfStack[sampleIdentifier] : topOfStack[sampleIdentifier]=1;
    });
    return topOfStack;
  }

  getBlockCountFromStack() {
    const allCPUSamples = this.allCPUSamples;
    let methodCountInStack = {};
    allCPUSamples.forEach(function(sample) {
      const sampleIdentifier = sample[2][0][6].concat(' ', sample[2][0][7], ' ', sample[2][0][13].replace(/ /g, '_')).replace(/ /g, '-');
      methodCountInStack[sampleIdentifier]? ++methodCountInStack[sampleIdentifier] : methodCountInStack[sampleIdentifier]=1;
    });
    return methodCountInStack;
  }


  getExecutionTime() {
    const allCPUSamples = this.allCPUSamples;
    if (allCPUSamples[0]) {
      return (allCPUSamples[allCPUSamples.length-1][1] - allCPUSamples[0][1]);
    }
  }

  getlistOfBlockIdentifiers() {
    const allCPUSamples = this.allCPUSamples;
    let listOfBlockIdentifiers = [];
    allCPUSamples.forEach(function(samples) {
      let singleBlockIdentifier = [];
      samples[2].forEach(function(sample) {
        const sampleIdentifier = sample[6].concat(' ', sample[7], ' ', sample[13].replace(/ /g, '_')).replace(/ /g, '-');
        singleBlockIdentifier.push(sampleIdentifier);
      });
      listOfBlockIdentifiers.push(singleBlockIdentifier);
    });
    return listOfBlockIdentifiers;
  }

  getCallersOfBlock(blockName) {
    let callers = {};
    for(let i=0; i<this.listOfBlockIdentifiers.length; i++) {
      const blockIdentifier = this.listOfBlockIdentifiers[i];
      for(let j=0; j<blockIdentifier.length; j++) {
        const blockIdentifierMethod = blockIdentifier[j];
        if ((blockIdentifierMethod === blockName) && (j+1!=blockIdentifier.length)) {
          const caller = blockIdentifier[j+1];
          callers[caller]? ++callers[caller] : callers[caller]=1;
        }
      }
    }
    return callers;
  }

  getIndexOfRowWithId(id) {
    const table = this.props.cpuProfilingTable.cpuProfilingTable;
    let rowIndex;
    for (let i=0; i<table.length; i++) {
      if (table[i]['id'] == id) { rowIndex = i; break; }
    }
    return rowIndex;
  }

  notifyParentsOfNewChild(immediateParent, child) {
    this.updatedTable.forEach(function(row) {
     if (row['children'].indexOf(String(immediateParent)) > -1) {
        row['children'].push(child);
      }
    });
  }

  createSubRows(event) {
    const callerBlockName = event.currentTarget.dataset.blockName;
    const callerBlockTime = event.currentTarget.dataset.blockTime;
    const callers = this.getCallersOfBlock(callerBlockName);
    const callerObjectId = event.currentTarget.dataset.rowId;
    const callerRowIndex = this.getIndexOfRowWithId(callerObjectId);
    let insertNewRowAt = callerRowIndex;
    let maxId = event.currentTarget.dataset.maxId;
    let numberOfCallers = 0;
    this.updatedTable[callerRowIndex]['open'] = true;
    for (var prop in callers) { numberOfCallers+=callers[prop]; }
    for (var prop in callers) {
      let newRow = {};
      this.updatedTable[callerRowIndex]['children'].push(maxId)
      this.notifyParentsOfNewChild(callerObjectId, maxId);
      newRow['id']=maxId++;
      newRow['blockName']=prop;
      newRow['self']=Math.round((callers[prop]*100/numberOfCallers)*callerBlockTime)/100;
      newRow['open']=false;
      newRow['children'] = [];
      newRow['hidden']=false;
      newRow['nestedLevel']=this.updatedTable[callerRowIndex]['nestedLevel']+1;
      this.updatedTable.splice(++insertNewRowAt, 0, newRow);
    }
    this.props.updateProfilingData(this.updatedTable);
    this.updatedTableLength = this.updatedTable.length;
  }

  handleSubRows(event) {
    const callerObjectId = event.currentTarget.dataset.rowId;
    const callerRowIndex = this.getIndexOfRowWithId(callerObjectId);
    this.updatedTable[callerRowIndex]['open'] ? this.hideSubRows(callerRowIndex) : 
      this.updatedTable[callerRowIndex]['children'].length > 0 ? this.showSubRows(callerRowIndex) :
        this.createSubRows(event);
  }

  hideSubRows(objectIndex) {
    const rowsToHide = this.updatedTable[objectIndex]['children'];
    this.updatedTable[objectIndex]['open']=false;
    this.updatedTable.forEach(function(rowObject) {
      if (rowsToHide.indexOf(String(rowObject['id'])) > -1) {
        rowObject['hidden']=true;
      }
    });
    this.props.updateProfilingData(this.updatedTable);
  }

  showSubRows(objectIndex) {
    this.updatedTable[objectIndex]['open']=true;
    const rowsToShow = this.updatedTable[objectIndex]['children'];
    this.updatedTable.forEach(function(rowObject) {
      if (rowsToShow.indexOf(String(rowObject['id'])) > -1) {
        rowObject['hidden']=false;
      }
    });
    this.props.updateProfilingData(this.updatedTable);
  }

  initializeTable() {
    this.updatedTable = [];
    for (let i=0; i<this.sortedTopOfStack.length; i++) {
      let newRow = {};
      newRow['id']=i;
      newRow['blockName']=this.sortedTopOfStack[i];
      newRow['self'] = Math.round((this.blocksFromTopOfStack[this.sortedTopOfStack[i]]*100/this.allCPUSamples.length)*this.executionTime)/100;
      newRow['open'] = false;
      newRow['children'] = [];
      newRow['hidden']=false;
      newRow['nestedLevel']=1;
      this.updatedTable.push(newRow);
    };
    this.updatedTableLength = this.updatedTable.length;
    this.props.updateProfilingData(this.updatedTable);
  }

  getStyle(nestedLevel) {
    const padding = (nestedLevel*15) + "px";
    return {paddingLeft: padding};
  }

  displayCPUProfilingTable() {
    return (
      <table className="table table-bordered table-condensed">
        <thead><th>Total</th><th>Function</th></thead>
        <tbody>
          {
            this.props.cpuProfilingTable.cpuProfilingTable.map(row => {
              if (!row['hidden']) {
                return (
                  <tr key={row['id']}>
                    <td style={this.getStyle(row['nestedLevel'])}>{row['blockName'].split('-')[row['blockName'].split('-').length-1]}</td>
                    <td style={{paddingLeft:"15px"}}>
                      <i className={row['open'] ? 'fa fa-caret-down' : 'fa fa-caret-right'}
                        data-row-id={row['id']}
                        data-block-name={row['blockName']}
                        data-block-time={row['self']}
                        data-max-id={this.props.cpuProfilingTable.cpuProfilingTable.length}
                        onClick={this.handleSubRows}
                      />
                      {' ' + row['self'] + ' ms'}
                    </td>
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>
    )
  }

  parseProfilingData() {
    // TODO: Rename conditions
    if( this.props.data !== undefined) {
      const noDataInTable = (this.props.cpuProfilingTable.cpuProfilingTable.length === 0) && (this.updatedTableLength === 0);
      const condition2 = this.props.cpuProfilingTable.cpuProfilingTable.length !== this.updatedTableLength;
      return noDataInTable || condition2 ? this.initializeTable() : this.displayCPUProfilingTable();
    }
  }

  render() {
    return (
      <div className='col-md-10 col-md-offset-1'>
        { this.parseProfilingData() }
      </div>
    )
  }
}

export default DisplayCPUProfile;
