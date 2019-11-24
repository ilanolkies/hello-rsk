import React, { Component } from 'react';
import Web3 from 'web3';
import helloRSKAbi from './HelloRSKAbi';
import logo from './logo.svg';
import './App.css';

const node = 'https://public-node.testnet.rsk.co';

// https://explorer.testnet.rsk.co/address/0x0fb49bb37ba4b0186a87c866a2bbd29e1ef378da
const helloRSKAddress = '0x0fb49bb37ba4b0186a87c866a2bbd29e1ef378da';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      getting: false,
      greeting: null
    };

    this.getGreeting = this.getGreeting.bind(this);
  }

  componentDidMount () {
    this.getGreeting();
  }

  getGreeting () {
    this.setState({ getting: true });
    const web3 = new Web3(node);
    const helloRSK = new web3.eth.Contract(helloRSKAbi, helloRSKAddress);

    helloRSK.methods.getGreeting().call()
    .then(greeting => {
      this.setState({ greeting, getting: false })
    });
  }

  render () {
    const { greeting, getting } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to the Internet of Value!
          </p>
        </header>
        <hr />
        <main className="App-body">
          <h1>Hello RSK!</h1>
          <p>Using a smart contract.</p>
          <div>
            <p>Greeting: <b>{getting ? '...' : greeting}</b></p>
          </div>
          <form>
            <input type="text" className="Greeting-input" />
            <button type="submit" className="Greeting-submit">setGreeting()</button>
          </form>
        </main>
      </div>
    );
  }
}

export default App;
