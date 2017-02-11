import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        partinfo2: [],
        partName: '',
        partCost: null,
        partQty: null,
        partSavings: null
      }

      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleReset=this.handleReset.bind(this);
    }

  handleSubmit(e) {
    e.preventDefault();

    const changes = {
      partName: this.state.partName,
      partCost: this.state.partCost,
      partSavings: this.state.partSavings,
      partQty: this.state.partQty
    }

    this.setState({
      partinfo2:[...this.state.partinfo2,changes]
    });
    this.clearInputs();
  }

  handleReset() {
    // e.preventDefault();

    this.setState({
      partinfo2: []
    });

    this.clearInputs();
  }

  clearInputs() {
    this.state.partName = '';
    this.state.partCost = '';
    this.state.partSavings = '';
    this.state.partQty = '';
  }

  savings() {
    const sumSavings = this.state.partinfo2.map(function(o) {
      console.log('da fuck', o)
      return o.partSavings * 1 * o.partQty;
    }).reduce((a, b) => { return a + b}, 0);
    console.log(sumSavings)
    console.log(this.state.partinfo2)
    // .reduce((a, b) => a + b, 0)
    // const arrSavings = this.state.partinfo2.map((value,index) => {return value[2];});
    // const arrSavings = ["1","2","3"];
    // const sumSavings = arrSavings.reduce((a, b) => parseFloat(a) + parseFloat(b));
    // this.state.sumSavings = 0;

    // for(let i=0; i<this.state.partinfo2.length; i++) {
      // this.state.sumSavings += this.state.partinfo2[i].partSavings
    // };

    return sumSavings
  }

  totalCost() {
    const sumCost = this.state.partinfo2.map(function(o) {
      console.log('da fuck', o)
      return o.partCost * 1 * o.partQty;
    }).reduce((a, b) => { return a + b}, 0);
    console.log(sumCost)

    return sumCost
  }

  render() {
    const PARTINFO = [
      {partName: 'Intake', partCost: 200, partSavings: 100, partQty: 1},
      {partName: 'Bearing', partCost: 150, partSavings: 30, partQty: 2},
      {partName: 'Exhaust', partCost: 1200, partSavings: 400, partQty: 1},
      {partName: 'ConnectingRod', partCost: 20, partSavings: 10, partQty: 4}
    ]

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the Race Calculator</h2>
          <p className="App-header-intro">Where you spend money to save money by spending money!</p>
        </div>
        <div className="App-form">
          <form onSubmit={this.handleSubmit}>
            <label>
              Part Name:
              <input
                ref={(ref) => this.inputPartName = ref}
                onChange={event => this.setState({partName: event.target.value})}
                name="partName"
                type="text"
                value={this.state.partName} />
            </label>
            <br />
            <label>
              Part Cost ($):
              <input
                onChange={event => this.setState({partCost: event.target.value})}
                name="partCost"
                type="number"
                value={this.state.partCost} />
            </label>
            <br />
            <label>
              Part Savings ($):
              <input
                onChange={event => this.setState({partSavings: event.target.value})}
                name="partSavings"
                type="number"
                value={this.state.partSavings} />
            </label>
            <br />
            <label>
              Part Qty:
              <input
                onChange={event => this.setState({partQty: event.target.value})}
                name="partQty"
                type="number"
                value={this.state.partQty} />
            </label>
            <br />
            <div className="Button-block">
              <button className="submit" >
                {/* onClick={() => this.handleSubmit(this.state.partName,
                this.state.partCost, this.state.partSavings, this.state.partQty)} */}
                Submit
              </button>
              <button className="reset" onClick={() => this.handleReset()}>Clear Entries</button>
            </div>
          </form>
        </div>
        <div className="App-table">
          <h2>Parts List</h2>
          {/* <PartTable partinfo={PARTINFO} /> */}
          <PartTable partinfo={this.state.partinfo2} />
        </div>
        <div className="App-results">
          <h2>Total Savings</h2>
          <h1>${this.savings()}</h1>
          <p>Total Cost<br />${this.totalCost()}</p>
        </div>
      </div>
    );
  }
}

class PartRow extends Component {
  render () {
    return(
      <tr>
        <td>{this.props.partinfo.partName}</td>
        <td>{this.props.partinfo.partCost}</td>
        <td>{this.props.partinfo.partSavings}</td>
        <td>{this.props.partinfo.partQty}</td>
      </tr>
    );
  }
}

class PartTable extends Component {
  render() {
    const rows = [];
    this.props.partinfo.forEach(function(partinfo) {
        rows.push(<PartRow partinfo={partinfo} key={partinfo.partName} />);
      }
    );
    return (
      <table>
        <thead>
          <tr>
            <th className="Part-col">Part</th>
            <th className="Cost-col">Cost</th>
            <th className="Savings-col">Savings</th>
            <th className="Qty-col">Qty</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

/*
class PartForm extends Component {
  constructor(props) {
      super(props);
      this.state = {
/*        partName: '',
        partCost: 0,
        partQty: 0,
        partSavings: 0,
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(e) {
      const partinfo2array = this.props.partinfo2;
      const updatearray = this.props.partinfo2[this.props.partinfo2.length -1];
      const changes = updatearray.changes.slice();

      partinfo2array.push({
        partName: this.state.partName.value,
        partCost: this.state.partCost.value,
        partSavings: this.state.partSavings.value,
        partQty: this.state.partQty.value
      })

      this.setState({
        partinfo2: partinfo2array
      });

      e.preventDefault();
    }

    handleReset(event) {

    }

    handleChange(event) {
      this.setState({partName: event.target.value});
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Part Name:
            <input
              name="partName"
              type="text"
              value={this.state.value} />
          </label>
          <br />
          <label>
            Part Cost ($):
            <input
              name="partCost"
              type="number"
              value={this.state.value} />
          </label>
          <br />
          <label>
            Part Savings ($):
            <input
              name="partSavings"
              type="number"
              value={this.state.value} />
          </label>
          <br />
          <label>
            Part Qty:
            <input
              name="partQty"
              type="number"
              value={this.state.value} />
          </label>
          <br />
          <button className="submit" >
            {/* onClick={() => this.handleSubmit(this.state.partName,
              this.state.partCost, this.state.partSavings, this.state.partQty)} }
            Submit
          </button>
          <button className="reset" >Clear Entries</button>
          {/* onClick={() => this.handleReset()} }
        </form>
      );
    }
}
*/
export default App;
