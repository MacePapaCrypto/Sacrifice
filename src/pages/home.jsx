import React, { useEffect } from "react";
import '../styles/home.css';
import Header from "../components/header";
import Sacrafice from "../components/sacrafice";
import Tokens from "../components/collections";
import { useAccount } from 'wagmi';

function Home() {

    const { address, isConnecting, isDisconnected } = useAccount();

    return(
        <div className="home-page">
            <Header />
            { 
                isDisconnected || isConnecting ? 
                <div style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                    <p>Connect Wallet to Sacrifice</p>
                </div> :
                <>
                    <Tokens />
                </>
            }
        </div>
    );
}

export default Home;