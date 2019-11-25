import React, { Component } from 'react';
import Web3 from 'web3';
import { BarLoader } from 'react-spinners';
import helloRSKAbi from './HelloRSKAbi';
import { HelloRSK as helloRSKAddress } from './contracts.testnet';
import logo from './logo.svg';
import './App.css';
import { GetGreeting } from './components';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: '',
      setting: false,
      error: null,
      receipt: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.setGreeting = this.setGreeting.bind(this);
  }

  handleChange (event) {
    const { value } = event.target;
    this.setState({ value });
  }

  setGreeting (event) {
    event.preventDefault();
    this.setState({ setting: true, receipt: null, error: null });

    const { value } = this.state;

    const web3 = new Web3(window.web3);
    const helloRSK = new web3.eth.Contract(helloRSKAbi, helloRSKAddress);

    window.web3.currentProvider.enable()
    .then(accounts => helloRSK.methods.setGreeting(value).send({ from: accounts[0] }))
    .then(receipt => this.setState({ receipt }))
    .catch(error => this.setState({ error }))
    .then(() => this.setState({ setting: false }));
  }

  render () {
    const {
      value,
      setting,
      error,
      receipt,
    } = this.state;

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
            <GetGreeting />
          </div>
          <form onSubmit={this.setGreeting}>
            <input
              type="text"
              className="Greeting-input"
              value={value}
              onChange={this.handleChange}
              disabled={setting}
            />
            {
              !window.web3 ?
              <a href="https://chrome.google.com/webstore/detail/nifty-wallet/jbdaocneiiinmjbjlgalhcelgbejmnid" target="_blank" rel="noopener noreferrer">Get Nifty!</a> :
              <input type="submit" value="setGreeting()" className="Greeting-submit" disabled={!window.web3 || setting} />
            }
            {setting && <BarLoader color="#f26122" width={300} />}
          </form>
          <div>
            {error && `Error: ${error.message}`}
            {receipt && <a href={`https://explorer.testnet.rsk.co/tx/${receipt.transactionHash}`} target="_blank" rel="noopener noreferrer">{receipt.transactionHash}</a>}
          </div>
        </main>
        <footer className="App-footer">
          Find the smart contract <a href="https://explorer.testnet.rsk.co/address/0x0fb49bb37ba4b0186a87c866a2bbd29e1ef378da" target="_blank" rel="noopener noreferrer">here</a>
        </footer>
      </div>
    );
  }
}

export default App;
