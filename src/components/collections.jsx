import '../styles/select.css'
import React, { useMemo } from 'react';
import { Link } from "react-router-dom";
import ccABI from '../contractABI/ccABI.json';
import { useContractRead, useAccount } from 'wagmi';
import LoadContractOne from './LoadContractOne';
import LoadContractTwo from './LoadContractTwo';
import DynamicTokenLoad from './DynamicTokenLoad';

const Collections = () => {

    let contractOneIndexes = [];
    let contractTwoIndexes = [];

    const ccOneContract = {
        addressOrName: '0xBcE593d80B889C5F89819bE4be80Bd8396AAdEA9',
        contractInterface: ccABI,
    }

    const ccTwoContract = {
        addressOrName: '0xD6647b1967c4495000a80B2912521F5e2C429A18',
        contractInterface: ccABI,
    }

    const { address, isConnecting, isDisconnected } = useAccount();

    const MappedContractOne = () => {
        const { data, isError, isLoading, isSuccess } = useContractRead({
            ...ccOneContract,
            functionName: 'balanceOf',
            args: [address],
            onError(error) {
                console.log(error);
            }
        });

        useMemo(() => {
            for(let i = 0; i < data; i++) {
                contractOneIndexes[i] = i;
            }
            console.log(contractOneIndexes);
        }, []);

        return(
            isSuccess && contractOneIndexes.length > 0 && contractTwoIndexes.length > 0 ?
            <>
                {contractOneIndexes.map((index) => (
                    <LoadContractOne key={index.toString()} tokenToSearch={index}/>
                ))}
            </> : 
            isLoading ?
            <p>...fetching contract one</p> :
            isError ?
            <p>error loading tokens from contract one</p> : <></>
        );
    }

    const MappedContractTwo = () => {
        const { data, isError, isLoading, isSuccess } = useContractRead({
            ...ccTwoContract,
            functionName: 'balanceOf',
            args: [address],
            onError(error) {
                console.log(error);
            }
        });

        useMemo(() => {
            for(let i = 0; i < data; i++) {
                contractTwoIndexes[i] = i;
            }
            console.log(contractTwoIndexes);
        }, []);

        return(
            isSuccess && contractTwoIndexes.length > 0 && contractTwoIndexes.length > 0 ?
            <>
                {contractTwoIndexes.map((index) => (
                    <LoadContractTwo key={index.toString()} tokenToSearch={index}/>
                ))}
            </> :
            isLoading ?
            <p>...fetching contract two</p> :
            isError ?
            <p>error loading tokens from contract two</p> : <></>
        );
    }

    return(
        <div className="select-container">
            <div className='select-steps'>
                <div className='step'>
                    <h1>Select tokens to burn</h1>
                    <h1>Trash NFTs, get FTM</h1>
                    <div style={{display: "grid"}}>
                        <h4 style={{color: "white"}}>Contract One: {ccOneContract.addressOrName}</h4>
                        <MappedContractOne/>
                    </div>
                    <div style={{display: "grid"}}>
                        <h4 style={{color: "white"}}>Contract Two: {ccTwoContract.addressOrName}</h4>
                        <MappedContractTwo/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collections;