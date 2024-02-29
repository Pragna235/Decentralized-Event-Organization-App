import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { contractAbi, contractAddress } from './Constant/constants.js';
import Login from './Components/Login';
import Connected from './Components/Connected';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  });

  

  async function createEventFunction() {
    if (provider && account) {
      try {
        const contract = new ethers.Contract(contractAddress, contractAbi, provider);
        const signer = provider.getSigner();
        const contractWithSigner = contract.connect(signer);

        // Call the createEvent function here
        const tx = await contractWithSigner.createEvent("Event Name", Date.now() + 86400000, 1, 20);
        await tx.wait(); // Wait for the transaction to be mined

        console.log("Event created successfully");
      } catch (err) {
        console.error(err);
      }
    }
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : ", address);
        setIsConnected(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser");
    }
  }

  async function createEventFunction(eventName, eventDate, eventPrice, ticketCount) {
    if (provider && account) {
      try {
        const contract = new ethers.Contract(contractAddress, contractAbi, provider);
        const signer = provider.getSigner();
        const contractWithSigner = contract.connect(signer);

        // Call the createEvent function here
        const tx = await contractWithSigner.createEvent(eventName, eventDate, eventPrice, ticketCount);
        await tx.wait(); // Wait for the transaction to be mined

        console.log("Event created successfully");
      } catch (err) {
        console.error(err);
      }
    }
  }

  async function buyTicketFunction(eventId, quantity) {
    if (provider && account) {
      try {
        const contract = new ethers.Contract(contractAddress, contractAbi, provider);
        const signer = provider.getSigner();
        const contractWithSigner = contract.connect(signer);
  
        // Call the buyTicket function here
        const tx = await contractWithSigner.buyTicket(eventId, quantity, { value: 0.1 * quantity }); // Assuming a fixed value for tickets, adjust as needed
        await tx.wait(); // Wait for the transaction to be mined
  
        console.log("Tickets bought successfully");
      } catch (err) {
        console.error(err);
      }
    }
  }

  
  return (
    <div className="App">
      {isConnected ? (
        
        <Connected account={account} createEventFunction={createEventFunction} buyTicketFunction={buyTicketFunction} />
      ) : (
        <Login connectWallet={connectMetamask} />
      )}
    </div>
  );
}

export default App;
