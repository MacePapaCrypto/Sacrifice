import { useContractRead, useAccount, fetchNextPage } from 'wagmi';
import ccABI from '../contractABI/ccABI.json';
import '../styles/select.css'
import React, { useEffect, useState } from 'react';

const LoadContractTwo = (props) => {
    const ccTwoContract = {
        addressOrName: '0xD6647b1967c4495000a80B2912521F5e2C429A18',
        contractInterface: ccABI,
    }

    const { address, isConnecting, isDisconnected } = useAccount();

    const { data, error, isError, isSuccess } = useContractRead({
        ...ccTwoContract,
        functionName: 'tokenOfOwnerByIndex',
        args: [address, props.tokenToSearch],
        onSuccess(data) {
            console.log("C2", data);
        },
        onError(error) {
            console.log("C2", error);
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

export default LoadContractTwo;