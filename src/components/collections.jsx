import '../styles/select.css';
import '../App.css';
import React, { useEffect, useRef } from 'react';
import ccOneABI from '../contractABI/ccOneABI.json';
import ccTwoABI from '../contractABI/ccTwoABI.json';
import { useContractRead, useAccount } from 'wagmi';
import LoadContractOne from './LoadContractOne';
import LoadContractTwo from './LoadContractTwo';
import Claims from "../components/Claims";
import { Typography } from '@mui/material';


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
        const refBoundary = useRef(data);
        useEffect(() => {
            if(refBoundary.current > 20) {
                refBoundary.current = 20;
            }
            for(let i = 0; i < refBoundary.current; i++) {
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
            <Typography variant="body1" fontFamily="arial, helvetica, sans-serif" color="white" marginBottom="15px">
                ...fetching contract one
            </Typography>:
            isError ?
            <Typography variant="body1" fontFamily="arial, helvetica, sans-serif" color="white" marginBottom="15px">
                error loading tokens from contract one
            </Typography> : 
            contractOneIndexes.length === 0 ? 
            <Typography variant="body1" fontFamily="arial, helvetica, sans-serif" color="white" marginBottom="15px">
                You don't have any trash tokens for this contract
            </Typography> :
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
        const refBoundary = useRef(data);
        useEffect(() => {
            if(refBoundary.current > 20) {
                refBoundary.current = 20;
            }
            for(let i = 0; i < refBoundary.current; i++) {
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
            <Typography variant="body1" fontFamily="arial, helvetica, sans-serif" color="white" marginBottom="15px">
                ...fetching contract two
            </Typography> :
            isError ?
            <Typography variant="body1" fontFamily="arial, helvetica, sans-serif" color="white" marginBottom="15px">
                error loading tokens from contract two
            </Typography> : 
            contractOneIndexes.length === 0 ? 
            <Typography variant="body1" fontFamily="arial, helvetica, sans-serif" color="white" marginBottom="15px">
                You don't have any trash tokens for this contract
            </Typography> :
            <></>
        );
    }

    return(
        <div className="select-container">
            <div className='select-steps'>
                <div className='step'>
                    <Claims/>
                    
                    <Typography variant="h5" fontFamily="arial, helvetica, sans-serif" color="white"  marginBottom="15px">
                        Trash NFTs, Get FTM
                    </Typography>
                    <Typography variant="h6" fontFamily="arial, helvetica, sans-serif" color="white"  marginBottom="15px">
                        Select tokens to burn
                    </Typography>
                    <div style={{display: "grid"}}>
                        <Typography variant="h4" fontFamily="arial, helvetica, sans-serif" color="white" marginBottom="15px">
                            <b>Contract One:</b>
                            <Typography variant="body2" fontFamily="arial, helvetica, sans-serif" color="white" marginBottom="15px">
                                {ccOneContract.addressOrName}
                            </Typography>
                        </Typography>
                        <MappedContractOne/>
                    </div>
                    <div style={{display: "grid"}}>
                        <Typography variant="h4" fontFamily="arial, helvetica, sans-serif" color="white" marginBottom="15px">
                            <b>Contract Two:</b>
                            <Typography variant="body2" fontFamily="arial, helvetica, sans-serif" color="white" marginBottom="15px">
                                {ccTwoContract.addressOrName}
                            </Typography>
                        </Typography>
                        <MappedContractTwo/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collections;