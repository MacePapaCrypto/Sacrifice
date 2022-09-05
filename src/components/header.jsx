import '../styles/header.css'
import React from 'react';
import { Link } from "react-router-dom";
import Header_IMG from '../images/summoning-circle.gif'

function Header() {
    return <div className="header-container">

        <div className="header-content">
            <img style={{height: "100%", width: "100%"}} src={Header_IMG} />
        </div>

    </div>
}

export default Header