import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
export const Navbar = () => {
  const [wallet, setWallet] = useState(false);
  const walletDetails = useSelector((state: any) => state?.wallet?.info);
  return (
    <header>
      <ul className="ul-tag">
        <li>About</li>
        <li>Home</li>
        <li>Contact Us</li>
        <div
          style={{ marginLeft: "auto", marginRight: 20, cursor:'pointer' }}
          onClick={() => setWallet(true)}
        >
          {!wallet&&"Click to See Wallet Info"}{" "}
          {wallet&&walletDetails?.map(
            (item: { accounts: string; balance: string }, index: number) => (
              <div key={index} style={{display:'flex',gap:'10px'}}>
                {" "}
                <h4 style={{color:'#ffffff'}}>Account: {item.accounts}</h4>
                <h4 style={{color:'#ffffff'}}>Balance: ${item.balance}</h4>
              </div>
            )
          )}
        </div>
      </ul>
    </header>
  );
};
