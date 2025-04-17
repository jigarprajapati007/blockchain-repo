import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { walletInformation } from "../redux/walletSlice";

export const MetamaskConnect = () => {
  const dispatch = useDispatch();
  const walletDetails = useSelector((state: any) => state?.wallet?.info);

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
        }
      } catch (error) {
        console.error("User rejected the request:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div>
      <button className="meta-btn" onClick={() => connectWallet()}>
        Connect to metamask
      </button>
      {walletDetails?.map(
        (item: { accounts: string; balance: string }, index: number) => (
          <div
            key={index}
            className="div-wallet"
          >
            {" "}
            <h4 className="h4-tag">Account: {item.accounts}</h4>
            <h4 className="h4-tag">Balance: ${item.balance}</h4>
          </div>
        )
      )}
    </div>
  );
};
