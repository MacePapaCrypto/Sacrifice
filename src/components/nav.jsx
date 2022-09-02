import React from 'react'
import '../styles/nav.css'
import { Link } from "react-router-dom";
import Logo from "../images/candle.png";
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Nav() {
    return <div className="navbar">
    <div className="navbar-content">
        <div className = "left-nav">
        <Link to="/"><img src= {Logo} /></Link>
        </div>
        <div className = "right-nav">
            <div className ="nav-links">
                <ConnectButton label="Connect" accountStatus="address" chainStatus="none" showBalance={false}/>
            </div>
        </div>
    </div>
    </div>
}

export default Nav;