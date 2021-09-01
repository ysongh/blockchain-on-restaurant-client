import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';

import Logo from '../../assets/logo.png';
import EatOutToken from '../../abis/EatOutToken.json';
import { GlobalContext } from '../../context/GlobalState';

const NavbarV2 = () => {
    const { account, setAccount, setContract } = useContext(GlobalContext);

    async function connectWallet(){
        await loadWeb3();
        await loadBlockchainData()
    }

    async function loadWeb3(){
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

    async function loadBlockchainData(){
        const web3 = window.web3;
    
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
    
        const networkId = await web3.eth.net.getId();
        const networkData = EatOutToken.networks[networkId];
    
        if(networkData){
            const eatOutToken = new web3.eth.Contract(EatOutToken.abi, EatOutToken.networks[networkId].address);
            setContract(eatOutToken);
        }
        else{
            window.alert('Contract is not deployed to detected network')
        }
    }

    return(
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img className="logo" src={Logo} alt="Logo" data-toggle="collapse" data-target=".navbar-collapse.show" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <Link className="nav-link" to="/deal">Deals</Link>
                        </li>
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <Link className="nav-link" to="/restaurant">Restaurant</Link>
                        </li>
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <Link className="nav-link" to="/coin">Coin</Link>
                        </li>
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <Link className="nav-link" to="/addrestaurant">Add Restaurant</Link>
                        </li>
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <button className="btn primary-color" onClick={connectWallet}>
                                {account ? `${account.substring(0,5)}...${account.substring(37,42)}` : "Connect"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarV2;