import React from 'react'
import $ from 'jquery'

class Row extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      processedData: {},
    };
  }

  componentWillMount() {
    this.inititalizeProcessedData();
    this.calculateSelf()
    this.calculateTotal();
  }

  render() {
    return(
      <div>
        <table className="table table-bordered table-rounded">
          <tr><th>Self (ms)</th><th>Total (ms)</th><th>Method</th></tr>
          {this.displayRows()}
        </table>
      </div>
    )
  }

  getAllMethodNames() {
    // list of all method names in every stack duplicity inclusive
    var allMethodNames = [];
    for(var i=0; i<this.props.samples.length; i++){
      this.props.samples[i].payload.forEach(payload => {
        allMethodNames.push(payload.method_name);  
      });
    }
    return allMethodNames;
  }

  getUniqueMethodNames() {
    // Remove duplicity
    return $.unique(this.getAllMethodNames());
  }

  calculateTotal(functionName) {
    var allMethodNames = this.getAllMethodNames();

    // Function to get occurrences of an element in an array
    // List all functions ever called, and find out how man times each has been called
    var methodCount = new Map([...new Set(allMethodNames)].map(
      x => [x, allMethodNames.filter(y => y === x).length]
    ));

    const totalFrames = this.props.samples.length;
    const timeInterval = this.props.samples[this.props.samples.length-1].timestamp - this.props.samples[0].timestamp;

    var uniqueMethodNames = this.getUniqueMethodNames();
    uniqueMethodNames.forEach(uniqueMethod => {
      const totalPercentage = (100*methodCount.get(uniqueMethod)/totalFrames);
      const totalTime = timeInterval * totalPercentage;
      this.state.processedData[uniqueMethod].push(totalTime);
    });
  }

  calculateSelf() {
    const totalFrames = this.props.samples.length;
    const timeInterval = this.props.samples[this.props.samples.length-1].timestamp - this.props.samples[0].timestamp;

    // retreive method on top of the stack for each sample
    var uniqueMethodNames = this.getUniqueMethodNames();
    uniqueMethodNames.forEach(uniqueMethod => {
      var selfCounter = 0;
      this.props.samples.forEach(sample => {
        if (sample.payload[0].method_name === uniqueMethod) {
          ++selfCounter;
        }
      });

      const selfPercentage = ((100*selfCounter)/totalFrames);
      const selfTime = timeInterval * selfPercentage;
      this.state.processedData[uniqueMethod].push(selfTime);
    });
  }

  inititalizeProcessedData() {
    this.getUniqueMethodNames().forEach(methodName => {
      this.state.processedData[methodName] = [];
    });
  }

  displayRows() {
    return Object.keys(this.state.processedData).map(methodName => {
      return (
        <tr>
          <td>{this.state.processedData[methodName][0]}</td>
          <td>{this.state.processedData[methodName][1]}</td>
          <td>{methodName}</td> 
        </tr>
      )
    })
  }
}

/* Sample data

return ([
  { // requset id 
    // timestamp 
    event_type: 'cpu_sample',
    timestamp: 24022015070000100,
    payload: [
      {
        method_name: 'large',
        label: 'largeLabel',
        file: 'layout.js'
      },
      {
        method_name: 'small',
        label: 'smallLabel',
        file: 'layout.js'
      },
      {
        method_name: 'medium',
        label: 'mediumLabel',
        file: 'layout.js'
      }
    ]
  },
  {
    event_type: 'cpu_sample',
    timestamp: 24022015070000130,
    payload: [
      {
        method_name: 'small',
        label: 'smallLabel',
        file: 'layout.js'
      }
    ]
  },
  {
    event_type: 'cpu_sample',
    timestamp: 24022015070000140,
    payload: [
      {
        method_name: 'medium',
        label: 'mediumLabel',
        file: 'layout.js'
      }
    ]
  },
  {
    event_type: 'cpu_sample',
    timestamp: 24022015070000160,
    payload: [
      {
        method_name: 'large',
        label: 'largeLabel',
        file: 'layout.js'
      },
      {
        method_name: 'medium',
        label: 'mediumLabel',
        file: 'layout.js'
      }
    ]
  },
  {
    event_type: 'cpu_sample',
    timestamp: 24022015070000170,
    payload: [
      {
        method_name: 'small',
        label: 'smallLabel',
        file: 'layout.js'
      },
      {
        method_name: 'medium',
        label: 'mediumLabel',
        file: 'layout.js'
      }
    ]
  }
])
*/

export default Row;
