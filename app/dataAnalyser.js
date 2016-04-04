const dataAnalyser = (() => {

  let allCPUSamples;
  let blocksFromTopOfStack;
  let sortedTopOfStack;
  let executionTime;
  let listOfBlockIdentifiers;
  let cpuProfilingTable;

  const setup = (dump) => {
    allCPUSamples = getAllSamplesFromDump(dump);
    listOfBlockIdentifiers = getlistOfBlockIdentifiers();
    blocksFromTopOfStack = getBlocksFromTopOfStack();
    executionTime = getExecutionTime();
    sortedTopOfStack = Object.keys(blocksFromTopOfStack).sort(function(a,b){ return blocksFromTopOfStack[a]-blocksFromTopOfStack[b]}).reverse();
  }

  const getAllSamplesFromDump = (dump) => {
    let allCPUSamples = [];
    dump.forEach(function(samples) {
      samples[2].forEach(function(sample) {
        allCPUSamples.push(sample);
      });
    });
    return allCPUSamples;
  }

  // A block can be uniquely identified by its line, file and label, concatenated and separated by a '-' 
  const getlistOfBlockIdentifiers = () => {
    let listOfBlockIdentifiers = [];
    allCPUSamples.forEach(function(samples) {
      let blockIdentifier = [];
      samples[2].forEach(function(sample) {
        const sampleIdentifier = sample[6].concat(' ', sample[7], ' ', sample[13].replace(/ /g, '_')).replace(/ /g, '-');
        blockIdentifier.push(sampleIdentifier);
      });
      listOfBlockIdentifiers.push(blockIdentifier);
    });
    return listOfBlockIdentifiers;
  }

  const getBlocksFromTopOfStack = () => {
    let topOfStack = {};
    listOfBlockIdentifiers.forEach(function(blockIdentifier) {
      topOfStack[blockIdentifier[0]]? ++topOfStack[blockIdentifier[0]] : topOfStack[blockIdentifier[0]]=1;
    });
    return topOfStack;
  }

  const getExecutionTime = () => {
    if (allCPUSamples[0]) {
      return (allCPUSamples[allCPUSamples.length-1][1] - allCPUSamples[0][1]);
    }
  }

  const getCallersOfBlock = (blockIdentifier) => {
    let callers = {};
    for(let i=0; i<listOfBlockIdentifiers.length; i++) {
      const identifier = listOfBlockIdentifiers[i];
      for(let j=0; j<identifier.length; j++) {
        const identifierMethod = identifier[j];
        if ((identifierMethod === blockIdentifier) && (j+1!=identifier.length)) {
          const caller = identifier[j+1];
          callers[caller]? ++callers[caller] : callers[caller]=1;
        }
      }
    }
    return callers;
  }

  const getIndexOfRowWithId = (id) => {
    let rowIndex;
    for (let i=0; i<cpuProfilingTable.length; i++) {
      if (cpuProfilingTable[i]['id'] == id) { rowIndex = i; break; }
    }
    return rowIndex;
  }

  const createSubRows = (event) => {
    const clickedObjectId = event.currentTarget.dataset.objectId;
    const clickedRowIndex = getIndexOfRowWithId(clickedObjectId);
    const callerBlockName = cpuProfilingTable[clickedRowIndex]['blockIdentifier'];
    const callerBlockTime = cpuProfilingTable[clickedRowIndex]['self'];
    const callers = getCallersOfBlock(callerBlockName);

    let insertNewRowAt = clickedRowIndex;
    let maxId = event.currentTarget.dataset.maxId;
    let numberOfCallers = 0;

    cpuProfilingTable[clickedRowIndex]['isOpen'] = true;
    for (var prop in callers) { numberOfCallers+=callers[prop]; }
    for (var prop in callers) {
      cpuProfilingTable[clickedRowIndex]['children'].push(maxId)
      let newRow = {
        id: maxId++,
        blockIdentifier: prop,
        self: Math.round((callers[prop]*100/numberOfCallers)*callerBlockTime)/100,
        isOpen: false,
        children: [],
        isHidden: false,
        nestedLevel: cpuProfilingTable[clickedRowIndex]['nestedLevel']+1
      };
      cpuProfilingTable.splice(++insertNewRowAt, 0, newRow);
    }
    return cpuProfilingTable;
  }

  const initializeTable = (dump) => {
    setup(dump);
    cpuProfilingTable = [];
    for (let i=0; i<sortedTopOfStack.length; i++) {
      let newRow = {
        id: i,
        blockIdentifier: sortedTopOfStack[i],
        self: Math.round((blocksFromTopOfStack[sortedTopOfStack[i]]*100/allCPUSamples.length)*executionTime)/100,
        isOpen: false,
        children: [],
        isHidden: false,
        nestedLevel: 1
      };
      cpuProfilingTable.push(newRow);
    };
    return cpuProfilingTable;
  }

  return {
    createSubRows,
    initializeTable,
    getIndexOfRowWithId
  }

})();

export default dataAnalyser;