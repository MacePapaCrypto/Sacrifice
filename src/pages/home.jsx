import React, { useEffect } from "react";
import '../styles/home.css';
import Header from "../components/header";
import Tokens from "../components/collections";
import { useAccount } from 'wagmi';
import Claims from "../components/Claims";

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
                <div style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                    <Tokens />
                </div>
            }
        </div>
    );
}

export default Home;