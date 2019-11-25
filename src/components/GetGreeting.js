import React, { Component } from 'react';
import Web3 from 'web3';
import helloRSKAbi from '../HelloRSKAbi';
import { HelloRSK as helloRSKAddress } from '../contracts.testnet';
import { url as node } from '../node.testnet';

export default class GetGreeting extends Component {
  constructor (props) {
    super(props);

    this.state = {
      getting: false,
      greeting: null,
    }

    this.getGreeting = this.getGreeting.bind(this);
  }

  componentDidMount () {
    this.getGreeting();
  }

  getGreeting () {
    this.setState({ getting: true });
    const web3 = new Web3(node);

    web3.eth.net.getId()
    .then(id => {
      if (id === 31 ) return new web3.eth.Contract(helloRSKAbi, helloRSKAddress);
    })
    .then(helloRSK => helloRSK.methods.getGreeting().call())
    .then(greeting => this.setState({ greeting, getting: false }));
  }

  render () {
    const { getting, greeting } = this.state;

    return <p>Greeting: <b>{getting ? '...' : greeting}</b> (<a onClick={this.getGreeting}>reload</a>)</p>;
  }
}
