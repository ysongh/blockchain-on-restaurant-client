import React, { Component } from 'react';
import Web3 from 'web3';

import {EATOUTTOKEN_ABI, EATOUTTOKEN_ADDRESS} from '../config';
import TextInput from './common/TextInput';
import Loading from './common/Loading';

class Coin extends Component{
  constructor(props){
    super(props);
    this.state = {
      account: '',
      amount: '',
      address: '',
      loading: false,
    }
  }

  componentDidMount(){
    this.loadBlockchainData();
  }

  async loadBlockchainData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0]});

    const eatOutToken = new web3.eth.Contract(EATOUTTOKEN_ABI, EATOUTTOKEN_ADDRESS);
    this.setState({ eatOutToken });

    const balance = await eatOutToken.methods.balanceOf(accounts[0]).call();

    this.setState({ balance });
  }

  onSubmit(){
    try{
      this.state.eatOutToken.methods.transfer(this.state.address, this.state.amount).send({ from: this.state.account })
        .once('receipt', (receipt) => {
          console.log(receipt);
        })
    } catch(err){
      console.log(err)
    }
  }

  render(){
    return (
      <div className="container">
        <h1>Send Tokens</h1>
        <div className="card mb-3">
          <div className="card-body">
            <p><strong>Your Address</strong>: {this.state.account}</p>
            <p><strong>Eat Out Coins</strong>: {this.state.balance}</p>
          </div>
        </div>
        <TextInput
          label="Address to Send"
          type="text"
          value={this.state.address}
          onChange={e => this.setState({ address: e.target.value })} />
        <TextInput
          label="Amount"
          type="text"
          value={this.state.amount}
          onChange={e => this.setState({ amount: e.target.value })} />
        <button className="btn btn-lg primary-color " onClick={this.onSubmit.bind(this)}>Send Coin</button>
      </div>
    );
  }
}

export default Coin;