import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { walletInformation } from "../redux/walletSlice";
import sampleabi from "./sampleabi.json";
import { useState } from "react";
export const MetamaskConnect = () => {
  const [loader, setLoader] = useState(false);
  const [loaderInc, setLoaderInc] = useState(false);
  const [count, setCount] = useState();
  const dispatch = useDispatch();
  const walletDetails = useSelector((state: any) => state?.wallet?.info);
  const contractAddress = "0xb8A1808ED814874d318a7E9444ef8fBBBE63c0c9";

  const connectWallet = async () => {
    //@ts-ignore
    if (window.ethereum) {
      try {
        // Ask MetaMask to connect
        //@ts-ignore
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        //@ts-ignore
        const provider = new ethers.BrowserProvider(window.ethereum);

        //Get balance in wei (smallest ETH unit)
        if (accounts?.length) {
          const balanceInWei = await provider.getBalance(accounts[0]);
          const balanceInEth = ethers.formatEther(balanceInWei);
          let payload = {
            accounts: accounts[0],
            balance: balanceInEth,
          };
          localStorage.setItem("payLoad", JSON.stringify(payload));
          dispatch(walletInformation(payload));
          //@ts-ignore
          const signer = await provider.getSigner(); // 👈 this gives you a signer
          const contract = new ethers.Contract(
            contractAddress,
            sampleabi,
            signer
          );
          return contract;
        }
      } catch (error) {
        console.error("User rejected the request:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Read count from contract
  const readCount = async () => {
    if (!loaderInc) {
      setLoader(true);
    }
    let contract = await connectWallet();
    if (contract) {
      const value = await contract.getCount();
      setCount(value.toString());
      setLoader(false);
      setLoaderInc(false);
    }
  };

  // Write to contract (increment)
  const incrementCount = async () => {
    setLoaderInc(true);
    let contract = await connectWallet();
    if (contract) {
      const tx = await contract.increment();
      await tx.wait();
      readCount();
    }
  };

  return (
    <div>
      <button className="meta-btn" onClick={() => connectWallet()}>
        Connect to metamask
      </button>
      {walletDetails?.map(
        (item: { accounts: string; balance: string }, index: number) => (
          <div key={index} className="div-wallet">
            {" "}
            <h4 className="h4-tag">Account: {item.accounts}</h4>
            <h4 className="h4-tag">Balance: ${item.balance}</h4>
            <p>Current Count: {count}</p>
            <button className="meta-btn" onClick={readCount}>
              {" "}
              {loader ? "Loading..." : "Read Count"}
            </button>{" "}
            &nbsp;
            <button className="meta-btn" onClick={incrementCount}>
              {loaderInc ? "Please wait..." : "Increment Count"}
            </button>
          </div>
        )
      )}
    </div>
  );
};
