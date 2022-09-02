import { useContractRead, useAccount } from 'wagmi';
import ccABI from '../contractABI/ccABI.json';
import '../styles/select.css'
import React, { useEffect, useState } from 'react';

const LoadContractOne = (props) => {
    const ccOneContract = {
        addressOrName: '0xBcE593d80B889C5F89819bE4be80Bd8396AAdEA9',
        contractInterface: ccABI,
    }

    const { address, isConnecting, isDisconnected } = useAccount();

    const { data, error, isError, isSuccess } = useContractRead({
        ...ccOneContract,
        functionName: 'tokenOfOwnerByIndex',
        args: [address, props.tokenToSearch],
        onSuccess(data) {
            console.log("C1", data);
        },
        onError(error) {
            console.log("C1", error);
        }
    });

    return(
        isSuccess ?
        <>
            <p>{data.toString()}</p>
            <button>Throw Away NFT</button>
        </> :
        isError ?
        <>
            <p>Error grabbing token id for index: {props.tokenToSearch}</p>
        </> :
        <></>
    );
}

export default LoadContractOne;