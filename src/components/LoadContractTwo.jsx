import { useContractRead, useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import ccTwoABI from '../contractABI/ccTwoABI.json';
import '../styles/select.css';
import '../App.css';
import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { Typography } from '@mui/material';

const LoadContractTwo = (props) => {

    const toast = useToast();

    const ccTwoContract = {
        addressOrName: '0xD6647b1967c4495000a80B2912521F5e2C429A18',
        contractInterface: ccTwoABI,
    }

    const trashcanAddress = '0x544F5e4a0187E84435adBb6D20997bc735B0792C';

    const { address, isConnecting, isDisconnected } = useAccount();

    let id = 0;

    const { data: tokenId, error, isError, isSuccess } = useContractRead({
        ...ccTwoContract,
        functionName: 'tokenOfOwnerByIndex',
        args: [address, props.tokenToSearch],
        onSuccess(tokenId) {
            console.log("C2", tokenId.toString());
            id = tokenId.toString();
            console.log(id);
        },
        onError(error) {
            console.log("C2", error);
        }
    });

    const { config, error: prepError } = usePrepareContractWrite({
        ...ccTwoContract,
        functionName: 'safeTransferFrom',
        args: [address, trashcanAddress, tokenId !== undefined ? tokenId.toString() : id],
        onError(prepError) {
            console.log("Error in prep 2: ", prepError);
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
                    <Typography variant="h6" fontFamily="arial, helvetica, sans-serif" color="black" justifyContent="center" display="flex">
                        {tokenId.toString()}
                    </Typography>
                    <button onClick={() => write?.()}>Throw Away Trash</button>
                </div>
            </div>
        </> :
        isError ?
        <>
            <div className="trash-container">
                <div className="trash-card">
                    <Typography variant="body1" fontFamily="arial, helvetica, sans-serif" color="black">
                        Error grabbing token id for index: {props.tokenToSearch}
                    </Typography>
                </div>
            </div>
        </> :
        txError ?
        <>
            <div className="trash-container">
                <Typography variant="body1" fontFamily="arial, helvetica, sans-serif" color="white">
                    Error loading the write function
                </Typography>
            </div>
        </> :
        txLoading ?
        <>
            <p>Tx is loading I guess?</p>
        </> :
        <></>
    );
}

export default LoadContractTwo;