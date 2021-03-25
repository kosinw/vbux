import React, { useEffect, useRef, useState } from 'react'
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { address, abi } from "./contracts/vbucks";

function App() {
  const web3Ref = useRef(null);
  let [activeWallet, setActiveWallet] = useState(null);

  async function talkWithContract(e) {
    let web3 = web3Ref.current;

    if (activeWallet === null) {
      alert("Must connect MetaMask wallet first...")
      return;
    }

    // Eth Contract takes the ABI
    e.preventDefault();

    const contract = new web3.eth.Contract(abi, address);
    const result = await contract.methods.numberOneVictoryRoyale().send({
      from: activeWallet
    });

    // Validate the name is changing
    console.log(result);
  }

  async function connect() {
    let web3 = web3Ref.current;

    const provider = await detectEthereumProvider();
      if (provider) {
        console.log("Provider: ", provider);
        // From now on, this should always be true:
        // provider === window.ethereum
        //startApp(provider); // initialize your app
      } else {
        console.log('Install MetaMask!');
      }

    web3.eth
      .requestAccounts()
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
  }

  // For now, 'eth_accounts' will continue to always return an array
  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== activeWallet) {
      setActiveWallet(accounts[0]);
      // Do any other work!
    }
  }

  useEffect(() => {
    let web3 = new Web3(Web3.givenProvider);
    web3Ref.current = web3;
  }, []);

  return (
    <div className="App">
      <div className="flex font-body items-center justify-center h-screen bg-black">
        <div className="container flex p-6 max-w-3xl mx-auto border-black border bg-white">
          <div className="flex-none w-40 relative">
            <img src="https://i.ytimg.com/vi/xzolzCRs7mM/maxresdefault.jpg" alt="" className="absolute inset-0 w-full h-full object-cover border border-black shadow-offset-lime" />
          </div>
          <div className="flex-auto pl-6">
            <div className="flex flex-wrap items-baseline pl-52 -mt-6 -mr-6 -ml-52 py-6 pr-6 bg-black text-white">
              <h1 className="w-full flex-none text-2xl leading-7 mb-2 font-bold">😩👌💯😂😩🔥 <br /> Download Free V-Bucks!!?!</h1>
              <div className="text-2xl leading-7 font-bold">Valued at $69,420.00/token</div>
              <div className="text-sm font-medium ml-3"><sup>VBUX</sup></div>
            </div>
            <div className="flex space-x-3 text-sm font-bold uppercase py-5">
              <div className="flex-auto h-10 flex space-x-3">
                <button onClick={connect} className="w-1/4 flex items-center justify-center bg-lime-300 text-black border border-black shadow-offset-black">Connect wallet</button>
                <button onClick={talkWithContract} className="w-1/4 flex items-center justify-center bg-white text-black border border-black shadow-offset-black" type="submit">Get V-Bucks!</button>
              </div>
            </div>
            <p className="text-xs leading-5 text-gray-500">
              Sending $19 fortnite cards through cryptocurrency.<br />
              <a href="https://kosinw.com" className="font-bold underline">Brought to you by @kosinw.</a>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
