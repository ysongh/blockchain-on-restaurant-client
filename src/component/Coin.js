import React, { Component } from 'react';
import Web3 from 'web3';
import $ from 'jquery';

import EatOutToken from '../abis/EatOutToken.json';
import TextInput from './common/TextInput';
import Spinner from './common/Spinner';
import TransactionModal from './common/TransactionModal';

class Coin extends Component{
  constructor(props){
    super(props);
    this.state = {
      account: '',
      amount: '',
      address: '',
      ceth: '',
      transactionHash: '',
      loading: false,
    }
  }

  componentDidMount(){
    this.loadWeb3();
    this.loadBlockchainData();
  }

  async loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      await window.ethereum.enable();
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    }
    else{
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0]});

    const networkId = await web3.eth.net.getId();
    const networkData = EatOutToken.networks[networkId];

    if(networkData){
      const eatOutToken = new web3.eth.Contract(EatOutToken.abi, EatOutToken.networks[networkId].address);
      this.setState({ eatOutToken });

      const balance = await eatOutToken.methods.balanceOf(accounts[0]).call();
      this.setState({ balance: web3.utils.fromWei(balance.toString(), 'Ether') });

      const ceth = await eatOutToken.methods.getCTokenBalance().call();
      this.setState({ ceth: ceth });
    }
    else{
      window.alert('Contract is not deployed to detected network')
    }
  }

  onSubmit(){
    try{
      this.setState({ loading : true });
      this.state.eatOutToken.methods.transfer(this.state.address, window.web3.utils.toWei(this.state.amount, 'Ether')).send({ from: this.state.account })
        .once('receipt', (receipt) => {
          console.log(receipt);
          this.setState({
            loading: false,
            balance: this.state.balance - this.state.amount,
            address: '',
            amount: ''
          });
        })
    } catch(err){
      console.log(err)
      this.setState({ loading : false });
    }
  }

  redeem(){
    try{
      this.setState({ loading : true });
      this.state.eatOutToken.methods.redeem(this.state.ceth).send({ from: this.state.account })
        .once('receipt', (receipt) => {
          console.log(receipt);
          this.setState({ transactionHash: receipt.transactionHash });
          $('#modal').modal('show');
        })
      this.setState({ loading : true });
    } catch(err){
      console.log(err)
      this.setState({ loading : false });
    }
  }

  render(){
    return (
      <div className="container">
        <h1>Your profile</h1>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title text-center secondary-color-text h4">
                  Send Token
                </h5>
                <p className="card-text"><strong>Eat Out Coins</strong>: {this.state.balance}</p>
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
                {this.state.loading ? <Spinner /> : <button className="btn btn-lg primary-color " onClick={this.onSubmit.bind(this)}>Send Coin</button> }
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5 class="card-title text-center secondary-color-text h4">
                  Redeem Payout
                </h5>
                <p className="card-text"><strong>CETH</strong>: {this.state.ceth / 10 ** 8}</p>
                {this.state.loading ? <Spinner /> : <button className="btn btn-lg primary-color " onClick={this.redeem.bind(this)}>Redeem</button> }
              </div>
            </div>
            
          </div>
        </div>
        <TransactionModal transactionHash={this.state.transactionHash} />
      </div>
    );
  }
}

export default Coin;