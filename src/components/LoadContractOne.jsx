import { useContractRead, useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import ccOneABI from '../contractABI/ccOneABI.json';
import '../styles/select.css';
import '../App.css';
import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { Typography } from '@mui/material';

const LoadContractOne = (props) => {

    const toast = useToast();

    const ccOneContract = {
        addressOrName: '0xBcE593d80B889C5F89819bE4be80Bd8396AAdEA9',
        contractInterface: ccOneABI,
    }

    const trashcanAddress = '0x0eF6D0E4780455Ce3A43b61D8A2D223417869a9d';

    const { address, isConnecting, isDisconnected } = useAccount();

    let id = 0;

    const { data: tokenId, error, isError, isSuccess } = useContractRead({
        ...ccOneContract,
        functionName: 'tokenOfOwnerByIndex',
        args: [address, props.tokenToSearch],
        onSuccess(tokenId) {
            console.log("C1", tokenId.toString());
            id = tokenId.toString();
            console.log(id);
        },
        onError(error) {
            console.log("C1", error);
        }
    });

    const { config, error: prepError } = usePrepareContractWrite({
        ...ccOneContract,
        functionName: 'safeTransferFrom(address,address,uint256)',
        args: [address, trashcanAddress, tokenId !== undefined ? tokenId.toString() : id],
        onError(prepError) {
            console.log("Error in prep 1: ", prepError);
            console.log("Address From: ", address);
            console.log("Address To: ", trashcanAddress);
            console.log("Token Id: ", tokenId !== undefined ? tokenId.toString() : id);
        }
    });

    const {
        data: txData,
        isError: txError,
        isLoading: txLoading,
        isSuccess: txSuccess,
        write,
    } = useContractWrite(config);

    const { error: txHashErrorData, isError: txHashError, isLoading: txIsLoading, isSuccess: txIsSuccess } = useWaitForTransaction({
        hash: txData?.hash,
    });

    useEffect(() => {
        txIsLoading && toast({
            title: "Transaction Sent",
            description: txData?.hash,
            status: "info",
            duration: 4000,
            isClosable: true,
            position: "top",
        });

        txIsSuccess && toast({
            title: "Transaction Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
        });

        txHashError && toast({
            title: "Transaction Failed",
            description: txHashErrorData,
            status: "error",
            duration: 6000,
            isClosable: true,
            position: "top",
        });
    }, [txIsLoading, txIsSuccess, txHashError, toast, txHashErrorData, txData]);

    return(
        isSuccess ?
        <>
            <div className="trash-container">
                <div className="trash-card">
                    <Typography variant="h6" color="white"  justifyContent="center" display="flex" marginTop="15px">
                        Token ID: {tokenId.toString()}
                    </Typography>
                    <button onClick={() => write?.()}>Throw Away Trash</button>
                </div>
            </div>
        </> :
        isError ?
        <>
            <div className="trash-container">
                <div className="trash-card">
                    <Typography variant="body1" color="black" marginBottom="15px">
                        Error grabbing token id for index: {props.tokenToSearch}
                    </Typography>
                </div>
            </div>
        </> :
        txError ?
        <>
            <div className="trash-container">
                <Typography variant="body1" color="white" marginBottom="15px">
                    Error loading the write function
                </Typography>
            </div>
        </> :
        <></>
    );
}

export default LoadContractOne;