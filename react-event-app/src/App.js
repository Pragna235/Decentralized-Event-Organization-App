import { useState, useEffect } from 'react';
import {ethers} from "ethers";
import {contractAbi, contractAddress} from './Constant/constants.js';
import Login from './Components/Login';
import Connected from './Components/Connected'
import './App.css';

function App() {
  const [provider,setProvider] = useState(null);
  const [account,setAccount] = useState(null);
  const[isConnected,setIsConnected] = useState(false);


  useEffect( () => {
    if(window.ethereum){
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return() => {
      if(window.ethereum){
        window.ethereum.removeListener("accountsChanged",handleAccountsChanged);
      }
    }
  });

  function handleAccountsChanged(accounts){
    if(accounts.length > 0 && account !== accounts[0]){
      setAccount(accounts[0]);
    }else{
      setIsConnected(false);
      setAccount(null);
    }
  }
  async function connectMetamask(){
    if(window.ethereum){
    try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : ",address);
        setIsConnected(true);
    }catch(err){
      console.error(err);
    }
    }else{
      console.error("Metamask is not detected in the browser");
    }
  }
  return (
    <div className="App">
      {isConnected ? (<Connected account = {account}/>):(<Login connectWallet = {connectMetamask}/>)}
      
    </div>
  );
}

export default App;