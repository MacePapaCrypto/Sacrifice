import '../styles/select.css';
import '../App.css';
import React, { useState } from 'react';
import trashABI from '../contractABI/trashABI.json';
import { useContractRead, useAccount } from 'wagmi';
import { Typography } from '@mui/material';

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
            setClaimableFTM(data !== undefined ? data.toString() : 0);
        },
        onError(error) {
            console.log("Balance Read Error", error);
        }
    });

    return(
        <div style={{width: "100%", justifyContent: "center", alignContent: "center"}}>
            <Typography variant="h5" color="white" gutterBottom>
                Claimable FTM: {claimableFTM}
            </Typography>
        </div>
    )
}

export default UserClaimBalance;