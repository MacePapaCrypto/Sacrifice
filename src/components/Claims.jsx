import '../styles/select.css'
import React from 'react';
import UserClaimBalance from './UserClaimBalance';
import UserClaimButton from './UserClaimButton';

const Claims = () => {
    return(
        <div style={{display: "flex", marginTop: "1rem"}}>
            <div style={{display: "flex", justifyContent: "left", alignItems: "center", marginRight: "1rem"}}>
                <UserClaimBalance/>
            </div>
            <div style={{display: "flex", justifyContent: "right", alignItems: "center", marginLeft: "1rem"}}>
                <UserClaimButton/>
            </div>
        </div>
    );
}

export default Claims;