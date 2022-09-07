import '../styles/select.css'
import React, { useState } from 'react';
import trashABI from '../contractABI/trashABI.json';
import { useContractRead, useAccount } from 'wagmi';
import { ethers } from 'ethers';

const UserClaimBalance = () => {

    const [claimableFTM, setClaimableFTM] = useState(0);

    const trashContract = {
        addressOrName: "0x544F5e4a0187E84435adBb6D20997bc735B0792C",
        contractInterface: trashABI,
    }

    const { address } = useAccount();

    const { data, error, isError, isSuccess } = useContractRead({
        ...trashContract,
        functionName: 'sorryBalance',
        args: [address],
        onSuccess(data) {
            setClaimableFTM(ethers.utils.formatEther(data, 'ether'));
        },
        onError(error) {
            console.log("Balance Read Error", error);
        }
    });

    return(
        <div style={{width: "100%", justifyContent: "center", alignContent: "center"}}>
            <h4 style={{color: "white"}}>Claimable FTM: {claimableFTM}</h4>
        </div>
    )
}

export default UserClaimBalance;