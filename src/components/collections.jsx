import '../styles/select.css'
import React, { useEffect } from 'react';
import ccOneABI from '../contractABI/ccOneABI.json';
import ccTwoABI from '../contractABI/ccTwoABI.json';
import { useContractRead, useAccount } from 'wagmi';
import LoadContractOne from './LoadContractOne';
import LoadContractTwo from './LoadContractTwo';
import Claims from "../components/Claims";

const Collections = () => {

    let contractOneIndexes = [];
    let contractTwoIndexes = [];

    const ccOneContract = {
        addressOrName: '0xBcE593d80B889C5F89819bE4be80Bd8396AAdEA9',
        contractInterface: ccOneABI,
    }

    const ccTwoContract = {
        addressOrName: '0xD6647b1967c4495000a80B2912521F5e2C429A18',
        contractInterface: ccTwoABI,
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

        useEffect(() => {
            for(let i = 0; i < data; i++) {
                contractOneIndexes[i] = i;
            }
            console.log(contractOneIndexes);
        }, [data, contractOneIndexes]);

        return(
            isSuccess && contractOneIndexes.length > 0 ?
            <>
                {contractOneIndexes.map((index) => (
                    <LoadContractOne key={index.toString()} tokenToSearch={index}/>
                ))}
            </> : 
            isLoading ?
            <p style={{color: "white"}}>...fetching contract one</p> :
            isError ?
            <p style={{color: "white"}}>error loading tokens from contract one</p> : 
            contractOneIndexes.length === 0 ? 
            <p style={{color: "white"}}>You don't have any trash tokens for this contract</p> :
            <></>
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

        useEffect(() => {
            for(let i = 0; i < data; i++) {
                contractTwoIndexes[i] = i;
            }
            console.log(contractTwoIndexes);
        }, [data, contractTwoIndexes]);

        return(
            isSuccess && contractTwoIndexes.length > 0 ?
            <>
                {contractTwoIndexes.map((index) => (
                    <LoadContractTwo key={index.toString()} tokenToSearch={index}/>
                ))}
            </> :
            isLoading ?
            <p style={{color: "white"}}>...fetching contract two</p> :
            isError ?
            <p style={{color: "white"}}>error loading tokens from contract two</p> : 
            contractTwoIndexes.length === 0 ? 
            <p style={{color: "white"}}>You don't have any trash tokens for this contract</p> :
            <></>
        );
    }

    return(
        <div className="select-container">
            <div className='select-steps'>
                <div className='step'>
                    <Claims/>
                    <p style={{color: "white", justifyContent: "center", marginTop: "1rem"}}><b style={{justifyContent: "center"}}>Trash NFTs, get FTM</b></p>
                    <h1>Select tokens to burn</h1>
                    <div style={{display: "grid"}}>
                        <h4 style={{color: "white"}}><b>Contract One:</b> {ccOneContract.addressOrName}</h4>
                        <MappedContractOne/>
                    </div>
                    <div style={{display: "grid"}}>
                        <h4 style={{color: "white"}}><b>Contract Two:</b> {ccTwoContract.addressOrName}</h4>
                        <MappedContractTwo/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collections;